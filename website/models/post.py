from mongoengine import (
    BooleanField,
    DateTimeField,
    DictField,
    Document,
    EmbeddedDocumentField,
    IntField,
    ListField,
    StringField,
)


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

    name = StringField()
    slug = StringField(required=True, unique=True)
    content = StringField(required=True)
    type = StringField(required=True, default='entry')
    category = ListField(StringField())
    location = StringField()
    syndication = ListField(StringField())

    views = IntField(default=0)
    status = StringField()
    deleted = BooleanField(default=False)

    published = DateTimeField()
    updated = DateTimeField()
    post_meta = DictField()
