import {
  branch,
  compose,
  defaultProps,
  lifecycle,
  renderComponent,
  renderNothing,
} from 'recompose';

import Empty from '../Empty';

const fetchPosts = queryParams => fetch(`/api/posts${queryParams}`)
  .then(response => response.json());

const enhance = compose(
  defaultProps({
    loading: true,
  }),
  lifecycle({
    componentDidMount() {
      fetchPosts(this.props.location.search).then(
        ({ results: posts }) => this.setState({
          loading: false,
          posts,
        }),
      );
    },
    componentDidUpdate(prevProps) {
      if (prevProps.location === this.props.location) {
        return;
      }

      fetchPosts(this.props.location.search).then(
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
    ({ posts }) => posts.length === 0,
    renderComponent(Empty),
  ),
);

export default enhance;
