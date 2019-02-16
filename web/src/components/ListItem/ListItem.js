import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BaseURL from '../../urls';
import Meta from '../Meta';
import './ListItem.module.css';

const ListItem = ({
  id,
  url,
  name,
  published,
  category,
  ItemsURL,
}) => (
  <article className="h-entry" styleName="article" key={id}>
    <header>
      <h3 className="p-name">
        <Link className="u-url" to={url.serialize()}>
          {name}
        </Link>
      </h3>
      <Meta item={{ published, category }} AppURL={ItemsURL} />
    </header>
  </article>
);

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  url: PropTypes.instanceOf(BaseURL).isRequired,
  ItemsURL: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
};

export default ListItem;
