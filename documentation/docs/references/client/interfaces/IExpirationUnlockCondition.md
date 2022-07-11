---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IExpirationUnlockCondition

Expiration Unlock Condition.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``3``\>

  ↳ **`IExpirationUnlockCondition`**

## Table of contents

### Properties

- [type](IExpirationUnlockCondition.md#type)
- [returnAddress](IExpirationUnlockCondition.md#returnaddress)
- [unixTime](IExpirationUnlockCondition.md#unixtime)

## Properties

### type

• **type**: ``3``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### returnAddress

• **returnAddress**: [`AddressTypes`](../api_ref.md#addresstypes)

The return address.

___

### unixTime

• **unixTime**: `number`

Before this unix time, the condition is allowed to unlock the output,
after that only the address defined in return address.
