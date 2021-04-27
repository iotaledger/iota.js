**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["utils/powHelper"](../modules/_utils_powhelper_.md) / PowHelper

# Class: PowHelper

Helper methods for POW.

## Hierarchy

* **PowHelper**

## Index

### Methods

* [score](_utils_powhelper_.powhelper.md#score)
* [trailingZeros](_utils_powhelper_.powhelper.md#trailingzeros)
* [trinaryTrailingZeros](_utils_powhelper_.powhelper.md#trinarytrailingzeros)

## Methods

### score

▸ `Static`**score**(`message`: Uint8Array): number

Perform the score calculation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | The data to perform the score on |

**Returns:** number

The score for the data.

___

### trailingZeros

▸ `Static`**trailingZeros**(`powDigest`: Uint8Array, `nonce`: bigint): number

Calculate the trailing zeros.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`powDigest` | Uint8Array | The pow digest. |
`nonce` | bigint | The nonce. |

**Returns:** number

The trailing zeros.

___

### trinaryTrailingZeros

▸ `Static`**trinaryTrailingZeros**(`trits`: Int8Array): number

Find the number of trailing zeros.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`trits` | Int8Array | The trits to look for zeros. |

**Returns:** number

The number of trailing zeros.
