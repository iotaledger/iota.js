# Class: HmacSha1

Class to help with HmacSha1 scheme.
TypeScript conversion from https://github.com/emn178/js-sha1.

## Table of contents

### Constructors

- [constructor](HmacSha1.md#constructor)

### Methods

- [sum](HmacSha1.md#sum)
- [update](HmacSha1.md#update)
- [digest](HmacSha1.md#digest)

## Constructors

### constructor

• **new HmacSha1**(`key`)

Create a new instance of HmacSha1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key for the hmac. |

## Methods

### sum

▸ `Static` **sum**(`key`, `data`): `Uint8Array`

Perform Sum on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key for the hmac. |
| `data` | `Uint8Array` | The data to operate on. |

#### Returns

`Uint8Array`

The sum of the data.

___

### update

▸ **update**(`message`): [`HmacSha1`](HmacSha1.md)

Update the hash with the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The data to update the hash with. |

#### Returns

[`HmacSha1`](HmacSha1.md)

The instance for chaining.

___

### digest

▸ **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.
