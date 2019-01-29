/* eslint-disable max-len */
import React from 'react';

import './home.module.css';

const HomePage = () => (
  <div styleName="page">
    <h1>Hi</h1>
    <div styleName="intro">
      <p>
        I&apos;m Jack, a software engineer living in Tempe, Arizona.
      </p>
      <p>
        Please feel free to get in touch with me! My email is
        {' '}
        <a
          href="mailto:jack@jackketcham.com"
          title="no spam tho"
        >
          jack@jackketcham.com
        </a>
        .
      </p>
      <div styleName="links">
        <h5>
          <span styleName="secondary-text">
            rel=&quot;
            <span styleName="primary-text">
              me
            </span>
            &quot;
            {' '}
            <span styleName="primary-text">
              around the web
            </span>
          </span>
        </h5>
        <ul>
          <li>
            <a
              href="https://github.com/jketcham"
              rel="me"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/_jket"
              rel="me"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://flickr.com/photos/jackketcham"
              rel="me"
            >
              Flickr
            </a>
          </li>
          <li>
            <a
              href="https://www.openstreetmap.org/user/_jket"
              rel="me"
            >
              OpenStreetMap
            </a>
          </li>
          <li>
            <a
              href="musicbrainz.org/user/jket"
              rel="me"
            >
              MusicBrainz
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default HomePage;
