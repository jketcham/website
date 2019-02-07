/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Tags from '../Tags';
import './Posts.module.css';

const Posts = ({ posts }) => (
  <div styleName="page">
    {posts.map(post => (
      <article className="h-entry" styleName="article" key={post.id}>
        <header>
          <h3 className="p-name">
            <Link className="u-url" to={`/blog/${post.slug}`}>
              {post.name}
            </Link>
          </h3>
          <div>
            <time className="dt-published" dateTime={post.published}>
              {new Date(post.published).toDateString()}
            </time>
            <Tags items={post.category} />
            {post.location && (
              <div className="p-location">
                {post.location}
              </div>
            )}
          </div>
        </header>
      </article>
    ))}
  </div>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
