# iota.js

IOTA Client Reference Implementation in Javascript

[![Build Status](https://travis-ci.org/iotaledger/iota.lib.js.svg?branch=next)](https://travis-ci.org/iotaledger/iota.lib.js)
 [![dependencies Status](https://david-dm.org/iotaledger/iota.lib.js/status.svg)](https://david-dm.org/iotaledger/iota.lib.js)  [![devDependencies Status](https://david-dm.org/iotaledger/iota.lib.js/dev-status.svg)](https://david-dm.org/iotaledger/iota.lib.js?type=dev) [![NSP Status](https://nodesecurity.io/orgs/iota-foundation/projects/7c0214b5-e36a-4178-92bc-164c536cfd6c/badge)](https://nodesecurity.io/orgs/iota-foundation/projects/7c0214b5-e36a-4178-92bc-164c536cfd6c) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/iotaledger/iota.lib.js/master/LICENSE)  [![Discord](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/DTbJufa)

---

## Getting started

### Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/core
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/core
```

### Connecting to network

```js
import { composeAPI } from '@iota/core'

const iota = composeAPI({
    provider: 'http://localhost:14265'
})

iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(err => {})
```

Composing custom client methods with network provider:

1. Install an IRI http client:

```
npm install @iota/http-client
```

2. Create an api method with custom provider:
```js
import { createHttpClient } from '@iota/http-client'
import { createGetNodeInfo } from '@iota/core'

const client = createHttpClient({
    provider: 'http://localhost:14265'
})

const getNodeInfo = createGetNodeInfo(client)
```

### Creating &amp; broadcasting transactions

Publish transfers by calling [`prepareTransfers`](packages/core#module_core.prepareTransfers) and piping the 
prepared trytes to [`sendTrytes`](packages/core#module_core.sendTrytes) command.

Feel free to use devnet and take advatage of [`PoWbox`](https://powbox.devnet.iota.org/) as well as 
[`IOTA faucet`](https://faucet.devnet.iota.org/) during development.

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

iota.prepareTransfers(seed, transfers)
    .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
    .then(bundle => {
        console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
        console.log(`Bundle: ${bundle}`)
    })
    .catch(err => {
        // catch any errors
    })
```

## Documentation

For details on all available API methods please see the [reference page](api_reference.md).

Documentation of IOTA protocol and [`IRI`](https://github.com/iotaledger/iri) http API can be found on [docs.iota.works](https://docs.iota.works).

## Contributing

We thank everyone for their contributions. Here is quick guide to get started with iota.js monorepo:

### Clone and bootstrap

1. Fork the repo with <kbd>Fork</kbd> button at top right corner.
2. Clone your fork locally and `cd` in it.
3. Bootstrap your environement with:

```
npm run init
```

This will install all dependencies, build and link the packages together. iota.js uses [Lerna](https://lernajs.io/) to manage multiple packages. You can re-bootstrap your setup at any point with `lerna bootstrap` command.

### Run the tests

Make your changes on a single or across multiple packages and test the system in integration. Run from the _root directory_:

```
npm test
```

To run tests of specific package just `cd` to the package directory and run `npm test` from there.

You may also want to configure your editor to build the source uppon save and watch the tests running.
Once building on save is setup, you can start watching tests with `npm test --watch` from each package directory.

### Updating documentation

Please update the documention when needed by editing [`JSDoc`](http://usejsdoc.org) annotations and running `npm run docs` from the _root directory_.


## Reporting Issues

Please report any problems you encouter during development by [opening an issue](https://github.com/iotaledger/iota.lib.js/issues/new).

## Join the discussion

Suggestions and discussion around specs, standardization and enhancements are highly encouraged.
You are invited to join the discussion on [IOTA Discord](https://discord.gg/DTbJufa).
