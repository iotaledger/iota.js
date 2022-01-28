# Interface: ITransactionEssence

Transaction payload.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``0``\>

  ↳ **`ITransactionEssence`**

## Table of contents

### Properties

- [inputs](ITransactionEssence.md#inputs)
- [outputs](ITransactionEssence.md#outputs)
- [payload](ITransactionEssence.md#payload)
- [type](ITransactionEssence.md#type)

## Properties

### inputs

• **inputs**: [`IUTXOInput`](IUTXOInput.md)[]

The inputs of the transaction.

___

### outputs

• **outputs**: [`OutputTypes`](../api.md#outputtypes)[]

The outputs of the transaction.

___

### payload

• `Optional` **payload**: [`ITaggedDataPayload`](ITaggedDataPayload.md)

Tagged data payload.

___

### type

• **type**: ``0``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)
