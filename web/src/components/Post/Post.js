/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import PostsURL from '../../urls/PostsURL';
import Page from '../Page';
import Meta from '../Meta';
import './Post.module.css';

const Post = ({ post }) => (
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

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
