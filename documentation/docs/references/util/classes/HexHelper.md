---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: HexHelper

Helper methods for hex conversions.

## Table of contents

### Properties

- [BIG\_INT\_MAX\_256\_BIT](HexHelper.md#big_int_max_256_bit)

### Methods

- [fromBigInt256](HexHelper.md#frombigint256)
- [toBigInt256](HexHelper.md#tobigint256)
- [stripPrefix](HexHelper.md#stripprefix)
- [addPrefix](HexHelper.md#addprefix)
- [hasPrefix](HexHelper.md#hasprefix)

### Constructors

- [constructor](HexHelper.md#constructor)

## Properties

### BIG\_INT\_MAX\_256\_BIT

▪ `Static` `Readonly` **BIG\_INT\_MAX\_256\_BIT**: `BigInteger`

Const defining the maximum value for a 256 bit int.

## Methods

### fromBigInt256

▸ `Static` **fromBigInt256**(`value`): `string`

Convert the big int 256 bit to hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `BigInteger` | The big int value to convert. |

#### Returns

`string`

The hex encoded big int.

___

### toBigInt256

▸ `Static` **toBigInt256**(`hex`): `BigInteger`

Convert the hex string to a big int.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to convert. |

#### Returns

`BigInteger`

The big int.

___

### stripPrefix

▸ `Static` **stripPrefix**(`hex`): `string`

Strip the 0x prefix if it exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to strip. |

#### Returns

`string`

The stripped hex without the prefix.

___

### addPrefix

▸ `Static` **addPrefix**(`hex`): `string`

Add the 0x prefix if it does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to add the prefix to. |

#### Returns

`string`

The hex with the prefix.

___

### hasPrefix

▸ `Static` **hasPrefix**(`hex`): `boolean`

Does the hex string have the prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to check for the prefix. |

#### Returns

`boolean`

True if the hex string has the prefix.

## Constructors

### constructor

• **new HexHelper**()
