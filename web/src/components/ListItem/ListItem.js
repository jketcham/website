import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BaseUrl from '../../urls';
import Tags from '../Tags';
import './ListItem.module.css';

const ListItem = ({
  id,
  url,
  name,
  date,
  location,
  category,
  ItemsUrl,
}) => (
  <article className="h-entry" styleName="article" key={id}>
    <header>
      <h3 className="p-name">
        <Link className="u-url" to={url.serialize()}>
          {name}
        </Link>
      </h3>
      <div styleName="meta">
        <time
          className="dt-published"
          dateTime={date}
          title={date.toISOString()}
        >
          {date.toDateString()}
        </time>
        <Tags items={category} Url={ItemsUrl} />
        {location && (
          <div className="p-location">
            {location}
          </div>
        )}
      </div>
    </header>
  </article>
);

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.instanceOf(BaseUrl).isRequired,
  ItemsUrl: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  category: PropTypes.array.isRequired,
  location: PropTypes.string,
};

ListItem.defaultProps = {
  location: '',
};

export default ListItem;
