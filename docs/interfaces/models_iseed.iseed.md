[@iota/iota.js](../README.md) / [models/ISeed](../modules/models_ISeed.md) / ISeed

# Interface: ISeed

[models/ISeed](../modules/models_ISeed.md).ISeed

Interface definitions for seed.

## Implemented by

- [`Ed25519Seed`](../classes/seedTypes_ed25519Seed.Ed25519Seed.md)

## Table of contents

### Methods

- [generateSeedFromPath](models_ISeed.ISeed.md#generateseedfrompath)
- [keyPair](models_ISeed.ISeed.md#keypair)
- [toBytes](models_ISeed.ISeed.md#tobytes)
- [toString](models_ISeed.ISeed.md#tostring)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`): [`ISeed`](models_ISeed.ISeed.md)

Generate a new seed from the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | [`Bip32Path`](../classes/crypto_bip32Path.Bip32Path.md) | The path to generate the seed for. |

#### Returns

[`ISeed`](models_ISeed.ISeed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [`IKeyPair`](models_IKeyPair.IKeyPair.md)

Get the key pair from the seed.

#### Returns

[`IKeyPair`](models_IKeyPair.IKeyPair.md)

The key pair.

___

### toBytes

▸ **toBytes**(): `Uint8Array`

Return the key as bytes.

#### Returns

`Uint8Array`

The key as bytes.

___

### toString

▸ **toString**(): `string`

Return the key as string.

#### Returns

`string`

The key as string.
