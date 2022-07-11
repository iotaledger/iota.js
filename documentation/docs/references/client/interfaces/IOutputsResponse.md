---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IOutputsResponse

Details of an outputs response from the indexer plugin.

## Table of contents

### Properties

- [ledgerIndex](IOutputsResponse.md#ledgerindex)
- [pageSize](IOutputsResponse.md#pagesize)
- [cursor](IOutputsResponse.md#cursor)
- [items](IOutputsResponse.md#items)

## Properties

### ledgerIndex

• **ledgerIndex**: `number`

The ledger index at which these outputs where available at.

___

### pageSize

• **pageSize**: `string`

The maximum count of results that are returned by the node.

___

### cursor

• `Optional` **cursor**: `string`

The cursor to use for getting the next results.

___

### items

• **items**: `string`[]

The output IDs (transaction hash + output index) of the outputs on this address.
