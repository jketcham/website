import falcon
from mongoengine.errors import ValidationError
from graceful.serializers import BaseSerializer
from graceful.parameters import StringParam
from graceful.resources.generic import ListAPI, RetrieveAPI
from graceful.resources.mixins import PaginatedMixin
from graceful.fields import BoolField, StringField, IntField

from website.models import Photoset


class PhotosetSerializer(BaseSerializer):
    id = StringField('id')
    name = StringField('name')
    description = StringField('description')
    slug = StringField('slug')
    photos = StringField('photos', many=True)
    public = BoolField('public')
    created = StringField('created')
    updated = StringField('updated')


class PhotosetResource(RetrieveAPI, with_context=False):
    serializer = PhotosetSerializer()

    def retrieve(self, params, meta, slug, **kwargs):
        photoset = Photoset.objects(slug=slug).first()

        if not photoset:
            raise falcon.HTTPNotFound()

        return photoset


class PhotosetsResource(ListAPI, PaginatedMixin, with_context=False):
    serializer = PhotosetSerializer()
    order = StringParam('field to order photosets by')

    def list(self, params, meta):
        photosets = Photoset.objects.order_by(params.get('order'))

        paginated_photos = photosets.skip(
            params['page'] * params['page_size']
        ).limit(params['page_size'])

        if photosets.count() > (params['page'] + 1) * params['page_size']:
            meta['has_more'] = True
        else:
            meta['has_more'] = False

        self.add_pagination_meta(params, meta)

        return paginated_photos
