**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/sendData"

# Module: "highLevel/sendData"

## Index

### Functions

* [sendData](_highlevel_senddata_.md#senddata)

## Functions

### sendData

▸ **sendData**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `indexationKey`: Uint8Array \| string, `indexationData?`: Uint8Array \| string): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Send a data message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the data with. |
`indexationKey` | Uint8Array \| string | The index name. |
`indexationData?` | Uint8Array \| string | The index data as either UTF8 text or Uint8Array bytes. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id of the message created and the message.
