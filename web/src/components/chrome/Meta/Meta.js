import React from 'react';
import PropTypes from 'prop-types';

import Tags from '../Tags';
import './Meta.module.css';

const Meta = ({ item, AppURL }) => {
  const date = new Date(item.published);

  return (
    <div styleName="meta">
      <time
        dateTime={date}
        title={date.toISOString()}
        className="dt-published"
        styleName="time"
      >
        {date.toDateString()}
      </time>
      <Tags items={item.category} AppURL={AppURL} />
    </div>
  );
};

Meta.propTypes = {
  item: PropTypes.object.isRequired,
  AppURL: PropTypes.func.isRequired,
};

export default Meta;
