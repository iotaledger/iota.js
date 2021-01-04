[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / Bip32Path

# Class: Bip32Path

Class to help with bip32 paths.

## Hierarchy

* **Bip32Path**

## Index

### Constructors

* [constructor](index_browser.bip32path.md#constructor)

### Methods

* [numberSegments](index_browser.bip32path.md#numbersegments)
* [pop](index_browser.bip32path.md#pop)
* [push](index_browser.bip32path.md#push)
* [pushHardened](index_browser.bip32path.md#pushhardened)
* [toString](index_browser.bip32path.md#tostring)
* [fromPath](index_browser.bip32path.md#frompath)

## Constructors

### constructor

\+ **new Bip32Path**(`initialPath?`: *string*): [*Bip32Path*](crypto_bip32path.bip32path.md)

Create a new instance of Bip32Path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`initialPath?` | *string* | Initial path to create.    |

**Returns:** [*Bip32Path*](crypto_bip32path.bip32path.md)

## Methods

### numberSegments

▸ **numberSegments**(): *number*[]

Get the segments.

**Returns:** *number*[]

The segments as numbers.

___

### pop

▸ **pop**(): *void*

Pop an index from the path.

**Returns:** *void*

___

### push

▸ **push**(`index`: *number*): *void*

Push a new index on to the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *number* | The index to add to the path.    |

**Returns:** *void*

___

### pushHardened

▸ **pushHardened**(`index`: *number*): *void*

Push a new hardened index on to the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | *number* | The index to add to the path.    |

**Returns:** *void*

___

### toString

▸ **toString**(): *string*

Converts the path to a string.

**Returns:** *string*

The path as a string.

___

### fromPath

▸ `Static`**fromPath**(`bip32Path`: [*Bip32Path*](crypto_bip32path.bip32path.md)): [*Bip32Path*](crypto_bip32path.bip32path.md)

Construct a new path by cloning an existing one.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bip32Path` | [*Bip32Path*](crypto_bip32path.bip32path.md) | The path to clone.   |

**Returns:** [*Bip32Path*](crypto_bip32path.bip32path.md)

A new instance of Bip32Path.
