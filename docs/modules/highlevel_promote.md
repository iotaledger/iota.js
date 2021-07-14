[@iota/iota.js](../README.md) / highLevel/promote

# Module: highLevel/promote

## Table of contents

### Functions

- [promote](highLevel_promote.md#promote)

## Functions

### promote

▸ **promote**(`client`, `messageId`): `Promise`<`Object`\>

Promote an existing message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`IClient`](../interfaces/models_IClient.IClient.md) \| `string` | The clientor node endpoint to perform the promote with. |
| `messageId` | `string` | The message to promote. |

#### Returns

`Promise`<`Object`\>

The id and message that were promoted.
