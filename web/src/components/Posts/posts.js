/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Tags from '../Tags';
import './posts.module.css';

const Posts = ({ posts }) => (
  <div styleName="page">
    {posts.map(post => (
      <article className="h-entry" styleName="article" key={post.id}>
        <header>
          <time className="dt-published" dateTime={post.published}>
            {new Date(post.published).toDateString()}
          </time>
          <h4 className="p-name">
            <Link className="u-url" to={`/blog/${post.slug}`}>
              {post.name}
            </Link>
          </h4>
          <Tags items={post.category} />
          {post.location && (
            <div className="p-location">
              {post.location}
            </div>
          )}
        </header>
        <section
          className="e-content"
          dangerouslySetInnerHTML={{
            __html: post.content.slice(0, post.content.indexOf('</p>')),
          }}
        />
        <a href={`/blog/${post.slug}`}>
          Read more
        </a>
      </article>
    ))}
  </div>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
