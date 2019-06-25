import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Root from './Root';
import HomePage from './pages/Home';
import PostsPage from './pages/Posts';
import PostPage from './pages/Post';
import PhotosPage from './pages/Photos';

const Router = () => (
  <BrowserRouter>
    <Root>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/blog" component={PostsPage} />
      <Route exact path="/blog/:slug" component={PostPage} />
      <Route exact path="/photos" component={PhotosPage} />
    </Root>
  </BrowserRouter>
);


export default hot(Router);
