import json

import falcon

from website.models import Post

from .schema.post import PostSchema


class PostsResource(object):
    def on_get(self, req, resp):
        posts = Post.objects.order_by('-published')

        if req.params.get('slug'):
            post = Post.objects.get(slug=req.params['slug'])
            test = PostSchema()
            result = test.dump(post)
            resp.body = json.dumps(result[0])
            return

        post_schema = PostSchema(many=True)
        result = post_schema.dump(posts)

        resp.body = json.dumps({'results': result.data})


class PostResource(object):
    def on_get(self, req, resp, post_id):
        post = Post.objects(id=post_id).first()

        if post is None:
            raise falcon.HTTP_NOT_FOUND()

        post_schema = PostSchema()
        result = post_schema.dump(post)

        resp.body = json.dumps(result.data)
