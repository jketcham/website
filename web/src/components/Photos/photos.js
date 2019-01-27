import React from 'react';
import PropTypes from 'prop-types';

import './photos.module.css';

const PhotosPage = ({ photos }) => (
  <div styleName="page">
    {photos.map(photo => (
      <div styleName="photoItem" key={photo.id}>
        <img src={`/api/photos/${photo.id}`} alt={photo.title} />
        <div>
          {photo.image_metadata.DateTimeOriginal}
        </div>
      </div>
    ))}
  </div>
);

PhotosPage.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default PhotosPage;
