# Interface: IFoundryOutput

Foundry output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``5``\>

- [`ICommonOutput`](ICommonOutput.md)

  ↳ **`IFoundryOutput`**

## Table of contents

### Properties

- [type](IFoundryOutput.md#type)
- [nativeTokens](IFoundryOutput.md#nativetokens)
- [unlockConditions](IFoundryOutput.md#unlockconditions)
- [featureBlocks](IFoundryOutput.md#featureblocks)
- [amount](IFoundryOutput.md#amount)
- [serialNumber](IFoundryOutput.md#serialnumber)
- [tokenTag](IFoundryOutput.md#tokentag)
- [mintedTokens](IFoundryOutput.md#mintedtokens)
- [meltedTokens](IFoundryOutput.md#meltedtokens)
- [maximumSupply](IFoundryOutput.md#maximumsupply)
- [tokenScheme](IFoundryOutput.md#tokenscheme)
- [immutableFeatureBlocks](IFoundryOutput.md#immutablefeatureblocks)

## Properties

### type

• **type**: ``5``

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

### serialNumber

• **serialNumber**: `number`

The serial number of the foundry with respect to the controlling alias.

___

### tokenTag

• **tokenTag**: `string`

Data that is always the last 12 bytes of ID of the tokens produced by this foundry.

___

### mintedTokens

• **mintedTokens**: `string`

Amount of tokens minted by this foundry.

___

### meltedTokens

• **meltedTokens**: `string`

Amount of tokens melted by this foundry.

___

### maximumSupply

• **maximumSupply**: `string`

Maximum supply of tokens controlled by this foundry.

___

### tokenScheme

• **tokenScheme**: [`ISimpleTokenScheme`](ISimpleTokenScheme.md)

The token scheme for the foundry.

___

### immutableFeatureBlocks

• **immutableFeatureBlocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Immutable blocks contained by the output.
