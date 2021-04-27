**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IClient"](../modules/_models_iclient_.md) / IClient

# Interface: IClient

Client interface definition for API communication.

## Hierarchy

* **IClient**

## Implemented by

* [SingleNodeClient](../classes/_clients_singlenodeclient_.singlenodeclient.md)

## Index

### Methods

* [address](_models_iclient_.iclient.md#address)
* [addressEd25519](_models_iclient_.iclient.md#addressed25519)
* [addressEd25519Outputs](_models_iclient_.iclient.md#addressed25519outputs)
* [addressOutputs](_models_iclient_.iclient.md#addressoutputs)
* [health](_models_iclient_.iclient.md#health)
* [info](_models_iclient_.iclient.md#info)
* [message](_models_iclient_.iclient.md#message)
* [messageChildren](_models_iclient_.iclient.md#messagechildren)
* [messageMetadata](_models_iclient_.iclient.md#messagemetadata)
* [messageRaw](_models_iclient_.iclient.md#messageraw)
* [messageSubmit](_models_iclient_.iclient.md#messagesubmit)
* [messageSubmitRaw](_models_iclient_.iclient.md#messagesubmitraw)
* [messagesFind](_models_iclient_.iclient.md#messagesfind)
* [milestone](_models_iclient_.iclient.md#milestone)
* [milestoneUtxoChanges](_models_iclient_.iclient.md#milestoneutxochanges)
* [output](_models_iclient_.iclient.md#output)
* [peer](_models_iclient_.iclient.md#peer)
* [peerAdd](_models_iclient_.iclient.md#peeradd)
* [peerDelete](_models_iclient_.iclient.md#peerdelete)
* [peers](_models_iclient_.iclient.md#peers)
* [receipts](_models_iclient_.iclient.md#receipts)
* [tips](_models_iclient_.iclient.md#tips)
* [transactionIncludedMessage](_models_iclient_.iclient.md#transactionincludedmessage)
* [treasury](_models_iclient_.iclient.md#treasury)

## Methods

### address

▸ **address**(`addressBech32`: string): Promise<[IAddressResponse](_models_api_iaddressresponse_.iaddressresponse.md)\>

Get the address details using bech32 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to get the details for. |

**Returns:** Promise<[IAddressResponse](_models_api_iaddressresponse_.iaddressresponse.md)\>

The address details.

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`: string): Promise<[IAddressResponse](_models_api_iaddressresponse_.iaddressresponse.md)\>

Get the address details using ed25519 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to get the details for. |

**Returns:** Promise<[IAddressResponse](_models_api_iaddressresponse_.iaddressresponse.md)\>

The address details.

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: string, `type?`: undefined \| number, `includeSpent?`: undefined \| false \| true): Promise<[IAddressOutputsResponse](_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

Get the address outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to get the outputs for. |
`type?` | undefined \| number | Filter the type of outputs you are looking up, defaults to all. |
`includeSpent?` | undefined \| false \| true | Filter the type of outputs you are looking up, defaults to false. |

**Returns:** Promise<[IAddressOutputsResponse](_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

The address outputs.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: string, `type?`: undefined \| number, `includeSpent?`: undefined \| false \| true): Promise<[IAddressOutputsResponse](_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

Get the address outputs using bech32 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to get the outputs for. |
`type?` | undefined \| number | Filter the type of outputs you are looking up, defaults to all. |
`includeSpent?` | undefined \| false \| true | Filter the type of outputs you are looking up, defaults to false. |

**Returns:** Promise<[IAddressOutputsResponse](_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

The address outputs.

___

### health

▸ **health**(): Promise<boolean\>

Get the health of the node.

**Returns:** Promise<boolean\>

True if the node is healthy.

___

### info

▸ **info**(): Promise<[INodeInfo](_models_inodeinfo_.inodeinfo.md)\>

Get the info about the node.

**Returns:** Promise<[INodeInfo](_models_inodeinfo_.inodeinfo.md)\>

The node information.

___

### message

▸ **message**(`messageId`: string): Promise<[IMessage](_models_imessage_.imessage.md)\>

Get the message data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the data for. |

**Returns:** Promise<[IMessage](_models_imessage_.imessage.md)\>

The message data.

___

### messageChildren

▸ **messageChildren**(`messageId`: string): Promise<[IChildrenResponse](_models_api_ichildrenresponse_.ichildrenresponse.md)\>

Get the children of a message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The id of the message to get the children for. |

**Returns:** Promise<[IChildrenResponse](_models_api_ichildrenresponse_.ichildrenresponse.md)\>

The messages children.

___

### messageMetadata

▸ **messageMetadata**(`messageId`: string): Promise<[IMessageMetadata](_models_imessagemetadata_.imessagemetadata.md)\>

Get the message metadata by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the metadata for. |

**Returns:** Promise<[IMessageMetadata](_models_imessagemetadata_.imessagemetadata.md)\>

The message metadata.

___

### messageRaw

▸ **messageRaw**(`messageId`: string): Promise<Uint8Array\>

Get the message raw data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the data for. |

**Returns:** Promise<Uint8Array\>

The message raw data.

___

### messageSubmit

▸ **messageSubmit**(`message`: [IMessage](_models_imessage_.imessage.md)): Promise<string\>

Submit message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [IMessage](_models_imessage_.imessage.md) | The message to submit. |

**Returns:** Promise<string\>

The messageId.

___

### messageSubmitRaw

▸ **messageSubmitRaw**(`message`: Uint8Array): Promise<string\>

Submit message in raw format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | The message to submit. |

**Returns:** Promise<string\>

The messageId.

___

### messagesFind

▸ **messagesFind**(`indexationKey`: Uint8Array \| string): Promise<[IMessagesResponse](_models_api_imessagesresponse_.imessagesresponse.md)\>

Find messages by index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`indexationKey` | Uint8Array \| string | The index value as a byte array or UTF8 string. |

**Returns:** Promise<[IMessagesResponse](_models_api_imessagesresponse_.imessagesresponse.md)\>

The messageId.

___

### milestone

▸ **milestone**(`index`: number): Promise<[IMilestoneResponse](_models_api_imilestoneresponse_.imilestoneresponse.md)\>

Get the requested milestone.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index of the milestone to get. |

**Returns:** Promise<[IMilestoneResponse](_models_api_imilestoneresponse_.imilestoneresponse.md)\>

The milestone details.

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`: number): Promise<[IMilestoneUtxoChangesResponse](_models_api_imilestoneutxochangesresponse_.imilestoneutxochangesresponse.md)\>

Get the requested milestone utxo changes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index of the milestone to request the changes for. |

**Returns:** Promise<[IMilestoneUtxoChangesResponse](_models_api_imilestoneutxochangesresponse_.imilestoneutxochangesresponse.md)\>

The milestone utxo changes details.

___

### output

▸ **output**(`outputId`: string): Promise<[IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)\>

Find an output by its identifier.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | string | The id of the output to get. |

**Returns:** Promise<[IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)\>

The output details.

___

### peer

▸ **peer**(`peerId`: string): Promise<[IPeer](_models_ipeer_.ipeer.md)\>

Get a peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`peerId` | string | The peer to delete. |

**Returns:** Promise<[IPeer](_models_ipeer_.ipeer.md)\>

The details for the created peer.

___

### peerAdd

▸ **peerAdd**(`multiAddress`: string, `alias?`: undefined \| string): Promise<[IPeer](_models_ipeer_.ipeer.md)\>

Add a new peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`multiAddress` | string | The address of the peer to add. |
`alias?` | undefined \| string | An optional alias for the peer. |

**Returns:** Promise<[IPeer](_models_ipeer_.ipeer.md)\>

The details for the created peer.

___

### peerDelete

▸ **peerDelete**(`peerId`: string): Promise<void\>

Delete a peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`peerId` | string | The peer to delete. |

**Returns:** Promise<void\>

Nothing.

___

### peers

▸ **peers**(): Promise<[IPeer](_models_ipeer_.ipeer.md)[]\>

Get the list of peers.

**Returns:** Promise<[IPeer](_models_ipeer_.ipeer.md)[]\>

The list of peers.

___

### receipts

▸ **receipts**(`migratedAt?`: undefined \| number): Promise<[IReceiptsResponse](_models_api_ireceiptsresponse_.ireceiptsresponse.md)\>

Get all the stored receipts or those for a given migrated at index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`migratedAt?` | undefined \| number | The index the receipts were migrated at, if not supplied returns all stored receipts. |

**Returns:** Promise<[IReceiptsResponse](_models_api_ireceiptsresponse_.ireceiptsresponse.md)\>

The stored receipts.

___

### tips

▸ **tips**(): Promise<[ITipsResponse](_models_api_itipsresponse_.itipsresponse.md)\>

Get the tips from the node.

**Returns:** Promise<[ITipsResponse](_models_api_itipsresponse_.itipsresponse.md)\>

The tips.

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`: string): Promise<[IMessage](_models_imessage_.imessage.md)\>

Get the message that was included in the ledger for a transaction.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transactionId` | string | The id of the transaction to get the included message for. |

**Returns:** Promise<[IMessage](_models_imessage_.imessage.md)\>

The message.

___

### treasury

▸ **treasury**(): Promise<[ITreasury](_models_itreasury_.itreasury.md)\>

Get the current treasury output.

**Returns:** Promise<[ITreasury](_models_itreasury_.itreasury.md)\>

The details for the treasury.
