import json
import datetime
import urllib.request
from urllib.error import HTTPError

import falcon
from mongoengine import ValidationError, NotUniqueError

from website.config import config
from website.models import Post
from website.routes.schema.post import PostSchema, Microformats2JSON, FormPostSchema

ACCEPTED_CONTENT_TYPES = [
    'application/x-www-form-urlencoded',
    'application/json',
]

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

        if 'create' not in res['scope']:
            raise falcon.HTTPForbidden


def get_authentication_token(req):
    if req.auth:
        return req.auth.split(' ')[1]

    if req.params.get('access_token'):
        return req.params['access_token'].split(' ')[1]

    return


def get_request_data(req):
    if req.content_type == 'application/json':
        data = json.load(req.bounded_stream)
        print('json data', data)
        schema = Microformats2JSON()
        result = schema.load(data)
        return result.data

    if req.content_type == 'application/x-www-form-urlencoded':
        schema = FormPostSchema()
        print('param', req.params)
        result = schema.load(req.params)
        return result.data

    return


class MicropubResource(object):
    def on_get(self, req, resp):
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
        content = get_request_data(req)

        print('content', content)

        if not content:
            raise falcon.HTTPBadRequest(description='Content required')

        # TODO(jack): handle delete/undelete
        if req.params.get('action'):
            return

        post = Post(**content)
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
