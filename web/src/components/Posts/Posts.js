import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PostsURL from '../../urls/PostsURL';
import PostURL from '../../urls/PostURL';
import Page from '../Page';
import ListItem from '../ListItem';
import TagsSidebar from './TagsSidebar';
import './Posts.module.css';

function usePosts(query) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      const data = await fetch(`/api/posts${query}`);
      const { results } = await data.json();
      setPosts(results);
      setLoading(false);
    }

    getPosts();
  }, [query]);

  return [posts, loading];
}

const PostList = ({ posts, loading }) => {
  if (loading) {
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
  loading: PropTypes.bool.isRequired,
};

const Posts = ({ location }) => {
  const [posts, loading] = usePosts(location.search);

  return (
    <Page>
      <div styleName="content">
        <div styleName="posts">
          <section>
            <h1 styleName="title">
              Blog
            </h1>
          </section>
          <PostList posts={posts} loading={loading} />
        </div>
        <TagsSidebar />
      </div>
    </Page>
  );
};

Posts.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Posts;
