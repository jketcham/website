import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';

import { active, navBar, navBarHeader, navBarList } from './nav-bar.css';

const enhance = compose(
  withRouter,
  withProps(
    ({ location }) => ({
      isActive: path => location.pathname.startsWith(path),
    }),
  ),
);

const Navbar = ({ isActive }) => (
  <div className={navBar}>
    <h3 className={navBarHeader}>
      <a href="/">jack ketcham</a>
    </h3>
    <ul className={navBarList}>
      <li
        className={isActive('/blog') ? active : ''}
      >
        <a href="/blog">blog</a>
      </li>
      <li
        className={isActive('/photos') ? active : ''}
      >
        <a href="/photos">photos</a>
      </li>
    </ul>
  </div>
);

Navbar.propTypes = {
  isActive: PropTypes.func.isRequired,
};

export default enhance(Navbar);
