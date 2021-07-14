[@iota/iota.js](../README.md) / [clients/singleNodeClient](../modules/clients_singleNodeClient.md) / SingleNodeClient

# Class: SingleNodeClient

[clients/singleNodeClient](../modules/clients_singleNodeClient.md).SingleNodeClient

Client for API communication.

## Implements

- [`IClient`](../interfaces/models_IClient.IClient.md)

## Table of contents

### Constructors

- [constructor](clients_singleNodeClient.SingleNodeClient.md#constructor)

### Methods

- [address](clients_singleNodeClient.SingleNodeClient.md#address)
- [addressEd25519](clients_singleNodeClient.SingleNodeClient.md#addressed25519)
- [addressEd25519Outputs](clients_singleNodeClient.SingleNodeClient.md#addressed25519outputs)
- [addressOutputs](clients_singleNodeClient.SingleNodeClient.md#addressoutputs)
- [combineQueryParams](clients_singleNodeClient.SingleNodeClient.md#combinequeryparams)
- [fetchBinary](clients_singleNodeClient.SingleNodeClient.md#fetchbinary)
- [fetchJson](clients_singleNodeClient.SingleNodeClient.md#fetchjson)
- [fetchStatus](clients_singleNodeClient.SingleNodeClient.md#fetchstatus)
- [health](clients_singleNodeClient.SingleNodeClient.md#health)
- [info](clients_singleNodeClient.SingleNodeClient.md#info)
- [message](clients_singleNodeClient.SingleNodeClient.md#message)
- [messageChildren](clients_singleNodeClient.SingleNodeClient.md#messagechildren)
- [messageMetadata](clients_singleNodeClient.SingleNodeClient.md#messagemetadata)
- [messageRaw](clients_singleNodeClient.SingleNodeClient.md#messageraw)
- [messageSubmit](clients_singleNodeClient.SingleNodeClient.md#messagesubmit)
- [messageSubmitRaw](clients_singleNodeClient.SingleNodeClient.md#messagesubmitraw)
- [messagesFind](clients_singleNodeClient.SingleNodeClient.md#messagesfind)
- [milestone](clients_singleNodeClient.SingleNodeClient.md#milestone)
- [milestoneUtxoChanges](clients_singleNodeClient.SingleNodeClient.md#milestoneutxochanges)
- [output](clients_singleNodeClient.SingleNodeClient.md#output)
- [peer](clients_singleNodeClient.SingleNodeClient.md#peer)
- [peerAdd](clients_singleNodeClient.SingleNodeClient.md#peeradd)
- [peerDelete](clients_singleNodeClient.SingleNodeClient.md#peerdelete)
- [peers](clients_singleNodeClient.SingleNodeClient.md#peers)
- [receipts](clients_singleNodeClient.SingleNodeClient.md#receipts)
- [tips](clients_singleNodeClient.SingleNodeClient.md#tips)
- [transactionIncludedMessage](clients_singleNodeClient.SingleNodeClient.md#transactionincludedmessage)
- [treasury](clients_singleNodeClient.SingleNodeClient.md#treasury)

## Constructors

### constructor

• **new SingleNodeClient**(`endpoint`, `options?`)

Create a new instance of client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The endpoint. |
| `options?` | [`SingleNodeClientOptions`](../interfaces/clients_singleNodeClientOptions.SingleNodeClientOptions.md) | Options for the client. |

## Methods

### address

▸ **address**(`addressBech32`): `Promise`<[`IAddressResponse`](../interfaces/models_api_IAddressResponse.IAddressResponse.md)\>

Get the address details.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](../interfaces/models_api_IAddressResponse.IAddressResponse.md)\>

The address details.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[address](../interfaces/models_IClient.IClient.md#address)

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`): `Promise`<[`IAddressResponse`](../interfaces/models_api_IAddressResponse.IAddressResponse.md)\>

Get the address detail using ed25519 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](../interfaces/models_api_IAddressResponse.IAddressResponse.md)\>

The address details.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[addressEd25519](../interfaces/models_IClient.IClient.md#addressed25519)

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`, `type?`, `includeSpent?`): `Promise`<[`IAddressOutputsResponse`](../interfaces/models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

Get the address outputs using ed25519 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |
| `includeSpent?` | `boolean` | Filter the type of outputs you are looking up, defaults to false. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](../interfaces/models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

The address outputs.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[addressEd25519Outputs](../interfaces/models_IClient.IClient.md#addressed25519outputs)

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`, `type?`, `includeSpent?`): `Promise`<[`IAddressOutputsResponse`](../interfaces/models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

Get the address outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |
| `includeSpent?` | `boolean` | Filter the type of outputs you are looking up, defaults to false. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](../interfaces/models_api_IAddressOutputsResponse.IAddressOutputsResponse.md)\>

The address outputs.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[addressOutputs](../interfaces/models_IClient.IClient.md#addressoutputs)

___

### combineQueryParams

▸ **combineQueryParams**(`queryParams`): `string`

Combine the query params.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryParams` | `string`[] | The quer params to combine. |

#### Returns

`string`

The combined query params.

___

### fetchBinary

▸ **fetchBinary**<`T`\>(`method`, `route`, `requestData?`): `Promise`<`Uint8Array` \| `T`\>

Perform a request for binary data.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | ``"get"`` \| ``"post"`` | The http method. |
| `route` | `string` | The route of the request. |
| `requestData?` | `Uint8Array` | Request to send to the endpoint. |

#### Returns

`Promise`<`Uint8Array` \| `T`\>

The response.

___

### fetchJson

▸ **fetchJson**<`T`, `U`\>(`method`, `route`, `requestData?`): `Promise`<`U`\>

Perform a request in json format.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | ``"get"`` \| ``"post"`` \| ``"delete"`` | The http method. |
| `route` | `string` | The route of the request. |
| `requestData?` | `T` | Request to send to the endpoint. |

#### Returns

`Promise`<`U`\>

The response.

___

### fetchStatus

▸ **fetchStatus**(`route`): `Promise`<`number`\>

Perform a request and just return the status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | `string` | The route of the request. |

#### Returns

`Promise`<`number`\>

The response.

___

### health

▸ **health**(): `Promise`<`boolean`\>

Get the health of the node.

#### Returns

`Promise`<`boolean`\>

True if the node is healthy.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[health](../interfaces/models_IClient.IClient.md#health)

___

### info

▸ **info**(): `Promise`<[`INodeInfo`](../interfaces/models_INodeInfo.INodeInfo.md)\>

Get the info about the node.

#### Returns

`Promise`<[`INodeInfo`](../interfaces/models_INodeInfo.INodeInfo.md)\>

The node information.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[info](../interfaces/models_IClient.IClient.md#info)

___

### message

▸ **message**(`messageId`): `Promise`<[`IMessage`](../interfaces/models_IMessage.IMessage.md)\>

Get the message data by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the data for. |

#### Returns

`Promise`<[`IMessage`](../interfaces/models_IMessage.IMessage.md)\>

The message data.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[message](../interfaces/models_IClient.IClient.md#message)

___

### messageChildren

▸ **messageChildren**(`messageId`): `Promise`<[`IChildrenResponse`](../interfaces/models_api_IChildrenResponse.IChildrenResponse.md)\>

Get the children of a message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The id of the message to get the children for. |

#### Returns

`Promise`<[`IChildrenResponse`](../interfaces/models_api_IChildrenResponse.IChildrenResponse.md)\>

The messages children.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[messageChildren](../interfaces/models_IClient.IClient.md#messagechildren)

___

### messageMetadata

▸ **messageMetadata**(`messageId`): `Promise`<[`IMessageMetadata`](../interfaces/models_IMessageMetadata.IMessageMetadata.md)\>

Get the message metadata by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to get the metadata for. |

#### Returns

`Promise`<[`IMessageMetadata`](../interfaces/models_IMessageMetadata.IMessageMetadata.md)\>

The message metadata.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[messageMetadata](../interfaces/models_IClient.IClient.md#messagemetadata)

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

[IClient](../interfaces/models_IClient.IClient.md).[messageRaw](../interfaces/models_IClient.IClient.md#messageraw)

___

### messageSubmit

▸ **messageSubmit**(`message`): `Promise`<`string`\>

Submit message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`IMessage`](../interfaces/models_IMessage.IMessage.md) | The message to submit. |

#### Returns

`Promise`<`string`\>

The messageId.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[messageSubmit](../interfaces/models_IClient.IClient.md#messagesubmit)

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

[IClient](../interfaces/models_IClient.IClient.md).[messageSubmitRaw](../interfaces/models_IClient.IClient.md#messagesubmitraw)

___

### messagesFind

▸ **messagesFind**(`indexationKey`): `Promise`<[`IMessagesResponse`](../interfaces/models_api_IMessagesResponse.IMessagesResponse.md)\>

Find messages by index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexationKey` | `string` \| `Uint8Array` | The index value as a byte array or UTF8 string. |

#### Returns

`Promise`<[`IMessagesResponse`](../interfaces/models_api_IMessagesResponse.IMessagesResponse.md)\>

The messageId.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[messagesFind](../interfaces/models_IClient.IClient.md#messagesfind)

___

### milestone

▸ **milestone**(`index`): `Promise`<[`IMilestoneResponse`](../interfaces/models_api_IMilestoneResponse.IMilestoneResponse.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to get. |

#### Returns

`Promise`<[`IMilestoneResponse`](../interfaces/models_api_IMilestoneResponse.IMilestoneResponse.md)\>

The milestone details.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[milestone](../interfaces/models_IClient.IClient.md#milestone)

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`): `Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/models_api_IMilestoneUtxoChangesResponse.IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to request the changes for. |

#### Returns

`Promise`<[`IMilestoneUtxoChangesResponse`](../interfaces/models_api_IMilestoneUtxoChangesResponse.IMilestoneUtxoChangesResponse.md)\>

The milestone utxo changes details.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[milestoneUtxoChanges](../interfaces/models_IClient.IClient.md#milestoneutxochanges)

___

### output

▸ **output**(`outputId`): `Promise`<[`IOutputResponse`](../interfaces/models_api_IOutputResponse.IOutputResponse.md)\>

Find an output by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get. |

#### Returns

`Promise`<[`IOutputResponse`](../interfaces/models_api_IOutputResponse.IOutputResponse.md)\>

The output details.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[output](../interfaces/models_IClient.IClient.md#output)

___

### peer

▸ **peer**(`peerId`): `Promise`<[`IPeer`](../interfaces/models_IPeer.IPeer.md)\>

Get a peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `string` | The peer to delete. |

#### Returns

`Promise`<[`IPeer`](../interfaces/models_IPeer.IPeer.md)\>

The details for the created peer.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[peer](../interfaces/models_IClient.IClient.md#peer)

___

### peerAdd

▸ **peerAdd**(`multiAddress`, `alias?`): `Promise`<[`IPeer`](../interfaces/models_IPeer.IPeer.md)\>

Add a new peer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiAddress` | `string` | The address of the peer to add. |
| `alias?` | `string` | An optional alias for the peer. |

#### Returns

`Promise`<[`IPeer`](../interfaces/models_IPeer.IPeer.md)\>

The details for the created peer.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[peerAdd](../interfaces/models_IClient.IClient.md#peeradd)

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

[IClient](../interfaces/models_IClient.IClient.md).[peerDelete](../interfaces/models_IClient.IClient.md#peerdelete)

___

### peers

▸ **peers**(): `Promise`<[`IPeer`](../interfaces/models_IPeer.IPeer.md)[]\>

Get the list of peers.

#### Returns

`Promise`<[`IPeer`](../interfaces/models_IPeer.IPeer.md)[]\>

The list of peers.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[peers](../interfaces/models_IClient.IClient.md#peers)

___

### receipts

▸ **receipts**(`migratedAt?`): `Promise`<[`IReceiptsResponse`](../interfaces/models_api_IReceiptsResponse.IReceiptsResponse.md)\>

Get all the stored receipts or those for a given migrated at index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `migratedAt?` | `number` | The index the receipts were migrated at, if not supplied returns all stored receipts. |

#### Returns

`Promise`<[`IReceiptsResponse`](../interfaces/models_api_IReceiptsResponse.IReceiptsResponse.md)\>

The stored receipts.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[receipts](../interfaces/models_IClient.IClient.md#receipts)

___

### tips

▸ **tips**(): `Promise`<[`ITipsResponse`](../interfaces/models_api_ITipsResponse.ITipsResponse.md)\>

Get the tips from the node.

#### Returns

`Promise`<[`ITipsResponse`](../interfaces/models_api_ITipsResponse.ITipsResponse.md)\>

The tips.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[tips](../interfaces/models_IClient.IClient.md#tips)

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`): `Promise`<[`IMessage`](../interfaces/models_IMessage.IMessage.md)\>

Get the message that was included in the ledger for a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The id of the transaction to get the included message for. |

#### Returns

`Promise`<[`IMessage`](../interfaces/models_IMessage.IMessage.md)\>

The message.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[transactionIncludedMessage](../interfaces/models_IClient.IClient.md#transactionincludedmessage)

___

### treasury

▸ **treasury**(): `Promise`<[`ITreasury`](../interfaces/models_ITreasury.ITreasury.md)\>

Get the current treasury output.

#### Returns

`Promise`<[`ITreasury`](../interfaces/models_ITreasury.ITreasury.md)\>

The details for the treasury.

#### Implementation of

[IClient](../interfaces/models_IClient.IClient.md).[treasury](../interfaces/models_IClient.IClient.md#treasury)
