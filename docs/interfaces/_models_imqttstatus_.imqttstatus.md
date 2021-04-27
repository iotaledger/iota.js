**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IMqttStatus"](../modules/_models_imqttstatus_.md) / IMqttStatus

# Interface: IMqttStatus

Status message for MQTT Clients.

## Hierarchy

* **IMqttStatus**

## Index

### Properties

* [error](_models_imqttstatus_.imqttstatus.md#error)
* [message](_models_imqttstatus_.imqttstatus.md#message)
* [state](_models_imqttstatus_.imqttstatus.md#state)
* [type](_models_imqttstatus_.imqttstatus.md#type)

## Properties

### error

• `Optional` **error**: Error

Any errors.

___

### message

•  **message**: string

Additional information about the status.

___

### state

•  **state**: \"disconnected\" \| \"connected\" \| \"disconnecting\" \| \"connecting\"

The connection status.

___

### type

•  **type**: \"connect\" \| \"disconnect\" \| \"error\" \| \"subscription-add\" \| \"subscription-remove\"

The type of message.
