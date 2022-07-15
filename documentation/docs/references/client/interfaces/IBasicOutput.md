---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
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
- [features](IBasicOutput.md#features)

## Properties

### type

• **type**: ``3``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### amount

• **amount**: `string`

The amount of IOTA coins to held by the output.

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
