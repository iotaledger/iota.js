# Interface: IClient

Client interface definition for API communication.

## Implemented by

- [`SingleNodeClient`](../classes/SingleNodeClient.md)

## Table of contents

### Methods

- [health](IClient.md#health)
- [info](IClient.md#info)
- [tips](IClient.md#tips)
- [message](IClient.md#message)
- [messageMetadata](IClient.md#messagemetadata)
- [messageRaw](IClient.md#messageraw)
- [messageSubmit](IClient.md#messagesubmit)
- [messageSubmitRaw](IClient.md#messagesubmitraw)
- [messageChildren](IClient.md#messagechildren)
- [transactionIncludedMessage](IClient.md#transactionincludedmessage)
- [output](IClient.md#output)
- [outputMetadata](IClient.md#outputmetadata)
- [outputRaw](IClient.md#outputraw)
- [milestoneByIndex](IClient.md#milestonebyindex)
- [milestoneUtxoChangesByIndex](IClient.md#milestoneutxochangesbyindex)
- [milestoneById](IClient.md#milestonebyid)
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

### message

▸ **message**(`messageId`): `Promise`<[`IMessage`](IMessage.md)\>

Get the message data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the data for. |

#### Returns

`Promise`<[`IMessage`](IMessage.md)\>

The message data.

___

### messageMetadata

▸ **messageMetadata**(`messageId`): `Promise`<[`IMessageMetadata`](IMessageMetadata.md)\>

Get the message metadata by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the metadata for. |

#### Returns

`Promise`<[`IMessageMetadata`](IMessageMetadata.md)\>

The message metadata.

___

### messageRaw

▸ **messageRaw**(`messageId`): `Promise`<`Uint8Array`\>

Get the message raw data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the data for. |

#### Returns

`Promise`<`Uint8Array`\>

The message raw data.

___

### messageSubmit

▸ **messageSubmit**(`message`): `Promise`<`string`\>

Submit message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`IMessage`](IMessage.md) | The message to submit. |

#### Returns

`Promise`<`string`\>

The messageId.

___

### messageSubmitRaw

▸ **messageSubmitRaw**(`message`): `Promise`<`string`\>

Submit message in raw format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The message to submit. |

#### Returns

`Promise`<`string`\>

The messageId.

___

### messageChildren

▸ **messageChildren**(`messageId`): `Promise`<[`IChildrenResponse`](IChildrenResponse.md)\>

Get the children of a message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The id of the message to get the children for. |

#### Returns

`Promise`<[`IChildrenResponse`](IChildrenResponse.md)\>

The messages children.

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`): `Promise`<[`IMessage`](IMessage.md)\>

Get the message that was included in the ledger for a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The id of the transaction to get the included message for. |

#### Returns

`Promise`<[`IMessage`](IMessage.md)\>

The message.

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

▸ **milestoneByIndex**(`index`): `Promise`<[`IMilestoneResponse`](IMilestoneResponse.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to get. |

#### Returns

`Promise`<[`IMilestoneResponse`](IMilestoneResponse.md)\>

The milestone details.

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

▸ **milestoneById**(`milestoneId`): `Promise`<[`IMilestoneResponse`](IMilestoneResponse.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milestoneId` | `number` | The id of the milestone to get. |

#### Returns

`Promise`<[`IMilestoneResponse`](IMilestoneResponse.md)\>

The milestone details.

___

### milestoneUtxoChangesById

▸ **milestoneUtxoChangesById**(`milestoneId`): `Promise`<[`IMilestoneUtxoChangesResponse`](IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milestoneId` | `number` | The id of the milestone to request the changes for. |

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

▸ **protocolInfo**(): `Promise`<{ `networkName`: `string` ; `networkId`: `string` ; `bech32HRP`: `string` ; `minPoWScore`: `number`  }\>

Get the protocol info from the node.

#### Returns

`Promise`<{ `networkName`: `string` ; `networkId`: `string` ; `bech32HRP`: `string` ; `minPoWScore`: `number`  }\>

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
