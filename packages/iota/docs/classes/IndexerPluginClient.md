# Class: IndexerPluginClient

Indexer plugin which provides access to the indexer plugin API.

## Table of contents

### Constructors

- [constructor](IndexerPluginClient.md#constructor)

### Methods

- [outputs](IndexerPluginClient.md#outputs)
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
| `options.basePluginPath?` | `string` | Base path for the plugin routes, relative to client basePluginPath, defaults to indexer/v1/ . |

## Methods

### outputs

▸ **outputs**(`filterOptions?`): `Promise`<[`IOutputsResponse`](../interfaces/IOutputsResponse.md)\>

Find outputs using filter options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterOptions?` | `Object` | The options for filtering. |
| `filterOptions.addressBech32?` | `string` | Filter outputs that are unlockable by the address. |
| `filterOptions.hasStorageReturnCondition?` | `boolean` | Filter for outputs having a storage return unlock condition. |
| `filterOptions.storageReturnAddressBech32?` | `string` | Filter for outputs with a certain storage return address. |
| `filterOptions.hasExpirationCondition?` | `boolean` | Filter for outputs having an expiration unlock condition. |
| `filterOptions.expirationReturnAddressBech32?` | `string` | Filter for outputs with a certain expiration return address. |
| `filterOptions.expiresBefore?` | `number` | Filter for outputs that expire before a certain unix time. |
| `filterOptions.expiresAfter?` | `number` | Filter for outputs that expire after a certain unix time. |
| `filterOptions.hasTimelockCondition?` | `boolean` | Filter for outputs having a timelock unlock condition. |
| `filterOptions.timelockedBefore?` | `number` | Filter for outputs that are timelocked before a certain unix time. |
| `filterOptions.timelockedAfter?` | `number` | Filter for outputs that are timelocked after a certain unix time. |
| `filterOptions.hasNativeTokens?` | `boolean` | Filter for outputs having native tokens. |
| `filterOptions.minNativeTokenCount?` | `number` | Filter for outputs that have at least an amount of native tokens. |
| `filterOptions.maxNativeTokenCount?` | `number` | Filter for outputs that have at the most an amount of native tokens. |
| `filterOptions.senderBech32?` | `string` | Filter outputs by the sender. |
| `filterOptions.tagHex?` | `string` | Filter outputs by the tag in hex format. |
| `filterOptions.createdBefore?` | `number` | Filter for outputs that were created before the given time. |
| `filterOptions.createdAfter?` | `number` | Filter for outputs that were created after the given time. |
| `filterOptions.pageSize?` | `number` | Set the page size for the response. |
| `filterOptions.cursor?` | `string` | Request the items from the given cursor, returned from a previous request. |

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
| `filterOptions.stateControllerBech32?` | `string` | Filter for a certain state controller address. |
| `filterOptions.governorBech32?` | `string` | Filter for a certain governance controller address. |
| `filterOptions.issuerBech32?` | `string` | Filter for a certain issuer. |
| `filterOptions.senderBech32?` | `string` | Filter outputs by the sender. |
| `filterOptions.hasNativeTokens?` | `boolean` | Filter for outputs having native tokens. |
| `filterOptions.minNativeTokenCount?` | `number` | Filter for outputs that have at least an amount of native tokens. |
| `filterOptions.maxNativeTokenCount?` | `number` | Filter for outputs that have at the most an amount of native tokens. |
| `filterOptions.createdBefore?` | `number` | Filter for outputs that were created before the given time. |
| `filterOptions.createdAfter?` | `number` | Filter for outputs that were created after the given time. |
| `filterOptions.pageSize?` | `number` | Set the page size for the response. |
| `filterOptions.cursor?` | `string` | Request the items from the given cursor, returned from a previous request. |

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
| `filterOptions.addressBech32?` | `string` | Filter outputs that are unlockable by the address. |
| `filterOptions.hasStorageReturnCondition?` | `boolean` | Filter for outputs having a storage return unlock condition. |
| `filterOptions.storageReturnAddressBech32?` | `string` | Filter for outputs with a certain storage return address. |
| `filterOptions.hasExpirationCondition?` | `boolean` | Filter for outputs having an expiration unlock condition. |
| `filterOptions.expirationReturnAddressBech32?` | `string` | Filter for outputs with a certain expiration return address. |
| `filterOptions.expiresBefore?` | `number` | Filter for outputs that expire before a certain unix time. |
| `filterOptions.expiresAfter?` | `number` | Filter for outputs that expire after a certain unix time. |
| `filterOptions.hasTimelockCondition?` | `boolean` | Filter for outputs having a timelock unlock condition. |
| `filterOptions.timelockedBefore?` | `number` | Filter for outputs that are timelocked before a certain unix time. |
| `filterOptions.timelockedAfter?` | `number` | Filter for outputs that are timelocked after a certain unix time. |
| `filterOptions.hasNativeTokens?` | `boolean` | Filter for outputs having native tokens. |
| `filterOptions.minNativeTokenCount?` | `number` | Filter for outputs that have at least an amount of native tokens. |
| `filterOptions.maxNativeTokenCount?` | `number` | Filter for outputs that have at the most an amount of native tokens. |
| `filterOptions.issuerBech32?` | `string` | Filter outputs by the issuer. |
| `filterOptions.senderBech32?` | `string` | Filter outputs by the sender. |
| `filterOptions.tagHex?` | `string` | Filter outputs by the tag in hex format. |
| `filterOptions.createdBefore?` | `number` | Filter for outputs that were created before the given time. |
| `filterOptions.createdAfter?` | `number` | Filter for outputs that were created after the given time. |
| `filterOptions.pageSize?` | `number` | Set the page size for the response. |
| `filterOptions.cursor?` | `string` | Request the items from the given cursor, returned from a previous request. |

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
| `filterOptions.aliasAddressBech32?` | `string` | Filter outputs that are unlockable by the address. |
| `filterOptions.hasNativeTokens?` | `boolean` | Filter for outputs having native tokens. |
| `filterOptions.minNativeTokenCount?` | `number` | Filter for outputs that have at least an amount of native tokens. |
| `filterOptions.maxNativeTokenCount?` | `number` | Filter for outputs that have at the most an amount of native tokens. |
| `filterOptions.createdBefore?` | `number` | Filter for outputs that were created before the given time. |
| `filterOptions.createdAfter?` | `number` | Filter for outputs that were created after the given time. |
| `filterOptions.pageSize?` | `number` | Set the page size for the response. |
| `filterOptions.cursor?` | `string` | Request the items from the given cursor, returned from a previous request. |

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
