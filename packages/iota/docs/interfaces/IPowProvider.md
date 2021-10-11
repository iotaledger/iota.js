# Interface: IPowProvider

Perform the POW on a message.

## Implemented by

- [`LocalPowProvider`](../classes/LocalPowProvider.md)

## Table of contents

### Methods

- [pow](IPowProvider.md#pow)

## Methods

### pow

▸ **pow**(`message`, `targetScore`): `Promise`<`string`\>

Perform pow on the message and return the nonce of at least targetScore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The message to process. |
| `targetScore` | `number` | The target score. |

#### Returns

`Promise`<`string`\>

The nonce as a string.
