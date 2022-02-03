# iota.js

> This library is functionally complete, but it is recommended to use [iota.rs](https://github.com/iotaledger/iota.rs). The rust library will be more heavily maintained and is more performant.

Mono-repo containing client and supporting packages for the IOTA stardust network, implemented in TypeScript to strongly type the objects sent and received from the API.

Runs in both NodeJS and Browser environments.

## Prerequisites

```shell
npm install @iota/iota.js@1.9.0-stardust.1
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

## Packages

For more details on the main package see [@iota/iota.js](./packages/iota/README.md).

Other packages within the framework are.

* [@iota/util.js](./packages/util/README.md) - Utility classes and methods.
* [@iota/crypto.js](./packages/crypto/README.md) - Cryptographic implementations.
* [@iota/mqtt.js](./packages/mqtt/README.md) - MQTT Client.
* [@iota/pow-neon.js](./packages/pow-neon/README.md) - PoW as a multi-threaded Neon Rust binding.
* [@iota/pow-node.js](./packages/pow-node/README.md) - PoW as a multi-threaded node module.
* [@iota/pow-wasm.js](./packages/pow-wasm/README.md) - PoW as a multi-threaded WASM module.

## Examples

Please find other examples in the [./packages/iota/examples](./packages/iota/examples) folder.

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

## License

The separate packages all contain their own licenses.
