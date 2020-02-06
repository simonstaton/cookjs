import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';

/**
 * Webpack needs to generate this file as a standard react application
 */
const preloadedState = window.__INITIAL_DATA__;
delete window.__INITIAL_DATA__;

const history = createBrowserHistory();

/**
 * @TODO
 * - How to get routes into this file?!?!? - need some kind of static generation...
 * - How to get Layout into this file?!!?!?
 */
const Container = ({ data }) => (
  <BrowserRouter history={ history }>
    { renderRoutes([], { data: preloadedState }) }
  </BrowserRouter>
);

hydrate(
  <Container />,
  document.getElementById('cookjs-mount')
);
