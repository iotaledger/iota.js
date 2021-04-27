**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["utils/writeStream"](../modules/_utils_writestream_.md) / WriteStream

# Class: WriteStream

Keep track of the write index within a stream.

## Hierarchy

* **WriteStream**

## Index

### Constructors

* [constructor](_utils_writestream_.writestream.md#constructor)

### Methods

* [finalBytes](_utils_writestream_.writestream.md#finalbytes)
* [finalHex](_utils_writestream_.writestream.md#finalhex)
* [getWriteIndex](_utils_writestream_.writestream.md#getwriteindex)
* [length](_utils_writestream_.writestream.md#length)
* [setWriteIndex](_utils_writestream_.writestream.md#setwriteindex)
* [unused](_utils_writestream_.writestream.md#unused)
* [writeBoolean](_utils_writestream_.writestream.md#writeboolean)
* [writeByte](_utils_writestream_.writestream.md#writebyte)
* [writeBytes](_utils_writestream_.writestream.md#writebytes)
* [writeFixedHex](_utils_writestream_.writestream.md#writefixedhex)
* [writeUInt16](_utils_writestream_.writestream.md#writeuint16)
* [writeUInt32](_utils_writestream_.writestream.md#writeuint32)
* [writeUInt64](_utils_writestream_.writestream.md#writeuint64)

## Constructors

### constructor

\+ **new WriteStream**(): [WriteStream](_utils_writestream_.writestream.md)

Create a new instance of ReadStream.

**Returns:** [WriteStream](_utils_writestream_.writestream.md)

## Methods

### finalBytes

▸ **finalBytes**(): Uint8Array

Get the final stream as bytes.

**Returns:** Uint8Array

The final stream.

___

### finalHex

▸ **finalHex**(): string

Get the final stream as hex.

**Returns:** string

The final stream as hex.

___

### getWriteIndex

▸ **getWriteIndex**(): number

Get the current write index.

**Returns:** number

The current write index.

___

### length

▸ **length**(): number

Get the length of the stream.

**Returns:** number

The stream length.

___

### setWriteIndex

▸ **setWriteIndex**(`writeIndex`: number): void

Set the current write index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeIndex` | number | The current write index.  |

**Returns:** void

___

### unused

▸ **unused**(): number

How much unused data is there.

**Returns:** number

The amount of unused data.

___

### writeBoolean

▸ **writeBoolean**(`name`: string, `val`: boolean): void

Write a boolean to the stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`val` | boolean | The data to write.  |

**Returns:** void

___

### writeByte

▸ **writeByte**(`name`: string, `val`: number): void

Write a byte to the stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`val` | number | The data to write.  |

**Returns:** void

___

### writeBytes

▸ **writeBytes**(`name`: string, `length`: number, `val`: Uint8Array): void

Write fixed length stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`length` | number | The length of the data to write. |
`val` | Uint8Array | The data to write.  |

**Returns:** void

___

### writeFixedHex

▸ **writeFixedHex**(`name`: string, `length`: number, `val`: string): void

Write fixed length stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`length` | number | The length of the data to write. |
`val` | string | The data to write.  |

**Returns:** void

___

### writeUInt16

▸ **writeUInt16**(`name`: string, `val`: number): void

Write a UInt16 to the stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`val` | number | The data to write.  |

**Returns:** void

___

### writeUInt32

▸ **writeUInt32**(`name`: string, `val`: number): void

Write a UInt32 to the stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`val` | number | The data to write.  |

**Returns:** void

___

### writeUInt64

▸ **writeUInt64**(`name`: string, `val`: bigint): void

Write a UInt64 to the stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`val` | bigint | The data to write.  |

**Returns:** void
