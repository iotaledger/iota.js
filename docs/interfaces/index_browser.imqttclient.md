[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / IMqttClient

# Interface: IMqttClient

Client interface definition for API communication.

## Hierarchy

* **IMqttClient**

## Index

### Methods

* [addressEd25519Outputs](index_browser.imqttclient.md#addressed25519outputs)
* [addressOutputs](index_browser.imqttclient.md#addressoutputs)
* [index](index_browser.imqttclient.md#index)
* [indexRaw](index_browser.imqttclient.md#indexraw)
* [messageMetadata](index_browser.imqttclient.md#messagemetadata)
* [messages](index_browser.imqttclient.md#messages)
* [messagesMetadata](index_browser.imqttclient.md#messagesmetadata)
* [messagesRaw](index_browser.imqttclient.md#messagesraw)
* [milestonesLatest](index_browser.imqttclient.md#milestoneslatest)
* [milestonesSolid](index_browser.imqttclient.md#milestonessolid)
* [output](index_browser.imqttclient.md#output)
* [statusChanged](index_browser.imqttclient.md#statuschanged)
* [subscribeJson](index_browser.imqttclient.md#subscribejson)
* [subscribeRaw](index_browser.imqttclient.md#subscriberaw)
* [unsubscribe](index_browser.imqttclient.md#unsubscribe)

## Methods

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`: *string*, `callback`: (`topic`: *string*, `data`: [*IOutputResponse*](models_api_ioutputresponse.ioutputresponse.md)) => *void*): *string*

Subscribe to the ed25519 address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressEd25519` | *string* | The address to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IOutputResponse*](models_api_ioutputresponse.ioutputresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`: *string*, `callback`: (`topic`: *string*, `data`: [*IOutputResponse*](models_api_ioutputresponse.ioutputresponse.md)) => *void*): *string*

Subscribe to the address for output updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressBech32` | *string* | The address to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IOutputResponse*](models_api_ioutputresponse.ioutputresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### index

▸ **index**(`index`: *string*, `callback`: (`topic`: *string*, `data`: [*IMessage*](models_imessage.imessage.md), `raw`: *Uint8Array*) => *void*): *string*

Subscribe to get all messages for the specified index in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *string* | The index to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IMessage*](models_imessage.imessage.md), `raw`: *Uint8Array*) => *void* | The callback which is called when new data arrives.   |

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

▸ **messageMetadata**(`messageId`: *string*, `callback`: (`topic`: *string*, `data`: [*IMessageMetadata*](models_imessagemetadata.imessagemetadata.md)) => *void*): *string*

Subscribe to metadata updates for a specific message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | *string* | The message to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IMessageMetadata*](models_imessagemetadata.imessagemetadata.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### messages

▸ **messages**(`callback`: (`topic`: *string*, `data`: [*IMessage*](models_imessage.imessage.md), `raw`: *Uint8Array*) => *void*): *string*

Subscribe to get all messages in object form.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMessage*](models_imessage.imessage.md), `raw`: *Uint8Array*) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### messagesMetadata

▸ **messagesMetadata**(`callback`: (`topic`: *string*, `data`: [*IMessageMetadata*](models_imessagemetadata.imessagemetadata.md)) => *void*): *string*

Subscribe to get the metadata for all the messages.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMessageMetadata*](models_imessagemetadata.imessagemetadata.md)) => *void* | The callback which is called when new data arrives.   |

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

▸ **milestonesLatest**(`callback`: (`topic`: *string*, `data`: [*IMilestoneResponse*](models_api_imilestoneresponse.imilestoneresponse.md)) => *void*): *string*

Subscribe to the latest milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMilestoneResponse*](models_api_imilestoneresponse.imilestoneresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### milestonesSolid

▸ **milestonesSolid**(`callback`: (`topic`: *string*, `data`: [*IMilestoneResponse*](models_api_imilestoneresponse.imilestoneresponse.md)) => *void*): *string*

Subscribe to the latest solid milestone updates.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`topic`: *string*, `data`: [*IMilestoneResponse*](models_api_imilestoneresponse.imilestoneresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### output

▸ **output**(`outputId`: *string*, `callback`: (`topic`: *string*, `data`: [*IOutputResponse*](models_api_ioutputresponse.ioutputresponse.md)) => *void*): *string*

Subscribe to updates for a specific output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | *string* | The output to monitor.   |
`callback` | (`topic`: *string*, `data`: [*IOutputResponse*](models_api_ioutputresponse.ioutputresponse.md)) => *void* | The callback which is called when new data arrives.   |

**Returns:** *string*

A subscription Id which can be used to unsubscribe.

___

### statusChanged

▸ **statusChanged**(`callback`: (`status`: [*IMqttStatus*](models_imqttstatus.imqttstatus.md)) => *void*): *string*

Subscribe to changes in the client state.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | (`status`: [*IMqttStatus*](models_imqttstatus.imqttstatus.md)) => *void* | Callback called when the state has changed.   |

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
