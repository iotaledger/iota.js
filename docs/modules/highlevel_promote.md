[@iota/iota.js](../README.md) / highLevel/promote

# Module: highLevel/promote

## Table of contents

### Functions

- [promote](highlevel_promote.md#promote)

## Functions

### promote

▸ **promote**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `messageId`: *string*): *Promise*<{}\>

Promote an existing message.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The clientor node endpoint to perform the promote with. |
| `messageId` | *string* | The message to promote. |

**Returns:** *Promise*<{}\>

The id and message that were promoted.
