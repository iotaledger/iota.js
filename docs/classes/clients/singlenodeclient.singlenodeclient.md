[@iota/iota.js](../../README.md) / [clients/singleNodeClient](../../modules/clients_singlenodeclient.md) / SingleNodeClient

# Class: SingleNodeClient

[clients/singleNodeClient](../../modules/clients_singlenodeclient.md).SingleNodeClient

Client for API communication.

## Hierarchy

* **SingleNodeClient**

## Implements

* [*IClient*](../../interfaces/models/iclient.iclient.md)

## Table of contents

### Constructors

- [constructor](singlenodeclient.singlenodeclient.md#constructor)

### Methods

- [address](singlenodeclient.singlenodeclient.md#address)
- [addressEd25519](singlenodeclient.singlenodeclient.md#addressed25519)
- [addressEd25519Outputs](singlenodeclient.singlenodeclient.md#addressed25519outputs)
- [addressOutputs](singlenodeclient.singlenodeclient.md#addressoutputs)
- [health](singlenodeclient.singlenodeclient.md#health)
- [info](singlenodeclient.singlenodeclient.md#info)
- [message](singlenodeclient.singlenodeclient.md#message)
- [messageChildren](singlenodeclient.singlenodeclient.md#messagechildren)
- [messageMetadata](singlenodeclient.singlenodeclient.md#messagemetadata)
- [messageRaw](singlenodeclient.singlenodeclient.md#messageraw)
- [messageSubmit](singlenodeclient.singlenodeclient.md#messagesubmit)
- [messageSubmitRaw](singlenodeclient.singlenodeclient.md#messagesubmitraw)
- [messagesFind](singlenodeclient.singlenodeclient.md#messagesfind)
- [milestone](singlenodeclient.singlenodeclient.md#milestone)
- [milestoneUtxoChanges](singlenodeclient.singlenodeclient.md#milestoneutxochanges)
- [output](singlenodeclient.singlenodeclient.md#output)
- [peer](singlenodeclient.singlenodeclient.md#peer)
- [peerAdd](singlenodeclient.singlenodeclient.md#peeradd)
- [peerDelete](singlenodeclient.singlenodeclient.md#peerdelete)
- [peers](singlenodeclient.singlenodeclient.md#peers)
- [tips](singlenodeclient.singlenodeclient.md#tips)

## Constructors

### constructor

\+ **new SingleNodeClient**(`endpoint`: *string*, `options?`: SingleNodeClientOptions): [*SingleNodeClient*](singlenodeclient.singlenodeclient.md)

Create a new instance of client.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`endpoint` | *string* | The endpoint.   |
`options?` | SingleNodeClientOptions | Options for the client.    |

**Returns:** [*SingleNodeClient*](singlenodeclient.singlenodeclient.md)

## Methods

### address

▸ **address**(`addressBech32`: *string*): *Promise*<[*IAddressResponse*](../../interfaces/models/api/iaddressresponse.iaddressresponse.md)\>

Get the address details.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | *string* | The address to get the details for.   |

**Returns:** *Promise*<[*IAddressResponse*](../../interfaces/models/api/iaddressresponse.iaddressresponse.md)\>

The address details.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`: *string*): *Promise*<[*IAddressResponse*](../../interfaces/models/api/iaddressresponse.iaddressresponse.md)\>

Get the address detail using ed25519 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | *string* | The address to get the details for.   |

**Returns:** *Promise*<[*IAddressResponse*](../../interfaces/models/api/iaddressresponse.iaddressresponse.md)\>

The address details.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: *string*): *Promise*<[*IAddressOutputsResponse*](../../interfaces/models/api/iaddressoutputsresponse.iaddressoutputsresponse.md)\>

Get the address outputs using ed25519 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | *string* | The address to get the outputs for.   |

**Returns:** *Promise*<[*IAddressOutputsResponse*](../../interfaces/models/api/iaddressoutputsresponse.iaddressoutputsresponse.md)\>

The address outputs.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: *string*): *Promise*<[*IAddressOutputsResponse*](../../interfaces/models/api/iaddressoutputsresponse.iaddressoutputsresponse.md)\>

Get the address outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | *string* | The address to get the outputs for.   |

**Returns:** *Promise*<[*IAddressOutputsResponse*](../../interfaces/models/api/iaddressoutputsresponse.iaddressoutputsresponse.md)\>

The address outputs.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### health

▸ **health**(): *Promise*<*boolean*\>

Get the health of the node.

**Returns:** *Promise*<*boolean*\>

True if the node is healthy.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### info

▸ **info**(): *Promise*<[*INodeInfo*](../../interfaces/models/inodeinfo.inodeinfo.md)\>

Get the info about the node.

**Returns:** *Promise*<[*INodeInfo*](../../interfaces/models/inodeinfo.inodeinfo.md)\>

The node information.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### message

▸ **message**(`messageId`: *string*): *Promise*<[*IMessage*](../../interfaces/models/imessage.imessage.md)\>

Get the message data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | *string* | The message to get the data for.   |

**Returns:** *Promise*<[*IMessage*](../../interfaces/models/imessage.imessage.md)\>

The message data.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### messageChildren

▸ **messageChildren**(`messageId`: *string*): *Promise*<[*IChildrenResponse*](../../interfaces/models/api/ichildrenresponse.ichildrenresponse.md)\>

Get the children of a message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | *string* | The id of the message to get the children for.   |

**Returns:** *Promise*<[*IChildrenResponse*](../../interfaces/models/api/ichildrenresponse.ichildrenresponse.md)\>

The messages children.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### messageMetadata

▸ **messageMetadata**(`messageId`: *string*): *Promise*<[*IMessageMetadata*](../../interfaces/models/imessagemetadata.imessagemetadata.md)\>

Get the message metadata by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | *string* | The message to get the metadata for.   |

**Returns:** *Promise*<[*IMessageMetadata*](../../interfaces/models/imessagemetadata.imessagemetadata.md)\>

The message metadata.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### messageRaw

▸ **messageRaw**(`messageId`: *string*): *Promise*<*Uint8Array*\>

Get the message raw data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | *string* | The message to get the data for.   |

**Returns:** *Promise*<*Uint8Array*\>

The message raw data.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### messageSubmit

▸ **messageSubmit**(`message`: [*IMessage*](../../interfaces/models/imessage.imessage.md)): *Promise*<*string*\>

Submit message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [*IMessage*](../../interfaces/models/imessage.imessage.md) | The message to submit.   |

**Returns:** *Promise*<*string*\>

The messageId.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### messageSubmitRaw

▸ **messageSubmitRaw**(`message`: *Uint8Array*): *Promise*<*string*\>

Submit message in raw format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | *Uint8Array* | The message to submit.   |

**Returns:** *Promise*<*string*\>

The messageId.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### messagesFind

▸ **messagesFind**(`indexationKey`: *string*): *Promise*<[*IMessagesResponse*](../../interfaces/models/api/imessagesresponse.imessagesresponse.md)\>

Find messages by index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`indexationKey` | *string* | The index value.   |

**Returns:** *Promise*<[*IMessagesResponse*](../../interfaces/models/api/imessagesresponse.imessagesresponse.md)\>

The messageId.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### milestone

▸ **milestone**(`index`: *number*): *Promise*<[*IMilestoneResponse*](../../interfaces/models/api/imilestoneresponse.imilestoneresponse.md)\>

Get the requested milestone.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *number* | The index of the milestone to get.   |

**Returns:** *Promise*<[*IMilestoneResponse*](../../interfaces/models/api/imilestoneresponse.imilestoneresponse.md)\>

The milestone details.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`: *number*): *Promise*<[*IMilestoneUtxoChangesResponse*](../../interfaces/models/api/imilestoneutxochangesresponse.imilestoneutxochangesresponse.md)\>

Get the requested milestone utxo changes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *number* | The index of the milestone to request the changes for.   |

**Returns:** *Promise*<[*IMilestoneUtxoChangesResponse*](../../interfaces/models/api/imilestoneutxochangesresponse.imilestoneutxochangesresponse.md)\>

The milestone utxo changes details.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### output

▸ **output**(`outputId`: *string*): *Promise*<[*IOutputResponse*](../../interfaces/models/api/ioutputresponse.ioutputresponse.md)\>

Find an output by its identifier.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | *string* | The id of the output to get.   |

**Returns:** *Promise*<[*IOutputResponse*](../../interfaces/models/api/ioutputresponse.ioutputresponse.md)\>

The output details.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### peer

▸ **peer**(`peerId`: *string*): *Promise*<[*IPeer*](../../interfaces/models/ipeer.ipeer.md)\>

Get a peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`peerId` | *string* | The peer to delete.   |

**Returns:** *Promise*<[*IPeer*](../../interfaces/models/ipeer.ipeer.md)\>

The details for the created peer.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### peerAdd

▸ **peerAdd**(`multiAddress`: *string*, `alias?`: *string*): *Promise*<[*IPeer*](../../interfaces/models/ipeer.ipeer.md)\>

Add a new peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`multiAddress` | *string* | The address of the peer to add.   |
`alias?` | *string* | An optional alias for the peer.   |

**Returns:** *Promise*<[*IPeer*](../../interfaces/models/ipeer.ipeer.md)\>

The details for the created peer.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### peerDelete

▸ **peerDelete**(`peerId`: *string*): *Promise*<*void*\>

Delete a peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`peerId` | *string* | The peer to delete.   |

**Returns:** *Promise*<*void*\>

Nothing.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### peers

▸ **peers**(): *Promise*<[*IPeer*](../../interfaces/models/ipeer.ipeer.md)[]\>

Get the list of peers.

**Returns:** *Promise*<[*IPeer*](../../interfaces/models/ipeer.ipeer.md)[]\>

The list of peers.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)

___

### tips

▸ **tips**(): *Promise*<[*ITipsResponse*](../../interfaces/models/api/itipsresponse.itipsresponse.md)\>

Get the tips from the node.

**Returns:** *Promise*<[*ITipsResponse*](../../interfaces/models/api/itipsresponse.itipsresponse.md)\>

The tips.

Implementation of: [IClient](../../interfaces/models/iclient.iclient.md)
