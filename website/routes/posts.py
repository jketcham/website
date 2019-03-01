import json

import falcon

from website.models import Post

from .schema.post import PostSchema


class PostsResource(object):
    def on_get(self, req, resp):
        if req.params.get('slug'):
            post = Post.live_posts().get(slug=req.params['slug'])

            # quick n dirty save views
            post.views += 1
            post.save()

            schema = PostSchema()
            result = schema.dump(post)
            resp.body = json.dumps(result[0])
            return

        posts = Post.live_posts().order_by('-published')

        if req.params.get('tags'):
            tags = req.params.get('tags')
            if type(tags) != list:
                tags = [tags]
            posts = posts.filter(category__all=tags)

        post_schema = PostSchema(many=True)
        result = post_schema.dump(posts)

        resp.body = json.dumps({'results': result.data})


class PostResource(object):
    def on_get(self, req, resp, post_id):
        post = Post.live_posts(id=post_id).first()

        if post is None:
            raise falcon.HTTP_NOT_FOUND()

        post_schema = PostSchema()
        result = post_schema.dump(post)

        resp.body = json.dumps(result.data)
