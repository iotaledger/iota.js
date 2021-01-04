[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / IAddress

# Interface: IAddress

Interface defining address.

## Hierarchy

* **IAddress**

## Index

### Methods

* [toAddress](index_browser.iaddress.md#toaddress)
* [verify](index_browser.iaddress.md#verify)

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
