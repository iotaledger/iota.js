[@iota/iota.js](../README.md) / highLevel/getUnspentAddress

# Module: highLevel/getUnspentAddress

## Table of contents

### Functions

- [getUnspentAddress](highLevel_getUnspentAddress.md#getunspentaddress)

## Functions

### getUnspentAddress

▸ **getUnspentAddress**(`client`, `seed`, `accountIndex`, `addressOptions?`): `Promise`<{} \| `undefined`\>

Get the first unspent address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`IClient`](../interfaces/models_IClient.IClient.md) \| `string` | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](../interfaces/models_ISeed.ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{} \| `undefined`\>

The first unspent address.
