import React from 'react';
import PropTypes from 'prop-types';

import PostsURL from '../../urls/PostsURL';
import PostURL from '../../urls/PostURL';
import Page from '../Page';
import ListItem from '../ListItem';
import './Posts.module.css';

const Posts = ({ posts }) => (
  <Page>
    <section>
      <h1 styleName="title">
        Blog
      </h1>
    </section>
    <div styleName="posts">
      {posts.map(post => (
        <ListItem
          type="post"
          item={post}
          ItemUrl={PostURL}
          ItemsUrl={PostsURL}
          key={post.id}
        />
      ))}
    </div>
  </Page>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
