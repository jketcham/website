import React from 'react';

import useFetch from '../../hooks/useFetch';
import './photos.module.css';

const PhotosPage = () => {
  const { data: { content: photos }, isLoading, isError } = useFetch(
    '/api/photos',
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
};

export default PhotosPage;
