import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';

const enhance = compose(
  withRouter,
  withProps(
    ({ location }) => ({
      isActive: path => location.pathname.startsWith(path),
    }),
  ),
);

export default enhance;
