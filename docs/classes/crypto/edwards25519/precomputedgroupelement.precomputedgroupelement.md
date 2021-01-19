[@iota/iota.js](../../../README.md) / [crypto/edwards25519/preComputedGroupElement](../../../modules/crypto_edwards25519_precomputedgroupelement.md) / PreComputedGroupElement

# Class: PreComputedGroupElement

[crypto/edwards25519/preComputedGroupElement](../../../modules/crypto_edwards25519_precomputedgroupelement.md).PreComputedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
PreComputedGroupElement: (y+x,y-x,2dxy)

## Hierarchy

* **PreComputedGroupElement**

## Table of contents

### Constructors

- [constructor](precomputedgroupelement.precomputedgroupelement.md#constructor)

### Properties

- [xy2d](precomputedgroupelement.precomputedgroupelement.md#xy2d)
- [yMinusX](precomputedgroupelement.precomputedgroupelement.md#yminusx)
- [yPlusX](precomputedgroupelement.precomputedgroupelement.md#yplusx)

### Methods

- [cMove](precomputedgroupelement.precomputedgroupelement.md#cmove)
- [selectPoint](precomputedgroupelement.precomputedgroupelement.md#selectpoint)
- [zero](precomputedgroupelement.precomputedgroupelement.md#zero)

## Constructors

### constructor

\+ **new PreComputedGroupElement**(`yPlusX?`: [*FieldElement*](fieldelement.fieldelement.md), `yMinusX?`: [*FieldElement*](fieldelement.fieldelement.md), `xy2d?`: [*FieldElement*](fieldelement.fieldelement.md)): [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md)

Create a new instance of PreComputedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`yPlusX?` | [*FieldElement*](fieldelement.fieldelement.md) | Y + X Element.   |
`yMinusX?` | [*FieldElement*](fieldelement.fieldelement.md) | Y - X Element   |
`xy2d?` | [*FieldElement*](fieldelement.fieldelement.md) | XY2d Element.    |

**Returns:** [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md)

## Properties

### xy2d

• **xy2d**: [*FieldElement*](fieldelement.fieldelement.md)

X Y 2 d Element.

___

### yMinusX

• **yMinusX**: [*FieldElement*](fieldelement.fieldelement.md)

Y - X Element

___

### yPlusX

• **yPlusX**: [*FieldElement*](fieldelement.fieldelement.md)

Y + X Element.

## Methods

### cMove

▸ **cMove**(`u`: [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md), `b`: *number*): *void*

CMove the pre computed element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md) | The u.   |
`b` | *number* | The b.    |

**Returns:** *void*

___

### selectPoint

▸ **selectPoint**(`pos`: *number*, `b`: *number*): *void*

Select point.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`pos` | *number* | The position.   |
`b` | *number* | The index.    |

**Returns:** *void*

___

### zero

▸ **zero**(): *void*

Set the elements to zero.

**Returns:** *void*
