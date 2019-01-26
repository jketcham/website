import {
  branch,
  compose,
  lifecycle,
  renderNothing,
} from 'recompose';

const fetchPosts = () => fetch('/api/posts')
  .then(response => response.json());

const enhance = compose(
  lifecycle({
    componentDidMount() {
      fetchPosts().then(
        ({ results: posts }) => this.setState({ posts }),
      );
    },
  }),
  branch(
    ({ posts }) => !posts,
    renderNothing,
  ),
);

export default enhance;
