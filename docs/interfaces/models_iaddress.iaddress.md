[@iota/iota.js](../README.md) / [models/IAddress](../modules/models_iaddress.md) / IAddress

# Interface: IAddress

Interface defining address.

## Hierarchy

* **IAddress**

## Implemented by

* [*Ed25519Address*](../classes/addresstypes_ed25519address.ed25519address.md)
* [*Ed25519Address*](../classes/index_browser.ed25519address.md)
* [*Ed25519Address*](../classes/index_node.ed25519address.md)

## Index

### Methods

* [toAddress](models_iaddress.iaddress.md#toaddress)
* [verify](models_iaddress.iaddress.md#verify)

## Methods

### toAddress

▸ **toAddress**(): *Uint8Array*

Convert the public key to an address.

**Returns:** *Uint8Array*

The address.

___

### verify

▸ **verify**(`publicKey`: *Uint8Array*, `address`: *Uint8Array*): *boolean*

Use the public key to validate the address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | *Uint8Array* | - |
`address` | *Uint8Array* | The address to verify.   |

**Returns:** *boolean*

True if the data and address is verified.
