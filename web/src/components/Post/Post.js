/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../hooks/useFetch';
import PostsURL from '../../urls/PostsURL';
import Page from '../Page';
import Meta from '../Meta';
import './Post.module.css';

const Post = ({ match: { params: { slug } } }) => {
  const { data, isLoading, isError } = useFetch(`/api/posts?slug=${slug}`, {
    isLoading: true,
    data: {},
  });
  const post = data;

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        Woops, something ain&apos;t right. Try again in a bit.
      </div>
    );
  }

  if (Object.keys(post).length === 0) {
    return (
      <div>
        Woops, there&apos;s nothing here actually.
      </div>
    );
  }

  return (
    <Page>
      <article className="h-entry" styleName="article">
        <header styleName="header">
          <h1 className="p-name">
            {post.name}
          </h1>
          <Meta item={post} AppURL={PostsURL} />
        </header>
        <section
          className="e-content"
          styleName="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Page>
  );
};

Post.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Post;
