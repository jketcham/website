from marshmallow import Schema, fields


class Person(Schema):
    name = fields.String()


class PostSchema(Schema):
    id = fields.String()
    title = fields.String()
    content = fields.String()
    post_type = fields.String()

    views = fields.Number()
    public = fields.Bool()
    slug = fields.String()
    author = fields.Nested(Person)

    created = fields.String()
    published = fields.String()
    updated = fields.String()
