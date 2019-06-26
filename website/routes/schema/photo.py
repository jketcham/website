from marshmallow import Schema, fields


class PhotoSchema(Schema):
    id = fields.String()
    filename = fields.String()
    metadata = fields.Dict()
    files = fields.List(fields.Dict())  # TODO: make schema for file
    photosets = fields.String()
    tags = fields.List(fields.String())
    public = fields.Bool()
    date_uploaded = fields.DateTime()
