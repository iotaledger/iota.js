[@iota/iota.js](../README.md) / [utils/bigIntHelper](../modules/utils_bigIntHelper.md) / BigIntHelper

# Class: BigIntHelper

[utils/bigIntHelper](../modules/utils_bigIntHelper.md).BigIntHelper

Helper methods for bigints.

## Table of contents

### Constructors

- [constructor](utils_bigIntHelper.BigIntHelper.md#constructor)

### Methods

- [random](utils_bigIntHelper.BigIntHelper.md#random)
- [read3](utils_bigIntHelper.BigIntHelper.md#read3)
- [read4](utils_bigIntHelper.BigIntHelper.md#read4)
- [read8](utils_bigIntHelper.BigIntHelper.md#read8)
- [write8](utils_bigIntHelper.BigIntHelper.md#write8)

## Constructors

### constructor

• **new BigIntHelper**()

## Methods

### random

▸ `Static` **random**(): `bigint`

Generate a random bigint.

#### Returns

`bigint`

The bitint.

___

### read3

▸ `Static` **read3**(`data`, `byteOffset`): `bigint`

Load 3 bytes from array as bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The input array. |
| `byteOffset` | `number` | The start index to read from. |

#### Returns

`bigint`

The bigint.

___

### read4

▸ `Static` **read4**(`data`, `byteOffset`): `bigint`

Load 4 bytes from array as bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The input array. |
| `byteOffset` | `number` | The start index to read from. |

#### Returns

`bigint`

The bigint.

___

### read8

▸ `Static` **read8**(`data`, `byteOffset`): `bigint`

Load 8 bytes from array as bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to read from. |
| `byteOffset` | `number` | The start index to read from. |

#### Returns

`bigint`

The bigint.

___

### write8

▸ `Static` **write8**(`value`, `data`, `byteOffset`): `void`

Convert a big int to bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `bigint` | The bigint. |
| `data` | `Uint8Array` | The buffer to write into. |
| `byteOffset` | `number` | The start index to write from. |

#### Returns

`void`
