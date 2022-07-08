# @iota/pow-node.js

## Table of contents

### Classes

- [NodePowProvider](classes/NodePowProvider.md)

### Functions

- [doPow](api_ref.md#dopow)

## Functions

### doPow

▸ **doPow**(`powDigest`, `targetZeros`, `startIndex`): `string`

Perform the hash on the data until we reach target number of zeros.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `powDigest` | `Uint8Array` | The pow digest. |
| `targetZeros` | `number` | The target number of zeros. |
| `startIndex` | `string` | The index to start looking from. |

#### Returns

`string`

The nonce.
