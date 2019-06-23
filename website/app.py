from os import environ

import falcon
from mongoengine import connect

from .routes import posts, photos, static, micropub, tags
from .config import config


def create_app(config):
    connect(config.MONGO_DB, host=config.MONGO_HOST, port=int(environ.get('MONGO_PORT', '27017')),
            username=environ.get('MONGO_USER'), password=environ.get('MONGO_PASS'), authentication_source='admin')

    api = falcon.API()
    api.req_options.auto_parse_form_urlencoded = True
    api.add_route('/api/tags', tags.TagsResource())
    api.add_route('/api/posts', posts.PostsResource())
    api.add_route('/api/posts/{post_id}', posts.PostResource())
    api.add_route('/api/photos', photos.PhotosResource())
    api.add_route('/api/photos/{photo_id}', photos.PhotoResource())
    api.add_route('/api/micropub', micropub.MicropubResource())

    # serve frontend
    api.add_sink(static.pass_to_frontend)

    return api


def get_app():
    return create_app(config)
