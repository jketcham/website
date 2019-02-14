import AppUrl from './index';

const params = {
  page: String,
  tags: String,
};

export default class PostsUrl extends AppUrl {
  constructor(input) {
    super(input, '/blog', params);
  }
}
