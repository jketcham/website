from marshmallow import Schema, fields


class Person(Schema):
    name = fields.String()


class PostSchema(Schema):
    id = fields.String()
    name = fields.String()
    content = fields.String()
    type = fields.String()
    category = fields.List(fields.String())
    location = fields.String()
    syndication = fields.List(fields.String())

    views = fields.Number()
    public = fields.Bool()
    slug = fields.String()
    author = fields.Nested(Person)

    created = fields.String()
    published = fields.String()
    updated = fields.String()
