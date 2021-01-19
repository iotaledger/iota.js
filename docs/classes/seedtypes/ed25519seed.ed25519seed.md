[@iota/iota.js](../../README.md) / [seedTypes/ed25519Seed](../../modules/seedtypes_ed25519seed.md) / Ed25519Seed

# Class: Ed25519Seed

[seedTypes/ed25519Seed](../../modules/seedtypes_ed25519seed.md).Ed25519Seed

Class to help with seeds.

## Hierarchy

* **Ed25519Seed**

## Implements

* [*ISeed*](../../interfaces/models/iseed.iseed.md)

## Table of contents

### Constructors

- [constructor](ed25519seed.ed25519seed.md#constructor)

### Methods

- [generateSeedFromPath](ed25519seed.ed25519seed.md#generateseedfrompath)
- [keyPair](ed25519seed.ed25519seed.md#keypair)
- [toBytes](ed25519seed.ed25519seed.md#tobytes)
- [fromMnemonic](ed25519seed.ed25519seed.md#frommnemonic)

## Constructors

### constructor

\+ **new Ed25519Seed**(`secretKeyBytes?`: *Uint8Array*): [*Ed25519Seed*](ed25519seed.ed25519seed.md)

Create a new instance of Ed25519Seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`secretKeyBytes?` | *Uint8Array* | The bytes.    |

**Returns:** [*Ed25519Seed*](ed25519seed.ed25519seed.md)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [*Bip32Path*](../crypto/bip32path.bip32path.md)): [*ISeed*](../../interfaces/models/iseed.iseed.md)

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [*Bip32Path*](../crypto/bip32path.bip32path.md) | The path to generate the seed for.   |

**Returns:** [*ISeed*](../../interfaces/models/iseed.iseed.md)

The generated seed.

Implementation of: [ISeed](../../interfaces/models/iseed.iseed.md)

___

### keyPair

▸ **keyPair**(): [*IKeyPair*](../../interfaces/models/ikeypair.ikeypair.md)

Get the key pair from the seed.

**Returns:** [*IKeyPair*](../../interfaces/models/ikeypair.ikeypair.md)

The key pair.

Implementation of: [ISeed](../../interfaces/models/iseed.iseed.md)

___

### toBytes

▸ **toBytes**(): *Uint8Array*

Return the key as bytes.

**Returns:** *Uint8Array*

The key as bytes.

Implementation of: [ISeed](../../interfaces/models/iseed.iseed.md)

___

### fromMnemonic

▸ `Static`**fromMnemonic**(`mnemonic`: *string*): [*Ed25519Seed*](ed25519seed.ed25519seed.md)

Create the seed from a Bip39 mnemonic.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | *string* | The mnemonic to create the seed from.   |

**Returns:** [*Ed25519Seed*](ed25519seed.ed25519seed.md)

A new instance of Ed25519Seed.
