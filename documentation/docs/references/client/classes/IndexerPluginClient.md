---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Class: IndexerPluginClient

Indexer plugin which provides access to the indexer plugin API.

## Table of contents

### Constructors

- [constructor](IndexerPluginClient.md#constructor)

### Methods

- [basicOutputs](IndexerPluginClient.md#basicOutputs)
- [aliases](IndexerPluginClient.md#aliases)
- [alias](IndexerPluginClient.md#alias)
- [nfts](IndexerPluginClient.md#nfts)
- [nft](IndexerPluginClient.md#nft)
- [foundries](IndexerPluginClient.md#foundries)
- [foundry](IndexerPluginClient.md#foundry)

## Constructors

### constructor

• **new IndexerPluginClient**(`client`, `options?`)

Create a new instance of IndexerPluginClient.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](../interfaces/IClient.md) | The client for communications. |
| `options?` | `Object` | Options for the plugin. |

## Methods

### basicOutputs

▸ **outputs**(`filterOptions?`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Find outputs using filter options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterOptions?` | `Object` | The options for filtering. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs with the requested filters.

___

### aliases

▸ **aliases**(`filterOptions?`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Find alises using filter options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterOptions?` | `Object` | The options for filtering. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs with the requested filters.

___

### alias

▸ **alias**(`aliasId`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Get the output for an alias.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aliasId` | `string` | The alias to get the output for. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The output.

___

### nfts

▸ **nfts**(`filterOptions?`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Find nfts using filter options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterOptions?` | `Object` | The options for filtering. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs with the requested filters.

___

### nft

▸ **nft**(`nftId`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Get the output for a nft.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftId` | `string` | The nft to get the output for. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The output.

___

### foundries

▸ **foundries**(`filterOptions?`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Find foundries using filter options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterOptions?` | `Object` | The options for filtering. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The outputs with the requested filters.

___

### foundry

▸ **foundry**(`foundryId`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Get the output for a foundry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `foundryId` | `string` | The foundry to get the output for. |

#### Returns

`Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

The output.
