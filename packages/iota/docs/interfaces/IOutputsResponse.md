# Interface: IOutputsResponse

Details of an outputs response from the indexer plugin.

## Table of contents

### Properties

- [ledgerIndex](IOutputsResponse.md#ledgerindex)
- [limit](IOutputsResponse.md#limit)
- [offset](IOutputsResponse.md#offset)
- [count](IOutputsResponse.md#count)
- [data](IOutputsResponse.md#data)

## Properties

### ledgerIndex

• **ledgerIndex**: `number`

The ledger index at which these outputs where available at.

___

### limit

• **limit**: `number`

The maximum count of results that are returned by the node.

___

### offset

• **offset**: `string`

The offset to use for getting the next results.

___

### count

• **count**: `number`

The actual count of results that are returned.

___

### data

• **data**: `string`[]

The output IDs (transaction hash + output index) of the outputs on this address.
