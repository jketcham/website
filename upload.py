import os
import sys

from PIL import Image
from PIL.ExifTags import TAGS

from mongoengine import connect

from website.models import Photo

def main():
    args = sys.argv

    if len(args) == 1:
        print('A path is required')
        return -1

    path = args[1]

    connect('website')

    for filename in os.listdir(path):
        if not filename.endswith('.jpg'):
            continue

        print('Uploading', filename)

        filepath = os.path.join(path, filename)
        image = Image.open(filepath)
        exif = {
            TAGS[k]: v
            for k, v in image._getexif().items()
                if k in TAGS
        }

        photo_doc = Photo(title=filename, image_metadata=exif)
        photo_file = open(filepath, 'rb')
        photo_doc.image.put(photo_file, content_type="image/jpeg")

        try:
            photo_doc.save()
        except:
            print('skipping duplicate')
            photo_doc.image.delete()

    print('ding!')


if __name__ == '__main__':
    main()
