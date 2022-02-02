# Interface: IAliasOutput

Alias output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``4``\>

  ↳ **`IAliasOutput`**

## Table of contents

### Properties

- [type](IAliasOutput.md#type)
- [amount](IAliasOutput.md#amount)
- [nativeTokens](IAliasOutput.md#nativetokens)
- [aliasId](IAliasOutput.md#aliasid)
- [stateIndex](IAliasOutput.md#stateindex)
- [stateMetadata](IAliasOutput.md#statemetadata)
- [foundryCounter](IAliasOutput.md#foundrycounter)
- [unlockConditions](IAliasOutput.md#unlockconditions)
- [featureBlocks](IAliasOutput.md#featureblocks)

## Properties

### type

• **type**: ``4``

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

### aliasId

• **aliasId**: `string`

Unique identifier of the alias, which is the BLAKE2b-160 hash of the Output ID that created it.

___

### stateIndex

• **stateIndex**: `number`

A counter that must increase by 1 every time the alias is state transitioned.

___

### stateMetadata

• **stateMetadata**: `string`

Metadata that can only be changed by the state controller.

___

### foundryCounter

• **foundryCounter**: `number`

A counter that denotes the number of foundries created by this alias account.

___

### unlockConditions

• **unlockConditions**: [`UnlockConditionTypes`](../api.md#unlockconditiontypes)[]

The unlock conditions for the output.

___

### featureBlocks

• **featureBlocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Feature blocks contained by the output.
