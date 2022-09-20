# Class: LocalPowProvider

Local POW Provider.
WARNING - This is really slow.

## Implements

- [`IPowProvider`](../interfaces/IPowProvider.md)

## Table of contents

### Methods

- [pow](LocalPowProvider.md#pow)

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

The nonce.

#### Implementation of

[IPowProvider](../interfaces/IPowProvider.md).[pow](../interfaces/IPowProvider.md#pow)
