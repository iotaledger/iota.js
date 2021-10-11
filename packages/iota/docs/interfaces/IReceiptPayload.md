# Interface: IReceiptPayload

Receipt payload.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``3``\>

  ↳ **`IReceiptPayload`**

## Table of contents

### Properties

- [migratedAt](IReceiptPayload.md#migratedat)
- [final](IReceiptPayload.md#final)
- [funds](IReceiptPayload.md#funds)
- [transaction](IReceiptPayload.md#transaction)
- [type](IReceiptPayload.md#type)

## Properties

### migratedAt

• **migratedAt**: `number`

The milestone index at which the funds were migrated in the legacy network.

___

### final

• **final**: `boolean`

Whether this Receipt is the final one for a given migrated at index.

___

### funds

• **funds**: [`IMigratedFunds`](IMigratedFunds.md)[]

The index data.

___

### transaction

• **transaction**: [`ITreasuryTransactionPayload`](ITreasuryTransactionPayload.md)

The TreasuryTransaction used to fund the funds.

___

### type

• **type**: ``3``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)
