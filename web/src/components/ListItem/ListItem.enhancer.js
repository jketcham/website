import { compose, withProps } from 'recompose';

export default compose(
  withProps(
    ({ item, type, ItemURL }) => ({
      ...item,
      url: new ItemURL(item),
    }),
  ),
);
