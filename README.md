# IOTA JavaScript client library 


[![Build Status](https://travis-ci.org/iotaledger/iota.js.svg)](https://travis-ci.org/iotaledger/iota.js) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/iotaledger/iota.lib.js/master/LICENSE)  [![Discord](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/DTbJufa) [![Greenkeeper badge](https://badges.greenkeeper.io/iotaledger/iota.js.svg)](https://greenkeeper.io/)

This is the **official** JavaScript client library, which allows you to do the following:
* Create transactions
* Sign transactions
* Interact with an IRI node

This is beta software, so there may be performance and stability issues.
Please report any issues in our [issue tracker](https://github.com/iotaledger/iota.js/issues/new).

|Table of contents|
|:----|
| [Prerequisites](#prerequisites)
| [Downloading the library](#downloading-the-library)|
| [Getting started](#getting-started) |
| [Examples](#examples)|
| [API reference](#api-reference)
|[Supporting the project](#supporting-the-project)|
|[Joining the discussion](#joining-the-discussion)|
| [License](#license)|

## Downloading the library

To download the IOTA Java client library and its dependencies, you can use one of the following options:

* Download the library with [npm](https://www.npmjs.com/)
    ```bash
    npm install @iota/core
    ```
* Download the library with [Yarn](https://yarnpkg.com/)
    ```bash
    yarn add @iota/core
    ```

## Getting started

After you've [downloaded the library](#downloading-the-library), you can connect to an IRI node to send transactions to it and interact with the ledger.

To connect to a local IRI node, do the following:

```js
import { composeAPI } from '@iota/core'

const iota = composeAPI({
    provider: 'http://localhost:14265'
})

iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(err => {})
```
## Examples

As well as the following examples, you can take a look at our [examples folder](https://github.com/iotaledger/iota.js/tree/next/examples) for more.

### Creating custom API methods

1. Install an IRI HTTP client:

    ```bash
    npm install @iota/http-client
    ```

2. Create an API method:

    ```js
    import { createHttpClient } from '@iota/http-client'
    import { createGetNodeInfo } from '@iota/core'

    const client = createHttpClient({
        provider: 'http://localhost:14265'
    })

    const getNodeInfo = createGetNodeInfo(client)
    ```

### Creating and broadcasting transactions

This example shows you how to create and send a transaction to an IRI node by calling the [`prepareTransfers`](packages/core#module_core.prepareTransfers) method and piping the prepared bundle to the [`sendTrytes`](packages/core#module_core.sendTrytes) method.

```js
// must be truly random & 81-trytes long
const seed = ' your seed here '

// Array of transfers which defines transfer recipients and value transferred in IOTAs.
const transfers = [{
    address: ' recipient address here ',
    value: 1000, // 1Ki
    tag: '', // optional tag of `0-27` trytes
    message: '' // optional message in trytes
}]

// Depth or how far to go for tip selection entry point
const depth = 3 

// Difficulty of Proof-of-Work required to attach transaction to tangle.
// Minimum value on mainnet & spamnet is `14`, `9` on devnet and other testnets.
const minWeightMagnitude = 14

// Prepare a bundle and signs it
iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        // Persist trytes locally before sending to network.
        // This allows for reattachments and prevents key reuse if trytes can't
        // be recovered by querying the network after broadcasting.

        // Does tip selection, attaches to tangle by doing PoW and broadcasts.
        return iota.sendTrytes(trytes, depth, minWeightMagnitude)
    })
    .then(bundle => {
        console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
        console.log(`Bundle: ${bundle}`)
    })
    .catch(err => {
        // catch any errors
    })
```

## API reference

For details on all available API methods, see the [reference page](api_reference.md).

## Supporting the project

If the IOTA JavaScript client library has been useful to you and you feel like contributing, consider posting a [bug report][new-issue], [feature request][new-issue] or a [pull request][new-pull-request].  
We have some [basic contribution guidelines][contribution-guidelines] to keep our code base stable and consistent.

### Cloning and bootstraping the repository on GitHub

1. Click the <kbd>Fork</kbd> button in the top-right corner
2. Clone your fork and change directory into it
3. Bootstrap your environment by doing the following:

    ```bash
    npm run init
    ```

This step will download all dependencies, build and link the packages together. iota.js uses [Lerna](https://lernajs.io/) to manage multiple packages. You can re-bootstrap your setup at any point with `lerna bootstrap` command.

### Running tests

Make your changes on a single package or across multiple packages and test the system by running the following from the root directory:

```bash
npm test
```

To configure your editor to watch the tests running, add the `--watch` flag:

```bash
npm test --watch`
```

### Updating documentation

Please update the documention when needed by editing [`JSDoc`](http://usejsdoc.org) annotations and running `npm run docs` from the root directory.

## Joining the discussion

If you want to get involved in the community, need help with getting setup, have any issues related with the library or just want to discuss blockchain, distributed ledgers, and IoT with other people, feel free to join our [Discord][iota-discord].  
You can also ask questions on our dedicated [IOTA Forum][iota-forum].

## License

The license can be found [here](LICENSE).
