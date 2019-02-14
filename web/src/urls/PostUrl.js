import BaseUrl from './BaseUrl';

const params = {
  slug: String,
};

export default class PostUrl extends BaseUrl {
  constructor(input) {
    super(input, '/blog/{slug}', params);
  }
}
