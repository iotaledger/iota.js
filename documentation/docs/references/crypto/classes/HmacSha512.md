# Class: HmacSha512

Class to help with HmacSha512 scheme.
TypeScript conversion from https://github.com/emn178/js-sha512.

## Table of contents

### Constructors

- [constructor](HmacSha512.md#constructor)

### Methods

- [sum512](HmacSha512.md#sum512)
- [update](HmacSha512.md#update)
- [digest](HmacSha512.md#digest)

## Constructors

### constructor

• **new HmacSha512**(`key`, `bits?`)

Create a new instance of HmacSha512.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `Uint8Array` | `undefined` | The key for the hmac. |
| `bits` | `number` | `512` | The number of bits. |

## Methods

### sum512

▸ `Static` **sum512**(`key`, `data`): `Uint8Array`

Perform Sum 512 on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key for the hmac. |
| `data` | `Uint8Array` | The data to operate on. |

#### Returns

`Uint8Array`

The sum 512 of the data.

___

### update

▸ **update**(`message`): [`HmacSha512`](HmacSha512.md)

Update the hash with the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The data to update the hash with. |

#### Returns

[`HmacSha512`](HmacSha512.md)

The instance for chaining.

___

### digest

▸ **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.
