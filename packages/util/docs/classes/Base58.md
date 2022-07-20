# Class: Base58

Class to help with base58 Encoding/Decoding.

## Table of contents

### Methods

- [decode](Base58.md#decode)
- [encode](Base58.md#encode)

## Methods

### decode

▸ `Static` **decode**(`base58`): `Uint8Array`

Convert the base 58 string to a byte array.

**`Throws`**

If the input string contains a character not in the Base58 alphabet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base58` | `string` | The base58 string to convert. |

#### Returns

`Uint8Array`

The byte array.

___

### encode

▸ `Static` **encode**(`bytes`): `string`

Convert a byte array to base 58.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The byte array to encode. |

#### Returns

`string`

The data as base58 string.
