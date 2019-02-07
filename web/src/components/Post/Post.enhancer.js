import {
  compose,
  defaultProps,
  lifecycle,
  branch,
  renderNothing,
} from 'recompose';

const fetchPost = slug => fetch(`/api/posts?slug=${slug}`)
  .then(response => response.json());

const enhance = compose(
  defaultProps({
    post: null,
  }),
  lifecycle({
    componentDidMount() {
      const { match: { params: { slug } } } = this.props;
      fetchPost(slug).then(
        post => this.setState({ post }),
      );
    },
  }),
  branch(
    ({ post }) => !post,
    renderNothing,
  ),
);

export default enhance;
