[@iota/iota.js](../../README.md) / [utils/bigIntHelper](../../modules/utils_biginthelper.md) / BigIntHelper

# Class: BigIntHelper

[utils/bigIntHelper](../../modules/utils_biginthelper.md).BigIntHelper

Helper methods for bigints.

## Hierarchy

* **BigIntHelper**

## Table of contents

### Constructors

- [constructor](biginthelper.biginthelper.md#constructor)

### Methods

- [random](biginthelper.biginthelper.md#random)
- [read3](biginthelper.biginthelper.md#read3)
- [read4](biginthelper.biginthelper.md#read4)
- [read8](biginthelper.biginthelper.md#read8)
- [write8](biginthelper.biginthelper.md#write8)

## Constructors

### constructor

\+ **new BigIntHelper**(): [*BigIntHelper*](biginthelper.biginthelper.md)

**Returns:** [*BigIntHelper*](biginthelper.biginthelper.md)

## Methods

### random

▸ `Static`**random**(): *bigint*

Generate a random bigint.

**Returns:** *bigint*

The bitint.

___

### read3

▸ `Static`**read3**(`data`: *Uint8Array*, `byteOffset`: *number*): *bigint*

Load 3 bytes from array as bigint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | *Uint8Array* | The input array.   |
`byteOffset` | *number* | The start index to read from.   |

**Returns:** *bigint*

The bigint.

___

### read4

▸ `Static`**read4**(`data`: *Uint8Array*, `byteOffset`: *number*): *bigint*

Load 4 bytes from array as bigint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | *Uint8Array* | The input array.   |
`byteOffset` | *number* | The start index to read from.   |

**Returns:** *bigint*

The bigint.

___

### read8

▸ `Static`**read8**(`data`: *Uint8Array*, `byteOffset`: *number*): *bigint*

Load 8 bytes from array as bigint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | *Uint8Array* | The data to read from.   |
`byteOffset` | *number* | The start index to read from.   |

**Returns:** *bigint*

The bigint.

___

### write8

▸ `Static`**write8**(`value`: *bigint*, `data`: *Uint8Array*, `byteOffset`: *number*): *void*

Convert a big int to bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *bigint* | The bigint.   |
`data` | *Uint8Array* | The buffer to write into.   |
`byteOffset` | *number* | The start index to write from.    |

**Returns:** *void*
