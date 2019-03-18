import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import PostsURL from '../../urls/PostsURL';
import './nav-bar.module.css';

const ROUTES = [{
  label: 'blog',
  Url: PostsURL,
}];

const Navbar = ({ location: { pathname } }) => {
  function isActive(path) {
    return pathname.startsWith(path);
  }

  return (
    <div styleName="nav-bar">
      <h3 styleName="nav-bar-header">
        <Link to="/">
          jack ketcham
        </Link>
      </h3>
      <ul styleName="nav-bar-list">
        {ROUTES.map(({ label, Url }) => {
          const path = new Url().serialize();

          return (
            <li data-active={isActive(path)} key={label}>
              <Link to={path}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Navbar);
