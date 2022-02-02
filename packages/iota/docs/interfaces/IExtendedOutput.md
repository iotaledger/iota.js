# Interface: IExtendedOutput

Extended output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``3``\>

  ↳ **`IExtendedOutput`**

## Table of contents

### Properties

- [type](IExtendedOutput.md#type)
- [amount](IExtendedOutput.md#amount)
- [nativeTokens](IExtendedOutput.md#nativetokens)
- [unlockConditions](IExtendedOutput.md#unlockconditions)
- [featureBlocks](IExtendedOutput.md#featureblocks)

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

___

### unlockConditions

• **unlockConditions**: [`UnlockConditionTypes`](../api.md#unlockconditiontypes)[]

The unlock conditions for the output.

___

### featureBlocks

• **featureBlocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Feature blocks contained by the output.
