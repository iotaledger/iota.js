# Prepare Your Development Environment

In order to run the code in this tutorial you will need:

* [Node.js 16](https://nodejs.org/en/blog/release/v16.16.0/).
* The [`@iota/iota.js`](https://www.npmjs.com/package/@iota/iota.js) library
* The `iota.js` auxiliary libraries:
    * [`@iota/crypto.js`](https://www.npmjs.com/package/@iota/crypto.js)
    * [`@iota/util.js`](https://www.npmjs.com/package/@iota/util.js).
    * [`@iota/pow-neon.js`](https://www.npmjs.com/package/@iota/pow-neon.js) to run Proof of Work (PoW). Alternatively,
      you can spin up your own node the PoW remotely.
* Access to a Stardust Node (Hornet 2.0.0). You can use the Shimmer testnet Nodes
  at [https://api.testnet.shimmer.network](https://api.testnet.shimmer.network).
* (Optional) A TypeScript compiler and related packages

You can create your `package.json` file from the example below:

```json
{
  "name": "tutorial",
  "version": "1.0.0",
  "scripts": {
    "dist": "tsc",
    "start": "node dist/index"
  },
  "dependencies": {
    "@iota/crypto.js": "2.0.0-rc.1",
    "@iota/iota.js": "2.0.0-rc.1",
    "@iota/util.js": "2.0.0-rc.1",
    "@iota/pow-neon.js": "2.0.0-rc.2"
  },
  "devDependencies": {
    "typescript": "^4.4.3",
    "@types/node": "18.7.23"
  }
}
```
