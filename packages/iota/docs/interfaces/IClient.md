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
- [messagesFind](IClient.md#messagesfind)
- [messageChildren](IClient.md#messagechildren)
- [transactionIncludedMessage](IClient.md#transactionincludedmessage)
- [output](IClient.md#output)
- [outputs](IClient.md#outputs)
- [address](IClient.md#address)
- [addressOutputs](IClient.md#addressoutputs)
- [addressEd25519](IClient.md#addressed25519)
- [addressEd25519Outputs](IClient.md#addressed25519outputs)
- [addressAliasOutputs](IClient.md#addressaliasoutputs)
- [addressNftOutputs](IClient.md#addressnftoutputs)
- [alias](IClient.md#alias)
- [nft](IClient.md#nft)
- [foundry](IClient.md#foundry)
- [milestone](IClient.md#milestone)
- [milestoneUtxoChanges](IClient.md#milestoneutxochanges)
- [treasury](IClient.md#treasury)
- [receipts](IClient.md#receipts)
- [peers](IClient.md#peers)
- [peerAdd](IClient.md#peeradd)
- [peerDelete](IClient.md#peerdelete)
- [peer](IClient.md#peer)

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

### messagesFind

▸ **messagesFind**(`indexationKey`): `Promise`<[`IMessagesResponse`](IMessagesResponse.md)\>

Find messages by index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexationKey` | `string` \| `Uint8Array` | The index value as a byte array or UTF8 string. |

#### Returns

`Promise`<[`IMessagesResponse`](IMessagesResponse.md)\>

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

Find an output by its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The id of the output to get. |

#### Returns

`Promise`<[`IOutputResponse`](IOutputResponse.md)\>

The output details.

___

### outputs

▸ **outputs**(`type`, `issuer?`, `sender?`, `index?`): `Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

Find outputs by type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `number` | The type of the outputs to get. |
| `issuer?` | `string` | The issuer of the output. |
| `sender?` | `string` | The sender of the output. |
| `index?` | `string` | The index associated with the output. |

#### Returns

`Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

The outputs with the requested parameters.

___

### address

▸ **address**(`addressBech32`): `Promise`<[`IAddressResponse`](IAddressResponse.md)\>

Get the address details using bech32 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](IAddressResponse.md)\>

The address details.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`, `type?`): `Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

Get the address outputs using bech32 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

The address outputs.

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`): `Promise`<[`IAddressResponse`](IAddressResponse.md)\>

Get the address details for an ed25519 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the details for. |

#### Returns

`Promise`<[`IAddressResponse`](IAddressResponse.md)\>

The address details.

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`, `type?`): `Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

Get the address outputs for an ed25519 address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

The address outputs.

___

### addressAliasOutputs

▸ **addressAliasOutputs**(`addressAlias`, `type?`): `Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

Get the address outputs for an alias address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressAlias` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

The address outputs.

___

### addressNftOutputs

▸ **addressNftOutputs**(`addressNft`, `type?`): `Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

Get the address outputs for an NFT address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressNft` | `string` | The address to get the outputs for. |
| `type?` | `number` | Filter the type of outputs you are looking up, defaults to all. |

#### Returns

`Promise`<[`IAddressOutputsResponse`](IAddressOutputsResponse.md)\>

The address outputs.

___

### alias

▸ **alias**(`aliasId`): `Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

Get the outputs for an alias.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aliasId` | `string` | The alias to get the outputs for. |

#### Returns

`Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

The outputs.

___

### nft

▸ **nft**(`nftId`): `Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

Get the outputs for an NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftId` | `string` | The NFT to get the outputs for. |

#### Returns

`Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

The outputs.

___

### foundry

▸ **foundry**(`foundryId`): `Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

Get the outputs for a foundry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `foundryId` | `string` | The foundry to get the outputs for. |

#### Returns

`Promise`<[`IOutputsResponse`](IOutputsResponse.md)\>

The outputs.

___

### milestone

▸ **milestone**(`index`): `Promise`<[`IMilestoneResponse`](IMilestoneResponse.md)\>

Get the requested milestone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to get. |

#### Returns

`Promise`<[`IMilestoneResponse`](IMilestoneResponse.md)\>

The milestone details.

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`): `Promise`<[`IMilestoneUtxoChangesResponse`](IMilestoneUtxoChangesResponse.md)\>

Get the requested milestone utxo changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the milestone to request the changes for. |

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
