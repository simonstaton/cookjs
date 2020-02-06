import React from 'react';
import { renderRoutes } from 'react-router-config';
import config from './config';

const Root = Layout => (props) => {
  return (
    <Layout { ...props }>
      { renderRoutes(props.route.routes, { data: props.data }) }
    </Layout>
  );
};

export const routes = [];

export const makeRoutes = async (pages) => {
  const layoutModule = await import(config.input.layout);

  const router = {
    component: Root(layoutModule.default),
    routes: []
  };

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    router.routes.push({
      path: page.dynamicRoute || page.route,
      component: page.ReactComponent,
      exact: true
    });
  }

  routes.push(router);

  return routes;
};
