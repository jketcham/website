import io
import os
import mimetypes

import falcon
import jinja2

from website.config import config


def load_template(name):
    p = os.path.dirname(__file__)
    path = os.path.join(p, '../static/', name)
    with open(os.path.abspath(path), 'r') as fp:
        return jinja2.Template(fp.read())


def get_config():
    return {
        'web_host': config.WEB_HOST,
    }


def get_initial_state(context):
    return {
        'user': context.get('user', {}),
    }


def pass_to_frontend(req, resp):
    if '/static/' in req.path:
        resource = io.open('website{}'.format(req.path), 'r').read()
        name = req.path.split('/static/')[1]

        resp.cache_control = 'max-age=315360000, public, immutable'
        resp.content_type = mimetypes.guess_type(name)[0]
        resp.body = resource
        return

    template = load_template('html/index.html')

    resp.content_type = 'text/html'
    resp.status = falcon.HTTP_200
    resp.body = template.render(
        config=get_config(),
        initial_state=get_initial_state(req.context)
    )
