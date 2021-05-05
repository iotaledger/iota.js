[@iota/iota.js](../README.md) / [crypto/slip0010](../modules/crypto_slip0010.md) / Slip0010

# Class: Slip0010

[crypto/slip0010](../modules/crypto_slip0010.md).Slip0010

Class to help with slip0010 key derivation.
https://github.com/satoshilabs/slips/blob/master/slip-0010.md

## Table of contents

### Constructors

- [constructor](crypto_slip0010.slip0010.md#constructor)

### Methods

- [derivePath](crypto_slip0010.slip0010.md#derivepath)
- [getMasterKeyFromSeed](crypto_slip0010.slip0010.md#getmasterkeyfromseed)
- [getPublicKey](crypto_slip0010.slip0010.md#getpublickey)

## Constructors

### constructor

\+ **new Slip0010**(): [*Slip0010*](crypto_slip0010.slip0010.md)

**Returns:** [*Slip0010*](crypto_slip0010.slip0010.md)

## Methods

### derivePath

▸ `Static`**derivePath**(`seed`: *Uint8Array*, `path`: [*Bip32Path*](crypto_bip32path.bip32path.md)): *object*

Derive a key from the path.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | *Uint8Array* | The seed. |
| `path` | [*Bip32Path*](crypto_bip32path.bip32path.md) | The path. |

**Returns:** *object*

The key and chain code.

___

### getMasterKeyFromSeed

▸ `Static`**getMasterKeyFromSeed**(`seed`: *Uint8Array*): *object*

Get the master key from the seed.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | *Uint8Array* | The seed to generate the master key from. |

**Returns:** *object*

The key and chain code.

___

### getPublicKey

▸ `Static`**getPublicKey**(`privateKey`: *Uint8Array*, `withZeroByte?`: *boolean*): *Uint8Array*

Get the public key from the private key.

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `privateKey` | *Uint8Array* | - | The private key. |
| `withZeroByte` | *boolean* | true | Include a zero bute prefix. |

**Returns:** *Uint8Array*

The public key.
