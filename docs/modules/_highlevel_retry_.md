**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/retry"

# Module: "highLevel/retry"

## Index

### Functions

* [retry](_highlevel_retry_.md#retry)

## Functions

### retry

▸ **retry**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `messageId`: string): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Retry an existing message either by promoting or reattaching.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to perform the retry with. |
`messageId` | string | The message to retry. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id and message that were retried.
