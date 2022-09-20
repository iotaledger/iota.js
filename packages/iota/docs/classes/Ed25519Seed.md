# Class: Ed25519Seed

Class to help with seeds.

## Implements

- [`ISeed`](../interfaces/ISeed.md)

## Table of contents

### Constructors

- [constructor](Ed25519Seed.md#constructor)

### Methods

- [fromMnemonic](Ed25519Seed.md#frommnemonic)
- [keyPair](Ed25519Seed.md#keypair)
- [generateSeedFromPath](Ed25519Seed.md#generateseedfrompath)
- [toBytes](Ed25519Seed.md#tobytes)

## Constructors

### constructor

• **new Ed25519Seed**(`secretKeyBytes?`)

Create a new instance of Ed25519Seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKeyBytes?` | `Uint8Array` | The bytes. |

## Methods

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`): [`Ed25519Seed`](Ed25519Seed.md)

Create the seed from a Bip39 mnemonic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic to create the seed from. |

#### Returns

[`Ed25519Seed`](Ed25519Seed.md)

A new instance of Ed25519Seed.

___

### keyPair

▸ **keyPair**(): [`IKeyPair`](../interfaces/IKeyPair.md)

Get the key pair from the seed.

#### Returns

[`IKeyPair`](../interfaces/IKeyPair.md)

The key pair.

#### Implementation of

[ISeed](../interfaces/ISeed.md).[keyPair](../interfaces/ISeed.md#keypair)

___

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`): [`ISeed`](../interfaces/ISeed.md)

Generate a new seed from the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `Bip32Path` | The path to generate the seed for. |

#### Returns

[`ISeed`](../interfaces/ISeed.md)

The generated seed.

#### Implementation of

[ISeed](../interfaces/ISeed.md).[generateSeedFromPath](../interfaces/ISeed.md#generateseedfrompath)

___

### toBytes

▸ **toBytes**(): `Uint8Array`

Return the key as bytes.

#### Returns

`Uint8Array`

The key as bytes.

#### Implementation of

[ISeed](../interfaces/ISeed.md).[toBytes](../interfaces/ISeed.md#tobytes)
