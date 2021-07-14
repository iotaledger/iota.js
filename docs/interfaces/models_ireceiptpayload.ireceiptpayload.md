[@iota/iota.js](../README.md) / [models/IReceiptPayload](../modules/models_IReceiptPayload.md) / IReceiptPayload

# Interface: IReceiptPayload

[models/IReceiptPayload](../modules/models_IReceiptPayload.md).IReceiptPayload

Receipt payload.

## Hierarchy

- [`ITypeBase`](models_ITypeBase.ITypeBase.md)<``3``\>

  ↳ **`IReceiptPayload`**

## Table of contents

### Properties

- [final](models_IReceiptPayload.IReceiptPayload.md#final)
- [funds](models_IReceiptPayload.IReceiptPayload.md#funds)
- [migratedAt](models_IReceiptPayload.IReceiptPayload.md#migratedat)
- [transaction](models_IReceiptPayload.IReceiptPayload.md#transaction)
- [type](models_IReceiptPayload.IReceiptPayload.md#type)

## Properties

### final

• **final**: `boolean`

Whether this Receipt is the final one for a given migrated at index.

___

### funds

• **funds**: [`IMigratedFunds`](models_IMigratedFunds.IMigratedFunds.md)[]

The index data.

___

### migratedAt

• **migratedAt**: `number`

The milestone index at which the funds were migrated in the legacy network.

___

### transaction

• **transaction**: [`ITreasuryTransactionPayload`](models_ITreasuryTransactionPayload.ITreasuryTransactionPayload.md)

The TreasuryTransaction used to fund the funds.

___

### type

• **type**: ``3``

The type of the object.

#### Inherited from

[ITypeBase](models_ITypeBase.ITypeBase.md).[type](models_ITypeBase.ITypeBase.md#type)
