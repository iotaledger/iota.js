# Class: SingleNodeClient

Client for API communication.

## Implements

- [`IClient`](../interfaces/IClient.md)

## Table of contents

### Constructors

- [constructor](SingleNodeClient.md#constructor)

### Methods

- [health](SingleNodeClient.md#health)
- [info](SingleNodeClient.md#info)
- [tips](SingleNodeClient.md#tips)
- [message](SingleNodeClient.md#message)
- [messageMetadata](SingleNodeClient.md#messagemetadata)
- [messageRaw](SingleNodeClient.md#messageraw)
- [messageSubmit](SingleNodeClient.md#messagesubmit)
- [messageSubmitRaw](SingleNodeClient.md#messagesubmitraw)
- [messageChildren](SingleNodeClient.md#messagechildren)
- [transactionIncludedMessage](SingleNodeClient.md#transactionincludedmessage)
- [output](SingleNodeClient.md#output)
- [milestone](SingleNodeClient.md#milestone)
- [milestoneUtxoChanges](SingleNodeClient.md#milestoneutxochanges)
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

[IClient](../interfaces/IClient.md).[health](../interfaces/IClient.md#health)

___

### info

▸ **info**(): `Promise`<[`INodeInfo`](../interfaces/INodeInfo.md)\>

Get the info about the node.

#### Returns

`Promise`<[`INodeInfo`](../interfaces/INodeInfo.md)\>

The node information.

#### Implementation of

[IClient](../interfaces/IClient.md).[info](../interfaces/IClient.md#info)

___

### tips

▸ **tips**(): `Promise`<[`ITipsResponse`](../interfaces/ITipsResponse.md)\>

Get the tips from the node.

#### Returns

`Promise`<[`ITipsResponse`](../interfaces/ITipsResponse.md)\>

The tips.

#### Implementation of

[IClient](../interfaces/IClient.md).[tips](../interfaces/IClient.md#tips)

___

### message

▸ **message**(`messageId`): `Promise`<[`IMessage`](../interfaces/IMessage.md)\>

Get the message data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the data for. |

#### Returns

`Promise`<[`IMessage`](../interfaces/IMessage.md)\>

The message data.

#### Implementation of

[IClient](../interfaces/IClient.md).[message](../interfaces/IClient.md#message)

___

### messageMetadata

▸ **messageMetadata**(`messageId`): `Promise`<[`IMessageMetadata`](../interfaces/IMessageMetadata.md)\>

Get the message metadata by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the metadata for. |

#### Returns

`Promise`<[`IMessageMetadata`](../interfaces/IMessageMetadata.md)\>

The message metadata.

#### Implementation of

[IClient](../interfaces/IClient.md).[messageMetadata](../interfaces/IClient.md#messagemetadata)

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

#### Implementation of

[IClient](../interfaces/IClient.md).[messageRaw](../interfaces/IClient.md#messageraw)

___

### messageSubmit

▸ **messageSubmit**(`message`): `Promise`<`string`\>

Submit message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`IMessage`](../interfaces/IMessage.md) | The message to submit. |

#### Returns

`Promise`<`string`\>

The messageId.

#### Implementation of

[IClient](../interfaces/IClient.md).[messageSubmit](../interfaces/IClient.md#messagesubmit)

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

#### Implementation of

[IClient](../interfaces/IClient.md).[messageSubmitRaw](../interfaces/IClient.md#messagesubmitraw)

___

### messageChildren

▸ **messageChildren**(`messageId`): `Promise`<[`IChildrenResponse`](../interfaces/IChildrenResponse.md)\>

Get the children of a message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The id of the message to get the children for. |

#### Returns

`Promise`<[`IChildrenResponse`](../interfaces/IChildrenResponse.md)\>

The messages children.

#### Implementation of

[IClient](../interfaces/IClient.md).[messageChildren](../interfaces/IClient.md#messagechildren)

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`): `Promise`<[`IMessage`](../interfaces/IMessage.md)\>

Get the message that was included in the ledger for a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The id of the transaction to get the included message for. |

#### Returns

`Promise`<[`IMessage`](../interfaces/IMessage.md)\>

The message.

#### Implementation of

[IClient](../interfaces/IClient.md).[transactionIncludedMessage](../interfaces/IClient.md#transactionincludedmessage)

___

### output

▸ **output**(`outputId`): `Promise`<[`IOutputResponse`](../interfaces/IOutputResponse.md)\>

Find an output by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get. |

#### Returns

`Promise`<[`IOutputResponse`](../interfaces/IOutputResponse.md)\>

The output details.

#### Implementation of

[IClient](../interfaces/IClient.md).[output](../interfaces/IClient.md#output)

___

### milestone

▸ **milestone**(`index`): `Promise`<[`IMilestoneResponse`](../interfaces/IMilestoneResponse.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to get. |

#### Returns

`Promise`<[`IMilestoneResponse`](../interfaces/IMilestoneResponse.md)\>

The milestone details.

#### Implementation of

[IClient](../interfaces/IClient.md).[milestone](../interfaces/IClient.md#milestone)

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`): `Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to request the changes for. |

#### Returns

`Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/IMilestoneUtxoChangesResponse.md)\>

The milestone utxo changes details.

#### Implementation of

[IClient](../interfaces/IClient.md).[milestoneUtxoChanges](../interfaces/IClient.md#milestoneutxochanges)

___

### treasury

▸ **treasury**(): `Promise`<[`ITreasury`](../interfaces/ITreasury.md)\>

Get the current treasury output.

#### Returns

`Promise`<[`ITreasury`](../interfaces/ITreasury.md)\>

The details for the treasury.

#### Implementation of

[IClient](../interfaces/IClient.md).[treasury](../interfaces/IClient.md#treasury)

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

[IClient](../interfaces/IClient.md).[receipts](../interfaces/IClient.md#receipts)

___

### peers

▸ **peers**(): `Promise`<[`IPeer`](../interfaces/IPeer.md)[]\>

Get the list of peers.

#### Returns

`Promise`<[`IPeer`](../interfaces/IPeer.md)[]\>

The list of peers.

#### Implementation of

[IClient](../interfaces/IClient.md).[peers](../interfaces/IClient.md#peers)

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

[IClient](../interfaces/IClient.md).[peerAdd](../interfaces/IClient.md#peeradd)

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

[IClient](../interfaces/IClient.md).[peerDelete](../interfaces/IClient.md#peerdelete)

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

[IClient](../interfaces/IClient.md).[peer](../interfaces/IClient.md#peer)

___

### protocolInfo

▸ **protocolInfo**(): `Promise`<{}\>

Get the protocol info from the node.

#### Returns

`Promise`<{}\>

The protocol info.

#### Implementation of

[IClient](../interfaces/IClient.md).[protocolInfo](../interfaces/IClient.md#protocolinfo)

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

[IClient](../interfaces/IClient.md).[pluginFetch](../interfaces/IClient.md#pluginfetch)
