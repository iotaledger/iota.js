**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IAddress"](../modules/_models_iaddress_.md) / IAddress

# Interface: IAddress

Interface defining address.

## Hierarchy

* **IAddress**

## Implemented by

* [Ed25519Address](../classes/_addresstypes_ed25519address_.ed25519address.md)

## Index

### Methods

* [toAddress](_models_iaddress_.iaddress.md#toaddress)
* [verify](_models_iaddress_.iaddress.md#verify)

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
