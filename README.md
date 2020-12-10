# iota.js

Experimental client library for IOTA Chrysalis network. Implemeted in TypeScript to strongly type the objects sent and received from the API.

## Installation

```shell
npm install iotaledger/iota.js#chrysalis
```

## Example

```js
const { SingleNodeClient } = require("@iota/iota.js");

async function run() {
    const client = new SingleNodeClient("http://localhost:14265");

    const info = await client.info();
    console.log("Node Info");
    console.log("\tName:", info.name);
    console.log("\tVersion:", info.version);
    console.log("\tIs Healthy:", info.isHealthy);
    console.log("\tNetwork Id:", info.networkId);
    console.log("\tCoordinator Public Key:", info.coordinatorPublicKey);
    console.log("\tLatest Milestone Message Id:", info.latestMilestoneMessageId);
    console.log("\tLatest Milestone Index:", info.latestMilestoneIndex);
    console.log("\tSolid Milestone Message Id:", info.solidMilestoneMessageId);
    console.log("\tSolid Milestone Index:", info.solidMilestoneIndex);
    console.log("\tPruning Index:", info.pruningIndex);
    console.log("\tFeatures:", info.features);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
```

## API Endpoints

These methods are implemented on the API client.

* health() - Is the node healthy.
* info() - Get the information about a node.
* tips() - The tips for the tangle.
* message(messageId) - Get a message.
* messageMetadata(messageId) - Get the metadata for a message.
* messageRaw(messageId) - Get the raw message bytes.
* messageSubmit(message) - Submit a new message to the tangle.
* messageSubmitRaw(message) - Submit a new message to the tangle as bytes.
* messageChildren(messageId) - Find the children of a message.
* messagesFind(index) - Find messages by indexation key.
* output(outputId) - Get an output by id.
* address(address) - Get an address details using bech32 address.
* addressOutputs(address) - Get address outputs using bech32 address.
* addressEd25519(address) - Get address details using ed25519 address.
* addressEd25519Outputs(address) - Get address outputs using ed25519 address.
* milestone(index) - Get the milestone details.
* peers() - Get a list of peers.
* peerAdd() - Add a peer.
* peerDelete() - Delete a peer.
* peer() - Get the details of a peer.

## High level operations

There are also high level operations which make use of the API level methods:

* getBalance - Given a seed, path calculate the total balance available on it's addresses.
* getUnspentAddress - Given a seed, path, and start index find the next unspent address.
* getUnspentAddresses - Given a seed, path, and start index find all the unspent addresses.
* promote - Promote a message by attaching an empty message to it.
* reattach - Reattach a message using the message id.
* retry - Looks at the metadata for a message and promotes or retries depending on it's state.
* retrieveData - Given a message id return the index and data from it.
* send - Given a seed, path, destination address in bech32 format and amount, make a single transfer.
* sendEd25519 - Given a seed, path, destination address in ed25519 format and amount, make a single transfer.
* sendAdvanced - Given a set of inputs with keypairs seed, path, list of destinations make multiple transfers, can also include index data.
* sendData - Given index and data create a new data message.

## MQTT Operations

You can create a MQTT client which once connected can stream the following feeds.

* milestonesLatest
* milestonesSolid
* messageMetadata - Metadata updates for a specified messageId
* output - Output updates for a specified outputId
* addressOutputs - Address output updates for a specified address
* address25519Outputs - Address output updates for a specified ed25519 address
* messagesRaw - All messages in binary form
* messages - All messaged decoded to objects
* indexRaw - All messages for a specified indexation key in binary form
* index - All messages for a specified indexation key in object form
* messagesMetadata - All metadata updates

## Models

You can see the model definitions for all the objects in the [typings](./typings/models) folder.

## Proof of Work

A very simple local proof of work provider [./localPowProvider](./src/pow/localPowProvider.ts) is implemented but not used by default.
The example is included for reference purposes, but should not be used as it is very slow.
You can experiment using it or any other PoW implementation by passing it to the constructor of a SingleNodeClient.

```js
const client = new SingleNodeClient("http://localhost:14265", undefined, new LocalPowProvider());
```

## More Examples

Please find other examples in the [./examples](./examples) folder.
* Simple - Performs basic API operations.
* Transaction - Demonstrates how to send a transaction and call some of the other higher level functions.
* Data - Storing and retrieving data on the tangle.
* Browser - Demonstrates direct inclusion and use of the library in an html page.
* Peers - Demonstrates peer management.
* Mqtt - Using mqtt to read streaming messages.
* Browser Mqtt - Using mqtt to read streaming messages in the browser.

