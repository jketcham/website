from datetime import datetime

from mongoengine import (
    BooleanField,
    DateTimeField,
    DictField,
    Document,
    IntField,
    ListField,
    PointField,
    StringField,
)


class Photo(Document):
    meta = {
        'collection': 'photos',
    }

    filename = StringField(required=True, unique=True)
    metadata = DictField()
    files = ListField(DictField())
    tags = ListField(StringField())
    public = BooleanField(default=True)
    created = DateTimeField(default=datetime.now)
    photo_last_modified = IntField()
