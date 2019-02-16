import React from 'react';
import PropTypes from 'prop-types';

import PostsUrl from '../../urls/PostsUrl';
import PostUrl from '../../urls/PostUrl';
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
          ItemUrl={PostUrl}
          ItemsUrl={PostsUrl}
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
