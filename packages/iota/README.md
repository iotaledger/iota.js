# @iota/iota.js

> This library is functionally complete, but it is recommended to use [iota.rs](https://github.com/iotaledger/iota.rs). The rust library will be more heavily maintained and is much more performant.

Client library for IOTA stardust network, implemeted in TypeScript to strongly type the objects sent and received from the API.

Runs in both NodeJS and Browser environments.

## Prerequisites

```shell
npm install @iota/iota.js@1.9.0-stardust.12
```

## Example

```js
const { SingleNodeClient } = require("@iota/iota.js");

async function run() {
    const client = new SingleNodeClient("http://localhost:14265/");

    const info = await client.info();
    console.log("Node Info");
    console.log("\tName:", info.name);
    console.log("\tVersion:", info.version);
    console.log("\tIs Healthy:", info.status.isHealthy);
    console.log("\tLatest Milestone Index:", info.status.latestMilestoneIndex);
    console.log("\tConfirmed Milestone Index:", info.status.confirmedMilestoneIndex);
    console.log("\tPruning Index:", info.status.pruningIndex);
    console.log("\tNetwork Name:", info.protocol.networkName);
    console.log("\tBech32 HRP:", info.protocol.bech32HRP);
    console.log("\tMin PoW Score:", info.protocol.minPoWScore);
    console.log("\tMessages Per Second:", info.metrics.messagesPerSecond);
    console.log("\tReferenced Messages Per Second:", info.metrics.referencedMessagesPerSecond);
    console.log("\tReferenced Rate:", info.metrics.referencedRate);
    console.log("\tFeatures:", info.features);
    console.log("\tPlugins:", info.plugins);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
```

## API

The class and method documentation can be found in [./docs/api.md](./docs/api.md)

## High level operations

There are also high level operations which make use of the API level methods:

* addressBalance - Get the balance and native tokens for an address.
* getBalance - Given a seed and account index calculate the total balance available on it's addresses.
* getUnspentAddress - Given a seed, account index, and start index find the next unspent address.
* getUnspentAddresses - Given a seed, account index, and start index find all the unspent addresses.
* promote - Promote a block by attaching an empty block to it.
* reattach - Reattach a block using the block id.
* retry - Looks at the metadata for a block and promotes or retries depending on it's state.
* retrieveData - Given a block id return the index and data from it.
* send - Given a seed, path, destination address in bech32 format and amount, make a single transfer.
* sendEd25519 - Given a seed, path, destination address in ed25519 format and amount, make a single transfer.
* sendMultiple - Given a seed, path, destination addresses in bech32 format and amounts, make multiple transfers.
* sendMultipleEd25519 - Given a seed, path, destination addresses in ed25519 format and amounts, make multiple transfers.
* sendAdvanced - Given a set of inputs with keypairs seed, path, list of destinations make multiple transfers, can also include index data.
* sendData - Given index and data create a new data block.

## Models

You can see the model definitions for all the objects in the [typings](./typings/models) folder.

## Examples

Please find other examples in the [./examples](./examples) folder.

* Simple - Performs basic API operations.
* Address - Demonstrates address generation from a Bip39 mnemonic seed using raw and Bip32 path methods.
* Transaction - Demonstrates how to send a transaction and call some of the other higher level functions.
* Data - Storing and retrieving data on the tangle.
* Browser - Demonstrates direct inclusion and use of the library in an html page.
* Peers - Demonstrates peer management.
* Pow - Demonstrates using one of the other PoW packages.

## Supporting the project

If the iota.js has been useful to you and you feel like contributing, consider submitting a [bug report](https://github.com/iotaledger/iota.js/issues/new), [feature request](https://github.com/iotaledger/iota.js/issues/new) or a [pull request](https://github.com/iotaledger/iota.js/pulls/).

See our [contributing guidelines](.github/CONTRIBUTING.md) for more information.

## Joining the discussion

If you want to get involved in the community, need help with getting set up, have any issues or just want to discuss IOTA, feel free to join our [Discord](https://discord.iota.org/).
