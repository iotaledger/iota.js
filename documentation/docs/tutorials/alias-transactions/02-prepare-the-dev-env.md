---
description: "Prepare a development environment to run the alias transactions in iota.js tutorial."
image: /img/client_banner.png
keywords:

- tutorial
- Node.js 16
- auxiliary library
- proof of work
- pow
- shimmer
- testnet node

---

# Prepare Your Development Environment

To run the code in this tutorial, you will need the following:

* [Node.js 16](https://nodejs.org/en/blog/release/v16.16.0/).
* The [`@iota/iota.js`](https://www.npmjs.com/package/@iota/iota.js) library
* The `iota.js` auxiliary libraries:
    * [`@iota/crypto.js`](https://www.npmjs.com/package/@iota/crypto.js)
    * [`@iota/util.js`](https://www.npmjs.com/package/@iota/util.js).
    * [`@iota/pow-neon.js`](https://www.npmjs.com/package/@iota/pow-neon.js) to run Proof of Work (PoW). Alternatively,
      you can spin up your own node to run the PoW remotely.

* Access to a Stardust Node (Hornet 2.0.0). You can use the Shimmer testnet Nodes
  at [https://api.testnet.shimmer.network](https://api.testnet.shimmer.network).
* (Optional) A TypeScript compiler and related packages

## (optional) Download the Code

You
can [download the tutorials codebase](https://github.com/iotaledger/iota.js/tree/feat/stardust/packages/iota/examples/shimmer-alias-transaction-tutorial)
to follow while you read the next sections.

:::warning Running Code Examples

If you plan on using the provided code example, please read the article [How To Run Code Examples](../../how_tos/run_how_tos.mdx).

:::

:::warning Shimmer Addresses and Outputs

The tutorial's codebase uses several predefined Shimmer addresses and outputs. If you are going to use other addresses, you will need to update the code accordingly. Likewise, the tutorial codebase assumes a particular state of the addresses and outputs. Before executing the code, please ensure your addresses and outputs are in the expected state.

:::

### Available Commands

#### Mint Alias Output

You can run the `mint-new-alias-script` script by running the following command from the example's directory:

```bash
npm run mint
```

#### Transition Alias Output

You can run the `alias-transaction` script by running the following command from the example's directory:

```bash
npm run alias-transaction
```

## Create Your package.json File

You can create your `package.json` file from the example below and place it in your projects base directory:

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

After you have created the `package.json` file, you can install all the necessary dependencies by running the following
command from the same directory:

```bash
npm install
```

## Troubleshooting

If you are getting any errors during the installation process please make sure your system is
using [Node.js 16](https://nodejs.org/en/blog/release/v16.16.0/). You can check your node version by running the
following command:

```bash
node -v
```
