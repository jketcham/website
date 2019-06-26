from datetime import datetime

from mongoengine import (
    BooleanField,
    DateTimeField,
    DictField,
    Document,
    IntField,
    ListField,
    ObjectIdField,
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
    photosets = ListField(ObjectIdField())
    tags = ListField(StringField())
    public = BooleanField(default=True)
    last_modified = IntField()
    date_uploaded = DateTimeField(default=datetime.now)
