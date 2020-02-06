import React from 'react';

export const route = '/blog/:uid';

export const fetchData = (props) => {
  return new Promise((resolve) => {
    resolve({
      title: 'blog post'
    });
  });
};

export default (props) => {
  return (
    <h1>
      { props.data && props.data.title }
    </h1>
  );
};
