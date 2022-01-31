# Interface: IFoundryOutput

Foundry output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``5``\>

  ↳ **`IFoundryOutput`**

## Table of contents

### Properties

- [type](IFoundryOutput.md#type)
- [amount](IFoundryOutput.md#amount)
- [nativeTokens](IFoundryOutput.md#nativetokens)
- [serialNumber](IFoundryOutput.md#serialnumber)
- [tokenTag](IFoundryOutput.md#tokentag)
- [circulatingSupply](IFoundryOutput.md#circulatingsupply)
- [maximumSupply](IFoundryOutput.md#maximumsupply)
- [tokenScheme](IFoundryOutput.md#tokenscheme)
- [unlockConditions](IFoundryOutput.md#unlockconditions)
- [blocks](IFoundryOutput.md#blocks)

## Properties

### type

• **type**: ``5``

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

### serialNumber

• **serialNumber**: `number`

The serial number of the foundry with respect to the controlling alias.

___

### tokenTag

• **tokenTag**: `string`

Data that is always the last 12 bytes of ID of the tokens produced by this foundry.

___

### circulatingSupply

• **circulatingSupply**: `string`

Circulating supply of tokens controlled by this foundry.

___

### maximumSupply

• **maximumSupply**: `string`

Maximum supply of tokens controlled by this foundry.

___

### tokenScheme

• **tokenScheme**: [`ISimpleTokenScheme`](ISimpleTokenScheme.md)

The token scheme for the foundry.

___

### unlockConditions

• **unlockConditions**: [`UnlockConditionTypes`](../api.md#unlockconditiontypes)[]

The unlock conditions for the output.

___

### blocks

• **blocks**: [`IMetadataFeatureBlock`](IMetadataFeatureBlock.md)[]

Blocks contained by the output.
