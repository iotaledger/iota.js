# Interface: IExpirationUnixFeatureBlock

Expiration Unix feature block.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``6``\>

  ↳ **`IExpirationUnixFeatureBlock`**

## Table of contents

### Properties

- [type](IExpirationUnixFeatureBlock.md#type)
- [unixTime](IExpirationUnixFeatureBlock.md#unixtime)

## Properties

### type

• **type**: ``6``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### unixTime

• **unixTime**: `number`

Before this unix time, Address is allowed to unlock the output,
after that only the address defined in Sender Block.
