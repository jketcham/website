import React from 'react';

import './home.module.css';

const HomePage = () => (
  <div styleName="page">
    <h1>Hi</h1>
    <div>
      <p>
        I&apos;m Jack, a software engineer living in Tempe, Arizona.
      </p>
      <ul>
        <li>
          <a
            href="https://github.com/jketcham"
            rel="me noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/_jket"
            rel="me noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://flickr.com/photos/jackketcham"
            rel="me noopener noreferrer"
            target="_blank"
          >
            Flickr
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default HomePage;
