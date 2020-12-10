**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / WriteStream

# Class: WriteStream

Keep track of the write index within a stream.

## Hierarchy

* **WriteStream**

## Index

### Constructors

* [constructor](writestream.md#constructor)

### Methods

* [finalBytes](writestream.md#finalbytes)
* [finalHex](writestream.md#finalhex)
* [getWriteIndex](writestream.md#getwriteindex)
* [length](writestream.md#length)
* [setWriteIndex](writestream.md#setwriteindex)
* [unused](writestream.md#unused)
* [writeByte](writestream.md#writebyte)
* [writeBytes](writestream.md#writebytes)
* [writeFixedHex](writestream.md#writefixedhex)
* [writeString](writestream.md#writestring)
* [writeUInt16](writestream.md#writeuint16)
* [writeUInt32](writestream.md#writeuint32)
* [writeUInt64](writestream.md#writeuint64)

## Constructors

### constructor

\+ **new WriteStream**(): [WriteStream](writestream.md)

Create a new instance of ReadStream.

**Returns:** [WriteStream](writestream.md)

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

### writeString

▸ **writeString**(`name`: string, `val`: string): string

Write a string to the stream.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the data we are trying to write. |
`val` | string | The data to write. |

**Returns:** string

The string.

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
