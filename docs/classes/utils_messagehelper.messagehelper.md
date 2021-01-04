[@iota/iota.js](../README.md) / [utils/messageHelper](../modules/utils_messagehelper.md) / MessageHelper

# Class: MessageHelper

Helper methods for messages.

## Hierarchy

* **MessageHelper**

## Index

### Constructors

* [constructor](utils_messagehelper.messagehelper.md#constructor)

### Methods

* [validateTransaction](utils_messagehelper.messagehelper.md#validatetransaction)

## Constructors

### constructor

\+ **new MessageHelper**(): [*MessageHelper*](utils_messagehelper.messagehelper.md)

**Returns:** [*MessageHelper*](utils_messagehelper.messagehelper.md)

## Methods

### validateTransaction

▸ `Static`**validateTransaction**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `message`: [*IMessage*](../interfaces/models_imessage.imessage.md)): *Promise*<*string*[]\>

Validate a transaction the message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client for making API calls.   |
`message` | [*IMessage*](../interfaces/models_imessage.imessage.md) | The message to validate.   |

**Returns:** *Promise*<*string*[]\>

The reasons why to message is not valid.
