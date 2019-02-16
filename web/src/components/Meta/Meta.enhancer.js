import { compose, withProps } from 'recompose';

export default compose(
  withProps(
    ({ item: { published } }) => ({
      date: new Date(published),
    }),
  ),
);
