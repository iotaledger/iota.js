---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: ReadStream

Keep track of the read index within a stream.

## Table of contents

### Constructors

- [constructor](ReadStream.md#constructor)

### Methods

- [length](ReadStream.md#length)
- [hasRemaining](ReadStream.md#hasremaining)
- [unused](ReadStream.md#unused)
- [getReadIndex](ReadStream.md#getreadindex)
- [setReadIndex](ReadStream.md#setreadindex)
- [readFixedHex](ReadStream.md#readfixedhex)
- [readBytes](ReadStream.md#readbytes)
- [readUInt8](ReadStream.md#readuint8)
- [readUInt16](ReadStream.md#readuint16)
- [readUInt32](ReadStream.md#readuint32)
- [readUInt64](ReadStream.md#readuint64)
- [readUInt256](ReadStream.md#readuint256)
- [readBoolean](ReadStream.md#readboolean)

## Constructors

### constructor

• **new ReadStream**(`storage`, `readStartIndex?`)

Create a new instance of ReadStream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `storage` | `Uint8Array` | `undefined` | The data to access. |
| `readStartIndex` | `number` | `0` | The index to start the reading from. |

## Methods

### length

▸ **length**(): `number`

Get the length of the storage.

#### Returns

`number`

The storage length.

___

### hasRemaining

▸ **hasRemaining**(`remaining`): `boolean`

Does the storage have enough data remaining.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `remaining` | `number` | The amount of space needed. |

#### Returns

`boolean`

True if it has enough data.

___

### unused

▸ **unused**(): `number`

How much unused data is there.

#### Returns

`number`

The amount of unused data.

___

### getReadIndex

▸ **getReadIndex**(): `number`

Get the current read index.

#### Returns

`number`

The current read index.

___

### setReadIndex

▸ **setReadIndex**(`readIndex`): `void`

Set the current read index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readIndex` | `number` | The current read index. |

#### Returns

`void`

___

### readFixedHex

▸ **readFixedHex**(`name`, `length`, `moveIndex?`): `string`

Read fixed length as hex.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `length` | `number` | `undefined` | The length of the data to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`string`

The hex formatted data.

___

### readBytes

▸ **readBytes**(`name`, `length`, `moveIndex?`): `Uint8Array`

Read an array of byte from the stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `length` | `number` | `undefined` | The length of the array to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`Uint8Array`

The value.

___

### readUInt8

▸ **readUInt8**(`name`, `moveIndex?`): `number`

Read a byte from the stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`number`

The value.

___

### readUInt16

▸ **readUInt16**(`name`, `moveIndex?`): `number`

Read a UInt16 from the stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`number`

The value.

___

### readUInt32

▸ **readUInt32**(`name`, `moveIndex?`): `number`

Read a UInt32 from the stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`number`

The value.

___

### readUInt64

▸ **readUInt64**(`name`, `moveIndex?`): `BigInteger`

Read a UInt64 from the stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`BigInteger`

The value.

___

### readUInt256

▸ **readUInt256**(`name`, `moveIndex?`): `BigInteger`

Read a UInt256 from the stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`BigInteger`

The value.

___

### readBoolean

▸ **readBoolean**(`name`, `moveIndex?`): `boolean`

Read a boolean from the stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the data we are trying to read. |
| `moveIndex` | `boolean` | `true` | Move the index pointer on. |

#### Returns

`boolean`

The value.
