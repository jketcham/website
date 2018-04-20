from marshmallow import Schema, fields


class PhotoSchema(Schema):
    id = fields.String()
    title = fields.String()
    description = fields.String()
    tags = fields.List(fields.String())
    location_title = fields.String()
    location_coords = fields.Dict()
    photo_collection = fields.String()

    date_created = fields.DateTime()
    date_uploaded = fields.DateTime()

    views = fields.Number()
    public = fields.Bool()

    image_metadata = fields.Dict()


class CreatePhotoSchema(PhotoSchema):
    title = fields.String(required=True)
    description = fields.String(required=True)
    tags = fields.List(fields.String())
    location_title = fields.String()


class UpdatePhotoSchema(PhotoSchema):
    title = fields.String(required=True)
    description = fields.String()
    tags = fields.List(fields.String())
    location_title = fields.String()
