# Class: Base32

Class to help with base32 Encoding/Decoding using RFC4648.

## Table of contents

### Methods

- [decode](Base32.md#decode)
- [encode](Base32.md#encode)

## Methods

### decode

▸ `Static` **decode**(`base32`): `Uint8Array`

Convert the base 32 string to a byte array.

**`Throws`**

If the input string contains a character not in the Base32 alphabet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base32` | `string` | The base32 string to convert. |

#### Returns

`Uint8Array`

The byte array.

___

### encode

▸ `Static` **encode**(`bytes`): `string`

Convert a byte array to base 32.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The byte array to convert. |

#### Returns

`string`

The data as base32 string.
