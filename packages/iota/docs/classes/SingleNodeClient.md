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
- [messagesFind](SingleNodeClient.md#messagesfind)
- [messageChildren](SingleNodeClient.md#messagechildren)
- [transactionIncludedMessage](SingleNodeClient.md#transactionincludedmessage)
- [output](SingleNodeClient.md#output)
- [outputs](SingleNodeClient.md#outputs)
- [address](SingleNodeClient.md#address)
- [addressOutputs](SingleNodeClient.md#addressoutputs)
- [addressEd25519](SingleNodeClient.md#addressed25519)
- [addressEd25519Outputs](SingleNodeClient.md#addressed25519outputs)
- [addressAliasOutputs](SingleNodeClient.md#addressaliasoutputs)
- [addressNftOutputs](SingleNodeClient.md#addressnftoutputs)
- [alias](SingleNodeClient.md#alias)
- [nft](SingleNodeClient.md#nft)
- [foundry](SingleNodeClient.md#foundry)
- [milestone](SingleNodeClient.md#milestone)
- [milestoneUtxoChanges](SingleNodeClient.md#milestoneutxochanges)
- [treasury](SingleNodeClient.md#treasury)
- [receipts](SingleNodeClient.md#receipts)
- [peers](SingleNodeClient.md#peers)
- [peerAdd](SingleNodeClient.md#peeradd)
- [peerDelete](SingleNodeClient.md#peerdelete)
- [peer](SingleNodeClient.md#peer)
- [fetchStatus](SingleNodeClient.md#fetchstatus)
- [fetchJson](SingleNodeClient.md#fetchjson)
- [fetchBinary](SingleNodeClient.md#fetchbinary)
- [combineQueryParams](SingleNodeClient.md#combinequeryparams)

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

### messagesFind

▸ **messagesFind**(`indexationKey`): `Promise`<[`IMessagesResponse`](../interfaces/IMessagesResponse.md)\>

Find messages by index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexationKey` | `string` \| `Uint8Array` | The index value as a byte array or UTF8 string. |

#### Returns

`Promise`<[`IMessagesResponse`](../interfaces/IMessagesResponse.md)\>

The messageId.

#### Implementation of

[IClient](../interfaces/IClient.md).[messagesFind](../interfaces/IClient.md#messagesfind)

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

### outputs

▸ **outputs**(`type`, `issuer?`, `sender?`, `index?`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Find outputs by type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `number` | The type of the output to get. |
| `issuer?` | `string` | The issuer of the output. |
| `sender?` | `string` | The sender of the output. |
| `index?` | `string` | The index associated with the output. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs with the requested parameters.

#### Implementation of

[IClient](../interfaces/IClient.md).[outputs](../interfaces/IClient.md#outputs)

___

### address

▸ **address**(`addressBech32`): `Promise`<[`IAddressResponse`](../interfaces/IAddressResponse.md)\>

Get the address details.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](../interfaces/IAddressResponse.md)\>

The address details.

#### Implementation of

[IClient](../interfaces/IClient.md).[address](../interfaces/IClient.md#address)

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`, `type?`): `Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

Get the address outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

The address outputs.

#### Implementation of

[IClient](../interfaces/IClient.md).[addressOutputs](../interfaces/IClient.md#addressoutputs)

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`): `Promise`<[`IAddressResponse`](../interfaces/IAddressResponse.md)\>

Get the address detail using ed25519 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](../interfaces/IAddressResponse.md)\>

The address details.

#### Implementation of

[IClient](../interfaces/IClient.md).[addressEd25519](../interfaces/IClient.md#addressed25519)

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`, `type?`): `Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

Get the address outputs using ed25519 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

The address outputs.

#### Implementation of

[IClient](../interfaces/IClient.md).[addressEd25519Outputs](../interfaces/IClient.md#addressed25519outputs)

___

### addressAliasOutputs

▸ **addressAliasOutputs**(`addressAlias`, `type?`): `Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

Get the address outputs for an alias address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressAlias` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

The address outputs.

#### Implementation of

[IClient](../interfaces/IClient.md).[addressAliasOutputs](../interfaces/IClient.md#addressaliasoutputs)

___

### addressNftOutputs

▸ **addressNftOutputs**(`addressNft`, `type?`): `Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

Get the address outputs for an NFT address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressNft` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](../interfaces/IAddressOutputsResponse.md)\>

The address outputs.

#### Implementation of

[IClient](../interfaces/IClient.md).[addressNftOutputs](../interfaces/IClient.md#addressnftoutputs)

___

### alias

▸ **alias**(`aliasId`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Get the outputs for an alias.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aliasId` | `string` | The alias to get the outputs for. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs.

#### Implementation of

[IClient](../interfaces/IClient.md).[alias](../interfaces/IClient.md#alias)

___

### nft

▸ **nft**(`nftId`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Get the outputs for an NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftId` | `string` | The NFT to get the outputs for. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs.

#### Implementation of

[IClient](../interfaces/IClient.md).[nft](../interfaces/IClient.md#nft)

___

### foundry

▸ **foundry**(`foundryId`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Get the outputs for a foundry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `foundryId` | `string` | The foundry to get the outputs for. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs.

#### Implementation of

[IClient](../interfaces/IClient.md).[foundry](../interfaces/IClient.md#foundry)

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
