/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import PostsUrl from '../../urls/PostsUrl';
import PostUrl from '../../urls/PostUrl';
import ListItem from '../ListItem';
import './Posts.module.css';

const Posts = ({ posts }) => (
  <div styleName="page">
    {posts.map(post => (
      <ListItem
        type="post"
        item={post}
        ItemUrl={PostUrl}
        ItemsUrl={PostsUrl}
        key={post.id}
      />
    ))}
  </div>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
