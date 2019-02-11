import json

class Resource(object):
    def get_schema_class(self, req):
        return self.schema_classes.get(req.content_type)

    def get_schema(self, req):
        schema_class = self.get_schema_class(req)
        return schema_class()

    def get_request_data(self, req):
        if req.content_type == 'application/json':
            data = json.load(req.bounded_stream)
            return data

        if req.content_type == 'application/x-www-form-urlencoded':
            return req.params

        return
