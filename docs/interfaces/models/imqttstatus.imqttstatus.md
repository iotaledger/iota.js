[@iota/iota.js](../../README.md) / [models/IMqttStatus](../../modules/models_imqttstatus.md) / IMqttStatus

# Interface: IMqttStatus

[models/IMqttStatus](../../modules/models_imqttstatus.md).IMqttStatus

Status message for MQTT Clients.

## Hierarchy

* **IMqttStatus**

## Table of contents

### Properties

- [error](imqttstatus.imqttstatus.md#error)
- [message](imqttstatus.imqttstatus.md#message)
- [state](imqttstatus.imqttstatus.md#state)
- [type](imqttstatus.imqttstatus.md#type)

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
