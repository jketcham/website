import React from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../hooks/useFetch';
import Page from '../Page';
import TagsSidebar from './TagsSidebar';
import PostList from './PostList';
import './Posts.module.css';

const Posts = ({ location }) => {
  const { data, isLoading, isError } = useFetch(
    `/api/posts${location.search}`,
    { isLoading: true, data: { results: [] } },
  );

  return (
    <Page>
      <div styleName="content">
        <div styleName="posts">
          <section>
            <h1 styleName="title">
              Blog
            </h1>
          </section>
          <PostList
            posts={data.results}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <TagsSidebar />
      </div>
    </Page>
  );
};

Posts.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Posts;
