**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / Curl

# Class: Curl

Class to implement Curl sponge.

## Hierarchy

* **Curl**

## Index

### Constructors

* [constructor](curl.md#constructor)

### Properties

* [HASH\_LENGTH](curl.md#hash_length)
* [STATE\_LENGTH](curl.md#state_length)

### Methods

* [absorb](curl.md#absorb)
* [rate](curl.md#rate)
* [reset](curl.md#reset)
* [squeeze](curl.md#squeeze)

## Constructors

### constructor

\+ **new Curl**(`rounds?`: number): [Curl](curl.md)

Create a new instance of Curl.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`rounds` | number | Curl.NUMBER\_OF\_ROUNDS | The number of rounds to perform.  |

**Returns:** [Curl](curl.md)

## Properties

### HASH\_LENGTH

▪ `Static` `Readonly` **HASH\_LENGTH**: number = 243

The Hash Length

___

### STATE\_LENGTH

▪ `Static` `Readonly` **STATE\_LENGTH**: number = 3 * Curl.HASH\_LENGTH

The State Length.

## Methods

### absorb

▸ **absorb**(`trits`: Int8Array, `offset`: number, `length`: number): void

Absorbs trits given an offset and length

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`trits` | Int8Array | The trits to absorb. |
`offset` | number | The offset to start abororbing from the array. |
`length` | number | The length of trits to absorb.  |

**Returns:** void

___

### rate

▸ **rate**(`len?`: number): Int8Array

Get the state of the sponge.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`len` | number | Curl.HASH\_LENGTH | The length of the state to get. |

**Returns:** Int8Array

The state.

___

### reset

▸ **reset**(): void

Resets the state

**Returns:** void

___

### squeeze

▸ **squeeze**(`trits`: Int8Array, `offset`: number, `length`: number): void

Squeezes trits given an offset and length

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`trits` | Int8Array | The trits to squeeze. |
`offset` | number | The offset to start squeezing from the array. |
`length` | number | The length of trits to squeeze.  |

**Returns:** void
