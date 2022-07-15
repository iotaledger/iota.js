---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: ITransactionEssence

Transaction payload.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``1``\>

  ↳ **`ITransactionEssence`**

## Table of contents

### Properties

- [networkId](ITransactionEssence.md#networkid)
- [inputs](ITransactionEssence.md#inputs)
- [inputsCommitment](ITransactionEssence.md#inputscommitment)
- [outputs](ITransactionEssence.md#outputs)
- [payload](ITransactionEssence.md#payload)
- [type](ITransactionEssence.md#type)

## Properties

### networkId

• **networkId**: `string`

The network id of the block.

___

### inputs

• **inputs**: [`IUTXOInput`](IUTXOInput.md)[]

The inputs of the transaction.

___

### inputsCommitment

• **inputsCommitment**: `string`

The commitment to the referenced inputs.

___

### outputs

• **outputs**: [`OutputTypes`](../api_ref.md#outputtypes)[]

The outputs of the transaction.

___

### payload

• `Optional` **payload**: [`ITaggedDataPayload`](ITaggedDataPayload.md)

Tagged data payload.

___

### type

• **type**: ``1``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)
