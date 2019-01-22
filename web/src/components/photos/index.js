import React from 'react';
import PropTypes from 'prop-types';
import {
  branch,
  compose,
  lifecycle,
  renderNothing,
} from 'recompose';

import { page, photoItem } from './style.css';

const fetchPhotos = () =>
  fetch('/api/photos')
    .then(response => response.json());

const enhance = compose(
  lifecycle({
    componentDidMount() {
      fetchPhotos().then(
        ({ content: photos }) => this.setState({ photos }),
      );
    },
  }),
  branch(
    ({ photos }) => !photos,
    renderNothing,
  ),
);

const PhotosPage = ({ photos }) => (
  <div className={page}>
    {photos.map(photo => (
      <div className={photoItem} key={photo.id}>
        <img src={`/api/photos/${photo.id}`} alt={photo.title} />
      </div>
    ))}
  </div>
);

PhotosPage.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default enhance(PhotosPage);
