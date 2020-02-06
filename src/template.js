import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

export default (data, html, helmet) => minify(`
<!DOCTYPE html>
  <html ${ helmet && helmet.htmlAttributes.toString() } lang="en-GB">
  <head>
    <base href="/" target="_self">
    ${ helmet && helmet.title.toString() }
    ${ helmet && helmet.meta.toString() }
    ${ helmet && helmet.link.toString() }
    <script>window.__INITIAL_DATA__ = ${ serialize(data) }</script>
  </head>
  <body ${ helmet && helmet.bodyAttributes.toString() }>
    <div id='cookjs-mount'>${ html }</div>
  </body>
</html>
`, {
  removeAttributeQuotes: true,
  collapseWhitespace: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeTagWhitespace: true,
  minifyCSS: true,
  minifyJS: true
});
