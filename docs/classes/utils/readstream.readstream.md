[@iota/iota.js](../../README.md) / [utils/readStream](../../modules/utils_readstream.md) / ReadStream

# Class: ReadStream

[utils/readStream](../../modules/utils_readstream.md).ReadStream

Keep track of the read index within a stream.

## Hierarchy

* **ReadStream**

## Table of contents

### Constructors

- [constructor](readstream.readstream.md#constructor)

### Methods

- [getReadIndex](readstream.readstream.md#getreadindex)
- [hasRemaining](readstream.readstream.md#hasremaining)
- [length](readstream.readstream.md#length)
- [readByte](readstream.readstream.md#readbyte)
- [readBytes](readstream.readstream.md#readbytes)
- [readFixedHex](readstream.readstream.md#readfixedhex)
- [readString](readstream.readstream.md#readstring)
- [readUInt16](readstream.readstream.md#readuint16)
- [readUInt32](readstream.readstream.md#readuint32)
- [readUInt64](readstream.readstream.md#readuint64)
- [setReadIndex](readstream.readstream.md#setreadindex)
- [unused](readstream.readstream.md#unused)

## Constructors

### constructor

\+ **new ReadStream**(`storage`: *Uint8Array*, `readStartIndex?`: *number*): [*ReadStream*](readstream.readstream.md)

Create a new instance of ReadStream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`storage` | *Uint8Array* | - | The data to access.   |
`readStartIndex` | *number* | 0 | The index to start the reading from.    |

**Returns:** [*ReadStream*](readstream.readstream.md)

## Methods

### getReadIndex

▸ **getReadIndex**(): *number*

Get the current read index.

**Returns:** *number*

The current read index.

___

### hasRemaining

▸ **hasRemaining**(`remaining`: *number*): *boolean*

Does the storage have enough data remaining.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`remaining` | *number* | The amount of space needed.   |

**Returns:** *boolean*

True if it has enough data.

___

### length

▸ **length**(): *number*

Get the length of the storage.

**Returns:** *number*

The storage length.

___

### readByte

▸ **readByte**(`name`: *string*, `moveIndex?`: *boolean*): *number*

Read a byte from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | *string* | - | The name of the data we are trying to read.   |
`moveIndex` | *boolean* | true | Move the index pointer on.   |

**Returns:** *number*

The value.

___

### readBytes

▸ **readBytes**(`name`: *string*, `length`: *number*, `moveIndex?`: *boolean*): *Uint8Array*

Read an array of byte from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | *string* | - | The name of the data we are trying to read.   |
`length` | *number* | - | The length of the array to read.   |
`moveIndex` | *boolean* | true | Move the index pointer on.   |

**Returns:** *Uint8Array*

The value.

___

### readFixedHex

▸ **readFixedHex**(`name`: *string*, `length`: *number*, `moveIndex?`: *boolean*): *string*

Read fixed length as hex.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | *string* | - | The name of the data we are trying to read.   |
`length` | *number* | - | The length of the data to read.   |
`moveIndex` | *boolean* | true | Move the index pointer on.   |

**Returns:** *string*

The hex formatted data.

___

### readString

▸ **readString**(`name`: *string*, `moveIndex?`: *boolean*): *string*

Read a string from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | *string* | - | The name of the data we are trying to read.   |
`moveIndex` | *boolean* | true | Move the index pointer on.   |

**Returns:** *string*

The string.

___

### readUInt16

▸ **readUInt16**(`name`: *string*, `moveIndex?`: *boolean*): *number*

Read a UInt16 from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | *string* | - | The name of the data we are trying to read.   |
`moveIndex` | *boolean* | true | Move the index pointer on.   |

**Returns:** *number*

The value.

___

### readUInt32

▸ **readUInt32**(`name`: *string*, `moveIndex?`: *boolean*): *number*

Read a UInt32 from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | *string* | - | The name of the data we are trying to read.   |
`moveIndex` | *boolean* | true | Move the index pointer on.   |

**Returns:** *number*

The value.

___

### readUInt64

▸ **readUInt64**(`name`: *string*, `moveIndex?`: *boolean*): *bigint*

Read a UInt64 from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | *string* | - | The name of the data we are trying to read.   |
`moveIndex` | *boolean* | true | Move the index pointer on.   |

**Returns:** *bigint*

The value.

___

### setReadIndex

▸ **setReadIndex**(`readIndex`: *number*): *void*

Set the current read index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readIndex` | *number* | The current read index.    |

**Returns:** *void*

___

### unused

▸ **unused**(): *number*

How much unused data is there.

**Returns:** *number*

The amount of unused data.
