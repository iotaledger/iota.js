# Interface: IPowProvider

Perform the POW on a block.

## Table of contents

### Methods

- [pow](IPowProvider.md#pow)

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

The nonce as a string.
