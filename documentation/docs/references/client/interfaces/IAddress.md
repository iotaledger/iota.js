---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IAddress

Interface defining address.

## Implemented by

- [`Ed25519Address`](../classes/Ed25519Address.md)

## Table of contents

### Methods

- [toAddress](IAddress.md#toaddress)
- [verify](IAddress.md#verify)

## Methods

### toAddress

▸ **toAddress**(): `Uint8Array`

Convert the public key to an address.

#### Returns

`Uint8Array`

The address.

___

### verify

▸ **verify**(`publicKey`, `address`): `boolean`

Use the public key to validate the address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | - |
| `address` | `Uint8Array` | The address to verify. |

#### Returns

`boolean`

True if the data and address is verified.
