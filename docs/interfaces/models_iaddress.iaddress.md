[@iota/iota.js](../README.md) / [models/IAddress](../modules/models_IAddress.md) / IAddress

# Interface: IAddress

[models/IAddress](../modules/models_IAddress.md).IAddress

Interface defining address.

## Implemented by

- [`Ed25519Address`](../classes/addressTypes_ed25519Address.Ed25519Address.md)

## Table of contents

### Methods

- [toAddress](models_IAddress.IAddress.md#toaddress)
- [verify](models_IAddress.IAddress.md#verify)

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
