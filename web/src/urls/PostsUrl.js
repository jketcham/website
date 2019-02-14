import BaseUrl from './BaseUrl';

const params = {
  page: String,
  tags: String,
};

export default class PostsUrl extends BaseUrl {
  constructor(input) {
    super(input, '/blog', params);
  }
}
