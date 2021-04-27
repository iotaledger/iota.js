**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/bip39"](../modules/_crypto_bip39_.md) / Bip39

# Class: Bip39

Implementation of Bip39 for mnemonic generation.

## Hierarchy

* **Bip39**

## Index

### Methods

* [entropyChecksumBits](_crypto_bip39_.bip39.md#entropychecksumbits)
* [entropyToMnemonic](_crypto_bip39_.bip39.md#entropytomnemonic)
* [mnemonicToEntropy](_crypto_bip39_.bip39.md#mnemonictoentropy)
* [mnemonicToSeed](_crypto_bip39_.bip39.md#mnemonictoseed)
* [randomMnemonic](_crypto_bip39_.bip39.md#randommnemonic)
* [setWordList](_crypto_bip39_.bip39.md#setwordlist)

## Methods

### entropyChecksumBits

▸ `Static`**entropyChecksumBits**(`entropy`: Uint8Array): string

Calculate the entropy checksum.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`entropy` | Uint8Array | The entropy to calculate the checksum for. |

**Returns:** string

The checksum.

___

### entropyToMnemonic

▸ `Static`**entropyToMnemonic**(`entropy`: Uint8Array): string

Generate a mnemonic from the entropy.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`entropy` | Uint8Array | The entropy to generate |

**Returns:** string

The mnemonic.

___

### mnemonicToEntropy

▸ `Static`**mnemonicToEntropy**(`mnemonic`: string): Uint8Array

Convert the mnemonic back to entropy.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | string | The mnemonic to convert. |

**Returns:** Uint8Array

The entropy.

___

### mnemonicToSeed

▸ `Static`**mnemonicToSeed**(`mnemonic`: string, `password?`: undefined \| string, `iterations?`: number, `keyLength?`: number): Uint8Array

Convert a mnemonic to a seed.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mnemonic` | string | - | The mnemonic to convert. |
`password?` | undefined \| string | - | The password to apply to the seed generation. |
`iterations` | number | 2048 | The number of iterations to perform on the password function, defaults to 2048. |
`keyLength` | number | 64 | The size of the key length to generate, defaults to 64. |

**Returns:** Uint8Array

The seed.

___

### randomMnemonic

▸ `Static`**randomMnemonic**(`length?`: number): string

Generate a random mnemonic.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`length` | number | 256 | The length of the mnemonic to generate, defaults to 256. |

**Returns:** string

The random mnemonic.

___

### setWordList

▸ `Static`**setWordList**(`wordlistData`: string[], `joiningChar?`: string): void

Set the wordlist and joining character.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`wordlistData` | string[] | - | Array of words. |
`joiningChar` | string | " " | The character to join the words with.  |

**Returns:** void
