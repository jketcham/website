import React from 'react';
import PropTypes from 'prop-types';

import './post.module.css';

const Post = ({ post }) => (
  <div styleName="page">
    <header>
      <div>
        <h2>
          {post.title}
        </h2>
      </div>
      <div styleName="post-date">
        {new Date(post.published).toDateString()}
      </div>
    </header>
    <p>
      {post.content}
    </p>
  </div>
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
