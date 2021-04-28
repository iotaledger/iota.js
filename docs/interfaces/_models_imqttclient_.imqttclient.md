**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IMqttClient"](../modules/_models_imqttclient_.md) / IMqttClient

# Interface: IMqttClient

Client interface definition for API communication.

## Hierarchy

* **IMqttClient**

## Implemented by

* [MqttClient](../classes/_clients_mqttclient_.mqttclient.md)

## Index

### Methods

* [addressEd25519Outputs](_models_imqttclient_.imqttclient.md#addressed25519outputs)
* [addressOutputs](_models_imqttclient_.imqttclient.md#addressoutputs)
* [index](_models_imqttclient_.imqttclient.md#index)
* [indexRaw](_models_imqttclient_.imqttclient.md#indexraw)
* [messageMetadata](_models_imqttclient_.imqttclient.md#messagemetadata)
* [messages](_models_imqttclient_.imqttclient.md#messages)
* [messagesMetadata](_models_imqttclient_.imqttclient.md#messagesmetadata)
* [messagesRaw](_models_imqttclient_.imqttclient.md#messagesraw)
* [milestonesConfirmed](_models_imqttclient_.imqttclient.md#milestonesconfirmed)
* [milestonesLatest](_models_imqttclient_.imqttclient.md#milestoneslatest)
* [output](_models_imqttclient_.imqttclient.md#output)
* [statusChanged](_models_imqttclient_.imqttclient.md#statuschanged)
* [subscribeJson](_models_imqttclient_.imqttclient.md#subscribejson)
* [subscribeRaw](_models_imqttclient_.imqttclient.md#subscriberaw)
* [transactionIncludedMessage](_models_imqttclient_.imqttclient.md#transactionincludedmessage)
* [transactionIncludedMessageRaw](_models_imqttclient_.imqttclient.md#transactionincludedmessageraw)
* [unsubscribe](_models_imqttclient_.imqttclient.md#unsubscribe)

## Methods

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: string, `callback`: (topic: string, data: [IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)) => void): string

Subscribe to the ed25519 address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to monitor. |
`callback` | (topic: string, data: [IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: string, `callback`: (topic: string, data: [IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)) => void): string

Subscribe to the address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to monitor. |
`callback` | (topic: string, data: [IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### index

▸ **index**(`index`: Uint8Array \| string, `callback`: (topic: string, data: [IMessage](_models_imessage_.imessage.md), raw: Uint8Array) => void): string

Subscribe to get all messages for the specified index in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | Uint8Array \| string | The index to monitor as bytes or in UTF8. |
`callback` | (topic: string, data: [IMessage](_models_imessage_.imessage.md), raw: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### indexRaw

▸ **indexRaw**(`index`: Uint8Array \| string, `callback`: (topic: string, data: Uint8Array) => void): string

Subscribe to get all messages for the specified index in binary form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | Uint8Array \| string | The index to monitor as bytes or in UTF8. |
`callback` | (topic: string, data: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### messageMetadata

▸ **messageMetadata**(`messageId`: string, `callback`: (topic: string, data: [IMessageMetadata](_models_imessagemetadata_.imessagemetadata.md)) => void): string

Subscribe to metadata updates for a specific message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to monitor. |
`callback` | (topic: string, data: [IMessageMetadata](_models_imessagemetadata_.imessagemetadata.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### messages

▸ **messages**(`callback`: (topic: string, data: [IMessage](_models_imessage_.imessage.md), raw: Uint8Array) => void): string

Subscribe to get all messages in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMessage](_models_imessage_.imessage.md), raw: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### messagesMetadata

▸ **messagesMetadata**(`callback`: (topic: string, data: [IMessageMetadata](_models_imessagemetadata_.imessagemetadata.md)) => void): string

Subscribe to get the metadata for all the messages.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMessageMetadata](_models_imessagemetadata_.imessagemetadata.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### messagesRaw

▸ **messagesRaw**(`callback`: (topic: string, data: Uint8Array) => void): string

Subscribe to get all messages in binary form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### milestonesConfirmed

▸ **milestonesConfirmed**(`callback`: (topic: string, data: [IMqttMilestoneResponse](_models_api_imqttmilestoneresponse_.imqttmilestoneresponse.md)) => void): string

Subscribe to the latest confirmed milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMqttMilestoneResponse](_models_api_imqttmilestoneresponse_.imqttmilestoneresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### milestonesLatest

▸ **milestonesLatest**(`callback`: (topic: string, data: [IMqttMilestoneResponse](_models_api_imqttmilestoneresponse_.imqttmilestoneresponse.md)) => void): string

Subscribe to the latest milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMqttMilestoneResponse](_models_api_imqttmilestoneresponse_.imqttmilestoneresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### output

▸ **output**(`outputId`: string, `callback`: (topic: string, data: [IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)) => void): string

Subscribe to updates for a specific output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | string | The output to monitor. |
`callback` | (topic: string, data: [IOutputResponse](_models_api_ioutputresponse_.ioutputresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### statusChanged

▸ **statusChanged**(`callback`: (status: [IMqttStatus](_models_imqttstatus_.imqttstatus.md)) => void): string

Subscribe to changes in the client state.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (status: [IMqttStatus](_models_imqttstatus_.imqttstatus.md)) => void | Callback called when the state has changed. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### subscribeJson

▸ **subscribeJson**<T\>(`customTopic`: string, `callback`: (topic: string, data: T) => void): string

Subscribe to another type of message as json.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`customTopic` | string | The topic to subscribe to. |
`callback` | (topic: string, data: T) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### subscribeRaw

▸ **subscribeRaw**(`customTopic`: string, `callback`: (topic: string, data: Uint8Array) => void): string

Subscribe to another type of message as raw data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`customTopic` | string | The topic to subscribe to. |
`callback` | (topic: string, data: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`: string, `callback`: (topic: string, data: [IMessage](_models_imessage_.imessage.md), raw: Uint8Array) => void): string

Subscribe to message updates for a specific transactionId.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transactionId` | string | The message to monitor. |
`callback` | (topic: string, data: [IMessage](_models_imessage_.imessage.md), raw: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### transactionIncludedMessageRaw

▸ **transactionIncludedMessageRaw**(`transactionId`: string, `callback`: (topic: string, data: Uint8Array) => void): string

Subscribe to message updates for a specific transactionId.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transactionId` | string | The message to monitor. |
`callback` | (topic: string, data: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### unsubscribe

▸ **unsubscribe**(`subscriptionId`: string): void

Remove a subscription.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`subscriptionId` | string | The subscription to remove.  |

**Returns:** void