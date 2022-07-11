---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IPowProvider

Perform the POW on a block.

## Implemented by

- [`LocalPowProvider`](../classes/LocalPowProvider.md)

## Table of contents

### Methods

- [pow](IPowProvider.md#pow)

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

The nonce as a string.
