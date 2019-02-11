from marshmallow import (
    Schema,
    fields,
    pre_load,
    post_dump,
)

from .post import PostSchema

class JSONSchema(PostSchema):
    type = fields.Method(deserialize='get_type')
    content = fields.Method(deserialize='get_content')
    content_type = fields.Method(load_from='content', deserialize='get_content_type')
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

    def get_content_type(self, data):
        if type(data) is dict:
            if data.get('html'):
                return 'html'

        return 'plaintext'

    def get_content(self, data):
        # TODO verify content is a dict with property 'html'
        if type(data) is dict:
            return next(iter(data.values()))
        return data


class FormSchema(PostSchema):
    type = fields.String(load_from='h')
    content = fields.String(load_from='content[html]')
    content_type = fields.String(missing='html', default='html') # TODO
    category = fields.List(fields.String(load_from='category[]'))
    slug = fields.String(load_from='mp-slug')
