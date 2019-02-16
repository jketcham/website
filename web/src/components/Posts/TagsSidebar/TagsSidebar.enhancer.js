import {
  branch,
  compose,
  defaultProps,
  lifecycle,
  renderComponent,
  renderNothing,
} from 'recompose';
import { withRouter } from 'react-router-dom';

import Empty from '../../Empty';

const fetchTags = queryParams => fetch(`/api/tags${queryParams}`).then(response => response.json());

const enhance = compose(
  withRouter,
  defaultProps({
    loading: true,
  }),
  lifecycle({
    componentDidMount() {
      fetchTags(this.props.location.search).then(
        ({ results: tags }) => this.setState({
          loading: false,
          tags,
        }),
      );
    },
    componentDidUpdate(prevProps) {
      if (prevProps.location === this.props.location) {
        return;
      }

      fetchTags(this.props.location.search).then(
        ({ results: tags }) => this.setState({
          loading: false,
          tags,
        }),
      );
    },
  }),
  branch(
    ({ loading }) => !!loading,
    renderNothing,
  ),
  branch(
    ({ tags }) => tags.length === 0,
    renderComponent(Empty),
  ),
);

export default enhance;
