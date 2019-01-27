import {
  branch,
  compose,
  defaultProps,
  lifecycle,
  renderComponent,
  renderNothing,
} from 'recompose';

import Empty from '../Empty';

const fetchPhotos = () => fetch('/api/photos')
  .then(response => response.json());

const enhance = compose(
  defaultProps({
    loading: true,
  }),
  lifecycle({
    componentDidMount() {
      fetchPhotos().then(
        ({ content: photos }) => this.setState({
          loading: false,
          photos,
        }),
      );
    },
  }),
  branch(
    ({ loading }) => !!loading,
    renderNothing,
  ),
  branch(
    ({ photos }) => photos === [],
    renderComponent(Empty),
  ),
);

export default enhance;
