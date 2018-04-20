from datetime import datetime

from mongoengine import (
    IntField,
    BooleanField,
    DateTimeField,
    Document,
    EmbeddedDocumentField,
    StringField,
    ListField,
)

from .person import EmbeddedPerson

POST_TYPE = ('blog', 'photostory')


class Post(Document):
    meta = {
        'collection': 'posts',
        'indexes': [
            {
                'fields': ['slug'],
                'unique': True,
            },
        ],
    }

    title = StringField(required=True)
    slug = StringField(required=True)
    content = StringField(required=True)
    post_type = StringField(required=True, choices=POST_TYPE, default='blog')
    tags = ListField(StringField())

    views = IntField(default=0)
    public = BooleanField(default=False)

    created = DateTimeField(required=True)
    published = DateTimeField(required=True)
    updated = DateTimeField(required=True)

    author = EmbeddedDocumentField(EmbeddedPerson)
