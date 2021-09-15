# Class: Bech32Helper

Convert address to bech32.

## Table of contents

### Properties

- [BECH32_DEFAULT_HRP_MAIN](Bech32Helper.md#bech32_default_hrp_main)
- [BECH32_DEFAULT_HRP_TEST](Bech32Helper.md#bech32_default_hrp_test)

### Methods

- [toBech32](Bech32Helper.md#tobech32)
- [fromBech32](Bech32Helper.md#frombech32)
- [matches](Bech32Helper.md#matches)

### Constructors

- [constructor](Bech32Helper.md#constructor)

## Properties

### BECH32\_DEFAULT\_HRP\_MAIN

▪ `Static` **BECH32\_DEFAULT\_HRP\_MAIN**: `string` = `"iota"`

The default human readable part of the bech32 addresses for mainnet, currently 'iota'.

___

### BECH32\_DEFAULT\_HRP\_TEST

▪ `Static` **BECH32\_DEFAULT\_HRP\_TEST**: `string` = `"atoi"`

The default human readable part of the bech32 addresses for testnet, currently 'atoi'.

## Methods

### toBech32

▸ `Static` **toBech32**(`addressType`, `addressBytes`, `humanReadablePart`): `string`

Encode an address to bech32.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressType` | `number` | The address type to encode. |
| `addressBytes` | `Uint8Array` | The address bytes to encode. |
| `humanReadablePart` | `string` | The human readable part to use. |

#### Returns

`string`

The array formated as hex.

___

### fromBech32

▸ `Static` **fromBech32**(`bech32Text`, `humanReadablePart`): `undefined` \| {}

Decode an address from bech32.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bech32Text` | `string` | The bech32 text to decode. |
| `humanReadablePart` | `string` | The human readable part to use. |

#### Returns

`undefined` \| {}

The address type and address bytes or undefined if it cannot be decoded.

___

### matches

▸ `Static` **matches**(`bech32Text`, `humanReadablePart`): `boolean`

Does the provided string look like it might be an bech32 address with matching hrp.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bech32Text` | `string` | The bech32 text to text. |
| `humanReadablePart` | `string` | The human readable part to match. |

#### Returns

`boolean`

True if the passed address matches the pattern for a bech32 address.

## Constructors

### constructor

• **new Bech32Helper**()
