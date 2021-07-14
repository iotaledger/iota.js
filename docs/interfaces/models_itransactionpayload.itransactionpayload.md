[@iota/iota.js](../README.md) / [models/ITransactionPayload](../modules/models_ITransactionPayload.md) / ITransactionPayload

# Interface: ITransactionPayload

[models/ITransactionPayload](../modules/models_ITransactionPayload.md).ITransactionPayload

Transaction payload.

## Hierarchy

- [`ITypeBase`](models_ITypeBase.ITypeBase.md)<``0``\>

  ↳ **`ITransactionPayload`**

## Table of contents

### Properties

- [essence](models_ITransactionPayload.ITransactionPayload.md#essence)
- [type](models_ITransactionPayload.ITransactionPayload.md#type)
- [unlockBlocks](models_ITransactionPayload.ITransactionPayload.md#unlockblocks)

## Properties

### essence

• **essence**: [`ITransactionEssence`](models_ITransactionEssence.ITransactionEssence.md)

The index name.

___

### type

• **type**: ``0``

The type of the object.

#### Inherited from

[ITypeBase](models_ITypeBase.ITypeBase.md).[type](models_ITypeBase.ITypeBase.md#type)

___

### unlockBlocks

• **unlockBlocks**: ([`ISignatureUnlockBlock`](models_ISignatureUnlockBlock.ISignatureUnlockBlock.md) \| [`IReferenceUnlockBlock`](models_IReferenceUnlockBlock.IReferenceUnlockBlock.md))[]

The unlock blocks.
