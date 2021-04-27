**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["utils/bech32Helper"](../modules/_utils_bech32helper_.md) / Bech32Helper

# Class: Bech32Helper

Convert address to bech32.

## Hierarchy

* **Bech32Helper**

## Index

### Properties

* [BECH32\_DEFAULT\_HRP\_MAIN](_utils_bech32helper_.bech32helper.md#bech32_default_hrp_main)
* [BECH32\_DEFAULT\_HRP\_TEST](_utils_bech32helper_.bech32helper.md#bech32_default_hrp_test)

### Methods

* [fromBech32](_utils_bech32helper_.bech32helper.md#frombech32)
* [matches](_utils_bech32helper_.bech32helper.md#matches)
* [toBech32](_utils_bech32helper_.bech32helper.md#tobech32)

## Properties

### BECH32\_DEFAULT\_HRP\_MAIN

▪ `Static` **BECH32\_DEFAULT\_HRP\_MAIN**: string = "iota"

The default human readable part of the bech32 addresses for mainnet, currently 'iota'.

___

### BECH32\_DEFAULT\_HRP\_TEST

▪ `Static` **BECH32\_DEFAULT\_HRP\_TEST**: string = "atoi"

The default human readable part of the bech32 addresses for testnet, currently 'atoi'.

## Methods

### fromBech32

▸ `Static`**fromBech32**(`bech32Text`: string, `humanReadablePart`: string): { addressBytes: Uint8Array ; addressType: number  } \| undefined

Decode an address from bech32.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bech32Text` | string | The bech32 text to decode. |
`humanReadablePart` | string | The human readable part to use. |

**Returns:** { addressBytes: Uint8Array ; addressType: number  } \| undefined

The address type and address bytes or undefined if it cannot be decoded.

___

### matches

▸ `Static`**matches**(`bech32Text`: string, `humanReadablePart`: string): boolean

Does the provided string look like it might be an bech32 address with matching hrp.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bech32Text` | string | The bech32 text to text. |
`humanReadablePart` | string | The human readable part to match. |

**Returns:** boolean

True if the passed address matches the pattern for a bech32 address.

___

### toBech32

▸ `Static`**toBech32**(`addressType`: number, `addressBytes`: Uint8Array, `humanReadablePart`: string): string

Encode an address to bech32.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressType` | number | The address type to encode. |
`addressBytes` | Uint8Array | The address bytes to encode. |
`humanReadablePart` | string | The human readable part to use. |

**Returns:** string

The array formated as hex.
