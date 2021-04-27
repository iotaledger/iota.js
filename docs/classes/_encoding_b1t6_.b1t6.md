**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["encoding/b1t6"](../modules/_encoding_b1t6_.md) / B1T6

# Class: B1T6

Class implements the b1t6 encoding encoding which uses a group of 6 trits to encode each byte.

## Hierarchy

* **B1T6**

## Index

### Methods

* [encode](_encoding_b1t6_.b1t6.md#encode)
* [encodedLen](_encoding_b1t6_.b1t6.md#encodedlen)

## Methods

### encode

▸ `Static`**encode**(`dst`: Int8Array, `startIndex`: number, `src`: Uint8Array): number

Encode a byte array into trits.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`dst` | Int8Array | The destination array. |
`startIndex` | number | The start index to write in the array. |
`src` | Uint8Array | The source data. |

**Returns:** number

The length of the encode.

___

### encodedLen

▸ `Static`**encodedLen**(`data`: Uint8Array): number

The encoded length of the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | The data. |

**Returns:** number

The encoded length.
