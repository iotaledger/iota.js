# Class: LocalPowProvider

Local PoW Provider.

## Implements

- [`IPowProvider`](../interfaces/IPowProvider.md)

## Table of contents

### Constructors

- [constructor](LocalPowProvider.md#constructor)

### Methods

- [pow](LocalPowProvider.md#pow)

## Constructors

### constructor

• **new LocalPowProvider**(`numCpus?`)

Create a new instance of LocalPowProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numCpus?` | `number` | The number of cpus, defaults to max CPUs. |

## Methods

### pow

▸ **pow**(`block`, `targetScore`): `Promise`<`string`\>

Perform pow on the block and return the nonce of at least targetScore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `Uint8Array` | The block to process. |
| `targetScore` | `number` | The target score. |

#### Returns

`Promise`<`string`\>

The nonce.

#### Implementation of

IPowProvider.pow
