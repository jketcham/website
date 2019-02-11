from marshmallow import (
    Schema,
    fields,
    pre_load,
    post_dump,
)

LIST_FIELDS = ['category']


class PostSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String()
    slug = fields.String(required=True)
    content = fields.String()
    type = fields.String()
    category = fields.List(fields.String())
    status = fields.String(missing='published')
    location = fields.String()
    syndication = fields.List(fields.String())

    views = fields.Number(dump_only=True)
    deleted = fields.Boolean()
    created = fields.DateTime(dump_only=True)
    published = fields.DateTime()
    updated = fields.DateTime()
    post_meta = fields.Dict()


class Properties(Schema):
    name = fields.String()
    slug = fields.String(dump_to='mp-slug')
    content = fields.Method('get_content')
    category = fields.List(fields.String())
    status = fields.String(load_from='post-status', missing='published')
    location = fields.String()
    syndication = fields.List(fields.String())
    created = fields.DateTime()
    published = fields.DateTime()
    updated = fields.DateTime()

    def get_content(self, post):
        if post.content_type == 'html':
            return {
                'html': post.content,
            }

        return post.content


class PostSource(Schema):
    type = fields.String()
    properties = fields.Nested(Properties)

    @post_dump
    def convert_to_lists(self, post):
        # make everything a list
        post['type'] = [post['type']]

        for key, value in post['properties'].items():
            if value is None:
                post['properties'][key] = []
                continue
            if type(value) != list:
                post['properties'][key] = [value]

        return post
