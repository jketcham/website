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
    # TODO move this url to some config
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

        # TODO: move this url to some config
        if res['me'] != 'https://alpha.jackketcham.com/':
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
    print('request data params', req.params)
    if req.content_type == 'application/json':
        return json.load(req.bounded_stream)

    if req.content_type == 'application/x-www-form-urlencoded':
        return req.params

    return


class MicroformatObject(object):
    def __init__(self, data):
        self.type = data.get('h', 'entry')
        self.name = data.get('name')
        self.content = data['content']
        self.author = data.get('author')
        self.category = data.get('category[]')
        self.location = data.get('location')
        self.syndication = data.get('syndication')
        self.published = data.get('published', datetime.datetime.now())


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
        data = get_request_data(req)

        print('data', data)

        if not data:
            raise falcon.HTTPBadRequest(description='Content required')

        # TODO(jack): handle delete/undelete
        if req.params.get('action'):
            return

        # create content of post
        try:
            content = MicroformatObject(data)
        except Exception as error:
            raise falcon.HTTPBadRequest(description='Bad post')

        post = Post(**vars(content))
        post.slug = req.get_param('mp-slug')
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
        # TODO(jack): move this url to some config
        resp.location = 'https://alpha.jackketcham.com/blog/{}'.format(post.slug)
