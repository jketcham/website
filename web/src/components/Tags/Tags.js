import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Tags.module.css';

const Tags = ({ items, Url }) => (
  <ul styleName="tags">
    {items.map(tag => (
      <li key={tag}>
        <Link
          rel="tag"
          className="p-category"
          to={new Url({ tags: tag }).serialize()}
        >
          #
          {tag}
        </Link>
      </li>
    ))}
  </ul>
);

Tags.propTypes = {
  items: PropTypes.array.isRequired,
  Url: PropTypes.func.isRequired,
};

export default Tags;
