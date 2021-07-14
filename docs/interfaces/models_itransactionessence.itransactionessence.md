[@iota/iota.js](../README.md) / [models/ITransactionEssence](../modules/models_ITransactionEssence.md) / ITransactionEssence

# Interface: ITransactionEssence

[models/ITransactionEssence](../modules/models_ITransactionEssence.md).ITransactionEssence

Transaction payload.

## Hierarchy

- [`ITypeBase`](models_ITypeBase.ITypeBase.md)<``0``\>

  ↳ **`ITransactionEssence`**

## Table of contents

### Properties

- [inputs](models_ITransactionEssence.ITransactionEssence.md#inputs)
- [outputs](models_ITransactionEssence.ITransactionEssence.md#outputs)
- [payload](models_ITransactionEssence.ITransactionEssence.md#payload)
- [type](models_ITransactionEssence.ITransactionEssence.md#type)

## Properties

### inputs

• **inputs**: [`IUTXOInput`](models_IUTXOInput.IUTXOInput.md)[]

The inputs of the transaction.

___

### outputs

• **outputs**: ([`ISigLockedSingleOutput`](models_ISigLockedSingleOutput.ISigLockedSingleOutput.md) \| [`ISigLockedDustAllowanceOutput`](models_ISigLockedDustAllowanceOutput.ISigLockedDustAllowanceOutput.md))[]

The outputs of the transaction.

___

### payload

• `Optional` **payload**: [`IIndexationPayload`](models_IIndexationPayload.IIndexationPayload.md)

Indexation payload.

___

### type

• **type**: ``0``

The type of the object.

#### Inherited from

[ITypeBase](models_ITypeBase.ITypeBase.md).[type](models_ITypeBase.ITypeBase.md#type)
