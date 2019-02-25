/* eslint-disable max-len */
import React from 'react';

import Page from '../Page';
import './home.module.css';

const HomePage = () => (
  <Page styleName="page">
    <div styleName="intro">
      <p>
        I&apos;m Jack, a software engineer living in Tempe, Arizona.
      </p>
      <p>
        Feel free to get in touch with me! My email is
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
              href="https://keybase.io/jketcham"
              rel="me noopener noreferrer"
              target="_blank"
            >
                Keybase
            </a>
          </li>
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
              href="https://mastodon.technology/@jket"
              rel="me noopener noreferrer"
              target="_blank"
            >
                Mastodon
            </a>
          </li>
          <li>
            <a
              href="https://matrix.to/#/@jket:matrix.org"
              rel="me noopener noreferrer"
              target="_blank"
            >
                Matrix
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
          <li>
            <a
              href="https://www.openstreetmap.org/user/_jket"
              rel="me noopener noreferrer"
              target="_blank"
            >
                OpenStreetMap
            </a>
          </li>
          <li>
            <a
              href="musicbrainz.org/user/jket"
              rel="me noopener noreferrer"
              target="_blank"
            >
                MusicBrainz
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Page>
);

export default HomePage;
