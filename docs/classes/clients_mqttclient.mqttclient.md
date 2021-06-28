[@iota/iota.js](../README.md) / [clients/mqttClient](../modules/clients_mqttclient.md) / MqttClient

# Class: MqttClient

[clients/mqttClient](../modules/clients_mqttclient.md).MqttClient

MQTT Client implementation for pub/sub communication.

## Implements

- [`IMqttClient`](../interfaces/models_imqttclient.imqttclient.md)

## Table of contents

### Constructors

- [constructor](clients_mqttclient.mqttclient.md#constructor)

### Methods

- [addressEd25519Outputs](clients_mqttclient.mqttclient.md#addressed25519outputs)
- [addressOutputs](clients_mqttclient.mqttclient.md#addressoutputs)
- [index](clients_mqttclient.mqttclient.md#index)
- [indexRaw](clients_mqttclient.mqttclient.md#indexraw)
- [messageMetadata](clients_mqttclient.mqttclient.md#messagemetadata)
- [messages](clients_mqttclient.mqttclient.md#messages)
- [messagesMetadata](clients_mqttclient.mqttclient.md#messagesmetadata)
- [messagesRaw](clients_mqttclient.mqttclient.md#messagesraw)
- [milestonesConfirmed](clients_mqttclient.mqttclient.md#milestonesconfirmed)
- [milestonesLatest](clients_mqttclient.mqttclient.md#milestoneslatest)
- [output](clients_mqttclient.mqttclient.md#output)
- [statusChanged](clients_mqttclient.mqttclient.md#statuschanged)
- [subscribeJson](clients_mqttclient.mqttclient.md#subscribejson)
- [subscribeRaw](clients_mqttclient.mqttclient.md#subscriberaw)
- [transactionIncludedMessage](clients_mqttclient.mqttclient.md#transactionincludedmessage)
- [transactionIncludedMessageRaw](clients_mqttclient.mqttclient.md#transactionincludedmessageraw)
- [unsubscribe](clients_mqttclient.mqttclient.md#unsubscribe)

## Constructors

### constructor

• **new MqttClient**(`endpoints`, `keepAliveTimeoutSeconds?`)

Create a new instace of MqttClient.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `endpoints` | `string` \| `string`[] | `undefined` | The endpoint or endpoints list to connect to. |
| `keepAliveTimeoutSeconds` | `number` | `30` | Timeout to reconnect if no messages received. |

## Methods

### addressEd25519Outputs

▸ **addressEd25519Outputs**(`addressEd25519`, `callback`): `string`

Subscribe to the ed25519 address for output updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressEd25519` | `string` | The address to monitor. |
| `callback` | (`topic`: `string`, `data`: [`IOutputResponse`](../interfaces/models_api_ioutputresponse.ioutputresponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[addressEd25519Outputs](../interfaces/models_imqttclient.imqttclient.md#addressed25519outputs)

___

### addressOutputs

▸ **addressOutputs**(`addressBech32`, `callback`): `string`

Subscribe to the address for output updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressBech32` | `string` | The address to monitor. |
| `callback` | (`topic`: `string`, `data`: [`IOutputResponse`](../interfaces/models_api_ioutputresponse.ioutputresponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[addressOutputs](../interfaces/models_imqttclient.imqttclient.md#addressoutputs)

___

### index

▸ **index**(`index`, `callback`): `string`

Subscribe to get all messages for the specified index in object form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `string` \| `Uint8Array` | The index to monitor. |
| `callback` | (`topic`: `string`, `data`: [`IMessage`](../interfaces/models_imessage.imessage.md), `raw`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[index](../interfaces/models_imqttclient.imqttclient.md#index)

___

### indexRaw

▸ **indexRaw**(`index`, `callback`): `string`

Subscribe to get all messages for the specified index in binary form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `string` \| `Uint8Array` | The index to monitor. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[indexRaw](../interfaces/models_imqttclient.imqttclient.md#indexraw)

___

### messageMetadata

▸ **messageMetadata**(`messageId`, `callback`): `string`

Subscribe to metadata updates for a specific message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageId` | `string` | The message to monitor. |
| `callback` | (`topic`: `string`, `data`: [`IMessageMetadata`](../interfaces/models_imessagemetadata.imessagemetadata.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[messageMetadata](../interfaces/models_imqttclient.imqttclient.md#messagemetadata)

___

### messages

▸ **messages**(`callback`): `string`

Subscribe to get all messages in object form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMessage`](../interfaces/models_imessage.imessage.md), `raw`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[messages](../interfaces/models_imqttclient.imqttclient.md#messages)

___

### messagesMetadata

▸ **messagesMetadata**(`callback`): `string`

Subscribe to get the metadata for all the messages.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMessageMetadata`](../interfaces/models_imessagemetadata.imessagemetadata.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[messagesMetadata](../interfaces/models_imqttclient.imqttclient.md#messagesmetadata)

___

### messagesRaw

▸ **messagesRaw**(`callback`): `string`

Subscribe to get all messages in binary form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[messagesRaw](../interfaces/models_imqttclient.imqttclient.md#messagesraw)

___

### milestonesConfirmed

▸ **milestonesConfirmed**(`callback`): `string`

Subscribe to the latest confirmed milestone updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMqttMilestoneResponse`](../interfaces/models_api_imqttmilestoneresponse.imqttmilestoneresponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[milestonesConfirmed](../interfaces/models_imqttclient.imqttclient.md#milestonesconfirmed)

___

### milestonesLatest

▸ **milestonesLatest**(`callback`): `string`

Subscribe to the latest milestone updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`topic`: `string`, `data`: [`IMqttMilestoneResponse`](../interfaces/models_api_imqttmilestoneresponse.imqttmilestoneresponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[milestonesLatest](../interfaces/models_imqttclient.imqttclient.md#milestoneslatest)

___

### output

▸ **output**(`outputId`, `callback`): `string`

Subscribe to updates for a specific output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputId` | `string` | The output to monitor. |
| `callback` | (`topic`: `string`, `data`: [`IOutputResponse`](../interfaces/models_api_ioutputresponse.ioutputresponse.md)) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[output](../interfaces/models_imqttclient.imqttclient.md#output)

___

### statusChanged

▸ **statusChanged**(`callback`): `string`

Subscribe to changes in the client state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`data`: [`IMqttStatus`](../interfaces/models_imqttstatus.imqttstatus.md)) => `void` | Callback called when the state has changed. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[statusChanged](../interfaces/models_imqttclient.imqttclient.md#statuschanged)

___

### subscribeJson

▸ **subscribeJson**<`T`\>(`customTopic`, `callback`): `string`

Subscribe to another type of message as json.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customTopic` | `string` | The topic to subscribe to. |
| `callback` | (`topic`: `string`, `data`: `T`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[subscribeJson](../interfaces/models_imqttclient.imqttclient.md#subscribejson)

___

### subscribeRaw

▸ **subscribeRaw**(`customTopic`, `callback`): `string`

Subscribe to another type of message as raw data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customTopic` | `string` | The topic to subscribe to. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[subscribeRaw](../interfaces/models_imqttclient.imqttclient.md#subscriberaw)

___

### transactionIncludedMessage

▸ **transactionIncludedMessage**(`transactionId`, `callback`): `string`

Subscribe to message updates for a specific transactionId.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The message to monitor. |
| `callback` | (`topic`: `string`, `data`: [`IMessage`](../interfaces/models_imessage.imessage.md), `raw`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[transactionIncludedMessage](../interfaces/models_imqttclient.imqttclient.md#transactionincludedmessage)

___

### transactionIncludedMessageRaw

▸ **transactionIncludedMessageRaw**(`transactionId`, `callback`): `string`

Subscribe to message updates for a specific transactionId.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The message to monitor. |
| `callback` | (`topic`: `string`, `data`: `Uint8Array`) => `void` | The callback which is called when new data arrives. |

#### Returns

`string`

A subscription Id which can be used to unsubscribe.

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[transactionIncludedMessageRaw](../interfaces/models_imqttclient.imqttclient.md#transactionincludedmessageraw)

___

### unsubscribe

▸ **unsubscribe**(`subscriptionId`): `void`

Remove a subscription.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriptionId` | `string` | The subscription to remove. |

#### Returns

`void`

#### Implementation of

[IMqttClient](../interfaces/models_imqttclient.imqttclient.md).[unsubscribe](../interfaces/models_imqttclient.imqttclient.md#unsubscribe)
