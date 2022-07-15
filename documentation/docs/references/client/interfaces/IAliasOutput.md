---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IAliasOutput

Alias output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``4``\>

- [`ICommonOutput`](ICommonOutput.md)

  ↳ **`IAliasOutput`**

## Table of contents

### Properties

- [type](IAliasOutput.md#type)
- [amount](IAliasOutput.md#amount)
- [aliasId](IAliasOutput.md#aliasid)
- [stateIndex](IAliasOutput.md#stateindex)
- [stateMetadata](IAliasOutput.md#statemetadata)
- [foundryCounter](IAliasOutput.md#foundrycounter)
- [immutableFeatures](IAliasOutput.md#immutablefeatures)
- [nativeTokens](IAliasOutput.md#nativetokens)
- [unlockConditions](IAliasOutput.md#unlockconditions)
- [features](IAliasOutput.md#features)

## Properties

### type

• **type**: ``4``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### amount

• **amount**: `string`

The amount of IOTA tokens held by the output.

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

• `Optional` **stateMetadata**: `string`

Metadata that can only be changed by the state controller.

___

### foundryCounter

• **foundryCounter**: `number`

A counter that denotes the number of foundries created by this alias account.

___

### immutableFeatures

• `Optional` **immutableFeatures**: [`FeatureTypes`](../api_ref.md#featuretypes)[]

Immutable features contained by the output.

___

### nativeTokens

• `Optional` **nativeTokens**: [`INativeToken`](INativeToken.md)[]

The native tokens held by the output.

#### Inherited from

[ICommonOutput](ICommonOutput.md).[nativeTokens](ICommonOutput.md#nativetokens)

___

### unlockConditions

• **unlockConditions**: [`UnlockConditionTypes`](../api_ref.md#unlockconditiontypes)[]

The unlock conditions for the output.

#### Inherited from

[ICommonOutput](ICommonOutput.md).[unlockConditions](ICommonOutput.md#unlockconditions)

___

### features

• `Optional` **features**: [`FeatureTypes`](../api_ref.md#featuretypes)[]

Features contained by the output.

#### Inherited from

[ICommonOutput](ICommonOutput.md).[features](ICommonOutput.md#features)
