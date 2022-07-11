---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: BigIntHelper

Helper methods for bigints.

## Table of contents

### Methods

- [read3](BigIntHelper.md#read3)
- [read4](BigIntHelper.md#read4)
- [read8](BigIntHelper.md#read8)
- [read32](BigIntHelper.md#read32)
- [write8](BigIntHelper.md#write8)
- [write32](BigIntHelper.md#write32)
- [random](BigIntHelper.md#random)

### Constructors

- [constructor](BigIntHelper.md#constructor)

## Methods

### read3

▸ `Static` **read3**(`data`, `byteOffset`): `BigInteger`

Load 3 bytes from array as bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The input array. |
| `byteOffset` | `number` | The start index to read from. |

#### Returns

`BigInteger`

The bigint.

___

### read4

▸ `Static` **read4**(`data`, `byteOffset`): `BigInteger`

Load 4 bytes from array as bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The input array. |
| `byteOffset` | `number` | The start index to read from. |

#### Returns

`BigInteger`

The bigint.

___

### read8

▸ `Static` **read8**(`data`, `byteOffset`): `BigInteger`

Load 8 bytes from array as bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to read from. |
| `byteOffset` | `number` | The start index to read from. |

#### Returns

`BigInteger`

The bigint.

___

### read32

▸ `Static` **read32**(`data`, `byteOffset`): `BigInteger`

Load 32 bytes (256 bits) from array as bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to read from. |
| `byteOffset` | `number` | The start index to read from. |

#### Returns

`BigInteger`

The bigint.

___

### write8

▸ `Static` **write8**(`value`, `data`, `byteOffset`): `void`

Convert a big int to bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `BigInteger` | The bigint. |
| `data` | `Uint8Array` | The buffer to write into. |
| `byteOffset` | `number` | The start index to write from. |

#### Returns

`void`

___

### write32

▸ `Static` **write32**(`value`, `data`, `byteOffset`): `void`

Convert a big int 32 bytes (256 bits) to bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `BigInteger` | The bigint. |
| `data` | `Uint8Array` | The buffer to write into. |
| `byteOffset` | `number` | The start index to write from. |

#### Returns

`void`

___

### random

▸ `Static` **random**(`length?`): `BigInteger`

Generate a random bigint.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `length` | `number` | `8` | The length of the bigint to generate. |

#### Returns

`BigInteger`

The bigint.

## Constructors

### constructor

• **new BigIntHelper**()
