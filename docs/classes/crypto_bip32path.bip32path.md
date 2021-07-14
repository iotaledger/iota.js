[@iota/iota.js](../README.md) / [crypto/bip32Path](../modules/crypto_bip32Path.md) / Bip32Path

# Class: Bip32Path

[crypto/bip32Path](../modules/crypto_bip32Path.md).Bip32Path

Class to help with bip32 paths.

## Table of contents

### Constructors

- [constructor](crypto_bip32Path.Bip32Path.md#constructor)

### Methods

- [numberSegments](crypto_bip32Path.Bip32Path.md#numbersegments)
- [pop](crypto_bip32Path.Bip32Path.md#pop)
- [push](crypto_bip32Path.Bip32Path.md#push)
- [pushHardened](crypto_bip32Path.Bip32Path.md#pushhardened)
- [toString](crypto_bip32Path.Bip32Path.md#tostring)
- [fromPath](crypto_bip32Path.Bip32Path.md#frompath)

## Constructors

### constructor

• **new Bip32Path**(`initialPath?`)

Create a new instance of Bip32Path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialPath?` | `string` | Initial path to create. |

## Methods

### numberSegments

▸ **numberSegments**(): `number`[]

Get the segments.

#### Returns

`number`[]

The segments as numbers.

___

### pop

▸ **pop**(): `void`

Pop an index from the path.

#### Returns

`void`

___

### push

▸ **push**(`index`): `void`

Push a new index on to the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to add to the path. |

#### Returns

`void`

___

### pushHardened

▸ **pushHardened**(`index`): `void`

Push a new hardened index on to the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to add to the path. |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Converts the path to a string.

#### Returns

`string`

The path as a string.

___

### fromPath

▸ `Static` **fromPath**(`bip32Path`): [`Bip32Path`](crypto_bip32Path.Bip32Path.md)

Construct a new path by cloning an existing one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bip32Path` | [`Bip32Path`](crypto_bip32Path.Bip32Path.md) | The path to clone. |

#### Returns

[`Bip32Path`](crypto_bip32Path.Bip32Path.md)

A new instance of Bip32Path.
