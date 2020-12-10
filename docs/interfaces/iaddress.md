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

* [publicKeyToAddress](iaddress.md#publickeytoaddress)
* [verifyAddress](iaddress.md#verifyaddress)

## Methods

### publicKeyToAddress

▸ **publicKeyToAddress**(`publicKey`: Uint8Array): Uint8Array

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

Use the public key to validate the address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Uint8Array | The public key to verify with. |
`address` | Uint8Array | The address to verify. |

**Returns:** boolean

True if the data and address is verified.
