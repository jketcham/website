import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Root from './components/root';
import HomePage from './components/home';


const router = (
  <Router>
    <Root>
      <Route exact path="/" component={HomePage} />
    </Root>
  </Router>
);


export default router;
