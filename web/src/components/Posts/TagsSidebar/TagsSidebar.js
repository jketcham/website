import React from 'react';
import PropTypes from 'prop-types';

import PostsURL from '../../../urls/PostsURL';
import Tags from '../../Tags';
import './TagsSidebar.module.css';

const TagsSidebar = ({ tags }) => (
  <div styleName="tags">
    <section>
      <h2>
        Tags
      </h2>
    </section>
    <Tags items={tags} AppURL={PostsURL} direction="vertical" />
  </div>
);

TagsSidebar.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagsSidebar;
