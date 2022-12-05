# MQTT

This package provides mqtt support.

## Install

```shell
npm install @iota/mqtt.js@2.0.0-rc.2
```

## MQTT Operations

You can create a MQTT client which once connected can stream the following feeds.

* milestones
* milestonesRaw
* milestonesLatest
* milestonesConfirmed
* blockMetadata - Metadata updates for a specified blockId
* blocksRaw - All blocks in binary form
* blocks - All blocks decoded to objects
* blocksReferenced - All referenced blocks to objects
* blocksTransactionRaw - All transaction blocks in their raw form
* blocksTransaction - All transaction blocks
* blocksTransactionTaggedDataRaw - All transaction blocks with tagged data in their raw form
* blocksTransactionTaggedData - All transaction blocks with tagged data
* blocksTaggedRaw - All blocks for the specified tag in binary form
* blocksTagged - All blocks for the specified tag
* blocksMetadata -  Metadata updates for a specific block
* transactionIncludedBlockRaw -  Block updates for a specific transactionId in their raw form
* transactionIncludedBlock -  Block updates for a specific transactionId
* output - Output updates for a specified outputId
* nft - Updates for an nft output
* alias - Updates for an alias output
* foundry - Updates for an foundry output
* outputByConditionAndAddress - Output with specific unlock condition and address
* outputSpentByConditionAndAddress - Spent outputs with specific unlock condition and address
* receipts - all receipts
* subscribeRaw - Type of block as raw data
* subscribeJson - Type of block as json data
* statusChanged - Changes in the client state
* unsubscribe

## Usage

```js
import { MqttClient } from "@iota/mqtt.js";

const mqttClient = new MqttClient(MQTT_ENDPOINT);

mqttClient.blocks((topic, data, raw) => console.log(topic, data))
```

## Additional Examples

Please find other examples in the [./examples](./examples) folder.

* Mqtt - Using mqtt to read streaming messages.
* Browser Mqtt - Using mqtt to read streaming messages in the browser.
