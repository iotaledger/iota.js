**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["utils/bigIntHelper"](../modules/_utils_biginthelper_.md) / BigIntHelper

# Class: BigIntHelper

Helper methods for bigints.

## Hierarchy

* **BigIntHelper**

## Index

### Methods

* [random](_utils_biginthelper_.biginthelper.md#random)
* [read3](_utils_biginthelper_.biginthelper.md#read3)
* [read4](_utils_biginthelper_.biginthelper.md#read4)
* [read8](_utils_biginthelper_.biginthelper.md#read8)
* [write8](_utils_biginthelper_.biginthelper.md#write8)

## Methods

### random

▸ `Static`**random**(): bigint

Generate a random bigint.

**Returns:** bigint

The bitint.

___

### read3

▸ `Static`**read3**(`data`: Uint8Array, `byteOffset`: number): bigint

Load 3 bytes from array as bigint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | The input array. |
`byteOffset` | number | The start index to read from. |

**Returns:** bigint

The bigint.

___

### read4

▸ `Static`**read4**(`data`: Uint8Array, `byteOffset`: number): bigint

Load 4 bytes from array as bigint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | The input array. |
`byteOffset` | number | The start index to read from. |

**Returns:** bigint

The bigint.

___

### read8

▸ `Static`**read8**(`data`: Uint8Array, `byteOffset`: number): bigint

Load 8 bytes from array as bigint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | The data to read from. |
`byteOffset` | number | The start index to read from. |

**Returns:** bigint

The bigint.

___

### write8

▸ `Static`**write8**(`value`: bigint, `data`: Uint8Array, `byteOffset`: number): void

Convert a big int to bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | bigint | The bigint. |
`data` | Uint8Array | The buffer to write into. |
`byteOffset` | number | The start index to write from.  |

**Returns:** void
