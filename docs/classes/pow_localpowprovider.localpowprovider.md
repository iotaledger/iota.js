[@iota/iota.js](../README.md) / [pow/localPowProvider](../modules/pow_localPowProvider.md) / LocalPowProvider

# Class: LocalPowProvider

[pow/localPowProvider](../modules/pow_localPowProvider.md).LocalPowProvider

Local POW Provider.
WARNING - This is really slow.

## Implements

- [`IPowProvider`](../interfaces/models_IPowProvider.IPowProvider.md)

## Table of contents

### Constructors

- [constructor](pow_localPowProvider.LocalPowProvider.md#constructor)

### Methods

- [pow](pow_localPowProvider.LocalPowProvider.md#pow)

## Constructors

### constructor

• **new LocalPowProvider**()

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

#### Implementation of

[IPowProvider](../interfaces/models_IPowProvider.IPowProvider.md).[pow](../interfaces/models_IPowProvider.IPowProvider.md#pow)
