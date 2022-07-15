---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: ITransactionPayload

Transaction payload.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``6``\>

  ↳ **`ITransactionPayload`**

## Table of contents

### Properties

- [type](ITransactionPayload.md#type)
- [essence](ITransactionPayload.md#essence)
- [unlocks](ITransactionPayload.md#unlocks)

## Properties

### type

• **type**: ``6``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### essence

• **essence**: [`ITransactionEssence`](ITransactionEssence.md)

The index name.

___

### unlocks

• **unlocks**: [`UnlockTypes`](../api_ref.md#unlocktypes)[]

The unlocks.
