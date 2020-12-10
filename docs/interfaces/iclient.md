**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / IClient

# Interface: IClient

Client interface definition for API communication.

## Hierarchy

* **IClient**

## Implemented by

* [SingleNodeClient](../classes/singlenodeclient.md)

## Index

### Methods

* [address](iclient.md#address)
* [addressEd25519](iclient.md#addressed25519)
* [addressEd25519Outputs](iclient.md#addressed25519outputs)
* [addressOutputs](iclient.md#addressoutputs)
* [health](iclient.md#health)
* [info](iclient.md#info)
* [message](iclient.md#message)
* [messageChildren](iclient.md#messagechildren)
* [messageMetadata](iclient.md#messagemetadata)
* [messageRaw](iclient.md#messageraw)
* [messageSubmit](iclient.md#messagesubmit)
* [messageSubmitRaw](iclient.md#messagesubmitraw)
* [messagesFind](iclient.md#messagesfind)
* [milestone](iclient.md#milestone)
* [output](iclient.md#output)
* [peer](iclient.md#peer)
* [peerAdd](iclient.md#peeradd)
* [peerDelete](iclient.md#peerdelete)
* [peers](iclient.md#peers)
* [tips](iclient.md#tips)

## Methods

### address

▸ **address**(`addressBech32`: string): Promise<[IAddressResponse](iaddressresponse.md)\>

Get the address details using bech32 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to get the details for. |

**Returns:** Promise<[IAddressResponse](iaddressresponse.md)\>

The address details.

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`: string): Promise<[IAddressResponse](iaddressresponse.md)\>

Get the address details using ed25519 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to get the details for. |

**Returns:** Promise<[IAddressResponse](iaddressresponse.md)\>

The address details.

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: string): Promise<[IAddressOutputsResponse](iaddressoutputsresponse.md)\>

Get the address outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to get the outputs for. |

**Returns:** Promise<[IAddressOutputsResponse](iaddressoutputsresponse.md)\>

The address outputs.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: string): Promise<[IAddressOutputsResponse](iaddressoutputsresponse.md)\>

Get the address outputs using bech32 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to get the outputs for. |

**Returns:** Promise<[IAddressOutputsResponse](iaddressoutputsresponse.md)\>

The address outputs.

___

### health

▸ **health**(): Promise<boolean\>

Get the health of the node.

**Returns:** Promise<boolean\>

True if the node is healthy.

___

### info

▸ **info**(): Promise<[INodeInfo](inodeinfo.md)\>

Get the info about the node.

**Returns:** Promise<[INodeInfo](inodeinfo.md)\>

The node information.

___

### message

▸ **message**(`messageId`: string): Promise<[IMessage](imessage.md)\>

Get the message data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the data for. |

**Returns:** Promise<[IMessage](imessage.md)\>

The message data.

___

### messageChildren

▸ **messageChildren**(`messageId`: string): Promise<[IChildrenResponse](ichildrenresponse.md)\>

Get the children of a message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The id of the message to get the children for. |

**Returns:** Promise<[IChildrenResponse](ichildrenresponse.md)\>

The messages children.

___

### messageMetadata

▸ **messageMetadata**(`messageId`: string): Promise<[IMessageMetadata](imessagemetadata.md)\>

Get the message metadata by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the metadata for. |

**Returns:** Promise<[IMessageMetadata](imessagemetadata.md)\>

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

▸ **messageSubmit**(`message`: [IMessage](imessage.md)): Promise<string\>

Submit message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [IMessage](imessage.md) | The message to submit. |

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

▸ **messagesFind**(`indexationKey`: string): Promise<[IMessagesResponse](imessagesresponse.md)\>

Find messages by index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`indexationKey` | string | The index value. |

**Returns:** Promise<[IMessagesResponse](imessagesresponse.md)\>

The messageId.

___

### milestone

▸ **milestone**(`index`: number): Promise<[IMilestoneResponse](imilestoneresponse.md)\>

Get the requested milestone.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index of the milestone to get. |

**Returns:** Promise<[IMilestoneResponse](imilestoneresponse.md)\>

The milestone details.

___

### output

▸ **output**(`outputId`: string): Promise<[IOutputResponse](ioutputresponse.md)\>

Find an output by its identifier.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | string | The id of the output to get. |

**Returns:** Promise<[IOutputResponse](ioutputresponse.md)\>

The output details.

___

### peer

▸ **peer**(`peerId`: string): Promise<[IPeer](ipeer.md)\>

Get a peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`peerId` | string | The peer to delete. |

**Returns:** Promise<[IPeer](ipeer.md)\>

The details for the created peer.

___

### peerAdd

▸ **peerAdd**(`multiAddress`: string, `alias?`: undefined \| string): Promise<[IPeer](ipeer.md)\>

Add a new peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`multiAddress` | string | The address of the peer to add. |
`alias?` | undefined \| string | An optional alias for the peer. |

**Returns:** Promise<[IPeer](ipeer.md)\>

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

▸ **peers**(): Promise<[IPeer](ipeer.md)[]\>

Get the list of peers.

**Returns:** Promise<[IPeer](ipeer.md)[]\>

The list of peers.

___

### tips

▸ **tips**(): Promise<[ITipsResponse](itipsresponse.md)\>

Get the tips from the node.

**Returns:** Promise<[ITipsResponse](itipsresponse.md)\>

The tips.
