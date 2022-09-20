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

• **outputs**: ([`ISigLockedDustAllowanceOutput`](ISigLockedDustAllowanceOutput.md) \| [`ISigLockedSingleOutput`](ISigLockedSingleOutput.md))[]

The outputs of the transaction.

___

### payload

• `Optional` **payload**: [`IIndexationPayload`](IIndexationPayload.md)

Indexation payload.

___

### type

• **type**: ``0``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)
