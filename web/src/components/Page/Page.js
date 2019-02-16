import React from 'react';
import PropTypes from 'prop-types';

import { container } from './Page.module.css';

const Page = ({ children, styleName, ...props }) => (
  <div className={`${container} ${styleName}`} {...props}>
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  styleName: PropTypes.string,
};

Page.defaultProps = {
  styleName: '',
};

export default Page;
