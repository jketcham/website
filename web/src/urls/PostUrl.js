import AppUrl from './index';

const params = {
  slug: String,
};

export default class PostUrl extends AppUrl {
  constructor(input) {
    super(input, '/blog/{slug}', params);
  }
}
