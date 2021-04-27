**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/promote"

# Module: "highLevel/promote"

## Index

### Functions

* [promote](_highlevel_promote_.md#promote)

## Functions

### promote

▸ **promote**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `messageId`: string): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Promote an existing message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The clientor node endpoint to perform the promote with. |
`messageId` | string | The message to promote. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id and message that were promoted.
