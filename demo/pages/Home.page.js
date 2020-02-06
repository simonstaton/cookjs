import React from 'react';

export const route = '/';

export const fetchData = (props) => {
  return new Promise((resolve) => {
    resolve({
      title: 'homepage'
    });
  });
};

export default ({ data }) => {
  if (!data) return null;
  return (
    <h1>{ data.title }</h1>
  );
};
