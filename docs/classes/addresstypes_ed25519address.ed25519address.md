[@iota/iota.js](../README.md) / [addressTypes/ed25519Address](../modules/addressTypes_ed25519Address.md) / Ed25519Address

# Class: Ed25519Address

[addressTypes/ed25519Address](../modules/addressTypes_ed25519Address.md).Ed25519Address

Class to help with Ed25519 Signature scheme.

## Implements

- [`IAddress`](../interfaces/models_IAddress.IAddress.md)

## Table of contents

### Constructors

- [constructor](addressTypes_ed25519Address.Ed25519Address.md#constructor)

### Methods

- [toAddress](addressTypes_ed25519Address.Ed25519Address.md#toaddress)
- [verify](addressTypes_ed25519Address.Ed25519Address.md#verify)

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

[IAddress](../interfaces/models_IAddress.IAddress.md).[toAddress](../interfaces/models_IAddress.IAddress.md#toaddress)

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

[IAddress](../interfaces/models_IAddress.IAddress.md).[verify](../interfaces/models_IAddress.IAddress.md#verify)
