import React from 'react';
import PropTypes from 'prop-types';

import './Photo.module.css';

const Photo = ({ photo }) => {
  const datetime = photo.metadata.DateTimeOriginal;
  // FIXME: temporary, will be updated on backend
  const date = datetime.slice(0, 10).replace(/:/gi, '-');
  const time = datetime.slice(11);

  return (
    <div styleName="photo" key={photo.id}>
      <div>
        <picture>
          {photo.paths.slice(0, -1).map(({ path, size, filename }) => (
            <source media={`(max-width:${size}px)`} srcSet={`/api/photos/${filename}`} key={size} />
          ))}
          <img src={`/api/photos/${photo.paths.slice(-1)[0].filename}`} alt={photo.filename} />
        </picture>

        <section styleName="metadata">
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
    </div>
  );
};

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default Photo;
