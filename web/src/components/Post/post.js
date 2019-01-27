import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
        {moment(post.published).format('ll')}
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
