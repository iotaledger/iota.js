# Class: BigIntHelper

Helper methods for bigints.

## Table of contents

### Methods

- [read3](BigIntHelper.md#read3)
- [read4](BigIntHelper.md#read4)
- [read8](BigIntHelper.md#read8)
- [write8](BigIntHelper.md#write8)
- [random](BigIntHelper.md#random)

### Constructors

- [constructor](BigIntHelper.md#constructor)

## Methods

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

___

### random

▸ `Static` **random**(): `bigint`

Generate a random bigint.

#### Returns

`bigint`

The bitint.

## Constructors

### constructor

• **new BigIntHelper**()
