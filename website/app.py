import falcon
from mongoengine import connect

from .routes import posts, photos, static
from .config import config


def create_app(config):
    connect(config.MONGO_DB, host=config.MONGO_HOST)

    api = falcon.API()
    api.add_route('/api/posts', posts.PostsResource())
    api.add_route('/api/posts/{post_id}', posts.PostResource())
    api.add_route('/api/photos', photos.PhotosResource())
    api.add_route('/api/photos/{photo_id}', photos.PhotoResource())

    # serve frontend
    api.add_sink(static.pass_to_frontend)

    return api


def get_app():
    return create_app(config)