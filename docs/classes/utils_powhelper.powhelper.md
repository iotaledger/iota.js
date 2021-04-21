[@iota/iota.js](../README.md) / [utils/powHelper](../modules/utils_powhelper.md) / PowHelper

# Class: PowHelper

[utils/powHelper](../modules/utils_powhelper.md).PowHelper

Helper methods for POW.

## Table of contents

### Constructors

- [constructor](utils_powhelper.powhelper.md#constructor)

### Methods

- [score](utils_powhelper.powhelper.md#score)
- [trailingZeros](utils_powhelper.powhelper.md#trailingzeros)
- [trinaryTrailingZeros](utils_powhelper.powhelper.md#trinarytrailingzeros)

## Constructors

### constructor

\+ **new PowHelper**(): [*PowHelper*](utils_powhelper.powhelper.md)

**Returns:** [*PowHelper*](utils_powhelper.powhelper.md)

## Methods

### score

▸ `Static`**score**(`message`: *Uint8Array*): *number*

Perform the score calculation.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | *Uint8Array* | The data to perform the score on |

**Returns:** *number*

The score for the data.

___

### trailingZeros

▸ `Static`**trailingZeros**(`powDigest`: *Uint8Array*, `nonce`: *bigint*): *number*

Calculate the trailing zeros.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `powDigest` | *Uint8Array* | The pow digest. |
| `nonce` | *bigint* | The nonce. |

**Returns:** *number*

The trailing zeros.

___

### trinaryTrailingZeros

▸ `Static`**trinaryTrailingZeros**(`trits`: *Int8Array*): *number*

Find the number of trailing zeros.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `trits` | *Int8Array* | The trits to look for zeros. |

**Returns:** *number*

The number of trailing zeros.
