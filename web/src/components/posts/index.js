import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  branch,
  compose,
  lifecycle,
  renderNothing,
} from 'recompose';

import { page, postItem } from './style.css';

const fetchPosts = () =>
  fetch('/api/posts')
    .then(response => response.json());

const enhance = compose(
  lifecycle({
    componentDidMount() {
      fetchPosts().then(
        ({ results: posts }) => this.setState({ posts }),
      );
    },
  }),
  branch(
    ({ posts }) => !posts,
    renderNothing,
  ),
);

const PostsPage = ({ posts }) => (
  <div className={page}>
    {posts.map(post => (
      <div className={postItem} key={post.id}>
        <span>
          {moment(post.published).format('ll')}
        </span>
        <h4>
          <a href={`/blog/${post.slug}`}>
            {post.title}
          </a>
        </h4>
        <p>
          {post.content.slice(0, 180)}...
        </p>
      </div>
    ))}
  </div>
);

PostsPage.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default enhance(PostsPage);
