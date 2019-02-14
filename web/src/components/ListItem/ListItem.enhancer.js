import { compose, withProps } from 'recompose';

export default compose(
  withProps(
    ({ item, type, ItemUrl }) => ({
      ...item,
      url: new ItemUrl(item),
      date: new Date(item.published),
    }),
  ),
);
