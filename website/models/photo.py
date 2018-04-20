from datetime import datetime

from mongoengine import (
    IntField,
    BooleanField,
    DateTimeField,
    DictField,
    ImageField,
    Document,
    EmbeddedDocument,
    ObjectIdField,
    ListField,
    StringField,
    PointField,
)


class Photo(Document):
    meta = {
        'collection': 'photos',
    }

    title = StringField(required=True)
    description = StringField()
    tags = ListField(StringField())
    location_title = StringField()
    location_coords = PointField()
    photo_collection = ObjectIdField()

    views = IntField(default=0)
    public = BooleanField(default=True)

    image = ImageField()
    image_metadata = DictField()

    date_uploaded = DateTimeField(default=datetime.now)
    date_created = DateTimeField()


class EmbeddedPhoto(EmbeddedDocument):
    id = ObjectIdField(required=True)

    def get(self):
        from website.models import Photo
        return Photo.objects(id=self.id)
