import json
import datetime
import urllib.request
from urllib.error import HTTPError

import falcon
from mongoengine import ValidationError, NotUniqueError

from website.models import Post
from website.routes.schema.post import PostSchema

ACCEPTED_CONTENT_TYPES = [
    'application/x-www-form-urlencoded',
    'application/json',
]

def validate_content_type(req, resp, resource, params):
    if req.content_type not in ACCEPTED_CONTENT_TYPES:
        raise falcon.HTTPBadRequest


def validate_token(token):
    url = 'https://tokens.indieauth.com/token'
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer {}'.format(token),
    }
    req = urllib.request.Request(url=url, headers=headers)
    with urllib.request.urlopen(req) as f:
        res = json.loads(f.read().decode('utf-8'))

        if f.getcode() != 200:
            raise falcon.HTTPBadRequest

        if res['me'] != 'https://alpha.jackketcham.com':
            raise falcon.HTTPForbidden

        if 'post' not in res['scope']:
            raise falcon.HTTPForbidden


class MicroformatObject(object):
    def __init__(self, data):
        self.type = data.get('h', 'entry')
        self.name = data['name']
        self.content = data['content']
        self.author = data.get('author')
        self.category = data.get('category')
        self.location = data.get('location')
        self.syndication = data.get('syndication')
        self.published = data.get('published', datetime.datetime.now())


class MicropubResource(object):
    def on_get(self, req, resp):
        resp.body = json.dumps({})

    @falcon.before(validate_content_type)
    def on_post(self, req, resp):
        if not req.auth:
            raise falcon.falcon.HTTPUnauthorized

        try:
            validate_token(req.auth.split(' ')[1])
        except HTTPError as error:
            raise falcon.HTTPBadRequest

        # TODO(jack): handle delete/undelete
        if req.params.get('action'):
            return

        try:
            content = MicroformatObject(req.params)
        except Exception as error:
            raise falcon.HTTPBadRequest

        post = Post(**vars(content))
        post.slug = req.get_param('slug')
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
        # TODO(jack): handle creating URL
        resp.location = 'https://alpha.jackketcham.com/blog/{}'.format(post.slug)
