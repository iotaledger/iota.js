---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
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
- [features](IFoundryOutput.md#features)
- [amount](IFoundryOutput.md#amount)
- [serialNumber](IFoundryOutput.md#serialnumber)
- [tokenScheme](IFoundryOutput.md#tokenscheme)
- [immutableFeatures](IFoundryOutput.md#immutablefeatures)

## Properties

### type

• **type**: ``5``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

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

___

### amount

• **amount**: `string`

The amount of IOTA tokens held by the output.

___

### serialNumber

• **serialNumber**: `number`

The serial number of the foundry with respect to the controlling alias.

___

### tokenScheme

• **tokenScheme**: [`ISimpleTokenScheme`](ISimpleTokenScheme.md)

The token scheme for the foundry.

___

### immutableFeatures

• `Optional` **immutableFeatures**: [`FeatureTypes`](../api_ref.md#featuretypes)[]

Immutable features contained by the output.
