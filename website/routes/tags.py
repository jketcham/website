import json

import falcon

from website.models import Post


class TagsResource(object):
    def on_get(self, req, resp):
        posts = Post.live_posts()

        if req.params.get('q'):
            q = req.params['q']
            posts = posts.filter(category__in=q)

        resp.body = json.dumps({'results': posts.distinct('category')})
