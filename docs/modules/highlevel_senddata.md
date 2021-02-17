[@iota/iota.js](../README.md) / highLevel/sendData

# Module: highLevel/sendData

## Table of contents

### Functions

- [sendData](highlevel_senddata.md#senddata)

## Functions

### sendData

▸ **sendData**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `indexationKey`: *string*, `indexationData?`: Uint8Array): *Promise*<{}\>

Send a data message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to send the data with.   |
`indexationKey` | *string* | The index name.   |
`indexationData?` | Uint8Array | The index data.   |

**Returns:** *Promise*<{}\>

The id of the message created and the message.
