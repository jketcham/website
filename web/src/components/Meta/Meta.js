import React from 'react';
import PropTypes from 'prop-types';

import Tags from '../Tags';
import './Meta.module.css';

const Meta = ({ item, date, AppURL }) => (
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

Meta.propTypes = {
  item: PropTypes.object.isRequired,
  AppURL: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Meta;
