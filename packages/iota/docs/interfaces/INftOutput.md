# Interface: INftOutput

NFT output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``6``\>

  ↳ **`INftOutput`**

## Table of contents

### Properties

- [type](INftOutput.md#type)
- [address](INftOutput.md#address)
- [amount](INftOutput.md#amount)
- [nativeTokens](INftOutput.md#nativetokens)
- [nftId](INftOutput.md#nftid)
- [immutableData](INftOutput.md#immutabledata)
- [blocks](INftOutput.md#blocks)

## Properties

### type

• **type**: ``6``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### address

• **address**: [`AddressTypes`](../api.md#addresstypes)

The address associated with the output.

___

### amount

• **amount**: `number`

The amount of IOTA tokens held by the output.

___

### nativeTokens

• **nativeTokens**: [`INativeToken`](INativeToken.md)[]

The native tokens held by the output.

___

### nftId

• **nftId**: `string`

Unique identifier of the NFT, which is the BLAKE2b-160 hash of the Output ID that created it.

___

### immutableData

• **immutableData**: `string`

Binary metadata attached immutably to the NFT.

___

### blocks

• **blocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Blocks contained by the output.
