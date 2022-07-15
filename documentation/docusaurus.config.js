const path = require('path');

module.exports = {
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'iotajs',  // Usually your repository's name, in this case iotajs
        path: path.resolve(__dirname, 'docs'),
        routeBasePath: 'iotajs', // Usually your repository's name, in this case iotajs
        sidebarPath: path.resolve(__dirname, 'sidebars.js'),
        editUrl: 'https://github.com/iotaledger/iota.js/tree/dev/packages/iota/documentation',// Example: https://github.com/iotacommunity/iota.js/edit/production/documentation
        remarkPlugins: [require('remark-code-import'), require('remark-import-partial')],// You can add any remark or rehype extensions you may need here 
      }
    ],
  ],
  staticDirectories: [path.resolve(__dirname, 'static')],
};
