import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Tags.module.css';

const Tags = ({ items }) => (
  <ul styleName="tags">
    {items.map(tag => (
      <li key={tag}>
        <Link rel="tag" className="p-category" to={`/blog?tags=${tag}`}>
          {tag}
        </Link>
      </li>
    ))}
  </ul>
);

Tags.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Tags;
