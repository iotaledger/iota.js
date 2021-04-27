**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/sha512"](../modules/_crypto_sha512_.md) / Sha512

# Class: Sha512

Class to help with Sha512 scheme.
TypeScript conversion from https://github.com/emn178/js-sha512

## Hierarchy

* **Sha512**

## Index

### Constructors

* [constructor](_crypto_sha512_.sha512.md#constructor)

### Properties

* [SIZE\_224](_crypto_sha512_.sha512.md#size_224)
* [SIZE\_256](_crypto_sha512_.sha512.md#size_256)
* [SIZE\_384](_crypto_sha512_.sha512.md#size_384)
* [SIZE\_512](_crypto_sha512_.sha512.md#size_512)

### Methods

* [digest](_crypto_sha512_.sha512.md#digest)
* [update](_crypto_sha512_.sha512.md#update)
* [sum512](_crypto_sha512_.sha512.md#sum512)

## Constructors

### constructor

\+ **new Sha512**(`bits?`: number): [Sha512](_crypto_sha512_.sha512.md)

Create a new instance of Sha512.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`bits` | number | Sha512.SIZE\_512 | The number of bits.  |

**Returns:** [Sha512](_crypto_sha512_.sha512.md)

## Properties

### SIZE\_224

▪ `Static` **SIZE\_224**: number = 224

Sha512 224.

___

### SIZE\_256

▪ `Static` **SIZE\_256**: number = 256

Sha512 256.

___

### SIZE\_384

▪ `Static` **SIZE\_384**: number = 384

Sha512 384.

___

### SIZE\_512

▪ `Static` **SIZE\_512**: number = 512

Sha512 512.

## Methods

### digest

▸ **digest**(): Uint8Array

Get the digest.

**Returns:** Uint8Array

The digest.

___

### update

▸ **update**(`message`: Uint8Array): [Sha512](_crypto_sha512_.sha512.md)

Update the hash with the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | The data to update the hash with. |

**Returns:** [Sha512](_crypto_sha512_.sha512.md)

The instance for chaining.

___

### sum512

▸ `Static`**sum512**(`data`: Uint8Array): Uint8Array

Perform Sum 512 on the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | The data to operate on. |

**Returns:** Uint8Array

The sum 512 of the data.
