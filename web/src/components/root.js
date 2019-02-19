import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import './root.module.css';


const Root = ({ children }) => (
  <div>
    <NavBar />
    <div>
      {children}
    </div>
  </div>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
