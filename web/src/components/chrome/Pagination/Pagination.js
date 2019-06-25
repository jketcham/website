import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Pagination.module.css';

const Pagination = ({
  next,
  prev,
}) => (
  <div styleName="pagination">
    {prev && (
      <Link to={`/photos?${prev}`} data-to="prev">
        previous
      </Link>
    )}
    {next && (
      <Link to={`/photos?${next}`} data-to="next">
        next
      </Link>
    )}
  </div>
);

Pagination.propTypes = {
  next: PropTypes.string,
  prev: PropTypes.string,
};

Pagination.defaultProps = {
  next: null,
  prev: null,
};

export default Pagination;
