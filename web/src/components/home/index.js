import React, { Component } from 'react';

import { link } from '../shared.css';

class HomePage extends Component {
  renderAbout() {
    return (
      <div>
        <p>Hey, I&apos;m Jack, welcome to my internet website.</p>
      </div>
    );
  }

  renderLinks() {
    return (
      <div>
        <p>You can find me at these fine websites:</p>
        <ul>
          <li>
            <a href="https://github.com/jketcham" rel="noopener" className={link}>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://twitter.com/_jket" rel="noopener" className={link}>
              Twitter
            </a>
          </li>
          <li>
            <a href="https://keybase.io/jket" rel="noopener" className={link}>
              Keybase
            </a>
          </li>
          <li>
            <a href="https://flickr.com/photos/jackketcham" rel="noopener" className={link}>
              Flickr
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.renderAbout()}
        </div>
        <div>
          {this.renderLinks()}
        </div>
      </div>
    );
  }
}

export default HomePage;
