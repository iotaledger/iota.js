# Interface: INftOutput

NFT output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``6``\>

- [`ICommonOutput`](ICommonOutput.md)

  ↳ **`INftOutput`**

## Table of contents

### Properties

- [type](INftOutput.md#type)
- [nativeTokens](INftOutput.md#nativetokens)
- [unlockConditions](INftOutput.md#unlockconditions)
- [featureBlocks](INftOutput.md#featureblocks)
- [amount](INftOutput.md#amount)
- [nftId](INftOutput.md#nftid)
- [immutableFeatureBlocks](INftOutput.md#immutablefeatureblocks)

## Properties

### type

• **type**: ``6``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### nativeTokens

• **nativeTokens**: [`INativeToken`](INativeToken.md)[]

The native tokens held by the output.

#### Inherited from

[ICommonOutput](ICommonOutput.md).[nativeTokens](ICommonOutput.md#nativetokens)

___

### unlockConditions

• **unlockConditions**: [`UnlockConditionTypes`](../api.md#unlockconditiontypes)[]

The unlock conditions for the output.

#### Inherited from

[ICommonOutput](ICommonOutput.md).[unlockConditions](ICommonOutput.md#unlockconditions)

___

### featureBlocks

• **featureBlocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Feature blocks contained by the output.

#### Inherited from

[ICommonOutput](ICommonOutput.md).[featureBlocks](ICommonOutput.md#featureblocks)

___

### amount

• **amount**: `string`

The amount of IOTA tokens held by the output.

___

### nftId

• **nftId**: `string`

Unique identifier of the NFT, which is the BLAKE2b-160 hash of the Output ID that created it.

___

### immutableFeatureBlocks

• **immutableFeatureBlocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Immutable blocks contained by the output.
