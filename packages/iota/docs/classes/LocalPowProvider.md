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

▸ **pow**(`block`, `targetScore`): `Promise`<`string`\>

Perform pow on the block and return the nonce of at least targetScore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `Uint8Array` | The block to process. |
| `targetScore` | `number` | The target score. |

#### Returns

`Promise`<`string`\>

The nonce.

#### Implementation of

IPowProvider.pow
