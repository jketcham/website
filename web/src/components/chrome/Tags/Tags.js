import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Tags.module.css';

const Tags = ({ items, AppURL, direction }) => (
  <ul styleName="tags" data-direction={direction}>
    {items.map(tag => (
      <li key={tag}>
        <Link
          rel="tag"
          className="p-category"
          to={new AppURL({ tags: tag }).serialize()}
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
  AppURL: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
};

Tags.defaultProps = {
  direction: 'horizontal',
};

export default Tags;
