---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: WriteStream

Keep track of the write index within a stream.

## Table of contents

### Constructors

- [constructor](WriteStream.md#constructor)

### Methods

- [length](WriteStream.md#length)
- [unused](WriteStream.md#unused)
- [finalBytes](WriteStream.md#finalbytes)
- [finalHex](WriteStream.md#finalhex)
- [getWriteIndex](WriteStream.md#getwriteindex)
- [setWriteIndex](WriteStream.md#setwriteindex)
- [writeFixedHex](WriteStream.md#writefixedhex)
- [writeBytes](WriteStream.md#writebytes)
- [writeUInt8](WriteStream.md#writeuint8)
- [writeUInt16](WriteStream.md#writeuint16)
- [writeUInt32](WriteStream.md#writeuint32)
- [writeUInt64](WriteStream.md#writeuint64)
- [writeUInt256](WriteStream.md#writeuint256)
- [writeBoolean](WriteStream.md#writeboolean)

## Constructors

### constructor

• **new WriteStream**()

Create a new instance of ReadStream.

## Methods

### length

▸ **length**(): `number`

Get the length of the stream.

#### Returns

`number`

The stream length.

___

### unused

▸ **unused**(): `number`

How much unused data is there.

#### Returns

`number`

The amount of unused data.

___

### finalBytes

▸ **finalBytes**(): `Uint8Array`

Get the final stream as bytes.

#### Returns

`Uint8Array`

The final stream.

___

### finalHex

▸ **finalHex**(): `string`

Get the final stream as hex.

#### Returns

`string`

The final stream as hex.

___

### getWriteIndex

▸ **getWriteIndex**(): `number`

Get the current write index.

#### Returns

`number`

The current write index.

___

### setWriteIndex

▸ **setWriteIndex**(`writeIndex`): `void`

Set the current write index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeIndex` | `number` | The current write index. |

#### Returns

`void`

___

### writeFixedHex

▸ **writeFixedHex**(`name`, `length`, `val`): `void`

Write fixed length stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `length` | `number` | The length of the data to write. |
| `val` | `string` | The data to write. |

#### Returns

`void`

___

### writeBytes

▸ **writeBytes**(`name`, `length`, `val`): `void`

Write fixed length stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `length` | `number` | The length of the data to write. |
| `val` | `Uint8Array` | The data to write. |

#### Returns

`void`

___

### writeUInt8

▸ **writeUInt8**(`name`, `val`): `void`

Write a byte to the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `val` | `number` | The data to write. |

#### Returns

`void`

___

### writeUInt16

▸ **writeUInt16**(`name`, `val`): `void`

Write a UInt16 to the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `val` | `number` | The data to write. |

#### Returns

`void`

___

### writeUInt32

▸ **writeUInt32**(`name`, `val`): `void`

Write a UInt32 to the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `val` | `number` | The data to write. |

#### Returns

`void`

___

### writeUInt64

▸ **writeUInt64**(`name`, `val`): `void`

Write a UInt64 to the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `val` | `BigInteger` | The data to write. |

#### Returns

`void`

___

### writeUInt256

▸ **writeUInt256**(`name`, `val`): `void`

Write a UInt256 to the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `val` | `BigInteger` | The data to write. |

#### Returns

`void`

___

### writeBoolean

▸ **writeBoolean**(`name`, `val`): `void`

Write a boolean to the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data we are trying to write. |
| `val` | `boolean` | The data to write. |

#### Returns

`void`
