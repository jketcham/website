import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Root from './components/root';
import HomePage from './components/home';
import PostsPage from './components/posts';


const router = (
  <Router>
    <Root>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/posts" component={PostsPage} />
    </Root>
  </Router>
);


export default router;
