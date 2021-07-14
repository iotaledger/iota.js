[@iota/iota.js](../README.md) / [models/IClient](../modules/models_IClient.md) / IClient

# Interface: IClient

[models/IClient](../modules/models_IClient.md).IClient

Client interface definition for API communication.

## Implemented by

- [`SingleNodeClient`](../classes/clients_singleNodeClient.SingleNodeClient.md)

## Table of contents

### Methods

- [address](models_IClient.IClient.md#address)
- [addressEd25519](models_IClient.IClient.md#addressed25519)
- [addressEd25519Outputs](models_IClient.IClient.md#addressed25519outputs)
- [addressOutputs](models_IClient.IClient.md#addressoutputs)
- [health](models_IClient.IClient.md#health)
- [info](models_IClient.IClient.md#info)
- [message](models_IClient.IClient.md#message)
- [messageChildren](models_IClient.IClient.md#messagechildren)
- [messageMetadata](models_IClient.IClient.md#messagemetadata)
- [messageRaw](models_IClient.IClient.md#messageraw)
- [messageSubmit](models_IClient.IClient.md#messagesubmit)
- [messageSubmitRaw](models_IClient.IClient.md#messagesubmitraw)
- [messagesFind](models_IClient.IClient.md#messagesfind)
- [milestone](models_IClient.IClient.md#milestone)
- [milestoneUtxoChanges](models_IClient.IClient.md#milestoneutxochanges)
- [output](models_IClient.IClient.md#output)
- [peer](models_IClient.IClient.md#peer)
- [peerAdd](models_IClient.IClient.md#peeradd)
- [peerDelete](models_IClient.IClient.md#peerdelete)
- [peers](models_IClient.IClient.md#peers)
- [receipts](models_IClient.IClient.md#receipts)
- [tips](models_IClient.IClient.md#tips)
- [transactionIncludedMessage](models_IClient.IClient.md#transactionincludedmessage)
- [treasury](models_IClient.IClient.md#treasury)

## Methods

### address

▸ **address**(`addressBech32`): `Promise`<[`IAddressResponse`](models_api_IAddressResponse.IAddressResponse.md)\>

Get the address details using bech32 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](models_api_IAddressResponse.IAddressResponse.md)\>

The address details.

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`): `Promise`<[`IAddressResponse`](models_api_IAddressResponse.IAddressResponse.md)\>

Get the address details using ed25519 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](models_api_IAddressResponse.IAddressResponse.md)\>

The address details.

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`, `type?`, `includeSpent?`): `Promise`<[`IAddressOutputsResponse`](models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

Get the address outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |
| `includeSpent?` | `boolean` | Filter the type of outputs you are looking up, defaults to false. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

The address outputs.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`, `type?`, `includeSpent?`): `Promise`<[`IAddressOutputsResponse`](models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

Get the address outputs using bech32 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |
| `includeSpent?` | `boolean` | Filter the type of outputs you are looking up, defaults to false. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

The address outputs.

___

### health

▸ **health**(): `Promise`<`boolean`\>

Get the health of the node.

#### Returns

`Promise`<`boolean`\>

True if the node is healthy.

___

### info

▸ **info**(): `Promise`<[`INodeInfo`](models_INodeInfo.INodeInfo.md)\>

Get the info about the node.

#### Returns

`Promise`<[`INodeInfo`](models_INodeInfo.INodeInfo.md)\>

The node information.

___

### message

▸ **message**(`messageId`): `Promise`<[`IMessage`](models_IMessage.IMessage.md)\>

Get the message data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the data for. |

#### Returns

`Promise`<[`IMessage`](models_IMessage.IMessage.md)\>

The message data.

___

### messageChildren

▸ **messageChildren**(`messageId`): `Promise`<[`IChildrenResponse`](models_api_IChildrenResponse.IChildrenResponse.md)\>

Get the children of a message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The id of the message to get the children for. |

#### Returns

`Promise`<[`IChildrenResponse`](models_api_IChildrenResponse.IChildrenResponse.md)\>

The messages children.

___

### messageMetadata

▸ **messageMetadata**(`messageId`): `Promise`<[`IMessageMetadata`](models_IMessageMetadata.IMessageMetadata.md)\>

Get the message metadata by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the metadata for. |

#### Returns

`Promise`<[`IMessageMetadata`](models_IMessageMetadata.IMessageMetadata.md)\>

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
| `message` | [`IMessage`](models_IMessage.IMessage.md) | The message to submit. |

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

### messagesFind

▸ **messagesFind**(`indexationKey`): `Promise`<[`IMessagesResponse`](models_api_IMessagesResponse.IMessagesResponse.md)\>

Find messages by index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexationKey` | `string` \| `Uint8Array` | The index value as a byte array or UTF8 string. |

#### Returns

`Promise`<[`IMessagesResponse`](models_api_IMessagesResponse.IMessagesResponse.md)\>

The messageId.

___

### milestone

▸ **milestone**(`index`): `Promise`<[`IMilestoneResponse`](models_api_IMilestoneResponse.IMilestoneResponse.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to get. |

#### Returns

`Promise`<[`IMilestoneResponse`](models_api_IMilestoneResponse.IMilestoneResponse.md)\>

The milestone details.

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`): `Promise`<[`IMilestoneUtxoChangesResponse`](models_api_IMilestoneUtxoChangesResponse.IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to request the changes for. |

#### Returns

`Promise`<[`IMilestoneUtxoChangesResponse`](models_api_IMilestoneUtxoChangesResponse.IMilestoneUtxoChangesResponse.md)\>

The milestone utxo changes details.

___

### output

▸ **output**(`outputId`): `Promise`<[`IOutputResponse`](models_api_IOutputResponse.IOutputResponse.md)\>

Find an output by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get. |

#### Returns

`Promise`<[`IOutputResponse`](models_api_IOutputResponse.IOutputResponse.md)\>

The output details.

___

### peer

▸ **peer**(`peerId`): `Promise`<[`IPeer`](models_IPeer.IPeer.md)\>

Get a peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `string` | The peer to delete. |

#### Returns

`Promise`<[`IPeer`](models_IPeer.IPeer.md)\>

The details for the created peer.

___

### peerAdd

▸ **peerAdd**(`multiAddress`, `alias?`): `Promise`<[`IPeer`](models_IPeer.IPeer.md)\>

Add a new peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiAddress` | `string` | The address of the peer to add. |
| `alias?` | `string` | An optional alias for the peer. |

#### Returns

`Promise`<[`IPeer`](models_IPeer.IPeer.md)\>

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

### peers

▸ **peers**(): `Promise`<[`IPeer`](models_IPeer.IPeer.md)[]\>

Get the list of peers.

#### Returns

`Promise`<[`IPeer`](models_IPeer.IPeer.md)[]\>

The list of peers.

___

### receipts

▸ **receipts**(`migratedAt?`): `Promise`<[`IReceiptsResponse`](models_api_IReceiptsResponse.IReceiptsResponse.md)\>

Get all the stored receipts or those for a given migrated at index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `migratedAt?` | `number` | The index the receipts were migrated at, if not supplied returns all stored receipts. |

#### Returns

`Promise`<[`IReceiptsResponse`](models_api_IReceiptsResponse.IReceiptsResponse.md)\>

The stored receipts.

___

### tips

▸ **tips**(): `Promise`<[`ITipsResponse`](models_api_ITipsResponse.ITipsResponse.md)\>

Get the tips from the node.

#### Returns

`Promise`<[`ITipsResponse`](models_api_ITipsResponse.ITipsResponse.md)\>

The tips.

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`): `Promise`<[`IMessage`](models_IMessage.IMessage.md)\>

Get the message that was included in the ledger for a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The id of the transaction to get the included message for. |

#### Returns

`Promise`<[`IMessage`](models_IMessage.IMessage.md)\>

The message.

___

### treasury

▸ **treasury**(): `Promise`<[`ITreasury`](models_ITreasury.ITreasury.md)\>

Get the current treasury output.

#### Returns

`Promise`<[`ITreasury`](models_ITreasury.ITreasury.md)\>

The details for the treasury.
