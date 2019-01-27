import {
  branch,
  compose,
  defaultProps,
  lifecycle,
  renderComponent,
  renderNothing,
} from 'recompose';

import Empty from '../Empty';

const fetchPosts = () => fetch('/api/posts')
  .then(response => response.json());

const enhance = compose(
  defaultProps({
    loading: true,
  }),
  lifecycle({
    componentDidMount() {
      fetchPosts().then(
        ({ results: posts }) => this.setState({
          loading: false,
          posts,
        }),
      );
    },
  }),
  branch(
    ({ loading }) => !!loading,
    renderNothing,
  ),
  branch(
    ({ posts }) => !posts,
    renderComponent(Empty),
  ),
);

export default enhance;
