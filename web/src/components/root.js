import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './nav-bar';
import './root.module.css';


const Root = ({ children }) => (
  <div styleName="container">
    <NavBar />
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
