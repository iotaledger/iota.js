**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/retrieveData"

# Module: "highLevel/retrieveData"

## Index

### Functions

* [retrieveData](_highlevel_retrievedata_.md#retrievedata)

## Functions

### retrieveData

▸ **retrieveData**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `messageId`: string): Promise<{ data?: Uint8Array ; index: Uint8Array  } \| undefined\>

Retrieve a data message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to retrieve the data with. |
`messageId` | string | The message id of the data to get. |

**Returns:** Promise<{ data?: Uint8Array ; index: Uint8Array  } \| undefined\>

The message index and data.
