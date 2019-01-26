import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './posts.module.css';

const PostsPage = ({ posts }) => (
  <div styleName="page">
    {posts.map(post => (
      <div styleName="postItem" key={post.id}>
        <span>
          {moment(post.published).format('ll')}
        </span>
        <h4>
          <a href={`/blog/${post.slug}`}>
            {post.title}
          </a>
        </h4>
        <p>
          {post.content.slice(0, 180)}
          ...
        </p>
      </div>
    ))}
  </div>
);

PostsPage.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsPage;
