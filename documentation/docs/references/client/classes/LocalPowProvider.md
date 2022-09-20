---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: LocalPowProvider

Local POW Provider.
WARNING - This is really slow.

## Implements

- [`IPowProvider`](../interfaces/IPowProvider.md)

## Table of contents

### Methods

- [pow](LocalPowProvider.md#pow)

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

[IPowProvider](../interfaces/IPowProvider.md).[pow](../interfaces/IPowProvider.md#pow)
