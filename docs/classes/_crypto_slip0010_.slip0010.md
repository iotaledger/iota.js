**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/slip0010"](../modules/_crypto_slip0010_.md) / Slip0010

# Class: Slip0010

Class to help with slip0010 key derivation.
https://github.com/satoshilabs/slips/blob/master/slip-0010.md

## Hierarchy

* **Slip0010**

## Index

### Methods

* [derivePath](_crypto_slip0010_.slip0010.md#derivepath)
* [getMasterKeyFromSeed](_crypto_slip0010_.slip0010.md#getmasterkeyfromseed)
* [getPublicKey](_crypto_slip0010_.slip0010.md#getpublickey)

## Methods

### derivePath

▸ `Static`**derivePath**(`seed`: Uint8Array, `path`: [Bip32Path](_crypto_bip32path_.bip32path.md)): object

Derive a key from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`seed` | Uint8Array | The seed. |
`path` | [Bip32Path](_crypto_bip32path_.bip32path.md) | The path. |

**Returns:** object

Name | Type |
------ | ------ |
`chainCode` | Uint8Array |
`privateKey` | Uint8Array |

The key and chain code.

___

### getMasterKeyFromSeed

▸ `Static`**getMasterKeyFromSeed**(`seed`: Uint8Array): object

Get the master key from the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`seed` | Uint8Array | The seed to generate the master key from. |

**Returns:** object

Name | Type |
------ | ------ |
`chainCode` | Uint8Array |
`privateKey` | Uint8Array |

The key and chain code.

___

### getPublicKey

▸ `Static`**getPublicKey**(`privateKey`: Uint8Array, `withZeroByte?`: boolean): Uint8Array

Get the public key from the private key.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`privateKey` | Uint8Array | - | The private key. |
`withZeroByte` | boolean | true | Include a zero bute prefix. |

**Returns:** Uint8Array

The public key.
