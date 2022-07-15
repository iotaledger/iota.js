---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IMqttStatus

Status message for MQTT Clients.

## Table of contents

### Properties

- [type](IMqttStatus.md#type)
- [message](IMqttStatus.md#message)
- [state](IMqttStatus.md#state)
- [error](IMqttStatus.md#error)

## Properties

### type

• **type**: ``"connect"`` \| ``"disconnect"`` \| ``"error"`` \| ``"subscription-add"`` \| ``"subscription-remove"``

The type of message.

___

### message

• **message**: `string`

Additional information about the status.

___

### state

• **state**: ``"disconnected"`` \| ``"connected"`` \| ``"disconnecting"`` \| ``"connecting"``

The connection status.

___

### error

• `Optional` **error**: `unknown`

Any errors.
