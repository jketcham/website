/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import Tags from '../Tags';
import './Post.module.css';

const Post = ({ post }) => (
  <article className="h-entry" styleName="article">
    <header styleName="header">
      <h1 className="p-name">
        {post.name}
      </h1>
      <div styleName="row">
        <time
          dateTime={post.published}
          className="dt-published"
          styleName="time"
        >
          {new Date(post.published).toDateString()}
        </time>
        <Tags items={post.category} />
      </div>
    </header>
    <section
      className="e-content"
      styleName="content"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  </article>
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
