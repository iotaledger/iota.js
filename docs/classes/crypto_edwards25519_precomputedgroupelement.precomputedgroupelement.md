[@iota/iota.js](../README.md) / [crypto/edwards25519/preComputedGroupElement](../modules/crypto_edwards25519_precomputedgroupelement.md) / PreComputedGroupElement

# Class: PreComputedGroupElement

[crypto/edwards25519/preComputedGroupElement](../modules/crypto_edwards25519_precomputedgroupelement.md).PreComputedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
PreComputedGroupElement: (y+x,y-x,2dxy)

## Table of contents

### Constructors

- [constructor](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md#constructor)

### Properties

- [xy2d](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md#xy2d)
- [yMinusX](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md#yminusx)
- [yPlusX](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md#yplusx)

### Methods

- [cMove](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md#cmove)
- [selectPoint](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md#selectpoint)
- [zero](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md#zero)

## Constructors

### constructor

\+ **new PreComputedGroupElement**(`yPlusX?`: [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md), `yMinusX?`: [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md), `xy2d?`: [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md)): [*PreComputedGroupElement*](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md)

Create a new instance of PreComputedGroupElement.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`yPlusX?` | [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md) | Y + X Element.   |
`yMinusX?` | [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md) | Y - X Element   |
`xy2d?` | [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md) | XY2d Element.    |

**Returns:** [*PreComputedGroupElement*](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md)

## Properties

### xy2d

• **xy2d**: [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md)

X Y 2 d Element.

___

### yMinusX

• **yMinusX**: [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md)

Y - X Element

___

### yPlusX

• **yPlusX**: [*FieldElement*](crypto_edwards25519_fieldelement.fieldelement.md)

Y + X Element.

## Methods

### cMove

▸ **cMove**(`u`: [*PreComputedGroupElement*](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md), `b`: *number*): *void*

CMove the pre computed element.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`u` | [*PreComputedGroupElement*](crypto_edwards25519_precomputedgroupelement.precomputedgroupelement.md) | The u.   |
`b` | *number* | The b.    |

**Returns:** *void*

___

### selectPoint

▸ **selectPoint**(`pos`: *number*, `b`: *number*): *void*

Select point.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pos` | *number* | The position.   |
`b` | *number* | The index.    |

**Returns:** *void*

___

### zero

▸ **zero**(): *void*

Set the elements to zero.

**Returns:** *void*
