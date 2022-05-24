# Interface: IStorageDepositReturnUnlockCondition

Storage Desposit Return Unlock Condition.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``1``\>

  ↳ **`IStorageDepositReturnUnlockCondition`**

## Table of contents

### Properties

- [type](IStorageDepositReturnUnlockCondition.md#type)
- [returnAddress](IStorageDepositReturnUnlockCondition.md#returnaddress)
- [returnAmount](IStorageDepositReturnUnlockCondition.md#returnamount)

## Properties

### type

• **type**: ``1``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### returnAddress

• **returnAddress**: [`AddressTypes`](../api.md#addresstypes)

The return address.

___

### returnAmount

• **returnAmount**: `string`

Amount of IOTA tokens the consuming transaction should deposit to the address defined in return address.
