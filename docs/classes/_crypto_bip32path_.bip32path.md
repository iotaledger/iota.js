**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/bip32Path"](../modules/_crypto_bip32path_.md) / Bip32Path

# Class: Bip32Path

Class to help with bip32 paths.

## Hierarchy

* **Bip32Path**

## Index

### Constructors

* [constructor](_crypto_bip32path_.bip32path.md#constructor)

### Methods

* [numberSegments](_crypto_bip32path_.bip32path.md#numbersegments)
* [pop](_crypto_bip32path_.bip32path.md#pop)
* [push](_crypto_bip32path_.bip32path.md#push)
* [pushHardened](_crypto_bip32path_.bip32path.md#pushhardened)
* [toString](_crypto_bip32path_.bip32path.md#tostring)
* [fromPath](_crypto_bip32path_.bip32path.md#frompath)

## Constructors

### constructor

\+ **new Bip32Path**(`initialPath?`: undefined \| string): [Bip32Path](_crypto_bip32path_.bip32path.md)

Create a new instance of Bip32Path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`initialPath?` | undefined \| string | Initial path to create.  |

**Returns:** [Bip32Path](_crypto_bip32path_.bip32path.md)

## Methods

### numberSegments

▸ **numberSegments**(): number[]

Get the segments.

**Returns:** number[]

The segments as numbers.

___

### pop

▸ **pop**(): void

Pop an index from the path.

**Returns:** void

___

### push

▸ **push**(`index`: number): void

Push a new index on to the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index to add to the path.  |

**Returns:** void

___

### pushHardened

▸ **pushHardened**(`index`: number): void

Push a new hardened index on to the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index to add to the path.  |

**Returns:** void

___

### toString

▸ **toString**(): string

Converts the path to a string.

**Returns:** string

The path as a string.

___

### fromPath

▸ `Static`**fromPath**(`bip32Path`: [Bip32Path](_crypto_bip32path_.bip32path.md)): [Bip32Path](_crypto_bip32path_.bip32path.md)

Construct a new path by cloning an existing one.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bip32Path` | [Bip32Path](_crypto_bip32path_.bip32path.md) | The path to clone. |

**Returns:** [Bip32Path](_crypto_bip32path_.bip32path.md)

A new instance of Bip32Path.
