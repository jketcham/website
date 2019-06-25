import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Meta from '../Meta';
import './ListItem.module.css';

const ListItem = ({
  item,
  ItemsURL,
  ItemURL,
}) => {
  const { id, name } = item;
  const Url = new ItemURL(item);

  return (
    <article className="h-entry" styleName="article" key={id}>
      <header>
        <h3 className="p-name">
          <Link className="u-url" to={Url.serialize()}>
            {name}
          </Link>
        </h3>
        <Meta item={item} AppURL={ItemsURL} />
      </header>
    </article>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  ItemsURL: PropTypes.func.isRequired,
  ItemURL: PropTypes.func.isRequired,
};

export default ListItem;
