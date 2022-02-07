# Interface: IBasicOutput

Basic output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``3``\>

- [`ICommonOutput`](ICommonOutput.md)

  ↳ **`IBasicOutput`**

## Table of contents

### Properties

- [type](IBasicOutput.md#type)
- [amount](IBasicOutput.md#amount)
- [nativeTokens](IBasicOutput.md#nativetokens)
- [unlockConditions](IBasicOutput.md#unlockconditions)
- [featureBlocks](IBasicOutput.md#featureblocks)

## Properties

### type

• **type**: ``3``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### amount

• **amount**: `number`

The amount of IOTA coins to held by the output.

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
