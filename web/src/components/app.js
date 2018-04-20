import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './nav';


const App = ({ children }) => (
  <div className="app-container">
    <NavBar />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default App;
