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
                editUrl: 'https://github.com/iotaledger/iota.js/tree/feat/stardust/documentation',// Example: https://github.com/iotacommunity/iota.js/edit/production/documentation
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
                preview: '/img/tutorials/bg-value-transactions.png',
                route: '/shimmer/iotajs/tutorials/value-transactions/introduction',
                tags: ['text', 'getting-started', 'client', 'shimmer', 'js'],
            },
        ],
        [
            '@iota-wiki/plugin-tutorial',
            {
                title: 'Stardust for iota.js: Alias Transactions',
                description:'Learn how to create a new Alias Transaction and update the Alias\'s state with iota.js.',
                preview: '/img/tutorials/bg-alias-transactions.png',
                route: '/shimmer/iotajs/tutorials/value-transactions/introduction',
                tags: ['text', 'getting-started', 'client', 'shimmer', 'js'],
            },
        ],
        [
            '@iota-wiki/plugin-tutorial',
            {
                title: 'Stardust for iota.js: Native Tokens',
                description:'Learn how to mint, send and melt Native tokens with iota.js.',
                preview: '/img/tutorials/bg-native-tokens.png',
                route: '/shimmer/iotajs/tutorials/value-transactions/introduction',
                tags: ['text', 'getting-started', 'client', 'shimmer', 'js'],
            },
        ],
        [
            '@iota-wiki/plugin-tutorial',
            {
                title: 'Stardust for iota.js: NFTs and Unlock Conditions',
                description:'Learn how to mint, send and claim NFTs using custom unlock conditions with iota.js.',
                preview: '/img/tutorials/bg-nfts.png',
                route: '/shimmer/iotajs/tutorials/value-transactions/introduction',
                tags: ['text', 'getting-started', 'client', 'shimmer', 'js'],
            },
        ],
    ],
    staticDirectories: [path.resolve(__dirname, 'static')],
};
