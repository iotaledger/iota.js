# Class: SingleNodeClient

Client for API communication.

## Implements

- [`IClient`](../interfaces/IClient.md)

## Table of contents

### Constructors

- [constructor](SingleNodeClient.md#constructor)

### Methods

- [health](SingleNodeClient.md#health)
- [routes](SingleNodeClient.md#routes)
- [info](SingleNodeClient.md#info)
- [tips](SingleNodeClient.md#tips)
- [block](SingleNodeClient.md#block)
- [blockMetadata](SingleNodeClient.md#blockmetadata)
- [blockRaw](SingleNodeClient.md#blockraw)
- [blockSubmit](SingleNodeClient.md#blocksubmit)
- [blockSubmitRaw](SingleNodeClient.md#blocksubmitraw)
- [transactionIncludedBlock](SingleNodeClient.md#transactionincludedblock)
- [transactionIncludedBlockRaw](SingleNodeClient.md#transactionincludedblockraw)
- [output](SingleNodeClient.md#output)
- [outputMetadata](SingleNodeClient.md#outputmetadata)
- [outputRaw](SingleNodeClient.md#outputraw)
- [milestoneByIndex](SingleNodeClient.md#milestonebyindex)
- [milestoneByIndexRaw](SingleNodeClient.md#milestonebyindexraw)
- [milestoneUtxoChangesByIndex](SingleNodeClient.md#milestoneutxochangesbyindex)
- [milestoneById](SingleNodeClient.md#milestonebyid)
- [milestoneByIdRaw](SingleNodeClient.md#milestonebyidraw)
- [milestoneUtxoChangesById](SingleNodeClient.md#milestoneutxochangesbyid)
- [treasury](SingleNodeClient.md#treasury)
- [receipts](SingleNodeClient.md#receipts)
- [peers](SingleNodeClient.md#peers)
- [peerAdd](SingleNodeClient.md#peeradd)
- [peerDelete](SingleNodeClient.md#peerdelete)
- [peer](SingleNodeClient.md#peer)
- [protocolInfo](SingleNodeClient.md#protocolinfo)
- [pluginFetch](SingleNodeClient.md#pluginfetch)

## Constructors

### constructor

• **new SingleNodeClient**(`endpoint`, `options?`)

Create a new instance of client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The endpoint. |
| `options?` | [`SingleNodeClientOptions`](../interfaces/SingleNodeClientOptions.md) | Options for the client. |

## Methods

### health

▸ **health**(): `Promise`<`boolean`\>

Get the health of the node.

#### Returns

`Promise`<`boolean`\>

True if the node is healthy.

#### Implementation of

IClient.health

___

### routes

▸ **routes**(): `Promise`<[`IRoutesResponse`](../interfaces/IRoutesResponse.md)\>

Get the routes the node exposes.

#### Returns

`Promise`<[`IRoutesResponse`](../interfaces/IRoutesResponse.md)\>

The routes.

#### Implementation of

IClient.routes

___

### info

▸ **info**(): `Promise`<[`INodeInfo`](../interfaces/INodeInfo.md)\>

Get the info about the node.

#### Returns

`Promise`<[`INodeInfo`](../interfaces/INodeInfo.md)\>

The node information.

#### Implementation of

IClient.info

___

### tips

▸ **tips**(): `Promise`<[`ITipsResponse`](../interfaces/ITipsResponse.md)\>

Get the tips from the node.

#### Returns

`Promise`<[`ITipsResponse`](../interfaces/ITipsResponse.md)\>

The tips.

#### Implementation of

IClient.tips

___

### block

▸ **block**(`blockId`): `Promise`<[`IBlock`](../interfaces/IBlock.md)\>

Get the block data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `string` | The block to get the data for. |

#### Returns

`Promise`<[`IBlock`](../interfaces/IBlock.md)\>

The block data.

#### Implementation of

IClient.block

___

### blockMetadata

▸ **blockMetadata**(`blockId`): `Promise`<[`IBlockMetadata`](../interfaces/IBlockMetadata.md)\>

Get the block metadata by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `string` | The block to get the metadata for. |

#### Returns

`Promise`<[`IBlockMetadata`](../interfaces/IBlockMetadata.md)\>

The block metadata.

#### Implementation of

IClient.blockMetadata

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

#### Implementation of

IClient.blockRaw

___

### blockSubmit

▸ **blockSubmit**(`blockPartial`): `Promise`<`string`\>

Submit block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockPartial` | `Object` | The block to submit (possibly contains only partial block data). |
| `blockPartial.protocolVersion?` | `number` | The protocol version under which this block operates. |
| `blockPartial.parents?` | `string`[] | The parent block ids. |
| `blockPartial.payload?` | [`IMilestonePayload`](../interfaces/IMilestonePayload.md) \| [`ITaggedDataPayload`](../interfaces/ITaggedDataPayload.md) \| [`ITransactionPayload`](../interfaces/ITransactionPayload.md) | The payload contents. |
| `blockPartial.nonce?` | `string` | The nonce for the block. |

#### Returns

`Promise`<`string`\>

The blockId.

#### Implementation of

IClient.blockSubmit

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

#### Implementation of

IClient.blockSubmitRaw

___

### transactionIncludedBlock

▸ **transactionIncludedBlock**(`transactionId`): `Promise`<[`IBlock`](../interfaces/IBlock.md)\>

Get the block that was included in the ledger for a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The id of the transaction to get the included block for. |

#### Returns

`Promise`<[`IBlock`](../interfaces/IBlock.md)\>

The block.

#### Implementation of

IClient.transactionIncludedBlock

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

#### Implementation of

IClient.transactionIncludedBlockRaw

___

### output

▸ **output**(`outputId`): `Promise`<[`IOutputResponse`](../interfaces/IOutputResponse.md)\>

Get an output by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get. |

#### Returns

`Promise`<[`IOutputResponse`](../interfaces/IOutputResponse.md)\>

The output details.

#### Implementation of

IClient.output

___

### outputMetadata

▸ **outputMetadata**(`outputId`): `Promise`<[`IOutputMetadataResponse`](../interfaces/IOutputMetadataResponse.md)\>

Get an outputs metadata by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get the metadata for. |

#### Returns

`Promise`<[`IOutputMetadataResponse`](../interfaces/IOutputMetadataResponse.md)\>

The output metadata.

#### Implementation of

IClient.outputMetadata

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

The output raw bytes.

#### Implementation of

IClient.outputRaw

___

### milestoneByIndex

▸ **milestoneByIndex**(`index`): `Promise`<[`IMilestonePayload`](../interfaces/IMilestonePayload.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to look up. |

#### Returns

`Promise`<[`IMilestonePayload`](../interfaces/IMilestonePayload.md)\>

The milestone payload.

#### Implementation of

IClient.milestoneByIndex

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

#### Implementation of

IClient.milestoneByIndexRaw

___

### milestoneUtxoChangesByIndex

▸ **milestoneUtxoChangesByIndex**(`index`): `Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to request the changes for. |

#### Returns

`Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/IMilestoneUtxoChangesResponse.md)\>

The milestone utxo changes details.

#### Implementation of

IClient.milestoneUtxoChangesByIndex

___

### milestoneById

▸ **milestoneById**(`milestoneId`): `Promise`<[`IMilestonePayload`](../interfaces/IMilestonePayload.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milestoneId` | `string` | The id of the milestone to look up. |

#### Returns

`Promise`<[`IMilestonePayload`](../interfaces/IMilestonePayload.md)\>

The milestone payload.

#### Implementation of

IClient.milestoneById

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

#### Implementation of

IClient.milestoneByIdRaw

___

### milestoneUtxoChangesById

▸ **milestoneUtxoChangesById**(`milestoneId`): `Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milestoneId` | `string` | The id of the milestone to request the changes for. |

#### Returns

`Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/IMilestoneUtxoChangesResponse.md)\>

The milestone utxo changes details.

#### Implementation of

IClient.milestoneUtxoChangesById

___

### treasury

▸ **treasury**(): `Promise`<[`ITreasury`](../interfaces/ITreasury.md)\>

Get the current treasury output.

#### Returns

`Promise`<[`ITreasury`](../interfaces/ITreasury.md)\>

The details for the treasury.

#### Implementation of

IClient.treasury

___

### receipts

▸ **receipts**(`migratedAt?`): `Promise`<[`IReceiptsResponse`](../interfaces/IReceiptsResponse.md)\>

Get all the stored receipts or those for a given migrated at index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `migratedAt?` | `number` | The index the receipts were migrated at, if not supplied returns all stored receipts. |

#### Returns

`Promise`<[`IReceiptsResponse`](../interfaces/IReceiptsResponse.md)\>

The stored receipts.

#### Implementation of

IClient.receipts

___

### peers

▸ **peers**(): `Promise`<[`IPeer`](../interfaces/IPeer.md)[]\>

Get the list of peers.

#### Returns

`Promise`<[`IPeer`](../interfaces/IPeer.md)[]\>

The list of peers.

#### Implementation of

IClient.peers

___

### peerAdd

▸ **peerAdd**(`multiAddress`, `alias?`): `Promise`<[`IPeer`](../interfaces/IPeer.md)\>

Add a new peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiAddress` | `string` | The address of the peer to add. |
| `alias?` | `string` | An optional alias for the peer. |

#### Returns

`Promise`<[`IPeer`](../interfaces/IPeer.md)\>

The details for the created peer.

#### Implementation of

IClient.peerAdd

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

#### Implementation of

IClient.peerDelete

___

### peer

▸ **peer**(`peerId`): `Promise`<[`IPeer`](../interfaces/IPeer.md)\>

Get a peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `string` | The peer to delete. |

#### Returns

`Promise`<[`IPeer`](../interfaces/IPeer.md)\>

The details for the created peer.

#### Implementation of

IClient.peer

___

### protocolInfo

▸ **protocolInfo**(): `Promise`<{ `networkName`: `string` ; `networkId`: `string` ; `bech32Hrp`: `string` ; `minPowScore`: `number`  }\>

Get the protocol info from the node.

#### Returns

`Promise`<{ `networkName`: `string` ; `networkId`: `string` ; `bech32Hrp`: `string` ; `minPowScore`: `number`  }\>

The protocol info.

#### Implementation of

IClient.protocolInfo

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

#### Implementation of

IClient.pluginFetch
