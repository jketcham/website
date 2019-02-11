import json
import datetime
import urllib.request
from urllib.error import HTTPError

import falcon
from mongoengine import ValidationError, NotUniqueError

from website.config import config
from website.models.post import Post, PostStatus
from website.helpers.auth import get_authentication_token
from website.routes.resource import Resource
from .schema.micropub import JSONSchema, FormSchema
from website.routes.schema.post import (
    PostSchema,
    PostSource,
)

ACCEPTED_ACTION_TYPES = ['delete', 'undelete', 'update']
ACCEPTED_CONTENT_TYPES = [
    'application/json',
    'application/x-www-form-urlencoded',
]
CONTENT_TYPE_SCHEMA = {
    'application/json': JSONSchema,
    'application/x-www-form-urlencoded': FormSchema,
}


def get_slug(url):
    return url.split('/')[-1]


def validate_content_type(req, resp, resource, params):
    if req.content_type not in ACCEPTED_CONTENT_TYPES:
        raise falcon.HTTPBadRequest


def validate_token(token):
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer {}'.format(token),
    }
    req = urllib.request.Request(url=config.TOKEN_ENDPOINT, headers=headers)
    with urllib.request.urlopen(req) as f:
        res = json.loads(f.read().decode('utf-8'))

        if f.getcode() != 200:
            raise falcon.HTTPBadRequest

        if res['me'] != config.HOST:
            raise falcon.HTTPForbidden

        return res


def check_authorization(scope, token):
    if scope not in token['scope']:
        raise falcon.HTTPNotAuthorized


def authenticate_request(req, resp, resource, params):
    token = get_authentication_token(req)

    if not token:
        raise falcon.falcon.HTTPBadRequest(description='Authentication token required')

    try:
        token_data = validate_token(token)
    except HTTPError as error:
        raise falcon.HTTPBadRequest(description='Could not validate token')

    params['token'] = token_data


class MicropubResource(Resource):
    schema_classes = CONTENT_TYPE_SCHEMA

    def on_get(self, req, resp):
        if req.params.get('q') == 'source':
            slug = get_slug(req.params['url'])
            post = Post.objects(slug=slug).first()
            schema = PostSource()
            result = schema.dump({'type': post.type, 'properties': post})
            resp.body = json.dumps(result.data)
            return

        resp.body = json.dumps({})

    @falcon.before(validate_content_type)
    @falcon.before(authenticate_request)
    def on_post(self, req, resp, token):
        data = self.get_request_data(req)

        action = data.get('action')

        if action and action not in ACCEPTED_ACTION_TYPES:
            raise falcon.HTTPBadRequest

        if action:
            slug = get_slug(data['url'])
            post = Post.objects(slug=slug).first()

            if not post:
                raise falcon.HTTPNotFound

            if action == 'update':
                check_authorization('update', token)
                return self.handle_update(resp, post, data)

            if action == 'delete':
                check_authorization('delete', token)
                return self.handle_delete(resp, post)

            if action == 'undelete':
                check_authorization('undelete', token)
                return self.handle_undelete(resp, post)

            raise falcon.HTTPBadRequest

        check_authorization('create', token)

        return self.handle_create(req, resp, data)

    def handle_delete(self, resp, post):
        post.deleted = True
        post.save()
        resp.location = '{}blog'.format(config.HOST)

    def handle_undelete(self, resp, post):
        post.deleted = False
        post.save()
        resp.location = '{}blog/{}'.format(config.HOST, post.slug)

    def handle_update(self, resp, post, data):
        # TODO need to use schema here
        post.update(**data['replace'])
        post.reload()
        resp.location = '{}blog/{}'.format(config.HOST, post.slug)

    def handle_create(self, req, resp, data):
        schema = self.get_schema(req)
        content = schema.load(data).data

        if not content:
            raise falcon.HTTPBadRequest(description='Content required')

        post = Post(**content)

        if post.status == PostStatus.published:
            post.published = datetime.datetime.now()

        post.updated = datetime.datetime.now()

        try:
            post.save()
        except ValidationError as error:
            raise falcon.HTTPBadRequest('Validation', error.message)
        except NotUniqueError as error:
            raise falcon.HTTPBadRequest('Duplicate', str(error))

        post_schema = PostSchema()
        result = post_schema.dump(post)

        resp.body = json.dumps(result.data)
        resp.status = falcon.HTTP_CREATED
        resp.location = '{}blog/{}'.format(config.HOST, post.slug)
