# Mobile IOTA app

This is an example application built with [React Native](https://facebook.github.io/react-native/), [`@iota/core`](https://github.com/iotaledger/iota.js/tree/next/packages/core) and [`@iota/pearl-diver-react-native`](https://github.com/iotaledger/tree/next/packages/pearl-diver-react-native). It's a basic demonstration of how to attach to tangle (=do PoW) on Android & iOS apps, using native modules of `pearl-diver-react-native` package.

## TODO: iOS integration

### Installation
Instal dependencies:
```
npm i
```

To install required `@iota` packages in your own app:
```
npm i @iota/core @iota/pearl-diver-react-native
```

### Linking `@iota/pearl-diver-react-native`

In this project, `pearl-diver-react-native` is already linked. To automatically link it in
your own app run:
```
react-native link @iota/pearl-diver-react-native
```

For manual linking follow [the steps here](https://github.com/iotaledger/iota.js/tree/next/packages/pearl-diver-react-native/README.md#manual-installation)

### Connecting to IOTA network

To sucessfully attach a transaction with app, edit `provider` field in `App.js` by adding your node.

```js
const iota = composeAPI({
    provider: 'http://localhost:14265', // replace this with your node
    attachToTangle
})
```

### Run the app

Use these commands to start the app;
```
react-native run-android

react-native run-ios
```

An emulator running or a connected device is required.

For debugging you can check the logs:
```
react-native log-android

react-natve log-ios
```

### PoW integration

We use `composeAPI` function to create an API mixin that will support
local PoW. `attachToTangle` method from `@iota/pearl-diver-react-native` will
override the default function, which assumed PoW is available on iri node. 
```js

import { composeAPI } from '@iota/core'
import { attachToTangle } from '@iota/pearl-diver-react-native'

// Creates an iota API object which uses our native module
const iota = composeAPI({
    provider: 'http://localhost:14265', // replace this with your node
    attachToTangle
})
```

Creating and broadcasting a test, zero-value transaction:
```js
const depth = 3
const minWeightMagnitude = 9

iota.prepareTransfers(
    '9'.repeat(81), // test seed
    [{
        address: 'A'.repeat(81), // test transfer
        value: 0
    }]
)
    // sendTrytes now calls attachToTangle from native module
    .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
    .then(transactions => { /* ... */ })
    .catch(err => { /* ... */ })
```
