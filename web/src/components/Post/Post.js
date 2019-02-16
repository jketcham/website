/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import PostsUrl from '../../urls/PostsUrl';
import Page from '../Page';
import Tags from '../Tags';
import './Post.module.css';

const Post = ({ post }) => (
  <Page>
    <article className="h-entry" styleName="article">
      <header styleName="header">
        <h1 className="p-name">
          {post.name}
        </h1>
        <div styleName="row">
          <time
            dateTime={post.published}
            className="dt-published"
            styleName="time"
          >
            {new Date(post.published).toDateString()}
          </time>
          <Tags items={post.category} Url={PostsUrl} />
        </div>
      </header>
      <section
        className="e-content"
        styleName="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  </Page>
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
