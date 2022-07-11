---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: Ed25519Address

Class to help with Ed25519 Signature scheme.

## Implements

- [`IAddress`](../interfaces/IAddress.md)

## Table of contents

### Constructors

- [constructor](Ed25519Address.md#constructor)

### Methods

- [toAddress](Ed25519Address.md#toaddress)
- [verify](Ed25519Address.md#verify)

## Constructors

### constructor

• **new Ed25519Address**(`publicKey`)

Create a new instance of Ed25519Address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | The public key for the address. |

## Methods

### toAddress

▸ **toAddress**(): `Uint8Array`

Convert the public key to an address.

#### Returns

`Uint8Array`

The address.

#### Implementation of

[IAddress](../interfaces/IAddress.md).[toAddress](../interfaces/IAddress.md#toaddress)

___

### verify

▸ **verify**(`address`): `boolean`

Use the public key to validate the address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | The address to verify. |

#### Returns

`boolean`

True if the data and address is verified.

#### Implementation of

[IAddress](../interfaces/IAddress.md).[verify](../interfaces/IAddress.md#verify)
