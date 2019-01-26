import {
  branch,
  compose,
  lifecycle,
  renderNothing,
} from 'recompose';

const fetchPhotos = () => fetch('/api/photos')
  .then(response => response.json());

const enhance = compose(
  lifecycle({
    componentDidMount() {
      fetchPhotos().then(
        ({ content: photos }) => this.setState({ photos }),
      );
    },
  }),
  branch(
    ({ photos }) => !photos,
    renderNothing,
  ),
);

export default enhance;
