---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IMqttClient

Client interface definition for API communication.

## Implemented by

- [`MqttClient`](../classes/MqttClient.md)

## Table of contents

### Methods

- [milestonesLatest](IMqttClient.md#milestoneslatest)
- [milestonesConfirmed](IMqttClient.md#milestonesconfirmed)
- [blocksRaw](IMqttClient.md#blocksraw)
- [blocks](IMqttClient.md#blocks)
- [blocksReferenced](IMqttClient.md#blocksreferenced)
- [blocksTransactionRaw](IMqttClient.md#blockstransactionraw)
- [blocksTransaction](IMqttClient.md#blockstransaction)
- [blocksTransactionTaggedDataRaw](IMqttClient.md#blockstransactiontaggeddataraw)
- [blocksTransactionTaggedData](IMqttClient.md#blockstransactiontaggeddata)
- [milestoneRaw](IMqttClient.md#milestoneraw)
- [milestone](IMqttClient.md#milestone)
- [blocksTaggedRaw](IMqttClient.md#blockstaggedraw)
- [blocksTagged](IMqttClient.md#blockstagged)
- [blocksMetadata](IMqttClient.md#blocksmetadata)
- [transactionIncludedBlockRaw](IMqttClient.md#transactionincludedblockraw)
- [transactionIncludedBlock](IMqttClient.md#transactionincludedblock)
- [output](IMqttClient.md#output)
- [nft](IMqttClient.md#nft)
- [alias](IMqttClient.md#alias)
- [foundry](IMqttClient.md#foundry)
- [outputByConditionAndAddress](IMqttClient.md#outputbyconditionandaddress)
- [outputSpentByConditionAndAddress](IMqttClient.md#outputspentbyconditionandaddress)
- [receipts](IMqttClient.md#receipts)
- [subscribeRaw](IMqttClient.md#subscriberaw)
- [subscribeJson](IMqttClient.md#subscribejson)
- [unsubscribe](IMqttClient.md#unsubscribe)
- [statusChanged](IMqttClient.md#statuschanged)

## Methods

### milestonesLatest

▸ **milestonesLatest**(`callback`): `string`

Subscribe to the latest milestone updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMqttMilestoneResponse`](IMqttMilestoneResponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

___

### milestonesConfirmed

▸ **milestonesConfirmed**(`callback`): `string`

Subscribe to the latest confirmed milestone updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMqttMilestoneResponse`](IMqttMilestoneResponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

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

___

### blocksTransactionTaggedDataRaw

▸ **blocksTransactionTaggedDataRaw**(`tag`, `callback`): `string`

Subscribe to transaction blocks with tagged data in their raw form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `undefined` \| `string` \| `Uint8Array` | The tag to look for, or all tagged transactions if undefined. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

___

### blocksTransactionTaggedData

▸ **blocksTransactionTaggedData**(`tag`, `callback`): `string`

Subscribe to all transaction blocks with tagged data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `undefined` \| `string` \| `Uint8Array` | The tag to look for, or all tagged transactions if undefined. |
| `callback` | (`topic`: `string`, `data`: `IBlock`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

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

___

### subscribeRaw

▸ **subscribeRaw**(`customTopic`, `callback`): `string`

Subscribe to another type of block as raw data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customTopic` | `string` | The topic to subscribe to. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

___

### subscribeJson

▸ **subscribeJson**<`T`\>(`customTopic`, `callback`): `string`

Subscribe to another type of block as json.

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

___

### statusChanged

▸ **statusChanged**(`callback`): `string`

Subscribe to changes in the client state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`status`: [`IMqttStatus`](IMqttStatus.md)) => `void` | Callback called when the state has changed. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.
