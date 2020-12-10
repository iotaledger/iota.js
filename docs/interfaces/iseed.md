**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ISeed

# Interface: ISeed

Interface definitions for seed.

## Hierarchy

* **ISeed**

## Implemented by

* [Ed25519Seed](../classes/ed25519seed.md)

## Index

### Methods

* [generateSeedFromPath](iseed.md#generateseedfrompath)
* [keyPair](iseed.md#keypair)
* [toBytes](iseed.md#tobytes)
* [toString](iseed.md#tostring)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [Bip32Path](../classes/bip32path.md)): [ISeed](iseed.md)

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [Bip32Path](../classes/bip32path.md) | The path to generate the seed for. |

**Returns:** [ISeed](iseed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [IKeyPair](ikeypair.md)

Get the key pair from the seed.

**Returns:** [IKeyPair](ikeypair.md)

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
