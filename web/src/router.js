import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Root from './components/root';
import HomePage from './components/Home';
import PostsPage from './components/Posts';
import PostPage from './components/Post';
import PhotosPage from './components/Photos';

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
