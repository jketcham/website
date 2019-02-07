import json
import datetime
import urllib.request
from urllib.error import HTTPError

import falcon
from mongoengine import ValidationError, NotUniqueError

from website.config import config
from website.models import Post
from website.routes.schema.post import PostSchema, Microformats2JSON, FormPostSchema, TempSource

ACCEPTED_ACTION_TYPES = ['delete', 'undelete', 'update']
ACCEPTED_CONTENT_TYPES = [
    'application/x-www-form-urlencoded',
    'application/json',
]
CONTENT_TYPE_SCHEMA = {
    'application/json': Microformats2JSON,
    'application/x-www-form-urlencoded': FormPostSchema,
}


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

        # TODO need to pass back scope info to be checked against action for
        # each request
        if 'create' not in res['scope']:
            raise falcon.HTTPForbidden


def get_authentication_token(req):
    prefix = 'Bearer '

    if req.auth and req.auth.startswith(prefix):
        return req.auth[len(prefix):]

    if req.params.get('access_token') and req.params.get('access_token').startswith(prefix):
        return req.params['access_token'][len(prefix):]

    return


def get_request_data(req):
    if req.content_type == 'application/json':
        data = json.load(req.bounded_stream)
        return data

    if req.content_type == 'application/x-www-form-urlencoded':
        return req.params

    return


def get_post_content(data, content_type):
    schema_class = CONTENT_TYPE_SCHEMA[content_type]
    schema = schema_class()
    result = schema.load(data)
    return result.data


class MicropubResource(object):
    def on_get(self, req, resp):
        if req.params.get('q') == 'source':
            slug = req.params['url'].split('/')[-1]
            post = Post.objects(slug=slug).first()
            schema = TempSource()
            result = schema.dump({'type': post.type, 'properties': post})
            print('update', result.data)
            resp.body = json.dumps(result.data)
            return

        resp.body = json.dumps({})

    @falcon.before(validate_content_type)
    def on_post(self, req, resp):
        # start authenticate request
        token = get_authentication_token(req)

        if not token:
            raise falcon.falcon.HTTPBadRequest(description='Authentication token required')

        try:
            validate_token(token)
        except HTTPError as error:
            raise falcon.HTTPBadRequest(description='Could not validate token')
        # end authenticate request

        # get content of request (json/form)
        data = get_request_data(req)
        action = data.get('action')

        if action and action not in ACCEPTED_ACTION_TYPES:
            raise falcon.HTTPBadRequest

        # TODO(jack): cleanup
        if action in ACCEPTED_ACTION_TYPES:
            slug = data['url'].split('/')[-1]
            post = Post.objects(slug=slug).first()
            if not post:
                raise falcon.HTTPNotFound

            if action == 'update':
                # TODO need to use schema here
                post.update(**data['replace'])
                post.reload()
                resp.location = '{}blog/{}'.format(config.HOST, post.slug)
                return

            if action == 'delete':
                post.deleted = True
                post.save()
                resp.location = '{}blog'.format(config.HOST)
                return

            if action == 'undelete':
                post.deleted = False
                post.save()
                resp.location = '{}blog/{}'.format(config.HOST, post.slug)
                return

            return

        content = get_post_content(data, req.content_type)

        if not content:
            raise falcon.HTTPBadRequest(description='Content required')

        post = Post(**content)

        if post.status == 'published':
            post.published = datetime.datetime.now()

        post.updated = datetime.datetime.now()

        try:
            post.save()
        except ValidationError as error:
            raise falcon.HTTPBadRequest('Validation', error.message)
        except NotUniqueError as error:
            raise falcon.HTTPBadRequest('Duplicate', str(error))

        schema = PostSchema()
        result = schema.dump(post)

        resp.body = json.dumps(result.data)
        resp.status = falcon.HTTP_CREATED
        resp.location = '{}blog/{}'.format(config.HOST, post.slug)
