**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / Ed25519Seed

# Class: Ed25519Seed

Class to help with seeds.

## Hierarchy

* **Ed25519Seed**

## Implements

* [ISeed](../interfaces/iseed.md)

## Index

### Constructors

* [constructor](ed25519seed.md#constructor)

### Methods

* [generateSeedFromPath](ed25519seed.md#generateseedfrompath)
* [keyPair](ed25519seed.md#keypair)
* [toBytes](ed25519seed.md#tobytes)

## Constructors

### constructor

\+ **new Ed25519Seed**(`secretKeyBytes?`: Uint8Array): [Ed25519Seed](ed25519seed.md)

Create a new instance of Ed25519Seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`secretKeyBytes?` | Uint8Array | The bytes.  |

**Returns:** [Ed25519Seed](ed25519seed.md)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [Bip32Path](bip32path.md)): [ISeed](../interfaces/iseed.md)

*Implementation of [ISeed](../interfaces/iseed.md)*

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [Bip32Path](bip32path.md) | The path to generate the seed for. |

**Returns:** [ISeed](../interfaces/iseed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [IKeyPair](../interfaces/ikeypair.md)

*Implementation of [ISeed](../interfaces/iseed.md)*

Get the key pair from the seed.

**Returns:** [IKeyPair](../interfaces/ikeypair.md)

The key pair.

___

### toBytes

▸ **toBytes**(): Uint8Array

*Implementation of [ISeed](../interfaces/iseed.md)*

Return the key as bytes.

**Returns:** Uint8Array

The key as bytes.
