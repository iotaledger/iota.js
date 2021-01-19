[@iota/iota.js](../../README.md) / [models/IMqttClient](../../modules/models_imqttclient.md) / IMqttClient

# Interface: IMqttClient

[models/IMqttClient](../../modules/models_imqttclient.md).IMqttClient

Client interface definition for API communication.

## Hierarchy

* **IMqttClient**

## Implemented by

* [*MqttClient*](../../classes/clients/mqttclient.mqttclient.md)

## Table of contents

### Methods

- [addressEd25519Outputs](imqttclient.imqttclient.md#addressed25519outputs)
- [addressOutputs](imqttclient.imqttclient.md#addressoutputs)
- [index](imqttclient.imqttclient.md#index)
- [indexRaw](imqttclient.imqttclient.md#indexraw)
- [messageMetadata](imqttclient.imqttclient.md#messagemetadata)
- [messages](imqttclient.imqttclient.md#messages)
- [messagesMetadata](imqttclient.imqttclient.md#messagesmetadata)
- [messagesRaw](imqttclient.imqttclient.md#messagesraw)
- [milestonesLatest](imqttclient.imqttclient.md#milestoneslatest)
- [milestonesSolid](imqttclient.imqttclient.md#milestonessolid)
- [output](imqttclient.imqttclient.md#output)
- [statusChanged](imqttclient.imqttclient.md#statuschanged)
- [subscribeJson](imqttclient.imqttclient.md#subscribejson)
- [subscribeRaw](imqttclient.imqttclient.md#subscriberaw)
- [unsubscribe](imqttclient.imqttclient.md#unsubscribe)

## Methods

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: *string*, `callback`: (`topic`: *string*, `data`: [*IOutputResponse*](api/ioutputresponse.ioutputresponse.md)) => *void*): *string*

Subscribe to the ed25519 address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | *string* | The address to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IOutputResponse*](api/ioutputresponse.ioutputresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: *string*, `callback`: (`topic`: *string*, `data`: [*IOutputResponse*](api/ioutputresponse.ioutputresponse.md)) => *void*): *string*

Subscribe to the address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | *string* | The address to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IOutputResponse*](api/ioutputresponse.ioutputresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### index

▸ **index**(`index`: *string*, `callback`: (`topic`: *string*, `data`: [*IMessage*](imessage.imessage.md), `raw`: *Uint8Array*) => *void*): *string*

Subscribe to get all messages for the specified index in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *string* | The index to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IMessage*](imessage.imessage.md), `raw`: *Uint8Array*) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### indexRaw

▸ **indexRaw**(`index`: *string*, `callback`: (`topic`: *string*, `data`: *Uint8Array*) => *void*): *string*

Subscribe to get all messages for the specified index in binary form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *string* | The index to monitor.   |
`callback` | (`topic`: *string*, `data`: *Uint8Array*) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### messageMetadata

▸ **messageMetadata**(`messageId`: *string*, `callback`: (`topic`: *string*, `data`: [*IMessageMetadata*](imessagemetadata.imessagemetadata.md)) => *void*): *string*

Subscribe to metadata updates for a specific message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | *string* | The message to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IMessageMetadata*](imessagemetadata.imessagemetadata.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### messages

▸ **messages**(`callback`: (`topic`: *string*, `data`: [*IMessage*](imessage.imessage.md), `raw`: *Uint8Array*) => *void*): *string*

Subscribe to get all messages in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMessage*](imessage.imessage.md), `raw`: *Uint8Array*) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### messagesMetadata

▸ **messagesMetadata**(`callback`: (`topic`: *string*, `data`: [*IMessageMetadata*](imessagemetadata.imessagemetadata.md)) => *void*): *string*

Subscribe to get the metadata for all the messages.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMessageMetadata*](imessagemetadata.imessagemetadata.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### messagesRaw

▸ **messagesRaw**(`callback`: (`topic`: *string*, `data`: *Uint8Array*) => *void*): *string*

Subscribe to get all messages in binary form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: *Uint8Array*) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### milestonesLatest

▸ **milestonesLatest**(`callback`: (`topic`: *string*, `data`: [*IMqttMilestoneResponse*](api/imqttmilestoneresponse.imqttmilestoneresponse.md)) => *void*): *string*

Subscribe to the latest milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMqttMilestoneResponse*](api/imqttmilestoneresponse.imqttmilestoneresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### milestonesSolid

▸ **milestonesSolid**(`callback`: (`topic`: *string*, `data`: [*IMqttMilestoneResponse*](api/imqttmilestoneresponse.imqttmilestoneresponse.md)) => *void*): *string*

Subscribe to the latest solid milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMqttMilestoneResponse*](api/imqttmilestoneresponse.imqttmilestoneresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### output

▸ **output**(`outputId`: *string*, `callback`: (`topic`: *string*, `data`: [*IOutputResponse*](api/ioutputresponse.ioutputresponse.md)) => *void*): *string*

Subscribe to updates for a specific output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | *string* | The output to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IOutputResponse*](api/ioutputresponse.ioutputresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### statusChanged

▸ **statusChanged**(`callback`: (`status`: [*IMqttStatus*](imqttstatus.imqttstatus.md)) => *void*): *string*

Subscribe to changes in the client state.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`status`: [*IMqttStatus*](imqttstatus.imqttstatus.md)) => *void* | Callback called when the state has changed.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### subscribeJson

▸ **subscribeJson**<T\>(`customTopic`: *string*, `callback`: (`topic`: *string*, `data`: T) => *void*): *string*

Subscribe to another type of message as json.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`customTopic` | *string* | The topic to subscribe to.   |
`callback` | (`topic`: *string*, `data`: T) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### subscribeRaw

▸ **subscribeRaw**(`customTopic`: *string*, `callback`: (`topic`: *string*, `data`: *Uint8Array*) => *void*): *string*

Subscribe to another type of message as raw data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`customTopic` | *string* | The topic to subscribe to.   |
`callback` | (`topic`: *string*, `data`: *Uint8Array*) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### unsubscribe

▸ **unsubscribe**(`subscriptionId`: *string*): *void*

Remove a subscription.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`subscriptionId` | *string* | The subscription to remove.    |

**Returns:** *void*
