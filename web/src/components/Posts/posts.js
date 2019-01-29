import React from 'react';
import PropTypes from 'prop-types';

import './posts.module.css';

const PostsPage = ({ posts }) => (
  <div styleName="page">
    {posts.map(post => (
      <div styleName="postItem" key={post.id}>
        <header>
          <time dateTime={post.published}>
            {new Date(post.published).toDateString()}
          </time>
          <h4>
            <a href={`/blog/${post.slug}`}>
              {post.title}
            </a>
          </h4>
          <ul styleName="tags">
            {post.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
        </header>
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