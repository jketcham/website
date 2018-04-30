import React from 'react';

import { navBar, navBarHeader } from './nav-bar.css';
import { listInline } from '../shared.css';

const Navbar = () => (
  <div className={navBar}>
    <h3 className={navBarHeader}>jack ketcham</h3>
    <ul className={listInline}>
      <li><a href="#about">about</a></li>
      <li><a href="#photos">photos</a></li>
      <li><a href="#blog">blog</a></li>
    </ul>
  </div>
);

export default Navbar;
