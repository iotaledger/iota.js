**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / MqttClient

# Class: MqttClient

MQTT Client implementation for pub/sub communication.

## Hierarchy

* **MqttClient**

## Implements

* [IMqttClient](../interfaces/imqttclient.md)

## Index

### Constructors

* [constructor](mqttclient.md#constructor)

### Methods

* [addressEd25519Outputs](mqttclient.md#addressed25519outputs)
* [addressOutputs](mqttclient.md#addressoutputs)
* [index](mqttclient.md#index)
* [indexRaw](mqttclient.md#indexraw)
* [messageMetadata](mqttclient.md#messagemetadata)
* [messages](mqttclient.md#messages)
* [messagesMetadata](mqttclient.md#messagesmetadata)
* [messagesRaw](mqttclient.md#messagesraw)
* [milestonesLatest](mqttclient.md#milestoneslatest)
* [milestonesSolid](mqttclient.md#milestonessolid)
* [output](mqttclient.md#output)
* [statusChanged](mqttclient.md#statuschanged)
* [subscribeJson](mqttclient.md#subscribejson)
* [subscribeRaw](mqttclient.md#subscriberaw)
* [unsubscribe](mqttclient.md#unsubscribe)

## Constructors

### constructor

\+ **new MqttClient**(`endpoint`: string, `keepAliveTimeoutSeconds?`: number): [MqttClient](mqttclient.md)

Create a new instace of MqttClient.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`endpoint` | string | - | The endpoint to connect to. |
`keepAliveTimeoutSeconds` | number | 30 | Timeout to reconnect if no messages received.  |

**Returns:** [MqttClient](mqttclient.md)

## Methods

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: string, `callback`: (topic: string, data: [IOutputResponse](../interfaces/ioutputresponse.md)) => void): string

Subscribe to the ed25519 address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | string | The address to monitor. |
`callback` | (topic: string, data: [IOutputResponse](../interfaces/ioutputresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: string, `callback`: (topic: string, data: [IOutputResponse](../interfaces/ioutputresponse.md)) => void): string

Subscribe to the address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | string | The address to monitor. |
`callback` | (topic: string, data: [IOutputResponse](../interfaces/ioutputresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### index

▸ **index**(`index`: string, `callback`: (topic: string, data: [IMessage](../interfaces/imessage.md), raw: Uint8Array) => void): string

Subscribe to get all messages for the specified index in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | string | The index to monitor. |
`callback` | (topic: string, data: [IMessage](../interfaces/imessage.md), raw: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### indexRaw

▸ **indexRaw**(`index`: string, `callback`: (topic: string, data: Uint8Array) => void): string

Subscribe to get all messages for the specified index in binary form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | string | The index to monitor. |
`callback` | (topic: string, data: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### messageMetadata

▸ **messageMetadata**(`messageId`: string, `callback`: (topic: string, data: [IMessageMetadata](../interfaces/imessagemetadata.md)) => void): string

Subscribe to metadata updates for a specific message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to monitor. |
`callback` | (topic: string, data: [IMessageMetadata](../interfaces/imessagemetadata.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### messages

▸ **messages**(`callback`: (topic: string, data: [IMessage](../interfaces/imessage.md), raw: Uint8Array) => void): string

Subscribe to get all messages in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMessage](../interfaces/imessage.md), raw: Uint8Array) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### messagesMetadata

▸ **messagesMetadata**(`callback`: (topic: string, data: [IMessageMetadata](../interfaces/imessagemetadata.md)) => void): string

Subscribe to get the metadata for all the messages.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMessageMetadata](../interfaces/imessagemetadata.md)) => void | The callback which is called when new data arrives. |

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

### milestonesLatest

▸ **milestonesLatest**(`callback`: (topic: string, data: [IMilestoneResponse](../interfaces/imilestoneresponse.md)) => void): string

Subscribe to the latest milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMilestoneResponse](../interfaces/imilestoneresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### milestonesSolid

▸ **milestonesSolid**(`callback`: (topic: string, data: [IMilestoneResponse](../interfaces/imilestoneresponse.md)) => void): string

Subscribe to the latest solid milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (topic: string, data: [IMilestoneResponse](../interfaces/imilestoneresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### output

▸ **output**(`outputId`: string, `callback`: (topic: string, data: [IOutputResponse](../interfaces/ioutputresponse.md)) => void): string

Subscribe to updates for a specific output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | string | The output to monitor. |
`callback` | (topic: string, data: [IOutputResponse](../interfaces/ioutputresponse.md)) => void | The callback which is called when new data arrives. |

**Returns:** string

A subscription Id which can be used to unsubscribe.

___

### statusChanged

▸ **statusChanged**(`callback`: (data: [IMqttStatus](../interfaces/imqttstatus.md)) => void): string

Subscribe to changes in the client state.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (data: [IMqttStatus](../interfaces/imqttstatus.md)) => void | Callback called when the state has changed. |

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

### unsubscribe

▸ **unsubscribe**(`subscriptionId`: string): void

*Implementation of [IMqttClient](../interfaces/imqttclient.md)*

Remove a subscription.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`subscriptionId` | string | The subscription to remove.  |

**Returns:** void
