**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / IAddress

# Interface: IAddress

Interface defining address.

## Hierarchy

* **IAddress**

## Implemented by

* [Ed25519Address](../classes/ed25519address.md)

## Index

### Methods

* [toAddress](iaddress.md#toaddress)
* [verify](iaddress.md#verify)

## Methods

### toAddress

▸ **toAddress**(): Uint8Array

Convert the public key to an address.

**Returns:** Uint8Array

The address.

___

### verify

▸ **verify**(`publicKey`: Uint8Array, `address`: Uint8Array): boolean

Use the public key to validate the address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Uint8Array | - |
`address` | Uint8Array | The address to verify. |

**Returns:** boolean

True if the data and address is verified.
