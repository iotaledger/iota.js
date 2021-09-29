# Class: Curl

Class to implement Curl sponge.

## Table of contents

### Properties

- [HASH\_LENGTH](Curl.md#hash_length)
- [STATE\_LENGTH](Curl.md#state_length)

### Constructors

- [constructor](Curl.md#constructor)

### Methods

- [reset](Curl.md#reset)
- [rate](Curl.md#rate)
- [absorb](Curl.md#absorb)
- [squeeze](Curl.md#squeeze)

## Properties

### HASH\_LENGTH

▪ `Static` `Readonly` **HASH\_LENGTH**: `number` = `243`

The Hash Length.

___

### STATE\_LENGTH

▪ `Static` `Readonly` **STATE\_LENGTH**: `number`

The State Length.

## Constructors

### constructor

• **new Curl**(`rounds?`)

Create a new instance of Curl.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rounds` | `number` | The number of rounds to perform. |

## Methods

### reset

▸ **reset**(): `void`

Resets the state.

#### Returns

`void`

___

### rate

▸ **rate**(`len?`): `Int8Array`

Get the state of the sponge.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `len` | `number` | The length of the state to get. |

#### Returns

`Int8Array`

The state.

___

### absorb

▸ **absorb**(`trits`, `offset`, `length`): `void`

Absorbs trits given an offset and length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trits` | `Int8Array` | The trits to absorb. |
| `offset` | `number` | The offset to start abororbing from the array. |
| `length` | `number` | The length of trits to absorb. |

#### Returns

`void`

___

### squeeze

▸ **squeeze**(`trits`, `offset`, `length`): `void`

Squeezes trits given an offset and length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trits` | `Int8Array` | The trits to squeeze. |
| `offset` | `number` | The offset to start squeezing from the array. |
| `length` | `number` | The length of trits to squeeze. |

#### Returns

`void`
