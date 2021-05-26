[@iota/iota.js](../README.md) / [crypto/chaCha20](../modules/crypto_chacha20.md) / ChaCha20

# Class: ChaCha20

[crypto/chaCha20](../modules/crypto_chacha20.md).ChaCha20

Implementation of the ChaCha29 cipher.

## Table of contents

### Constructors

- [constructor](crypto_chacha20.chacha20.md#constructor)

### Methods

- [decrypt](crypto_chacha20.chacha20.md#decrypt)
- [encrypt](crypto_chacha20.chacha20.md#encrypt)
- [keyStream](crypto_chacha20.chacha20.md#keystream)

## Constructors

### constructor

\+ **new ChaCha20**(`key`: *Uint8Array*, `nonce`: *Uint8Array*, `counter?`: *number*): [*ChaCha20*](crypto_chacha20.chacha20.md)

Create a new instance of ChaCha20.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | *Uint8Array* | - | The key. |
| `nonce` | *Uint8Array* | - | The nonce. |
| `counter` | *number* | 0 | Counter. |

**Returns:** [*ChaCha20*](crypto_chacha20.chacha20.md)

## Methods

### decrypt

▸ **decrypt**(`data`: *Uint8Array*): *Uint8Array*

Decrypt the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | *Uint8Array* | The source data to decrypt. |

**Returns:** *Uint8Array*

The decrypted data.

___

### encrypt

▸ **encrypt**(`data`: *Uint8Array*): *Uint8Array*

Encrypt the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | *Uint8Array* | The source data to encrypt. |

**Returns:** *Uint8Array*

The encrypted data.

___

### keyStream

▸ **keyStream**(`length`: *number*): *Uint8Array*

Create a keystream of the given length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | *number* | The length to create the keystream. |

**Returns:** *Uint8Array*

The keystream.
