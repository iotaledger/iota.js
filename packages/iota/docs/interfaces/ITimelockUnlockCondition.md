# Interface: ITimelockUnlockCondition

Timelock Unlock Condition.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``2``\>

  ↳ **`ITimelockUnlockCondition`**

## Table of contents

### Properties

- [type](ITimelockUnlockCondition.md#type)
- [milestoneIndex](ITimelockUnlockCondition.md#milestoneindex)
- [unixTime](ITimelockUnlockCondition.md#unixtime)

## Properties

### type

• **type**: ``2``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### milestoneIndex

• `Optional` **milestoneIndex**: `number`

The milestone index starting from which the output can be consumed.

___

### unixTime

• `Optional` **unixTime**: `number`

Unix time (seconds since Unix epoch) starting from which the output can be consumed.
