# Interface: IExtendedOutput

Extended output.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``3``\>

  ↳ **`IExtendedOutput`**

## Table of contents

### Properties

- [type](IExtendedOutput.md#type)
- [address](IExtendedOutput.md#address)
- [amount](IExtendedOutput.md#amount)
- [nativeTokens](IExtendedOutput.md#nativetokens)
- [blocks](IExtendedOutput.md#blocks)

## Properties

### type

• **type**: ``3``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### address

• **address**: [`AddressTypes`](../api.md#addresstypes)

The address.

___

### amount

• **amount**: `number`

The amount of IOTA coins to held by the output.

___

### nativeTokens

• **nativeTokens**: [`INativeToken`](INativeToken.md)[]

The native tokens held by the output.

___

### blocks

• **blocks**: [`FeatureBlockTypes`](../api.md#featureblocktypes)[]

Blocks contained by the output.
