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
        filepath = os.path.join(os.path.abspath('./images'), photo_id)
        photo = io.open(filepath, 'rb')
        content_length = os.path.getsize(filepath)

        if not photo:
            raise falcon.HTTPNotFound()

        resp.cache_control = ['max-age=315360000', 'public', 'immutable']
        resp.stream = photo
        resp.content_length = content_length
        resp.content_type = 'image/jpeg'


def make_queryset(params):
    query_args = {}

    for key, value in params.items():
        if value:
            query_args[key] = value

    return query_args


class PhotosResource(ListResource, PaginatedMixin):
    owner = StringParam('owner id of photos')
    start_gt = StringParam('minimum date of photo start')
    start_lt = StringParam('maximum date of photo\'s start')
    order = StringParam('field to order photos by', 'start')

    def list(self, params, meta):
        query = {
            'owner__id': params.get('owner'),
            'start__gt': params.get('start_gt'),
            'start__lt': params.get('start_lt'),
        }

        photos = Photo.objects(**make_queryset(query)).order_by(params.get('order'))
        paginated_photos = photos.skip(
            params['page'] * params['page_size']
        ).limit(params['page_size'])

        if photos.count() > (params['page'] + 1) * params['page_size']:
            meta['has_more'] = True
        else:
            meta['has_more'] = False

        photo_schema = PhotoSchema(many=True)
        result = photo_schema.dump(paginated_photos)

        self.add_pagination_meta(params, meta)

        return result.data
