[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / ISeed

# Interface: ISeed

Interface definitions for seed.

## Hierarchy

* **ISeed**

## Index

### Methods

* [generateSeedFromPath](index_browser.iseed.md#generateseedfrompath)
* [keyPair](index_browser.iseed.md#keypair)
* [toBytes](index_browser.iseed.md#tobytes)
* [toString](index_browser.iseed.md#tostring)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [*Bip32Path*](../classes/crypto_bip32path.bip32path.md)): [*ISeed*](models_iseed.iseed.md)

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [*Bip32Path*](../classes/crypto_bip32path.bip32path.md) | The path to generate the seed for.   |

**Returns:** [*ISeed*](models_iseed.iseed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [*IKeyPair*](models_ikeypair.ikeypair.md)

Get the key pair from the seed.

**Returns:** [*IKeyPair*](models_ikeypair.ikeypair.md)

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
