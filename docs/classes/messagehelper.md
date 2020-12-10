**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / MessageHelper

# Class: MessageHelper

Helper methods for messages.

## Hierarchy

* **MessageHelper**

## Index

### Methods

* [validateTransaction](messagehelper.md#validatetransaction)

## Methods

### validateTransaction

▸ `Static`**validateTransaction**(`client`: [IClient](../interfaces/iclient.md), `message`: [IMessage](../interfaces/imessage.md)): Promise<string[]\>

Validate a transaction the message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/iclient.md) | The client for making API calls. |
`message` | [IMessage](../interfaces/imessage.md) | The message to validate. |

**Returns:** Promise<string[]\>

The reasons why to message is not valid.
