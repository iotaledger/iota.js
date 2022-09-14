# Class: LocalBrowserPowProvider

Local Browser PoW Provider.

## Implements

- [`IPowProvider`](../interfaces/IPowProvider.md)

## Table of contents

### Constructors

- [constructor](LocalBrowserPowProvider.md#constructor)

### Methods

- [pow](LocalBrowserPowProvider.md#pow)

## Constructors

### constructor

• **new LocalBrowserPowProvider**(`numCpus?`)

Create a new instance of LocalBrowserPowProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numCpus?` | `number` | The number of cpus, defaults to max CPUs. |

## Methods

### pow

▸ **pow**(`block`, `targetScore`, `powInterval?`): `Promise`<`string`\>

Perform pow on the block and return the nonce of at least targetScore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `Uint8Array` | The block to process. |
| `targetScore` | `number` | The target score. |
| `powInterval?` | `number` | The time in seconds that pow should work before aborting. |

#### Returns

`Promise`<`string`\>

The nonce.

#### Implementation of

IPowProvider.pow
