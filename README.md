# IOTA.js

IOTA Client Reference Implementation in Javascript

[![Build Status](https://travis-ci.org/iotaledger/iota.lib.js.svg?branch=develop)](https://travis-ci.org/iotaledger/iota.lib.js)
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
import composeApi from '@iota/core'

const iota = composeApi({
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

const settings = { provider: 'http://localhost:14265' }

const getNodeInfo = createGetNodeInfo(createHttpClient(settings))
```

### Creating &amp; broadcasting transactions

Publish transfers by calling [`prepareTransfers`](core#module_core.preareTransfers) and piping the 
prepared trytes to [`sendTrytes`](core#module_core.sendTrytes) command.

Feel free to use devnet and take advatage of [`PoWbox`](https://powbox.testnet.iota.org/) as well as 
[`IOTA faucet`]() during development.

```js
// must be trully random & 81-trytes long
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
    .then(trytes => iota.sendTrytes(depth, minWeightMagnitude, trytes))
    .then(bundle => {
        console.log(`Published trhansaction with tail hash: ${bundle[0].hash}`)
        console.log(`Bundle: ${bundle}`)
    })
    .catch(err => {
        // catch any errors
    })
```

## Documentation

For details on all available api methods please see the [reference page](api_reference.md).

Documentation of IOTA protocol and [`IRI`](https://github.com/iotaledger/iri) http API can be found on [docs.iota.works](https://docs.iota.works).

## Reporting Issues

Please report any problems you encouter during development by [opening an issue](issues/new).

## Join the discussion

Suggestions and discussion around specs, standardization and enhancements are highly encouraged.
You are invited to join the discussion on [IOTA Discord](https://discord.gg/DTbJufa).