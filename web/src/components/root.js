import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './nav-bar';
import { appContainer } from './root.css';


const Root = ({ children }) => (
  <div className={appContainer}>
    <NavBar />
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Root;
