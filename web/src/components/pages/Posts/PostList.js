import React from 'react';
import PropTypes from 'prop-types';

import PostsURL from '../../../urls/PostsURL';
import PostURL from '../../../urls/PostURL';
import ListItem from '../../chrome/ListItem';

const PostList = ({ posts, isLoading, isError }) => {
  if (isError) {
    return (
      <div>
        Woops, something ain&apos;t right. Try again in a bit.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div>
        There is nothing here... yet.
      </div>
    );
  }

  return (
    posts.map(post => (
      <ListItem
        type="post"
        item={post}
        ItemURL={PostURL}
        ItemsURL={PostsURL}
        key={post.id}
      />
    ))
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default PostList;
