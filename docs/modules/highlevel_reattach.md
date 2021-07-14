[@iota/iota.js](../README.md) / highLevel/reattach

# Module: highLevel/reattach

## Table of contents

### Functions

- [reattach](highLevel_reattach.md#reattach)

## Functions

### reattach

▸ **reattach**(`client`, `messageId`): `Promise`<`Object`\>

Reattach an existing message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`IClient`](../interfaces/models_IClient.IClient.md) \| `string` | The client or node endpoint to perform the reattach with. |
| `messageId` | `string` | The message to reattach. |

#### Returns

`Promise`<`Object`\>

The id and message that were reattached.
