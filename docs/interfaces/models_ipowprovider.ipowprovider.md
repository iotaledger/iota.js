[@iota/iota.js](../README.md) / [models/IPowProvider](../modules/models_IPowProvider.md) / IPowProvider

# Interface: IPowProvider

[models/IPowProvider](../modules/models_IPowProvider.md).IPowProvider

Perform the POW on a message.

## Implemented by

- [`LocalPowProvider`](../classes/pow_localPowProvider.LocalPowProvider.md)

## Table of contents

### Methods

- [pow](models_IPowProvider.IPowProvider.md#pow)

## Methods

### pow

▸ **pow**(`message`, `targetScore`): `Promise`<`bigint`\>

Perform pow on the message and return the nonce of at least targetScore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The message to process. |
| `targetScore` | `number` | The target score. |

#### Returns

`Promise`<`bigint`\>

The nonce.
