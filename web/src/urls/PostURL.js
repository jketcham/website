import BaseURL from './BaseURL';

const params = {
  slug: String,
};

export default class PostURL extends BaseURL {
  constructor(input) {
    super(input, '/blog/{slug}', params);
  }
}
