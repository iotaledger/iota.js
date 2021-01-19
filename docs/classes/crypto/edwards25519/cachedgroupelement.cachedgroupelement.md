[@iota/iota.js](../../../README.md) / [crypto/edwards25519/cachedGroupElement](../../../modules/crypto_edwards25519_cachedgroupelement.md) / CachedGroupElement

# Class: CachedGroupElement

[crypto/edwards25519/cachedGroupElement](../../../modules/crypto_edwards25519_cachedgroupelement.md).CachedGroupElement

Cached group element.

## Hierarchy

* **CachedGroupElement**

## Table of contents

### Constructors

- [constructor](cachedgroupelement.cachedgroupelement.md#constructor)

### Properties

- [T2d](cachedgroupelement.cachedgroupelement.md#t2d)
- [Z](cachedgroupelement.cachedgroupelement.md#z)
- [yMinusX](cachedgroupelement.cachedgroupelement.md#yminusx)
- [yPlusX](cachedgroupelement.cachedgroupelement.md#yplusx)

## Constructors

### constructor

\+ **new CachedGroupElement**(`yPlusX?`: [*FieldElement*](fieldelement.fieldelement.md), `yMinusX?`: [*FieldElement*](fieldelement.fieldelement.md), `Z?`: [*FieldElement*](fieldelement.fieldelement.md), `T2d?`: [*FieldElement*](fieldelement.fieldelement.md)): [*CachedGroupElement*](cachedgroupelement.cachedgroupelement.md)

Create a new instance of CachedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`yPlusX?` | [*FieldElement*](fieldelement.fieldelement.md) | Y + X Element.   |
`yMinusX?` | [*FieldElement*](fieldelement.fieldelement.md) | Y - X Element   |
`Z?` | [*FieldElement*](fieldelement.fieldelement.md) | Z Element.   |
`T2d?` | [*FieldElement*](fieldelement.fieldelement.md) | T2d Element.    |

**Returns:** [*CachedGroupElement*](cachedgroupelement.cachedgroupelement.md)

## Properties

### T2d

• **T2d**: [*FieldElement*](fieldelement.fieldelement.md)

T2d Element.

___

### Z

• **Z**: [*FieldElement*](fieldelement.fieldelement.md)

Z Element.

___

### yMinusX

• **yMinusX**: [*FieldElement*](fieldelement.fieldelement.md)

Y - X Element

___

### yPlusX

• **yPlusX**: [*FieldElement*](fieldelement.fieldelement.md)

Y + X Element.
