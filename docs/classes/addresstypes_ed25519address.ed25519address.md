[@iota/iota.js](../README.md) / [addressTypes/ed25519Address](../modules/addresstypes_ed25519address.md) / Ed25519Address

# Class: Ed25519Address

[addressTypes/ed25519Address](../modules/addresstypes_ed25519address.md).Ed25519Address

Class to help with Ed25519 Signature scheme.

## Hierarchy

* **Ed25519Address**

## Implements

* [*IAddress*](../interfaces/models_iaddress.iaddress.md)

## Table of contents

### Constructors

- [constructor](addresstypes_ed25519address.ed25519address.md#constructor)

### Methods

- [toAddress](addresstypes_ed25519address.ed25519address.md#toaddress)
- [verify](addresstypes_ed25519address.ed25519address.md#verify)

## Constructors

### constructor

\+ **new Ed25519Address**(`publicKey`: *Uint8Array*): [*Ed25519Address*](addresstypes_ed25519address.ed25519address.md)

Create a new instance of Ed25519Address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | *Uint8Array* | The public key for the address.    |

**Returns:** [*Ed25519Address*](addresstypes_ed25519address.ed25519address.md)

## Methods

### toAddress

▸ **toAddress**(): *Uint8Array*

Convert the public key to an address.

**Returns:** *Uint8Array*

The address.

Implementation of: [IAddress](../interfaces/models_iaddress.iaddress.md)

___

### verify

▸ **verify**(`address`: *Uint8Array*): *boolean*

Use the public key to validate the address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`address` | *Uint8Array* | The address to verify.   |

**Returns:** *boolean*

True if the data and address is verified.
