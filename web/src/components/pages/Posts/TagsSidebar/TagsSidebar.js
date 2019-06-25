import React from 'react';

import useFetch from '../../../../hooks/useFetch';
import PostsURL from '../../../../urls/PostsURL';
import Tags from '../../../chrome/Tags';
import './TagsSidebar.module.css';

const TagsSidebar = () => {
  const { data, isLoading, isError } = useFetch(
    '/api/tags',
    { isLoading: true, data: { results: [] } },
  );

  if (isLoading || isError) {
    return null;
  }

  return (
    <div styleName="tags">
      <section>
        <h2>
          Tags
        </h2>
      </section>
      <Tags items={data.results} AppURL={PostsURL} direction="vertical" />
    </div>
  );
};

export default TagsSidebar;
