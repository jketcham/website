import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../../chrome/Pagination';
import useFetch from '../../../hooks/useFetch';
import Photo from './Photo';
import PhotosetList from './PhotosetList';
import './Photos.module.css';

const PhotosPage = ({ location }) => {
  const { data: { meta, content: photos }, isLoading, isError } = useFetch(
    `/api/photos${location.search}`,
    { data: { meta: {}, content: [] } },
  );

  return (
    <div>
      <header styleName="header">
        <section>
          <h1>
            Photos
          </h1>
        </section>
        <PhotosetList />
      </header>
      <div styleName="container">
        <Pagination
          next={meta.next}
          prev={meta.prev}
        />
        {photos.map(photo => <Photo key={photo.filename} photo={photo} />)}
        {isLoading && photos.length === 0 && (
          <div styleName="center">
            Loading...
          </div>
        )}
        {!isLoading && !isError && photos.length === 0 && (
          <div styleName="center">
            Looks like there&apos;s nothing here
          </div>
        )}
        {isError && (
          <div styleName="center">
            Woops, something ain&apos;t right. Try again in a bit.
          </div>
        )}
        <Pagination
          next={meta.next}
          prev={meta.prev}
        />
      </div>
    </div>
  );
};

PhotosPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PhotosPage;
