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

    name = StringField(required=True)
    slug = StringField(required=True, unique=True)
    content = StringField(required=True)
    type = StringField(required=True, default='entry')
    category = ListField(StringField())
    location = StringField()
    syndication = ListField(StringField())

    views = IntField(default=0)
    public = BooleanField(default=False)
    deleted = BooleanField(default=False)

    published = DateTimeField(required=True)
    updated = DateTimeField(required=True)

    author = EmbeddedDocumentField(EmbeddedPerson)
