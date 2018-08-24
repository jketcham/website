import React from 'react';

import { navBar, navBarHeader, navBarList } from './nav-bar.css';

const Navbar = () => (
  <div className={navBar}>
    <h3 className={navBarHeader}>jack ketcham</h3>
    <ul className={navBarList}>
      <li><a href="/posts">posts</a></li>
      <li><a href="/photos">photos</a></li>
    </ul>
  </div>
);

export default Navbar;
