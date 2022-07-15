---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: ICommonOutput

Common output properties.

## Hierarchy

- **`ICommonOutput`**

  ↳ [`IAliasOutput`](IAliasOutput.md)

  ↳ [`IBasicOutput`](IBasicOutput.md)

  ↳ [`IFoundryOutput`](IFoundryOutput.md)

  ↳ [`INftOutput`](INftOutput.md)

## Table of contents

### Properties

- [nativeTokens](ICommonOutput.md#nativetokens)
- [unlockConditions](ICommonOutput.md#unlockconditions)
- [features](ICommonOutput.md#features)

## Properties

### nativeTokens

• `Optional` **nativeTokens**: [`INativeToken`](INativeToken.md)[]

The native tokens held by the output.

___

### unlockConditions

• **unlockConditions**: [`UnlockConditionTypes`](../api_ref.md#unlockconditiontypes)[]

The unlock conditions for the output.

___

### features

• `Optional` **features**: [`FeatureTypes`](../api_ref.md#featuretypes)[]

Features contained by the output.
