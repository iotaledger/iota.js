# Interface: IAddressOutputsResponse

List of outputs for an address.

## Hierarchy

- [`IOutputsResponse`](IOutputsResponse.md)

  ↳ **`IAddressOutputsResponse`**

## Table of contents

### Properties

- [addressType](IAddressOutputsResponse.md#addresstype)
- [address](IAddressOutputsResponse.md#address)
- [maxResults](IAddressOutputsResponse.md#maxresults)
- [count](IAddressOutputsResponse.md#count)
- [outputIds](IAddressOutputsResponse.md#outputids)
- [ledgerIndex](IAddressOutputsResponse.md#ledgerindex)

## Properties

### addressType

• **addressType**: `number`

The type for the address.

___

### address

• **address**: `string`

The address that the outputs are for.

___

### maxResults

• **maxResults**: `number`

The max number of results returned.

#### Inherited from

[IOutputsResponse](IOutputsResponse.md).[maxResults](IOutputsResponse.md#maxresults)

___

### count

• **count**: `number`

The number of items returned.

#### Inherited from

[IOutputsResponse](IOutputsResponse.md).[count](IOutputsResponse.md#count)

___

### outputIds

• **outputIds**: `string`[]

The ids of the outputs.

#### Inherited from

[IOutputsResponse](IOutputsResponse.md).[outputIds](IOutputsResponse.md#outputids)

___

### ledgerIndex

• **ledgerIndex**: `number`

The ledger index at which these outputs where available at.

#### Inherited from

[IOutputsResponse](IOutputsResponse.md).[ledgerIndex](IOutputsResponse.md#ledgerindex)
