import React from 'react';

export const route = '/about';

export const fetchData = (props) => {
  return new Promise((resolve) => {
    resolve({
      title: 'about'
    });
  });
};

export default ({ data }) => {
  if (!data) return null;
  return (
    <h1>{ data.title }</h1>
  );
};
