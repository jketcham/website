import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import useFetch from '../../../../hooks/useFetch';
import './PhotosetList.module.css';

const PhotosetList = ({ current, ...props }) => {
  const { data: { content: photosets }, isLoading, isError } = useFetch(
    '/api/photosets',
    { data: { content: [] } },
  );

  if (isLoading || isError || (!isLoading && photosets.length === 0)) {
    return null;
  }

  return (
    <div styleName="photoset-list">
      <ul {...props} styleName="photosets">
        {photosets.map(({ slug, name }) => (
          <li key={slug} styleName={slug === current ? 'active' : ''}>
            <Link to={`?photoset=${slug}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

PhotosetList.propTypes = {
  current: PropTypes.string,
};

PhotosetList.defaultProps = {
  current: null,
};

export default PhotosetList;
