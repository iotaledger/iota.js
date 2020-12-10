**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / IMqttStatus

# Interface: IMqttStatus

Status message for MQTT Clients.

## Hierarchy

* **IMqttStatus**

## Index

### Properties

* [error](imqttstatus.md#error)
* [message](imqttstatus.md#message)
* [state](imqttstatus.md#state)
* [type](imqttstatus.md#type)

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
