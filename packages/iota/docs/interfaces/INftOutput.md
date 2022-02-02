# Interface: INftOutput

NFT output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``6``\>

  ↳ **`INftOutput`**

## Table of contents

### Properties

- [type](INftOutput.md#type)
- [amount](INftOutput.md#amount)
- [nativeTokens](INftOutput.md#nativetokens)
- [nftId](INftOutput.md#nftid)
- [immutableData](INftOutput.md#immutabledata)
- [unlockConditions](INftOutput.md#unlockconditions)
- [featureBlocks](INftOutput.md#featureblocks)

## Properties

### type

• **type**: ``6``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

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

### unlockConditions

• **unlockConditions**: [`UnlockConditionTypes`](../api.md#unlockconditiontypes)[]

The unlock conditions for the output.

___

### featureBlocks

• **featureBlocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Feature blocks contained by the output.
