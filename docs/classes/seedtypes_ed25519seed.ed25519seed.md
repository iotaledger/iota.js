[@iota/iota.js](../README.md) / [seedTypes/ed25519Seed](../modules/seedTypes_ed25519Seed.md) / Ed25519Seed

# Class: Ed25519Seed

[seedTypes/ed25519Seed](../modules/seedTypes_ed25519Seed.md).Ed25519Seed

Class to help with seeds.

## Implements

- [`ISeed`](../interfaces/models_ISeed.ISeed.md)

## Table of contents

### Constructors

- [constructor](seedTypes_ed25519Seed.Ed25519Seed.md#constructor)

### Methods

- [generateSeedFromPath](seedTypes_ed25519Seed.Ed25519Seed.md#generateseedfrompath)
- [keyPair](seedTypes_ed25519Seed.Ed25519Seed.md#keypair)
- [toBytes](seedTypes_ed25519Seed.Ed25519Seed.md#tobytes)
- [fromMnemonic](seedTypes_ed25519Seed.Ed25519Seed.md#frommnemonic)

## Constructors

### constructor

• **new Ed25519Seed**(`secretKeyBytes?`)

Create a new instance of Ed25519Seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKeyBytes?` | `Uint8Array` | The bytes. |

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`): [`ISeed`](../interfaces/models_ISeed.ISeed.md)

Generate a new seed from the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | [`Bip32Path`](crypto_bip32Path.Bip32Path.md) | The path to generate the seed for. |

#### Returns

[`ISeed`](../interfaces/models_ISeed.ISeed.md)

The generated seed.

#### Implementation of

[ISeed](../interfaces/models_ISeed.ISeed.md).[generateSeedFromPath](../interfaces/models_ISeed.ISeed.md#generateseedfrompath)

___

### keyPair

▸ **keyPair**(): [`IKeyPair`](../interfaces/models_IKeyPair.IKeyPair.md)

Get the key pair from the seed.

#### Returns

[`IKeyPair`](../interfaces/models_IKeyPair.IKeyPair.md)

The key pair.

#### Implementation of

[ISeed](../interfaces/models_ISeed.ISeed.md).[keyPair](../interfaces/models_ISeed.ISeed.md#keypair)

___

### toBytes

▸ **toBytes**(): `Uint8Array`

Return the key as bytes.

#### Returns

`Uint8Array`

The key as bytes.

#### Implementation of

[ISeed](../interfaces/models_ISeed.ISeed.md).[toBytes](../interfaces/models_ISeed.ISeed.md#tobytes)

___

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`): [`Ed25519Seed`](seedTypes_ed25519Seed.Ed25519Seed.md)

Create the seed from a Bip39 mnemonic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic to create the seed from. |

#### Returns

[`Ed25519Seed`](seedTypes_ed25519Seed.Ed25519Seed.md)

A new instance of Ed25519Seed.
