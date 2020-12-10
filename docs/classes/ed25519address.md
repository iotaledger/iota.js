**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / Ed25519Address

# Class: Ed25519Address

Class to help with Ed25519 Signature scheme.

## Hierarchy

* **Ed25519Address**

## Implements

* [IAddress](../interfaces/iaddress.md)

## Index

### Methods

* [publicKeyToAddress](ed25519address.md#publickeytoaddress)
* [verifyAddress](ed25519address.md#verifyaddress)

## Methods

### publicKeyToAddress

▸ **publicKeyToAddress**(`publicKey`: Uint8Array): Uint8Array

*Implementation of [IAddress](../interfaces/iaddress.md)*

Convert the public key to an address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Uint8Array | The public key to convert. |

**Returns:** Uint8Array

The address.

___

### verifyAddress

▸ **verifyAddress**(`publicKey`: Uint8Array, `address`: Uint8Array): boolean

*Implementation of [IAddress](../interfaces/iaddress.md)*

Use the public key to validate the address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Uint8Array | The public key to verify with. |
`address` | Uint8Array | The address to verify. |

**Returns:** boolean

True if the data and address is verified.
