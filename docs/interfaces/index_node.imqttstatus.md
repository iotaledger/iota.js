[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / IMqttStatus

# Interface: IMqttStatus

Status message for MQTT Clients.

## Hierarchy

* **IMqttStatus**

## Index

### Properties

* [error](index_node.imqttstatus.md#error)
* [message](index_node.imqttstatus.md#message)
* [state](index_node.imqttstatus.md#state)
* [type](index_node.imqttstatus.md#type)

## Properties

### error

• `Optional` **error**: *undefined* \| Error

Any errors.

___

### message

• **message**: *string*

Additional information about the status.

___

### state

• **state**: *disconnected* \| *connected* \| *disconnecting* \| *connecting*

The connection status.

___

### type

• **type**: *connect* \| *disconnect* \| *error* \| *subscription-add* \| *subscription-remove*

The type of message.
