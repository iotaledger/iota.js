---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: ChaCha20Poly1305

Implementation of the ChaCha20Poly1305 cipher.

## Table of contents

### Methods

- [encryptor](ChaCha20Poly1305.md#encryptor)
- [decryptor](ChaCha20Poly1305.md#decryptor)
- [setAAD](ChaCha20Poly1305.md#setaad)
- [update](ChaCha20Poly1305.md#update)
- [final](ChaCha20Poly1305.md#final)
- [getAuthTag](ChaCha20Poly1305.md#getauthtag)
- [setAuthTag](ChaCha20Poly1305.md#setauthtag)

## Methods

### encryptor

▸ `Static` **encryptor**(`key`, `nonce`): [`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Create a ChaCha20Poly1305 encryptor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key. |
| `nonce` | `Uint8Array` | The nonce. |

#### Returns

[`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Encryptor instance of ChaCha20Poly1305.

___

### decryptor

▸ `Static` **decryptor**(`key`, `nonce`): [`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Create a ChaCha20Poly1305 decryptor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key. |
| `nonce` | `Uint8Array` | The nonce. |

#### Returns

[`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Decryptor instance of ChaCha20Poly1305.

___

### setAAD

▸ **setAAD**(`aad`): `void`

Set the AAD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aad` | `Uint8Array` | The aad to set. |

#### Returns

`void`

___

### update

▸ **update**(`input`): `Uint8Array`

Update the cipher with more data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Uint8Array` | The input data to include. |

#### Returns

`Uint8Array`

The updated data.

___

### final

▸ **final**(): `void`

Finalise the data.

#### Returns

`void`

___

### getAuthTag

▸ **getAuthTag**(): `Uint8Array`

Get the auth tag.

#### Returns

`Uint8Array`

The auth tag.

___

### setAuthTag

▸ **setAuthTag**(`authTag`): `void`

Set the auth tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authTag` | `Uint8Array` | Set the auth tag. |

#### Returns

`void`
