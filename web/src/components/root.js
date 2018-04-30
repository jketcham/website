import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './nav-bar';


const Root = ({ children }) => (
  <div className="app-container">
    <NavBar />
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Root;
