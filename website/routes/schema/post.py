from marshmallow import Schema, fields


class PostSchema(Schema):
    id = fields.String()
    title = fields.String()
    content = fields.String()
    post_type = fields.String()

    views = fields.Number()
    public = fields.Bool()

    created = fields.DateTime()
    published = fields.DateTime()
    updated = fields.DateTime()
