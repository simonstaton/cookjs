import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import { resolveData } from './resolver';
import { routes } from './routes';
import template from './template';
import config from './config';

const rendererEngine = (ReactComponent) => new Promise((resolve, reject) => {
  const body = [];
  const bodyStream = ReactDOMServer.renderToNodeStream(ReactComponent);

  bodyStream.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  bodyStream.on('error', (err) => {
    reject(err);
  });

  bodyStream.on('end', () => {
    resolve(body.join(''));
  });
});

export default async ({
  route: url,
  fetchData
}) => {
  let props;
  const Route = routes[0].routes.find(route => {
    const matchedRoute = matchPath(url, route);
    if (matchedRoute) {
      return props = matchedRoute;
    }
  });

  const data = await fetchData(props);
  const context = {};

  const htmlString = await rendererEngine(
    <StaticRouter location={ url } context={ context }>
      { renderRoutes(routes, {
        data
      }) }
    </StaticRouter>
  );

  return template(data, htmlString, config.includeHelmet && Helmet.renderStatic());
};
