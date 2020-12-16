**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / Ed25519Address

# Class: Ed25519Address

Class to help with Ed25519 Signature scheme.

## Hierarchy

* **Ed25519Address**

## Implements

* [IAddress](../interfaces/iaddress.md)

## Index

### Constructors

* [constructor](ed25519address.md#constructor)

### Methods

* [toAddress](ed25519address.md#toaddress)
* [verify](ed25519address.md#verify)

## Constructors

### constructor

\+ **new Ed25519Address**(`publicKey`: Uint8Array): [Ed25519Address](ed25519address.md)

Create a new instance of Ed25519Address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Uint8Array | The public key for the address.  |

**Returns:** [Ed25519Address](ed25519address.md)

## Methods

### toAddress

▸ **toAddress**(): Uint8Array

*Implementation of [IAddress](../interfaces/iaddress.md)*

Convert the public key to an address.

**Returns:** Uint8Array

The address.

___

### verify

▸ **verify**(`address`: Uint8Array): boolean

Use the public key to validate the address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`address` | Uint8Array | The address to verify. |

**Returns:** boolean

True if the data and address is verified.
