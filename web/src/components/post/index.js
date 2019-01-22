import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  compose,
  defaultProps,
  lifecycle,
  branch,
  renderNothing,
} from 'recompose';

import style from './post.css';


const fetchPost = slug => fetch(`/api/posts?slug=${slug}`)
  .then(response => response.json());

const enhance = compose(
  defaultProps({
    post: null,
  }),
  lifecycle({
    componentDidMount() {
      const { match: { params: { slug } } } = this.props;
      fetchPost(slug).then(
        post => this.setState({ post }),
      );
    },
  }),
  branch(
    ({ post }) => !post,
    renderNothing,
  ),
);

const Post = ({ post }) => (
  <div className={style.page}>
    <header>
      <div>
        <h2>
          {post.title}
        </h2>
      </div>
      <div className={style['post-date']}>
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

export default enhance(Post);
