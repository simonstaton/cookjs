import glob from 'glob';
import path from 'path';
import fs from 'fs';
import config from './config';
import renderer from './renderer';
import { makeRoutes, routes } from './routes';

const generateFile = async (route, html) => {
  const parts = route.substring(1).split('/');
  const fileName = parts.pop() || 'index';
  const directory = parts.join('/');
  const buildDirectory = path.join(config.output.path, directory);

  fs.mkdir(buildDirectory, { recursive: true }, (err) => {
    if (err) throw new Error(`unable to create output directory ${ config.output.path }/${ path }`);
    fs.writeFile(`${ buildDirectory }/${ fileName }.html`, html, 'utf8', (writeErr) => {
      if (writeErr) throw new Error(`unable to write to file`);
    });
  });
};

export const renderPage = async (pages) => {
  for (let i = 0; i < pages.length; i++) {
    const {
      route,
    } = pages[i];

    const html = await renderer(pages[i]);
    await generateFile(route, html);
  }
};

export const generatePages = async () => {
  const pages = [];

  if (config.setupRoutes) {
    const routes = await config.setupRoutes();

    for (let i = 0; i < routes.length; i++) {
      const { route, page } = routes[i];
      const pageModule = await import(page);

      const {
        default: ReactComponent,
        route: dynamicRoute,
        fetchData
      } = pageModule;

      pages.push({
        path: page,
        route,
        ReactComponent,
        fetchData,
        dynamicRoute
      });
    }
  }

  const staticPages = glob.sync(config.input.pages);
  for (let i = 0; i < staticPages.length; i++) {
    const path = staticPages[i];

    if (!pages.find(page => page.path === path)) {
      const pageModule = await import(path);

      const {
        default: ReactComponent,
        route,
        fetchData
      } = pageModule;

      pages.push({
        path,
        route,
        ReactComponent,
        fetchData
      });
    }
  }

  await makeRoutes(pages);
  await renderPage(pages);
};
