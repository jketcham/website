/* eslint-disable max-len */
import React from 'react';

import Page from '../../chrome/Page';
import './Home.module.css';

const LINKS = [{
  link: 'https://keybase.io/jketcham',
  name: 'Keybase',
}, {
  link: 'https://github.com/jketcham',
  name: 'GitHub',
}, {
  link: 'https://twitter.com/_jket',
  name: 'Twitter',
}, {
  link: 'https://mastodon.technology/@jket',
  name: 'Mastodon',
}, {
  link: 'https://matrix.to/#/@jket:matrix.org',
  name: 'Matrix',
}, {
  link: 'https://flickr.com/photos/jackketcham',
  name: 'Flickr',
}, {
  link: 'https://www.openstreetmap.org/user/_jket',
  name: 'OpenStreetMap',
}, {
  link: 'https://musicbrainz.org/user/jket',
  name: 'MusicBrainz',
}, {
  link: 'https://www.are.na/jack-ketcham',
  name: 'Are.na',
}, {
  link: 'https://www.librarything.com/profile/teleportjack',
  name: 'LibraryThing',
}];

const HomePage = () => (
  <Page styleName="page">
    <div styleName="intro">
      <p>
        I&apos;m Jack, a software engineer living in Tempe, Arizona.
      </p>
      <p>
        Feel free to get in touch with me at
        {' '}
        <a
          href="mailto:jack@jackketcham.com"
          title="no spam tho"
        >
            jack@jackketcham.com
        </a>
        .
      </p>
      <p>
        PGP Fingerprint:
        {' '}
        <code>
          5075 540D A46A 5C23 74DE  6560 DC02 5880 B631 9C9D
        </code>
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
          {LINKS.map(({ name, link }) => (
            <li key={link}>
              <a
                href={link}
                rel="me noopener noreferrer"
                target="_blank"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Page>
);

export default HomePage;
