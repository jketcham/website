from marshmallow import Schema, fields


class PhotoSchema(Schema):
    id = fields.String()
    filename = fields.String()
    metadata = fields.Dict()
    files = fields.List(fields.Dict())  # TODO: make schema for file
    tags = fields.List(fields.String())
    public = fields.Bool()
    created = fields.DateTime()
    photo_last_modified = fields.DateTime()
