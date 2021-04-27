**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/reattach"

# Module: "highLevel/reattach"

## Index

### Functions

* [reattach](_highlevel_reattach_.md#reattach)

## Functions

### reattach

▸ **reattach**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `messageId`: string): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Reattach an existing message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to perform the reattach with. |
`messageId` | string | The message to reattach. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id and message that were reattached.
