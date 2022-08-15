---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IClient

Client interface definition for API communication.

## Implemented by

- [`SingleNodeClient`](../classes/SingleNodeClient.md)

## Table of contents

### Methods

- [health](IClient.md#health)
- [routes](IClient.md#routes)
- [info](IClient.md#info)
- [tips](IClient.md#tips)
- [block](IClient.md#block)
- [blockMetadata](IClient.md#blockmetadata)
- [blockRaw](IClient.md#blockraw)
- [blockSubmit](IClient.md#blocksubmit)
- [blockSubmitRaw](IClient.md#blocksubmitraw)
- [transactionIncludedBlock](IClient.md#transactionincludedblock)
- [transactionIncludedBlockRaw](IClient.md#transactionincludedblockraw)
- [output](IClient.md#output)
- [outputMetadata](IClient.md#outputmetadata)
- [outputRaw](IClient.md#outputraw)
- [milestoneByIndex](IClient.md#milestonebyindex)
- [milestoneByIndexRaw](IClient.md#milestonebyindexraw)
- [milestoneUtxoChangesByIndex](IClient.md#milestoneutxochangesbyindex)
- [milestoneById](IClient.md#milestonebyid)
- [milestoneByIdRaw](IClient.md#milestonebyidraw)
- [milestoneUtxoChangesById](IClient.md#milestoneutxochangesbyid)
- [treasury](IClient.md#treasury)
- [receipts](IClient.md#receipts)
- [peers](IClient.md#peers)
- [peerAdd](IClient.md#peeradd)
- [peerDelete](IClient.md#peerdelete)
- [peer](IClient.md#peer)
- [protocolInfo](IClient.md#protocolinfo)
- [pluginFetch](IClient.md#pluginfetch)

## Methods

### health

▸ **health**(): `Promise`<`boolean`\>

Get the health of the node.

#### Returns

`Promise`<`boolean`\>

True if the node is healthy.

___

### routes

▸ **routes**(): `Promise`<[`IRoutesResponse`](IRoutesResponse.md)\>

Get the routes the node exposes.

#### Returns

`Promise`<[`IRoutesResponse`](IRoutesResponse.md)\>

The routes.

___

### info

▸ **info**(): `Promise`<[`INodeInfo`](INodeInfo.md)\>

Get the info about the node.

#### Returns

`Promise`<[`INodeInfo`](INodeInfo.md)\>

The node information.

___

### tips

▸ **tips**(): `Promise`<[`ITipsResponse`](ITipsResponse.md)\>

Get the tips from the node.

#### Returns

`Promise`<[`ITipsResponse`](ITipsResponse.md)\>

The tips.

___

### block

▸ **block**(`blockId`): `Promise`<[`IBlock`](IBlock.md)\>

Get the block data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `string` | The block to get the data for. |

#### Returns

`Promise`<[`IBlock`](IBlock.md)\>

The block data.

___

### blockMetadata

▸ **blockMetadata**(`blockId`): `Promise`<[`IBlockMetadata`](IBlockMetadata.md)\>

Get the block metadata by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `string` | The block to get the metadata for. |

#### Returns

`Promise`<[`IBlockMetadata`](IBlockMetadata.md)\>

The block metadata.

___

### blockRaw

▸ **blockRaw**(`blockId`): `Promise`<`Uint8Array`\>

Get the block raw data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `string` | The block to get the data for. |

#### Returns

`Promise`<`Uint8Array`\>

The block raw data.

___

### blockSubmit

▸ **blockSubmit**(`blockPartial`): `Promise`<`string`\>

Submit block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockPartial` | `Object` | The block to submit (possibly contains only partial block data). |

#### Returns

`Promise`<`string`\>

The blockId.

___

### blockSubmitRaw

▸ **blockSubmitRaw**(`block`): `Promise`<`string`\>

Submit block in raw format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `Uint8Array` | The block to submit. |

#### Returns

`Promise`<`string`\>

The blockId.

___

### transactionIncludedBlock

▸ **transactionIncludedBlock**(`transactionId`): `Promise`<[`IBlock`](IBlock.md)\>

Get the block that was included in the ledger for a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The id of the transaction to get the included block for. |

#### Returns

`Promise`<[`IBlock`](IBlock.md)\>

The block.

___

### transactionIncludedBlockRaw

▸ **transactionIncludedBlockRaw**(`transactionId`): `Promise`<`Uint8Array`\>

Get raw block that was included in the ledger for a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The id of the transaction to get the included block for. |

#### Returns

`Promise`<`Uint8Array`\>

The block.

___

### output

▸ **output**(`outputId`): `Promise`<[`IOutputResponse`](IOutputResponse.md)\>

Get an output by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get. |

#### Returns

`Promise`<[`IOutputResponse`](IOutputResponse.md)\>

The output details.

___

### outputMetadata

▸ **outputMetadata**(`outputId`): `Promise`<[`IOutputMetadataResponse`](IOutputMetadataResponse.md)\>

Get an outputs metadata by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get the metadata for. |

#### Returns

`Promise`<[`IOutputMetadataResponse`](IOutputMetadataResponse.md)\>

The output metadata.

___

### outputRaw

▸ **outputRaw**(`outputId`): `Promise`<`Uint8Array`\>

Get an outputs raw data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get the raw data for. |

#### Returns

`Promise`<`Uint8Array`\>

The output metadata.

___

### milestoneByIndex

▸ **milestoneByIndex**(`index`): `Promise`<[`IMilestonePayload`](IMilestonePayload.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to look up. |

#### Returns

`Promise`<[`IMilestonePayload`](IMilestonePayload.md)\>

The milestone payload.

___

### milestoneByIndexRaw

▸ **milestoneByIndexRaw**(`index`): `Promise`<`Uint8Array`\>

Get the requested milestone raw.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to look up. |

#### Returns

`Promise`<`Uint8Array`\>

The milestone payload raw.

___

### milestoneUtxoChangesByIndex

▸ **milestoneUtxoChangesByIndex**(`index`): `Promise`<[`IMilestoneUtxoChangesResponse`](IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to request the changes for. |

#### Returns

`Promise`<[`IMilestoneUtxoChangesResponse`](IMilestoneUtxoChangesResponse.md)\>

The milestone utxo changes details.

___

### milestoneById

▸ **milestoneById**(`milestoneId`): `Promise`<[`IMilestonePayload`](IMilestonePayload.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milestoneId` | `string` | The id of the milestone to look up. |

#### Returns

`Promise`<[`IMilestonePayload`](IMilestonePayload.md)\>

The milestone payload.

___

### milestoneByIdRaw

▸ **milestoneByIdRaw**(`milestoneId`): `Promise`<`Uint8Array`\>

Get the requested milestone raw.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milestoneId` | `string` | The id of the milestone to look up. |

#### Returns

`Promise`<`Uint8Array`\>

The milestone payload raw.

___

### milestoneUtxoChangesById

▸ **milestoneUtxoChangesById**(`milestoneId`): `Promise`<[`IMilestoneUtxoChangesResponse`](IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milestoneId` | `string` | The id of the milestone to request the changes for. |

#### Returns

`Promise`<[`IMilestoneUtxoChangesResponse`](IMilestoneUtxoChangesResponse.md)\>

The milestone utxo changes details.

___

### treasury

▸ **treasury**(): `Promise`<[`ITreasury`](ITreasury.md)\>

Get the current treasury output.

#### Returns

`Promise`<[`ITreasury`](ITreasury.md)\>

The details for the treasury.

___

### receipts

▸ **receipts**(`migratedAt?`): `Promise`<[`IReceiptsResponse`](IReceiptsResponse.md)\>

Get all the stored receipts or those for a given migrated at index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `migratedAt?` | `number` | The index the receipts were migrated at, if not supplied returns all stored receipts. |

#### Returns

`Promise`<[`IReceiptsResponse`](IReceiptsResponse.md)\>

The stored receipts.

___

### peers

▸ **peers**(): `Promise`<[`IPeer`](IPeer.md)[]\>

Get the list of peers.

#### Returns

`Promise`<[`IPeer`](IPeer.md)[]\>

The list of peers.

___

### peerAdd

▸ **peerAdd**(`multiAddress`, `alias?`): `Promise`<[`IPeer`](IPeer.md)\>

Add a new peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiAddress` | `string` | The address of the peer to add. |
| `alias?` | `string` | An optional alias for the peer. |

#### Returns

`Promise`<[`IPeer`](IPeer.md)\>

The details for the created peer.

___

### peerDelete

▸ **peerDelete**(`peerId`): `Promise`<`void`\>

Delete a peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `string` | The peer to delete. |

#### Returns

`Promise`<`void`\>

Nothing.

___

### peer

▸ **peer**(`peerId`): `Promise`<[`IPeer`](IPeer.md)\>

Get a peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `string` | The peer to delete. |

#### Returns

`Promise`<[`IPeer`](IPeer.md)\>

The details for the created peer.

___

### protocolInfo

▸ **protocolInfo**(): `Promise`<{ `networkName`: `string` ; `networkId`: `string` ; `bech32Hrp`: `string` ; `minPowScore`: `number`  }\>

Get the protocol info from the node.

#### Returns

`Promise`<{ `networkName`: `string` ; `networkId`: `string` ; `bech32Hrp`: `string` ; `minPowScore`: `number`  }\>

The protocol info.

___

### pluginFetch

▸ **pluginFetch**<`T`, `S`\>(`basePluginPath`, `method`, `methodPath`, `queryParams?`, `request?`): `Promise`<`S`\>

Extension method which provides request methods for plugins.

#### Type parameters

| Name |
| :------ |
| `T` |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `basePluginPath` | `string` | The base path for the plugin eg indexer/v1/ . |
| `method` | ``"get"`` \| ``"post"`` \| ``"delete"`` | The http method. |
| `methodPath` | `string` | The path for the plugin request. |
| `queryParams?` | `string`[] | Additional query params for the request. |
| `request?` | `T` | The request object. |

#### Returns

`Promise`<`S`\>

The response object.
