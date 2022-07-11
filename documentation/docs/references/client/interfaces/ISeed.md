---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: ISeed

Interface definitions for seed.

## Implemented by

- [`Ed25519Seed`](../classes/Ed25519Seed.md)

## Table of contents

### Methods

- [keyPair](ISeed.md#keypair)
- [generateSeedFromPath](ISeed.md#generateseedfrompath)
- [toBytes](ISeed.md#tobytes)
- [toString](ISeed.md#tostring)

## Methods

### keyPair

▸ **keyPair**(): [`IKeyPair`](IKeyPair.md)

Get the key pair from the seed.

#### Returns

[`IKeyPair`](IKeyPair.md)

The key pair.

___

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`): [`ISeed`](ISeed.md)

Generate a new seed from the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `Bip32Path` | The path to generate the seed for. |

#### Returns

[`ISeed`](ISeed.md)

The generated seed.

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
