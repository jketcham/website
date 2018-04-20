from mongoengine import EmbeddedDocument, StringField


class EmbeddedPerson(EmbeddedDocument):
    name = StringField(required=True)
