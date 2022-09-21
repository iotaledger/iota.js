# Class: BrowserPowProvider

Browser POW Provider.

## Implements

- `IPowProvider`

## Table of contents

### Constructors

- [constructor](BrowserPowProvider.md#constructor)

### Methods

- [pow](BrowserPowProvider.md#pow)
- [createWorker](BrowserPowProvider.md#createworker)

## Constructors

### constructor

• **new BrowserPowProvider**(`numCpus?`)

Create a new instance of BrowserPowProvider.

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

___

### createWorker

▸ **createWorker**(): `Worker`

Create new instance of the Worker.

#### Returns

`Worker`

The Worker.
