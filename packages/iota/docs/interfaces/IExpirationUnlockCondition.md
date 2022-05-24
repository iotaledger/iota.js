# Interface: IExpirationUnlockCondition

Expiration Unlock Condition.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``3``\>

  ↳ **`IExpirationUnlockCondition`**

## Table of contents

### Properties

- [type](IExpirationUnlockCondition.md#type)
- [returnAddress](IExpirationUnlockCondition.md#returnaddress)
- [milestoneIndex](IExpirationUnlockCondition.md#milestoneindex)
- [unixTime](IExpirationUnlockCondition.md#unixtime)

## Properties

### type

• **type**: ``3``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### returnAddress

• **returnAddress**: [`AddressTypes`](../api.md#addresstypes)

The return address.

___

### milestoneIndex

• `Optional` **milestoneIndex**: `number`

Before this milestone index the condition is allowed to unlock the output,
after that only the address defined in return address.

___

### unixTime

• `Optional` **unixTime**: `number`

Before this unix time, the condition is allowed to unlock the output,
after that only the address defined in return address.
