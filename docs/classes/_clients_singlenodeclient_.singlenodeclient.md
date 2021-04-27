**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["clients/singleNodeClient"](../modules/_clients_singlenodeclient_.md) / SingleNodeClient

# Class: SingleNodeClient

Client for API communication.

## Hierarchy

* **SingleNodeClient**

## Implements

* [IClient](../interfaces/_models_iclient_.iclient.md)

## Index

### Constructors

* [constructor](_clients_singlenodeclient_.singlenodeclient.md#constructor)

### Methods

* [address](_clients_singlenodeclient_.singlenodeclient.md#address)
* [addressEd25519](_clients_singlenodeclient_.singlenodeclient.md#addressed25519)
* [addressEd25519Outputs](_clients_singlenodeclient_.singlenodeclient.md#addressed25519outputs)
* [addressOutputs](_clients_singlenodeclient_.singlenodeclient.md#addressoutputs)
* [combineQueryParams](_clients_singlenodeclient_.singlenodeclient.md#combinequeryparams)
* [fetchBinary](_clients_singlenodeclient_.singlenodeclient.md#fetchbinary)
* [fetchJson](_clients_singlenodeclient_.singlenodeclient.md#fetchjson)
* [fetchStatus](_clients_singlenodeclient_.singlenodeclient.md#fetchstatus)
* [health](_clients_singlenodeclient_.singlenodeclient.md#health)
* [info](_clients_singlenodeclient_.singlenodeclient.md#info)
* [message](_clients_singlenodeclient_.singlenodeclient.md#message)
* [messageChildren](_clients_singlenodeclient_.singlenodeclient.md#messagechildren)
* [messageMetadata](_clients_singlenodeclient_.singlenodeclient.md#messagemetadata)
* [messageRaw](_clients_singlenodeclient_.singlenodeclient.md#messageraw)
* [messageSubmit](_clients_singlenodeclient_.singlenodeclient.md#messagesubmit)
* [messageSubmitRaw](_clients_singlenodeclient_.singlenodeclient.md#messagesubmitraw)
* [messagesFind](_clients_singlenodeclient_.singlenodeclient.md#messagesfind)
* [milestone](_clients_singlenodeclient_.singlenodeclient.md#milestone)
* [milestoneUtxoChanges](_clients_singlenodeclient_.singlenodeclient.md#milestoneutxochanges)
* [output](_clients_singlenodeclient_.singlenodeclient.md#output)
* [peer](_clients_singlenodeclient_.singlenodeclient.md#peer)
* [peerAdd](_clients_singlenodeclient_.singlenodeclient.md#peeradd)
* [peerDelete](_clients_singlenodeclient_.singlenodeclient.md#peerdelete)
* [peers](_clients_singlenodeclient_.singlenodeclient.md#peers)
* [receipts](_clients_singlenodeclient_.singlenodeclient.md#receipts)
* [tips](_clients_singlenodeclient_.singlenodeclient.md#tips)
* [transactionIncludedMessage](_clients_singlenodeclient_.singlenodeclient.md#transactionincludedmessage)
* [treasury](_clients_singlenodeclient_.singlenodeclient.md#treasury)

## Constructors

### constructor

\+ **new SingleNodeClient**(`endpoint`: string, `options?`: SingleNodeClientOptions): [SingleNodeClient](_clients_singlenodeclient_.singlenodeclient.md)

Create a new instance of client.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`endpoint` | string | The endpoint. |
`options?` | SingleNodeClientOptions | Options for the client.  |

**Returns:** [SingleNodeClient](_clients_singlenodeclient_.singlenodeclient.md)

## Methods

### address

▸ **address**(`addressBech32`: string): Promise<[IAddressResponse](../interfaces/_models_api_iaddressresponse_.iaddressresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the address details.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to get the details for. |

**Returns:** Promise<[IAddressResponse](../interfaces/_models_api_iaddressresponse_.iaddressresponse.md)\>

The address details.

___

### addressEd25519

▸ **addressEd25519**(`addressEd25519`: string): Promise<[IAddressResponse](../interfaces/_models_api_iaddressresponse_.iaddressresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the address detail using ed25519 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to get the details for. |

**Returns:** Promise<[IAddressResponse](../interfaces/_models_api_iaddressresponse_.iaddressresponse.md)\>

The address details.

___

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: string, `type?`: undefined \| number, `includeSpent?`: undefined \| false \| true): Promise<[IAddressOutputsResponse](../interfaces/_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the address outputs using ed25519 address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to get the outputs for. |
`type?` | undefined \| number | Filter the type of outputs you are looking up, defaults to all. |
`includeSpent?` | undefined \| false \| true | Filter the type of outputs you are looking up, defaults to false. |

**Returns:** Promise<[IAddressOutputsResponse](../interfaces/_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

The address outputs.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: string, `type?`: undefined \| number, `includeSpent?`: undefined \| false \| true): Promise<[IAddressOutputsResponse](../interfaces/_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the address outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to get the outputs for. |
`type?` | undefined \| number | Filter the type of outputs you are looking up, defaults to all. |
`includeSpent?` | undefined \| false \| true | Filter the type of outputs you are looking up, defaults to false. |

**Returns:** Promise<[IAddressOutputsResponse](../interfaces/_models_api_iaddressoutputsresponse_.iaddressoutputsresponse.md)\>

The address outputs.

___

### combineQueryParams

▸ **combineQueryParams**(`queryParams`: string[]): string

Combine the query params.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`queryParams` | string[] | The quer params to combine. |

**Returns:** string

The combined query params.

___

### fetchBinary

▸ **fetchBinary**<T\>(`method`: \"get\" \| \"post\", `route`: string, `requestData?`: Uint8Array): Promise<Uint8Array \| T\>

Perform a request for binary data.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`method` | \"get\" \| \"post\" | The http method. |
`route` | string | The route of the request. |
`requestData?` | Uint8Array | Request to send to the endpoint. |

**Returns:** Promise<Uint8Array \| T\>

The response.

___

### fetchJson

▸ **fetchJson**<T, U\>(`method`: \"get\" \| \"post\" \| \"delete\", `route`: string, `requestData?`: T): Promise<U\>

Perform a request in json format.

#### Type parameters:

Name |
------ |
`T` |
`U` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`method` | \"get\" \| \"post\" \| \"delete\" | The http method. |
`route` | string | The route of the request. |
`requestData?` | T | Request to send to the endpoint. |

**Returns:** Promise<U\>

The response.

___

### fetchStatus

▸ **fetchStatus**(`route`: string): Promise<number\>

Perform a request and just return the status.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`route` | string | The route of the request. |

**Returns:** Promise<number\>

The response.

___

### health

▸ **health**(): Promise<boolean\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the health of the node.

**Returns:** Promise<boolean\>

True if the node is healthy.

___

### info

▸ **info**(): Promise<[INodeInfo](../interfaces/_models_inodeinfo_.inodeinfo.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the info about the node.

**Returns:** Promise<[INodeInfo](../interfaces/_models_inodeinfo_.inodeinfo.md)\>

The node information.

___

### message

▸ **message**(`messageId`: string): Promise<[IMessage](../interfaces/_models_imessage_.imessage.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the message data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the data for. |

**Returns:** Promise<[IMessage](../interfaces/_models_imessage_.imessage.md)\>

The message data.

___

### messageChildren

▸ **messageChildren**(`messageId`: string): Promise<[IChildrenResponse](../interfaces/_models_api_ichildrenresponse_.ichildrenresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the children of a message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The id of the message to get the children for. |

**Returns:** Promise<[IChildrenResponse](../interfaces/_models_api_ichildrenresponse_.ichildrenresponse.md)\>

The messages children.

___

### messageMetadata

▸ **messageMetadata**(`messageId`: string): Promise<[IMessageMetadata](../interfaces/_models_imessagemetadata_.imessagemetadata.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the message metadata by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the metadata for. |

**Returns:** Promise<[IMessageMetadata](../interfaces/_models_imessagemetadata_.imessagemetadata.md)\>

The message metadata.

___

### messageRaw

▸ **messageRaw**(`messageId`: string): Promise<Uint8Array\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the message raw data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the data for. |

**Returns:** Promise<Uint8Array\>

The message raw data.

___

### messageSubmit

▸ **messageSubmit**(`message`: [IMessage](../interfaces/_models_imessage_.imessage.md)): Promise<string\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Submit message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [IMessage](../interfaces/_models_imessage_.imessage.md) | The message to submit. |

**Returns:** Promise<string\>

The messageId.

___

### messageSubmitRaw

▸ **messageSubmitRaw**(`message`: Uint8Array): Promise<string\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Submit message in raw format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | The message to submit. |

**Returns:** Promise<string\>

The messageId.

___

### messagesFind

▸ **messagesFind**(`indexationKey`: Uint8Array \| string): Promise<[IMessagesResponse](../interfaces/_models_api_imessagesresponse_.imessagesresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Find messages by index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`indexationKey` | Uint8Array \| string | The index value as a byte array or UTF8 string. |

**Returns:** Promise<[IMessagesResponse](../interfaces/_models_api_imessagesresponse_.imessagesresponse.md)\>

The messageId.

___

### milestone

▸ **milestone**(`index`: number): Promise<[IMilestoneResponse](../interfaces/_models_api_imilestoneresponse_.imilestoneresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the requested milestone.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index of the milestone to get. |

**Returns:** Promise<[IMilestoneResponse](../interfaces/_models_api_imilestoneresponse_.imilestoneresponse.md)\>

The milestone details.

___

### milestoneUtxoChanges

▸ **milestoneUtxoChanges**(`index`: number): Promise<[IMilestoneUtxoChangesResponse](../interfaces/_models_api_imilestoneutxochangesresponse_.imilestoneutxochangesresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the requested milestone utxo changes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index of the milestone to request the changes for. |

**Returns:** Promise<[IMilestoneUtxoChangesResponse](../interfaces/_models_api_imilestoneutxochangesresponse_.imilestoneutxochangesresponse.md)\>

The milestone utxo changes details.

___

### output

▸ **output**(`outputId`: string): Promise<[IOutputResponse](../interfaces/_models_api_ioutputresponse_.ioutputresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Find an output by its identifier.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | string | The id of the output to get. |

**Returns:** Promise<[IOutputResponse](../interfaces/_models_api_ioutputresponse_.ioutputresponse.md)\>

The output details.

___

### peer

▸ **peer**(`peerId`: string): Promise<[IPeer](../interfaces/_models_ipeer_.ipeer.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get a peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`peerId` | string | The peer to delete. |

**Returns:** Promise<[IPeer](../interfaces/_models_ipeer_.ipeer.md)\>

The details for the created peer.

___

### peerAdd

▸ **peerAdd**(`multiAddress`: string, `alias?`: undefined \| string): Promise<[IPeer](../interfaces/_models_ipeer_.ipeer.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Add a new peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`multiAddress` | string | The address of the peer to add. |
`alias?` | undefined \| string | An optional alias for the peer. |

**Returns:** Promise<[IPeer](../interfaces/_models_ipeer_.ipeer.md)\>

The details for the created peer.

___

### peerDelete

▸ **peerDelete**(`peerId`: string): Promise<void\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Delete a peer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`peerId` | string | The peer to delete. |

**Returns:** Promise<void\>

Nothing.

___

### peers

▸ **peers**(): Promise<[IPeer](../interfaces/_models_ipeer_.ipeer.md)[]\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the list of peers.

**Returns:** Promise<[IPeer](../interfaces/_models_ipeer_.ipeer.md)[]\>

The list of peers.

___

### receipts

▸ **receipts**(`migratedAt?`: undefined \| number): Promise<[IReceiptsResponse](../interfaces/_models_api_ireceiptsresponse_.ireceiptsresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get all the stored receipts or those for a given migrated at index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`migratedAt?` | undefined \| number | The index the receipts were migrated at, if not supplied returns all stored receipts. |

**Returns:** Promise<[IReceiptsResponse](../interfaces/_models_api_ireceiptsresponse_.ireceiptsresponse.md)\>

The stored receipts.

___

### tips

▸ **tips**(): Promise<[ITipsResponse](../interfaces/_models_api_itipsresponse_.itipsresponse.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the tips from the node.

**Returns:** Promise<[ITipsResponse](../interfaces/_models_api_itipsresponse_.itipsresponse.md)\>

The tips.

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`: string): Promise<[IMessage](../interfaces/_models_imessage_.imessage.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the message that was included in the ledger for a transaction.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transactionId` | string | The id of the transaction to get the included message for. |

**Returns:** Promise<[IMessage](../interfaces/_models_imessage_.imessage.md)\>

The message.

___

### treasury

▸ **treasury**(): Promise<[ITreasury](../interfaces/_models_itreasury_.itreasury.md)\>

*Implementation of [IClient](../interfaces/_models_iclient_.iclient.md)*

Get the current treasury output.

**Returns:** Promise<[ITreasury](../interfaces/_models_itreasury_.itreasury.md)\>

The details for the treasury.
