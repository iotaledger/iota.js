**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / Bip32Path

# Class: Bip32Path

Class to help with bip32 paths.

## Hierarchy

* **Bip32Path**

## Index

### Constructors

* [constructor](bip32path.md#constructor)

### Methods

* [numberSegments](bip32path.md#numbersegments)
* [pop](bip32path.md#pop)
* [push](bip32path.md#push)
* [pushHardened](bip32path.md#pushhardened)
* [toString](bip32path.md#tostring)

## Constructors

### constructor

\+ **new Bip32Path**(`initialPath?`: undefined \| string): [Bip32Path](bip32path.md)

Create a new instance of Bip32Path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`initialPath?` | undefined \| string | Initial path to create.  |

**Returns:** [Bip32Path](bip32path.md)

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
