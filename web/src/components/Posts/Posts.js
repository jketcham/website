import React from 'react';
import PropTypes from 'prop-types';

import PostsURL from '../../urls/PostsURL';
import PostURL from '../../urls/PostURL';
import Page from '../Page';
import ListItem from '../ListItem';
import TagsSidebar from './TagsSidebar';
import './Posts.module.css';

const Posts = ({ posts }) => (
  <Page>
    <div styleName="content">
      <div styleName="posts">
        <section>
          <h1 styleName="title">
            Blog
          </h1>
        </section>
        {posts.map(post => (
          <ListItem
            type="post"
            item={post}
            ItemURL={PostURL}
            ItemsURL={PostsURL}
            key={post.id}
          />
        ))}
      </div>
      <TagsSidebar />
    </div>
  </Page>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
