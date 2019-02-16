from datetime import datetime

from mongoengine import (
    BooleanField,
    DateTimeField,
    DictField,
    Document,
    EmbeddedDocumentField,
    IntField,
    ListField,
    StringField,
    queryset_manager,
)


class PostStatus(object):
    published = 'published'
    draft = 'draft'

    values = [published, draft]


class ContentType(object):
    html = 'html'
    plaintext = 'plaintext'

    values = [html, plaintext]


class Post(Document):
    meta = {
        'collection': 'posts',
        'indexes': [
            {
                'fields': ['slug'],
                'unique': True,
            },
            'category',
        ],
    }

    name = StringField()
    slug = StringField(required=True, unique=True)
    content = StringField(required=True)
    content_type = StringField(choices=ContentType.values)
    type = StringField(required=True, default='entry')
    category = ListField(StringField())
    location = StringField()
    syndication = ListField(StringField())

    views = IntField(default=0)
    status = StringField(choices=PostStatus.values)
    deleted = BooleanField(default=False)

    created = DateTimeField(default=datetime.now())
    published = DateTimeField()
    updated = DateTimeField()
    post_meta = DictField()

    @queryset_manager
    def live_posts(self, queryset):
        return queryset.filter(deleted=False, status=PostStatus.published)
