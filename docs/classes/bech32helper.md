**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / Bech32Helper

# Class: Bech32Helper

Convert address to bech32.

## Hierarchy

* **Bech32Helper**

## Index

### Properties

* [BECH32\_DEFAULT\_HRP\_MAIN](bech32helper.md#bech32_default_hrp_main)

### Methods

* [fromBech32](bech32helper.md#frombech32)
* [matches](bech32helper.md#matches)
* [toBech32](bech32helper.md#tobech32)

## Properties

### BECH32\_DEFAULT\_HRP\_MAIN

▪ `Static` **BECH32\_DEFAULT\_HRP\_MAIN**: string = "iot"

The default human readable part of the bech32 addresses, currently 'iot'.

## Methods

### fromBech32

▸ `Static`**fromBech32**(`bech32Text`: string, `humanReadablePart?`: string): { addressBytes: Uint8Array ; addressType: number  } \| undefined

Decode an address from bech32.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`bech32Text` | string | - | The bech32 text to decode. |
`humanReadablePart` | string | Bech32Helper.BECH32\_DEFAULT\_HRP\_MAIN | The human readable part to use. |

**Returns:** { addressBytes: Uint8Array ; addressType: number  } \| undefined

The address type and address bytes or undefined if it cannot be decoded.

___

### matches

▸ `Static`**matches**(`bech32Text?`: undefined \| string, `humanReadablePart?`: string): boolean

Does the provided string look like it might be an bech32 address with matching hrp.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`bech32Text?` | undefined \| string | - | The bech32 text to text. |
`humanReadablePart` | string | Bech32Helper.BECH32\_DEFAULT\_HRP\_MAIN | The human readable part to match. |

**Returns:** boolean

True if the passed address matches the pattern for a bech32 address.

___

### toBech32

▸ `Static`**toBech32**(`addressType`: number, `addressBytes`: Uint8Array, `humanReadablePart?`: string): string

Encode an address to bech32.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`addressType` | number | - | The address type to encode. |
`addressBytes` | Uint8Array | - | The address bytes to encode. |
`humanReadablePart` | string | Bech32Helper.BECH32\_DEFAULT\_HRP\_MAIN | The human readable part to use. |

**Returns:** string

The array formated as hex.
