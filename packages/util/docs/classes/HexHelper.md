# Class: HexHelper

Helper methods for hex conversions.

## Table of contents

### Methods

- [fromBigInt](HexHelper.md#frombigint)
- [toBigInt](HexHelper.md#tobigint)
- [fromNumber](HexHelper.md#fromnumber)
- [toNumber](HexHelper.md#tonumber)

### Constructors

- [constructor](HexHelper.md#constructor)

## Methods

### fromBigInt

▸ `Static` **fromBigInt**(`value`): `string`

Convert the big int to hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `BigInteger` | The big int value to convert. |

#### Returns

`string`

The hex encoded big int.

___

### toBigInt

▸ `Static` **toBigInt**(`hex`): `BigInteger`

Convert the hex string to a big int.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to convert. |

#### Returns

`BigInteger`

The big int.

___

### fromNumber

▸ `Static` **fromNumber**(`value`): `string`

Convert the number to hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The number value to convert. |

#### Returns

`string`

The hex encoded number.

___

### toNumber

▸ `Static` **toNumber**(`hex`): `number`

Convert the hex string to a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to convert. |

#### Returns

`number`

The number.

## Constructors

### constructor

• **new HexHelper**()
