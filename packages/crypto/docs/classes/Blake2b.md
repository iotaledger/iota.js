# Class: Blake2b

Class to help with Blake2B Signature scheme.
TypeScript conversion from https://github.com/dcposch/blakejs.

## Table of contents

### Properties

- [SIZE\_160](Blake2b.md#size_160)
- [SIZE\_256](Blake2b.md#size_256)
- [SIZE\_512](Blake2b.md#size_512)

### Methods

- [sum160](Blake2b.md#sum160)
- [sum256](Blake2b.md#sum256)
- [sum512](Blake2b.md#sum512)

## Properties

### SIZE\_160

▪ `Static` **SIZE\_160**: `number` = `20`

Blake2b 160.

___

### SIZE\_256

▪ `Static` **SIZE\_256**: `number` = `32`

Blake2b 256.

___

### SIZE\_512

▪ `Static` **SIZE\_512**: `number` = `64`

Blake2b 512.

## Methods

### sum160

▸ `Static` **sum160**(`data`, `key?`): `Uint8Array`

Perform Sum 160 on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to operate on. |
| `key?` | `Uint8Array` | Optional key for the hash. |

#### Returns

`Uint8Array`

The sum 160 of the data.

___

### sum256

▸ `Static` **sum256**(`data`, `key?`): `Uint8Array`

Perform Sum 256 on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to operate on. |
| `key?` | `Uint8Array` | Optional key for the hash. |

#### Returns

`Uint8Array`

The sum 256 of the data.

___

### sum512

▸ `Static` **sum512**(`data`, `key?`): `Uint8Array`

Perform Sum 512 on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to operate on. |
| `key?` | `Uint8Array` | Optional key for the hash. |

#### Returns

`Uint8Array`

The sum 512 of the data.
