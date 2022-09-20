# Interface: ITransactionPayload

Transaction payload.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``0``\>

  ↳ **`ITransactionPayload`**

## Table of contents

### Properties

- [essence](ITransactionPayload.md#essence)
- [unlockBlocks](ITransactionPayload.md#unlockblocks)
- [type](ITransactionPayload.md#type)

## Properties

### essence

• **essence**: [`ITransactionEssence`](ITransactionEssence.md)

The index name.

___

### unlockBlocks

• **unlockBlocks**: ([`IReferenceUnlockBlock`](IReferenceUnlockBlock.md) \| [`ISignatureUnlockBlock`](ISignatureUnlockBlock.md))[]

The unlock blocks.

___

### type

• **type**: ``0``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)
