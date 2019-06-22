import BaseURL from './BaseURL';

const params = {
  page: String,
  tags: String,
};

export default class PhotosURL extends BaseURL {
  constructor(input) {
    super(input, '/photos', params);
  }
}
