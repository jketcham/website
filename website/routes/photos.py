import json
import os
import io

import falcon
from mongoengine.errors import ValidationError

from website.models import Photo
from graceful.parameters import StringParam
from graceful.resources.generic import ListResource
from graceful.resources.mixins import PaginatedMixin

from .schema.photo import PhotoSchema


class PhotoResource(object):
    def on_get(self, req, resp, photo_id):
        filepath = os.path.join('/data', photo_id)
        photo = io.open(filepath, 'rb')
        content_length = os.path.getsize(filepath)

        if not photo:
            raise falcon.HTTPNotFound()

        resp.cache_control = ['max-age=315360000', 'public', 'immutable']
        resp.stream = photo
        resp.content_length = content_length
        resp.content_type = 'image/jpeg'


# FIXME: quick n dirty
def make_queryset(params):
    query_args = {}

    for query_arg, value in params.items():
        if value:
            query_args[query_arg] = value

            if query_arg == 'tags__all':
                query_args[query_arg] = query_args[query_arg].split(',')

    return query_args


class PhotosResource(ListResource, PaginatedMixin, with_context=False):
    tags = StringParam('field to order photos by')

    def list(self, params, meta):
        query = {
            'tags__all': params.get('tags'),
        }

        photos = Photo.objects(**make_queryset(query))

        # Pagination
        # TODO: Extract this functionality for reuse
        paginated_photos = photos.skip(
            params['page'] * params['page_size']
        ).limit(params['page_size'])

        if photos.count() > (params['page'] + 1) * params['page_size']:
            meta['has_more'] = True
        else:
            meta['has_more'] = False

        self.add_pagination_meta(params, meta)

        photo_schema = PhotoSchema(many=True)
        result = photo_schema.dump(paginated_photos)

        return result.data
