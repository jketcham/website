import io
import os
import mimetypes

import falcon

from website.config import config


def pass_to_frontend(req, resp):
    if '/static/' in req.path:
        resource = io.open('website{}'.format(req.path), 'rb').read()
        name = req.path.split('/static/')[1]

        resp.cache_control = ['max-age=315360000', 'public', 'immutable']
        resp.content_type = mimetypes.guess_type(name)[0]
        resp.body = resource
        return

    p = os.path.dirname(__file__)
    index = io.open(os.path.join(p, config.STATIC_DIR, 'index.html')).read()

    resp.content_type = 'text/html'
    resp.status = falcon.HTTP_200
    resp.body = index
