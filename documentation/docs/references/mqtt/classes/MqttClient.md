---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: MqttClient

MQTT Client implementation for pub/sub communication.

## Implements

- [`IMqttClient`](../interfaces/IMqttClient.md)

## Table of contents

### Constructors

- [constructor](MqttClient.md#constructor)

### Methods

- [milestonesLatest](MqttClient.md#milestoneslatest)
- [milestonesConfirmed](MqttClient.md#milestonesconfirmed)
- [blocksRaw](MqttClient.md#blocksraw)
- [blocks](MqttClient.md#blocks)
- [blocksReferenced](MqttClient.md#blocksreferenced)
- [blocksTransactionRaw](MqttClient.md#blockstransactionraw)
- [blocksTransaction](MqttClient.md#blockstransaction)
- [blocksTransactionTaggedDataRaw](MqttClient.md#blockstransactiontaggeddataraw)
- [blocksTransactionTaggedData](MqttClient.md#blockstransactiontaggeddata)
- [milestoneRaw](MqttClient.md#milestoneraw)
- [milestone](MqttClient.md#milestone)
- [blocksTaggedRaw](MqttClient.md#blockstaggedraw)
- [blocksTagged](MqttClient.md#blockstagged)
- [blocksMetadata](MqttClient.md#blocksmetadata)
- [transactionIncludedBlockRaw](MqttClient.md#transactionincludedblockraw)
- [transactionIncludedBlock](MqttClient.md#transactionincludedblock)
- [output](MqttClient.md#output)
- [nft](MqttClient.md#nft)
- [alias](MqttClient.md#alias)
- [foundry](MqttClient.md#foundry)
- [outputByConditionAndAddress](MqttClient.md#outputbyconditionandaddress)
- [outputSpentByConditionAndAddress](MqttClient.md#outputspentbyconditionandaddress)
- [receipts](MqttClient.md#receipts)
- [subscribeRaw](MqttClient.md#subscriberaw)
- [subscribeJson](MqttClient.md#subscribejson)
- [unsubscribe](MqttClient.md#unsubscribe)
- [statusChanged](MqttClient.md#statuschanged)

## Constructors

### constructor

• **new MqttClient**(`endpoints`, `keepAliveTimeoutSeconds?`)

Create a new instace of MqttClient.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `endpoints` | `string` \| `string`[] | `undefined` | The endpoint or endpoints list to connect to. |
| `keepAliveTimeoutSeconds` | `number` | `30` | Timeout to reconnect if no messages received. |

## Methods

### milestonesLatest

▸ **milestonesLatest**(`callback`): `string`

Subscribe to the latest milestone updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMqttMilestoneResponse`](../interfaces/IMqttMilestoneResponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[milestonesLatest](../interfaces/IMqttClient.md#milestoneslatest)

___

### milestonesConfirmed

▸ **milestonesConfirmed**(`callback`): `string`

Subscribe to the latest confirmed milestone updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMqttMilestoneResponse`](../interfaces/IMqttMilestoneResponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[milestonesConfirmed](../interfaces/IMqttClient.md#milestonesconfirmed)

___

### blocksRaw

▸ **blocksRaw**(`callback`): `string`

Subscribe to get all blocks in binary form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksRaw](../interfaces/IMqttClient.md#blocksraw)

___

### blocks

▸ **blocks**(`callback`): `string`

Subscribe to get all blocks in object form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `IBlock`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocks](../interfaces/IMqttClient.md#blocks)

___

### blocksReferenced

▸ **blocksReferenced**(`callback`): `string`

Subscribe to get the metadata for all the blocks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `IBlockMetadata`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksReferenced](../interfaces/IMqttClient.md#blocksreferenced)

___

### blocksTransactionRaw

▸ **blocksTransactionRaw**(`callback`): `string`

Subscribe to all transaction blocks in their raw form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksTransactionRaw](../interfaces/IMqttClient.md#blockstransactionraw)

___

### blocksTransaction

▸ **blocksTransaction**(`callback`): `string`

Subscribe to all transaction blocks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `IBlock`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksTransaction](../interfaces/IMqttClient.md#blockstransaction)

___

### blocksTransactionTaggedDataRaw

▸ **blocksTransactionTaggedDataRaw**(`tag`, `callback`): `string`

Subscribe to transaction blocks with tagged data in their raw form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `undefined` \| `string` \| `Uint8Array` | The tag to monitor as bytes or in hex, undefined for all blocks. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksTransactionTaggedDataRaw](../interfaces/IMqttClient.md#blockstransactiontaggeddataraw)

___

### blocksTransactionTaggedData

▸ **blocksTransactionTaggedData**(`tag`, `callback`): `string`

Subscribe to all transaction blocks with tagged data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `undefined` \| `string` \| `Uint8Array` | The tag to monitor as bytes or in hex, undefined for all blocks. |
| `callback` | (`topic`: `string`, `data`: `IBlock`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksTransactionTaggedData](../interfaces/IMqttClient.md#blockstransactiontaggeddata)

___

### milestoneRaw

▸ **milestoneRaw**(`callback`): `string`

Subscribe to all milestone payloads in their raw form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[milestoneRaw](../interfaces/IMqttClient.md#milestoneraw)

___

### milestone

▸ **milestone**(`callback`): `string`

Subscribe to all milestone payloads.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `IMilestonePayload`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[milestone](../interfaces/IMqttClient.md#milestone)

___

### blocksTaggedRaw

▸ **blocksTaggedRaw**(`tag`, `callback`): `string`

Subscribe to get all blocks for the specified tag in binary form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `undefined` \| `string` \| `Uint8Array` | The tag to monitor as bytes or in hex, undefined for all blocks. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksTaggedRaw](../interfaces/IMqttClient.md#blockstaggedraw)

___

### blocksTagged

▸ **blocksTagged**(`tag`, `callback`): `string`

Subscribe to get all blocks for the specified tag in object form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `undefined` \| `string` \| `Uint8Array` | The tag to monitor as bytes or in hex, undefined for all blocks. |
| `callback` | (`topic`: `string`, `data`: `IBlock`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksTagged](../interfaces/IMqttClient.md#blockstagged)

___

### blocksMetadata

▸ **blocksMetadata**(`blockId`, `callback`): `string`

Subscribe to metadata updates for a specific block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `string` | The block to monitor. |
| `callback` | (`topic`: `string`, `data`: `IBlockMetadata`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[blocksMetadata](../interfaces/IMqttClient.md#blocksmetadata)

___

### transactionIncludedBlockRaw

▸ **transactionIncludedBlockRaw**(`transactionId`, `callback`): `string`

Subscribe to block updates for a specific transactionId.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The block to monitor. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[transactionIncludedBlockRaw](../interfaces/IMqttClient.md#transactionincludedblockraw)

___

### transactionIncludedBlock

▸ **transactionIncludedBlock**(`transactionId`, `callback`): `string`

Subscribe to block updates for a specific transactionId.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The block to monitor. |
| `callback` | (`topic`: `string`, `data`: `IBlock`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[transactionIncludedBlock](../interfaces/IMqttClient.md#transactionincludedblock)

___

### output

▸ **output**(`outputId`, `callback`): `string`

Subscribe to updates for a specific output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The output to monitor. |
| `callback` | (`topic`: `string`, `data`: `IOutputResponse`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[output](../interfaces/IMqttClient.md#output)

___

### nft

▸ **nft**(`nftId`, `callback`): `string`

Subscribe to updates for an nft output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftId` | `string` | The Nft output to monitor. |
| `callback` | (`topic`: `string`, `data`: `IOutputResponse`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[nft](../interfaces/IMqttClient.md#nft)

___

### alias

▸ **alias**(`aliasId`, `callback`): `string`

Subscribe to updates for an alias output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aliasId` | `string` | The alias output to monitor. |
| `callback` | (`topic`: `string`, `data`: `IOutputResponse`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[alias](../interfaces/IMqttClient.md#alias)

___

### foundry

▸ **foundry**(`foundryId`, `callback`): `string`

Subscribe to updates for a foundry output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `foundryId` | `string` | The foundry output to monitor. |
| `callback` | (`topic`: `string`, `data`: `IOutputResponse`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[foundry](../interfaces/IMqttClient.md#foundry)

___

### outputByConditionAndAddress

▸ **outputByConditionAndAddress**(`condition`, `addressBech32`, `callback`): `string`

Subscribe to the output with specific unlock condition and address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `string` | The condition to monitor. |
| `addressBech32` | `string` | The address to monitor. |
| `callback` | (`topic`: `string`, `data`: `IOutputResponse`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[outputByConditionAndAddress](../interfaces/IMqttClient.md#outputbyconditionandaddress)

___

### outputSpentByConditionAndAddress

▸ **outputSpentByConditionAndAddress**(`condition`, `addressBech32`, `callback`): `string`

Subscribe to the spent outputs with specific unlock condition and address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `string` | The condition to monitor. |
| `addressBech32` | `string` | The address to monitor. |
| `callback` | (`topic`: `string`, `data`: `IOutputResponse`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[outputSpentByConditionAndAddress](../interfaces/IMqttClient.md#outputspentbyconditionandaddress)

___

### receipts

▸ **receipts**(`callback`): `string`

Subscribe to the receive all receipts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `IReceiptsResponse`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[receipts](../interfaces/IMqttClient.md#receipts)

___

### subscribeRaw

▸ **subscribeRaw**(`customTopic`, `callback`): `string`

Subscribe to another type of message as raw data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customTopic` | `string` | The topic to subscribe to. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[subscribeRaw](../interfaces/IMqttClient.md#subscriberaw)

___

### subscribeJson

▸ **subscribeJson**<`T`\>(`customTopic`, `callback`): `string`

Subscribe to another type of message as json.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customTopic` | `string` | The topic to subscribe to. |
| `callback` | (`topic`: `string`, `data`: `T`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[subscribeJson](../interfaces/IMqttClient.md#subscribejson)

___

### unsubscribe

▸ **unsubscribe**(`subscriptionId`): `void`

Remove a subscription.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriptionId` | `string` | The subscription to remove. |

#### Returns

`void`

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[unsubscribe](../interfaces/IMqttClient.md#unsubscribe)

___

### statusChanged

▸ **statusChanged**(`callback`): `string`

Subscribe to changes in the client state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`data`: [`IMqttStatus`](../interfaces/IMqttStatus.md)) => `void` | Callback called when the state has changed. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/IMqttClient.md).[statusChanged](../interfaces/IMqttClient.md#statuschanged)
