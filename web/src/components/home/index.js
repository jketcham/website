import React from 'react';

import { page, link } from './home.css';

const HomePage = () => (
  <div className={page}>
    <h1>Hi</h1>
    <div>
      <p>I&apos;m Jack.</p>
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
          <a href="https://flickr.com/photos/jackketcham" rel="noopener" className={link}>
            Flickr
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default HomePage;
