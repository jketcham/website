import React from 'react';

import styles from './nav-bar.css';


const Navbar = () => (
  <div className="nav-bar">
    <h3>jack ketcham</h3>
    <ul className="list-inline">
      <li><a href="#about">about</a></li>
      <li><a href="#photos">photos</a></li>
      <li><a href="#blog">blog</a></li>
    </ul>
  </div>
);


export default Navbar;
