**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["seedTypes/ed25519Seed"](../modules/_seedtypes_ed25519seed_.md) / Ed25519Seed

# Class: Ed25519Seed

Class to help with seeds.

## Hierarchy

* **Ed25519Seed**

## Implements

* [ISeed](../interfaces/_models_iseed_.iseed.md)

## Index

### Constructors

* [constructor](_seedtypes_ed25519seed_.ed25519seed.md#constructor)

### Methods

* [generateSeedFromPath](_seedtypes_ed25519seed_.ed25519seed.md#generateseedfrompath)
* [keyPair](_seedtypes_ed25519seed_.ed25519seed.md#keypair)
* [toBytes](_seedtypes_ed25519seed_.ed25519seed.md#tobytes)
* [fromMnemonic](_seedtypes_ed25519seed_.ed25519seed.md#frommnemonic)

## Constructors

### constructor

\+ **new Ed25519Seed**(`secretKeyBytes?`: Uint8Array): [Ed25519Seed](_seedtypes_ed25519seed_.ed25519seed.md)

Create a new instance of Ed25519Seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`secretKeyBytes?` | Uint8Array | The bytes.  |

**Returns:** [Ed25519Seed](_seedtypes_ed25519seed_.ed25519seed.md)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [Bip32Path](_crypto_bip32path_.bip32path.md)): [ISeed](../interfaces/_models_iseed_.iseed.md)

*Implementation of [ISeed](../interfaces/_models_iseed_.iseed.md)*

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [Bip32Path](_crypto_bip32path_.bip32path.md) | The path to generate the seed for. |

**Returns:** [ISeed](../interfaces/_models_iseed_.iseed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md)

*Implementation of [ISeed](../interfaces/_models_iseed_.iseed.md)*

Get the key pair from the seed.

**Returns:** [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md)

The key pair.

___

### toBytes

▸ **toBytes**(): Uint8Array

*Implementation of [ISeed](../interfaces/_models_iseed_.iseed.md)*

Return the key as bytes.

**Returns:** Uint8Array

The key as bytes.

___

### fromMnemonic

▸ `Static`**fromMnemonic**(`mnemonic`: string): [Ed25519Seed](_seedtypes_ed25519seed_.ed25519seed.md)

Create the seed from a Bip39 mnemonic.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | string | The mnemonic to create the seed from. |

**Returns:** [Ed25519Seed](_seedtypes_ed25519seed_.ed25519seed.md)

A new instance of Ed25519Seed.
