# Class: Sha1

Class to help with Sha1 scheme.
TypeScript conversion from https://github.com/emn178/js-sha1.
Although this algorithm should not be use in most cases, it is the
default and most widely support for generating TOTP/HOTP codes.

## Table of contents

### Constructors

- [constructor](Sha1.md#constructor)

### Methods

- [sum](Sha1.md#sum)
- [update](Sha1.md#update)
- [digest](Sha1.md#digest)

## Constructors

### constructor

• **new Sha1**()

Create a new instance of Sha1.

## Methods

### sum

▸ `Static` **sum**(`data`): `Uint8Array`

Perform Sum on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to operate on. |

#### Returns

`Uint8Array`

The sum of the data.

___

### update

▸ **update**(`message`): [`Sha1`](Sha1.md)

Update the hash with the data.

**`Throws`**

Error if the hash has already been finalized.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The data to update the hash with. |

#### Returns

[`Sha1`](Sha1.md)

The instance for chaining.

___

### digest

▸ **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.
