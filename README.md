<h2 align="center">iota.js</h2>

<p align="center">
  <a href="https://discord.iota.org/" style="text-decoration:none;"><img src="https://img.shields.io/badge/Discord-9cf.svg?logo=discord" alt="Discord"></a>
    <a href="https://iota.stackexchange.com/" style="text-decoration:none;"><img src="https://img.shields.io/badge/StackExchange-9cf.svg?logo=stackexchange" alt="StackExchange"></a>
    <a href="https://github.com/iotaledger/iota.js/blob/main/LICENSE" style="text-decoration:none;"><img src="https://img.shields.io/github/license/iotaledger/iota.js.svg" alt="Apache-2.0 license"></a>
</p>
      
<p align="center">
  <a href="#about">About</a> ◈
  <a href="#prerequisites">Prerequisites</a> ◈
  <a href="#example">Example</a> ◈
  <a href="#packages">Packages</a> ◈
  <a href="#proof-of-work">Proof Of Work</a> ◈
  <a href="#examples">Examples</a> ◈
  <a href="#supporting-the-project">Supporting the project</a> ◈
  <a href="#joining-the-discussion">Joining the discussion</a> 
</p>

# About

> This library is functionally complete, but it is recommended to use [iota.rs](https://github.com/iotaledger/iota.rs). The rust library will be more heavily maintained and is more performant.

Client library for IOTA chrysalis network, implemeted in TypeScript to strongly type the objects sent and received from the API.

Runs in both NodeJS and Browser environments.

## Prerequisites

```shell
npm install @iota/iota.js
```

## Example

```js
const { SingleNodeClient } = require("@iota/iota.js");

async function run() {
    const client = new SingleNodeClient("https://chrysalis-nodes.iota.org");

    const info = await client.info();
    console.log("Node Info");
    console.log("\tName:", info.name);
    console.log("\tVersion:", info.version);
    console.log("\tIs Healthy:", info.isHealthy);
    console.log("\tNetwork Id:", info.networkId);
    console.log("\tLatest Milestone Index:", info.latestMilestoneIndex);
    console.log("\tConfirmed Milestone Index:", info.confirmedMilestoneIndex);
    console.log("\tPruning Index:", info.pruningIndex);
    console.log("\tFeatures:", info.features);
    console.log("\tMin PoW Score:", info.minPoWScore);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
```

## Packages

For more details on the main package see [@iota/iota.js](./packages/iota/README.md)

Other packages within the framework are.

* [@iota/util.js](./packages/util/README.md) - Utility classes and methods.
* [@iota/crypto.js](./packages/crypto/README.md) - Cryptographic implementations.
* [@iota/mqtt.js](./packages/mqtt/README.md) - MQTT Client.

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