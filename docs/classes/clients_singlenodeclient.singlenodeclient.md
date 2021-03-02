[@iota/iota.js](../README.md) / [clients/singleNodeClient](../modules/clients_singlenodeclient.md) / SingleNodeClient

# Class: SingleNodeClient

[clients/singleNodeClient](../modules/clients_singlenodeclient.md).SingleNodeClient

Client for API communication.

## Implements

* [*IClient*](../interfaces/models_iclient.iclient.md)

## Table of contents

### Constructors

- [constructor](clients_singlenodeclient.singlenodeclient.md#constructor)

### Methods

- [address](clients_singlenodeclient.singlenodeclient.md#address)
- [addressEd25519](clients_singlenodeclient.singlenodeclient.md#addressed25519)
- [addressEd25519Outputs](clients_singlenodeclient.singlenodeclient.md#addressed25519outputs)
- [addressOutputs](clients_singlenodeclient.singlenodeclient.md#addressoutputs)
- [health](clients_singlenodeclient.singlenodeclient.md#health)
- [info](clients_singlenodeclient.singlenodeclient.md#info)
- [message](clients_singlenodeclient.singlenodeclient.md#message)
- [messageChildren](clients_singlenodeclient.singlenodeclient.md#messagechildren)
- [messageMetadata](clients_singlenodeclient.singlenodeclient.md#messagemetadata)
- [messageRaw](clients_singlenodeclient.singlenodeclient.md#messageraw)
- [messageSubmit](clients_singlenodeclient.singlenodeclient.md#messagesubmit)
- [messageSubmitRaw](clients_singlenodeclient.singlenodeclient.md#messagesubmitraw)
- [messagesFind](clients_singlenodeclient.singlenodeclient.md#messagesfind)
- [milestone](clients_singlenodeclient.singlenodeclient.md#milestone)
- [milestoneUtxoChanges](clients_singlenodeclient.singlenodeclient.md#milestoneutxochanges)
- [output](clients_singlenodeclient.singlenodeclient.md#output)
- [peer](clients_singlenodeclient.singlenodeclient.md#peer)
- [peerAdd](clients_singlenodeclient.singlenodeclient.md#peeradd)
- [peerDelete](clients_singlenodeclient.singlenodeclient.md#peerdelete)
- [peers](clients_singlenodeclient.singlenodeclient.md#peers)
- [receipts](clients_singlenodeclient.singlenodeclient.md#receipts)
- [tips](clients_singlenodeclient.singlenodeclient.md#tips)
- [treasury](clients_singlenodeclient.singlenodeclient.md#treasury)

## Constructors

### constructor

\+ **new SingleNodeClient**(`endpoint`: *string*, `options?`: SingleNodeClientOptions): [*SingleNodeClient*](clients_singlenodeclient.singlenodeclient.md)

Create a new instance of client.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`endpoint` | *string* | The endpoint.   |
`options?` | SingleNodeClientOptions | Options for the client.    |

**Returns:** [*SingleNodeClient*](clients_singlenodeclient.singlenodeclient.md)

## Methods

### address

▸ **address**(`addressBech32`: *string*): *Promise*<[*IAddressResponse*](../interfaces/models_api_iaddressresponse.iaddressresponse.md)\>

Get the address details.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`addressBech32` | *string* | The address to get the details for.   |

**Returns:** *Promise*<[*IAddressResponse*](../interfaces/models_api_iaddressresponse.iaddressresponse.md)\>

The address details.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`: *string*): *Promise*<[*IAddressResponse*](../interfaces/models_api_iaddressresponse.iaddressresponse.md)\>

Get the address detail using ed25519 address.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`addressEd25519` | *string* | The address to get the details for.   |

**Returns:** *Promise*<[*IAddressResponse*](../interfaces/models_api_iaddressresponse.iaddressresponse.md)\>

The address details.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: *string*, `type?`: *number*, `includeSpent?`: *boolean*): *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

Get the address outputs using ed25519 address.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`addressEd25519` | *string* | The address to get the outputs for.   |
`type?` | *number* | Filter the type of outputs you are looking up, defaults to all.   |
`includeSpent?` | *boolean* | Filter the type of outputs you are looking up, defaults to false.   |

**Returns:** *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

The address outputs.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: *string*, `type?`: *number*, `includeSpent?`: *boolean*): *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

Get the address outputs.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`addressBech32` | *string* | The address to get the outputs for.   |
`type?` | *number* | Filter the type of outputs you are looking up, defaults to all.   |
`includeSpent?` | *boolean* | Filter the type of outputs you are looking up, defaults to false.   |

**Returns:** *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

The address outputs.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### health

▸ **health**(): *Promise*<boolean\>

Get the health of the node.

**Returns:** *Promise*<boolean\>

True if the node is healthy.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### info

▸ **info**(): *Promise*<[*INodeInfo*](../interfaces/models_inodeinfo.inodeinfo.md)\>

Get the info about the node.

**Returns:** *Promise*<[*INodeInfo*](../interfaces/models_inodeinfo.inodeinfo.md)\>

The node information.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### message

▸ **message**(`messageId`: *string*): *Promise*<[*IMessage*](../interfaces/models_imessage.imessage.md)\>

Get the message data by id.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`messageId` | *string* | The message to get the data for.   |

**Returns:** *Promise*<[*IMessage*](../interfaces/models_imessage.imessage.md)\>

The message data.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messageChildren

▸ **messageChildren**(`messageId`: *string*): *Promise*<[*IChildrenResponse*](../interfaces/models_api_ichildrenresponse.ichildrenresponse.md)\>

Get the children of a message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`messageId` | *string* | The id of the message to get the children for.   |

**Returns:** *Promise*<[*IChildrenResponse*](../interfaces/models_api_ichildrenresponse.ichildrenresponse.md)\>

The messages children.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messageMetadata

▸ **messageMetadata**(`messageId`: *string*): *Promise*<[*IMessageMetadata*](../interfaces/models_imessagemetadata.imessagemetadata.md)\>

Get the message metadata by id.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`messageId` | *string* | The message to get the metadata for.   |

**Returns:** *Promise*<[*IMessageMetadata*](../interfaces/models_imessagemetadata.imessagemetadata.md)\>

The message metadata.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messageRaw

▸ **messageRaw**(`messageId`: *string*): *Promise*<Uint8Array\>

Get the message raw data by id.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`messageId` | *string* | The message to get the data for.   |

**Returns:** *Promise*<Uint8Array\>

The message raw data.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messageSubmit

▸ **messageSubmit**(`message`: [*IMessage*](../interfaces/models_imessage.imessage.md)): *Promise*<string\>

Submit message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMessage*](../interfaces/models_imessage.imessage.md) | The message to submit.   |

**Returns:** *Promise*<string\>

The messageId.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messageSubmitRaw

▸ **messageSubmitRaw**(`message`: *Uint8Array*): *Promise*<string\>

Submit message in raw format.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *Uint8Array* | The message to submit.   |

**Returns:** *Promise*<string\>

The messageId.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messagesFind

▸ **messagesFind**(`indexationKey`: *string* \| *Uint8Array*): *Promise*<[*IMessagesResponse*](../interfaces/models_api_imessagesresponse.imessagesresponse.md)\>

Find messages by index.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`indexationKey` | *string* \| *Uint8Array* | The index value as a byte array or UTF8 string.   |

**Returns:** *Promise*<[*IMessagesResponse*](../interfaces/models_api_imessagesresponse.imessagesresponse.md)\>

The messageId.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### milestone

▸ **milestone**(`index`: *number*): *Promise*<[*IMilestoneResponse*](../interfaces/models_api_imilestoneresponse.imilestoneresponse.md)\>

Get the requested milestone.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`index` | *number* | The index of the milestone to get.   |

**Returns:** *Promise*<[*IMilestoneResponse*](../interfaces/models_api_imilestoneresponse.imilestoneresponse.md)\>

The milestone details.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`: *number*): *Promise*<[*IMilestoneUtxoChangesResponse*](../interfaces/models_api_imilestoneutxochangesresponse.imilestoneutxochangesresponse.md)\>

Get the requested milestone utxo changes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`index` | *number* | The index of the milestone to request the changes for.   |

**Returns:** *Promise*<[*IMilestoneUtxoChangesResponse*](../interfaces/models_api_imilestoneutxochangesresponse.imilestoneutxochangesresponse.md)\>

The milestone utxo changes details.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### output

▸ **output**(`outputId`: *string*): *Promise*<[*IOutputResponse*](../interfaces/models_api_ioutputresponse.ioutputresponse.md)\>

Find an output by its identifier.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`outputId` | *string* | The id of the output to get.   |

**Returns:** *Promise*<[*IOutputResponse*](../interfaces/models_api_ioutputresponse.ioutputresponse.md)\>

The output details.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### peer

▸ **peer**(`peerId`: *string*): *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)\>

Get a peer.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`peerId` | *string* | The peer to delete.   |

**Returns:** *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)\>

The details for the created peer.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### peerAdd

▸ **peerAdd**(`multiAddress`: *string*, `alias?`: *string*): *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)\>

Add a new peer.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`multiAddress` | *string* | The address of the peer to add.   |
`alias?` | *string* | An optional alias for the peer.   |

**Returns:** *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)\>

The details for the created peer.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### peerDelete

▸ **peerDelete**(`peerId`: *string*): *Promise*<void\>

Delete a peer.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`peerId` | *string* | The peer to delete.   |

**Returns:** *Promise*<void\>

Nothing.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### peers

▸ **peers**(): *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)[]\>

Get the list of peers.

**Returns:** *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)[]\>

The list of peers.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### receipts

▸ **receipts**(`migratedAt?`: *number*): *Promise*<[*IReceiptsResponse*](../interfaces/models_api_ireceiptsresponse.ireceiptsresponse.md)\>

Get all the stored receipts or those for a given migrated at index.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`migratedAt?` | *number* | The index the receipts were migrated at, if not supplied returns all stored receipts.   |

**Returns:** *Promise*<[*IReceiptsResponse*](../interfaces/models_api_ireceiptsresponse.ireceiptsresponse.md)\>

The stored receipts.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### tips

▸ **tips**(): *Promise*<[*ITipsResponse*](../interfaces/models_api_itipsresponse.itipsresponse.md)\>

Get the tips from the node.

**Returns:** *Promise*<[*ITipsResponse*](../interfaces/models_api_itipsresponse.itipsresponse.md)\>

The tips.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### treasury

▸ **treasury**(): *Promise*<[*ITreasury*](../interfaces/models_itreasury.itreasury.md)\>

Get the current treasury output.

**Returns:** *Promise*<[*ITreasury*](../interfaces/models_itreasury.itreasury.md)\>

The details for the treasury.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)
