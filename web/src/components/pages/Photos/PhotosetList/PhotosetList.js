import React from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../../../../hooks/useFetch';
import './PhotosetList.module.css';

const PhotosetList = ({ ...props }) => {
  const { data: { content: photosets }, isLoading, isError } = useFetch(
    '/api/photosets',
    { data: { content: [] } },
  );

  if (isLoading || isError || (!isLoading && photosets.length === 0)) {
    return null;
  }

  return (
    <div>
      <h4>
        Photo sets:
      </h4>
      <ul {...props} styleName="photosets">
        {photosets.map(photoset => (
          <li key={photoset.slug}>
            <Link to={`?tags=${photoset.tags.join(',')}`}>
              {photoset.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotosetList;
