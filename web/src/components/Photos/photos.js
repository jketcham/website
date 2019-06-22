import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import './photos.module.css';

const PhotosetTags = ({ ...props }) => {
  const { data: { content: photosets }, isLoading, isError } = useFetch(
    '/api/photosets',
    { data: { content: [] } },
  );

  if (isLoading || isError) {
    return null;
  }

  return (
    <ul {...props} styleName="photoset-tags">
      {photosets.map(photoset => (
        <li key={photoset.slug}>
          <Link to={`?tags=${photoset.tags.join(',')}`}>
            {photoset.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Photo = ({ photo }) => {
  const datetime = photo.image_metadata.DateTimeOriginal;
  const date = datetime.slice(0, 10).replace(/:/gi, '-');
  const time = datetime.slice(11);

  return (
    <div styleName="photoItem" key={photo.id}>
      <img src={`/api/photos/${photo.id}`} alt={photo.title} />
      <section styleName="photoMetadata">
        <div>
          <small>
            {new Date(`${date}T${time}`).toLocaleString()}
          </small>
          {photo.tags.length > 0 && (
            <ul>
              {photo.tags.map(tag => (
                <li key={tag}>
                  <small>
                    {`#${tag}`}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
};

const PhotosPage = ({ location }) => {
  const { data: { content: photos }, isLoading, isError } = useFetch(
    `/api/photos${location.search}`,
    { data: { content: [] } },
  );

  if (isError) {
    return (
      <div>
        Woops, something ain&apos;t right. Try again in a bit.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div styleName="page">
      <header styleName="header">
        <div>
          <h4>
            Photo sets:
          </h4>
          <PhotosetTags />
        </div>
      </header>
      <div styleName="photos">
        {photos.map(photo => <Photo key={photo.title} photo={photo} />)}
      </div>
    </div>
  );
};

PhotosPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PhotosPage;
