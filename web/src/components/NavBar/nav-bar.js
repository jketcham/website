import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PostsURL from '../../urls/PostsURL';
import './nav-bar.module.css';

const Navbar = ({ isActive }) => (
  <div styleName="nav-bar">
    <h3 styleName="nav-bar-header">
      <Link to="/">
        jack ketcham
      </Link>
    </h3>
    <ul styleName="nav-bar-list">
      <li data-active={isActive('/blog')}>
        <Link to={new PostsURL().serialize()}>
          blog
        </Link>
      </li>
    </ul>
  </div>
);

Navbar.propTypes = {
  isActive: PropTypes.func.isRequired,
};

export default Navbar;
