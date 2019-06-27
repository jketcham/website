from datetime import datetime

from mongoengine import (
    BooleanField,
    DateTimeField,
    Document,
    ListField,
    ObjectIdField,
    StringField,
    queryset_manager,
)


class Photoset(Document):
    meta = {
        'collection': 'photoset',
        'indexes': [
            {
                'fields': ['slug'],
                'unique': True,
            },
        ],
    }

    name = StringField()
    slug = StringField(required=True, unique=True)
    description = StringField()
    photos = ListField(ObjectIdField())
    public = BooleanField(default=True)
    created = DateTimeField(default=datetime.now())
    updated = DateTimeField()
