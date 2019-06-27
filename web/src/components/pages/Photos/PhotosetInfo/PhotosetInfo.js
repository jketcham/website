import React from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../../../hooks/useFetch';
import './PhotosetInfo.module.css';

const PhotosetInfo = ({ slug }) => {
  const { data: { content: photoset }, isLoading, isError } = useFetch(
    `/api/photosets/${slug}`,
    { data: { content: {} } },
  );

  if (isLoading || isError) {
    return null;
  }

  return (
    <section styleName="photoset">
      <p>
        {photoset.description ? photoset.description : (
          <i>
            A myserious photoset without a description...
          </i>
        )}
      </p>
    </section>
  );
};

PhotosetInfo.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default PhotosetInfo;
