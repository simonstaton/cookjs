import React from 'react';

export default ({ children }) => {
  return (
    <div>
      <header>Header</header>
      { children }
      <footer>Footer</footer>
    </div>
  );
}
