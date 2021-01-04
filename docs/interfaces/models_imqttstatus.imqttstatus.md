[@iota/iota.js](../README.md) / [models/IMqttStatus](../modules/models_imqttstatus.md) / IMqttStatus

# Interface: IMqttStatus

Status message for MQTT Clients.

## Hierarchy

* **IMqttStatus**

## Index

### Properties

* [error](models_imqttstatus.imqttstatus.md#error)
* [message](models_imqttstatus.imqttstatus.md#message)
* [state](models_imqttstatus.imqttstatus.md#state)
* [type](models_imqttstatus.imqttstatus.md#type)

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
