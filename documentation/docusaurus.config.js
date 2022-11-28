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
            },
        ],

        [
            '@docusaurus/plugin-content-pages',
            {
                id: 'iotajs-tutorials',
                path: '/shimmer/iotajs/tutorials/',
                routeBasePath: 'tutorials',
                include: ['**.{md, mdx}'],
            },
        ],
        [
            '@iota-wiki/plugin-tutorial',
            {
                title: 'Stardust for iota.js: Value Transactions',
                description:'Get acquainted with the structure and functionality of transactions in IOTA\'s Stardust protocol in the Shimmer network using iota.js primitives to issue value transactions.',
                preview: 'setup_iota-js_for_development.png',
                route: '/shimmer/iotajs/tutorials/value-transactions/introduction',
                tags: ['text', 'getting-started', 'client', 'shimmer', 'js'],
            },
        ],
    ],
    staticDirectories: [path.resolve(__dirname, 'static')],
};
