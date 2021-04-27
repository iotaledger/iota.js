**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/ISeed"](../modules/_models_iseed_.md) / ISeed

# Interface: ISeed

Interface definitions for seed.

## Hierarchy

* **ISeed**

## Implemented by

* [Ed25519Seed](../classes/_seedtypes_ed25519seed_.ed25519seed.md)

## Index

### Methods

* [generateSeedFromPath](_models_iseed_.iseed.md#generateseedfrompath)
* [keyPair](_models_iseed_.iseed.md#keypair)
* [toBytes](_models_iseed_.iseed.md#tobytes)
* [toString](_models_iseed_.iseed.md#tostring)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [Bip32Path](../classes/_crypto_bip32path_.bip32path.md)): [ISeed](_models_iseed_.iseed.md)

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [Bip32Path](../classes/_crypto_bip32path_.bip32path.md) | The path to generate the seed for. |

**Returns:** [ISeed](_models_iseed_.iseed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [IKeyPair](_models_ikeypair_.ikeypair.md)

Get the key pair from the seed.

**Returns:** [IKeyPair](_models_ikeypair_.ikeypair.md)

The key pair.

___

### toBytes

▸ **toBytes**(): Uint8Array

Return the key as bytes.

**Returns:** Uint8Array

The key as bytes.

___

### toString

▸ **toString**(): string

Return the key as string.

**Returns:** string

The key as string.
