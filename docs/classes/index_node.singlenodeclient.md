[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / SingleNodeClient

# Class: SingleNodeClient

Client for API communication.

## Hierarchy

* **SingleNodeClient**

## Implements

* [*IClient*](../interfaces/models_iclient.iclient.md)

## Index

### Constructors

* [constructor](index_node.singlenodeclient.md#constructor)

### Methods

* [address](index_node.singlenodeclient.md#address)
* [addressEd25519](index_node.singlenodeclient.md#addressed25519)
* [addressEd25519Outputs](index_node.singlenodeclient.md#addressed25519outputs)
* [addressOutputs](index_node.singlenodeclient.md#addressoutputs)
* [health](index_node.singlenodeclient.md#health)
* [info](index_node.singlenodeclient.md#info)
* [message](index_node.singlenodeclient.md#message)
* [messageChildren](index_node.singlenodeclient.md#messagechildren)
* [messageMetadata](index_node.singlenodeclient.md#messagemetadata)
* [messageRaw](index_node.singlenodeclient.md#messageraw)
* [messageSubmit](index_node.singlenodeclient.md#messagesubmit)
* [messageSubmitRaw](index_node.singlenodeclient.md#messagesubmitraw)
* [messagesFind](index_node.singlenodeclient.md#messagesfind)
* [milestone](index_node.singlenodeclient.md#milestone)
* [output](index_node.singlenodeclient.md#output)
* [peer](index_node.singlenodeclient.md#peer)
* [peerAdd](index_node.singlenodeclient.md#peeradd)
* [peerDelete](index_node.singlenodeclient.md#peerdelete)
* [peers](index_node.singlenodeclient.md#peers)
* [tips](index_node.singlenodeclient.md#tips)

## Constructors

### constructor

\+ **new SingleNodeClient**(`endpoint`: *string*, `options?`: SingleNodeClientOptions): [*SingleNodeClient*](clients_singlenodeclient.singlenodeclient.md)

Create a new instance of client.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`endpoint` | *string* | The endpoint.   |
`options?` | SingleNodeClientOptions | Options for the client.    |

**Returns:** [*SingleNodeClient*](clients_singlenodeclient.singlenodeclient.md)

## Methods

### address

▸ **address**(`addressBech32`: *string*): *Promise*<[*IAddressResponse*](../interfaces/models_api_iaddressresponse.iaddressresponse.md)\>

Get the address details.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
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
------ | ------ | ------ |
`addressEd25519` | *string* | The address to get the details for.   |

**Returns:** *Promise*<[*IAddressResponse*](../interfaces/models_api_iaddressresponse.iaddressresponse.md)\>

The address details.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: *string*): *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

Get the address outputs using ed25519 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | *string* | The address to get the outputs for.   |

**Returns:** *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

The address outputs.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: *string*): *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

Get the address outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | *string* | The address to get the outputs for.   |

**Returns:** *Promise*<[*IAddressOutputsResponse*](../interfaces/models_api_iaddressoutputsresponse.iaddressoutputsresponse.md)\>

The address outputs.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### health

▸ **health**(): *Promise*<*boolean*\>

Get the health of the node.

**Returns:** *Promise*<*boolean*\>

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
------ | ------ | ------ |
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
------ | ------ | ------ |
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
------ | ------ | ------ |
`messageId` | *string* | The message to get the metadata for.   |

**Returns:** *Promise*<[*IMessageMetadata*](../interfaces/models_imessagemetadata.imessagemetadata.md)\>

The message metadata.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

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

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messageSubmit

▸ **messageSubmit**(`message`: [*IMessage*](../interfaces/models_imessage.imessage.md)): *Promise*<*string*\>

Submit message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [*IMessage*](../interfaces/models_imessage.imessage.md) | The message to submit.   |

**Returns:** *Promise*<*string*\>

The messageId.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

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

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### messagesFind

▸ **messagesFind**(`indexationKey`: *string*): *Promise*<[*IMessagesResponse*](../interfaces/models_api_imessagesresponse.imessagesresponse.md)\>

Find messages by index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`indexationKey` | *string* | The index value.   |

**Returns:** *Promise*<[*IMessagesResponse*](../interfaces/models_api_imessagesresponse.imessagesresponse.md)\>

The messageId.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### milestone

▸ **milestone**(`index`: *number*): *Promise*<[*IMilestoneResponse*](../interfaces/models_api_imilestoneresponse.imilestoneresponse.md)\>

Get the requested milestone.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *number* | The index of the milestone to get.   |

**Returns:** *Promise*<[*IMilestoneResponse*](../interfaces/models_api_imilestoneresponse.imilestoneresponse.md)\>

The milestone details.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### output

▸ **output**(`outputId`: *string*): *Promise*<[*IOutputResponse*](../interfaces/models_api_ioutputresponse.ioutputresponse.md)\>

Find an output by its identifier.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
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
------ | ------ | ------ |
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
------ | ------ | ------ |
`multiAddress` | *string* | The address of the peer to add.   |
`alias?` | *string* | An optional alias for the peer.   |

**Returns:** *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)\>

The details for the created peer.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

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

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### peers

▸ **peers**(): *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)[]\>

Get the list of peers.

**Returns:** *Promise*<[*IPeer*](../interfaces/models_ipeer.ipeer.md)[]\>

The list of peers.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)

___

### tips

▸ **tips**(): *Promise*<[*ITipsResponse*](../interfaces/models_api_itipsresponse.itipsresponse.md)\>

Get the tips from the node.

**Returns:** *Promise*<[*ITipsResponse*](../interfaces/models_api_itipsresponse.itipsresponse.md)\>

The tips.

Implementation of: [IClient](../interfaces/models_iclient.iclient.md)
