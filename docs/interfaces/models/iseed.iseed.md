[@iota/iota.js](../../README.md) / [models/ISeed](../../modules/models_iseed.md) / ISeed

# Interface: ISeed

[models/ISeed](../../modules/models_iseed.md).ISeed

Interface definitions for seed.

## Hierarchy

* **ISeed**

## Implemented by

* [*Ed25519Seed*](../../classes/seedtypes/ed25519seed.ed25519seed.md)

## Table of contents

### Methods

- [generateSeedFromPath](iseed.iseed.md#generateseedfrompath)
- [keyPair](iseed.iseed.md#keypair)
- [toBytes](iseed.iseed.md#tobytes)
- [toString](iseed.iseed.md#tostring)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [*Bip32Path*](../../classes/crypto/bip32path.bip32path.md)): [*ISeed*](iseed.iseed.md)

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [*Bip32Path*](../../classes/crypto/bip32path.bip32path.md) | The path to generate the seed for.   |

**Returns:** [*ISeed*](iseed.iseed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [*IKeyPair*](ikeypair.ikeypair.md)

Get the key pair from the seed.

**Returns:** [*IKeyPair*](ikeypair.ikeypair.md)

The key pair.

___

### toBytes

▸ **toBytes**(): *Uint8Array*

Return the key as bytes.

**Returns:** *Uint8Array*

The key as bytes.

___

### toString

▸ **toString**(): *string*

Return the key as string.

**Returns:** *string*

The key as string.
