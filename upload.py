import os
import sys

from PIL import Image
from PIL.ExifTags import TAGS
from mongoengine import connect
from dotenv import load_dotenv

from website.models import Photo


# Load dot environment file config
load_dotenv('.env')

# TODO: Eventually have sizes like: [100, 400, 800, 1024, 1600, 2048]
FILE_WIDTHS = [1024, 1600, 2048]
DESTINATION = os.getenv('PHOTO_DESTINATION')


def init():
    # Connect to database
    connect('website', host=os.getenv('MONGO_HOST'), port=int(os.getenv('MONGO_PORT', '27017')),
            username=os.getenv('MONGO_USER'), password=os.getenv('MONGO_PASS'),
            authentication_source='admin')


def photo_is_new(entry):
    photo = Photo.objects(filename=entry.name).first()

    if not photo:
        return True

    # TODO: Handle updating photos
    # Check if the file was modified after the photo in the database
    # if entry.stat().st_mtime > photo.last_modified:
    #     return True

    return False


def main():
    args = sys.argv

    if len(args) == 1:
        print('A path is required')
        return -1

    path = args[1]

    init()

    # Check each file at given path
    for entry in os.scandir(path):
        try:
            if entry.is_dir() or not entry.name.endswith('.jpg'):
                continue
        except OSError as error:
            print('Error calling is_dir():', error, entry.name)
            continue

        file_extension = entry.name.split('.')[-1]
        file_name = entry.name.split('.')[0]

        # TODO: Handle updating photos
        if not photo_is_new(entry):
            print('Photo not new', entry.name)
            continue

        # Open the image file
        image = Image.open(entry.path)

        # Extract the EXIF tags to a dictionary
        metadata = {
            TAGS[k]: v
            for k, v in image._getexif().items()
                if k in TAGS
        }

        files = []

        # Create each version of the image
        for width in FILE_WIDTHS:
            if image.width <= width:
                continue

            name = "{}-{}.{}".format(file_name, width, file_extension)
            destination = os.path.join(DESTINATION, name)

            print('resizing', name)

            # Resize using ImageMagick
            os.system("convert -strip {} -resize {} {}".format(entry.path, width, destination))

            files.append({'size': width, 'path': destination, 'filename': name})

        # Create original size of the image
        original_filename = "{}-original.{}".format(file_name, file_extension)
        original_destination = os.path.join(DESTINATION, original_filename)
        image.save(original_destination)
        files.append({'path': original_destination, 'filename': original_filename})

        # Save Photo doc
        photo_doc = Photo(filename=entry.name, metadata=metadata, files=files,
                          photo_last_modified=entry.stat().st_mtime)

        try:
            photo_doc.save()
        except Exception as error:
            print('Error saving Photo document!', error, entry.name)

    print('Ding!')


if __name__ == '__main__':
    main()
