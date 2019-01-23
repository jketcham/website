import React from 'react';

import { page, link } from './home.css';

const HomePage = () => (
  <div className={page}>
    <h1>Hi</h1>
    <div>
      <p>
        I&apos;m Jack, a software engineer living in Tempe, Arizona.
      </p>
      <ul>
        <li>
          <a href="https://github.com/jketcham" rel="me noopener" className={link}>
            GitHub
          </a>
        </li>
        <li>
          <a href="https://twitter.com/_jket" rel="me noopener" className={link}>
            Twitter
          </a>
        </li>
        <li>
          <a href="https://flickr.com/photos/jackketcham" rel="me noopener" className={link}>
            Flickr
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default HomePage;
