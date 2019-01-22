import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Root from './components/root';
import HomePage from './components/home';
import PostsPage from './components/posts';
import PostPage from './components/post';
import PhotosPage from './components/photos';

const router = (
  <Router>
    <Root>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/blog" component={PostsPage} />
      <Route exact path="/blog/:slug" component={PostPage} />
      <Route exact path="/photos" component={PhotosPage} />
    </Root>
  </Router>
);

export default router;
