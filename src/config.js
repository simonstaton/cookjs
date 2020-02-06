import path from 'path';

const ROOT = process.env.PWD || process.cwd();

export default {
  input: {
    layout: path.join(ROOT, 'demo/Layout.js'),
    pages: path.join(ROOT, 'demo/pages/**/*.page.js'),
  },
  output: {
    path: path.join(ROOT, 'dist')
  },
  includeHelmet: true,
  setupRoutes: () => {
    return new Promise((resolve, reject) => {
      resolve([
        {
          route: '/blog/test',
          page: path.join(ROOT, 'demo/pages/BlogPost.page.js')
        }
      ]);
    });
  }
};
