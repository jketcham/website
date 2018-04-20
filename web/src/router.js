import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';

import App from './components/app';
import HomePage from './components/home-page';


const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={HomePage} />
      </App>
    </ConnectedRouter>
  </Provider>
);


export default router;
