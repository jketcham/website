import datetime

from marshmallow import Schema, fields, pre_load

LIST_FIELDS = ['category']


class PostSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String()
    slug = fields.String(required=True)
    content = fields.String()
    type = fields.String(default='entry')
    category = fields.List(fields.String())
    location = fields.String()
    syndication = fields.List(fields.String())

    views = fields.Number(default=0)
    status = fields.String(default='published')
    deleted = fields.Boolean(default=False)

    published = fields.DateTime(default=datetime.datetime.now())
    updated = fields.DateTime()
    post_meta = fields.Dict()


class Microformats2JSON(PostSchema):
    type = fields.Method(deserialize='get_type')
    content = fields.Method(deserialize='get_content')
    slug = fields.String(load_from='mp-slug')

    @pre_load
    def properties_data(self, data):
        for key, value in data['properties'].items():
            data[key] = value

            if key not in LIST_FIELDS and type(value) == list:
                data[key] = value[0]

        data.pop('properties')

        return data

    def get_type(self, type):
        return type[0] or 'entry'

    def get_content(self, data):
        if type(data) is dict:
            return next(iter(data.values()))
        return data


class FormPostSchema(PostSchema):
    type = fields.String(load_from='h')
    content = fields.String(load_from='content[html]')
    category = fields.String(load_from='category[]')
    slug = fields.String(load_from='mp-slug')
