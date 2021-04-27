**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/edwards25519/preComputedGroupElement"](../modules/_crypto_edwards25519_precomputedgroupelement_.md) / PreComputedGroupElement

# Class: PreComputedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
PreComputedGroupElement: (y+x,y-x,2dxy)

## Hierarchy

* **PreComputedGroupElement**

## Index

### Constructors

* [constructor](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md#constructor)

### Properties

* [xy2d](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md#xy2d)
* [yMinusX](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md#yminusx)
* [yPlusX](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md#yplusx)

### Methods

* [cMove](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md#cmove)
* [selectPoint](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md#selectpoint)
* [zero](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md#zero)

## Constructors

### constructor

\+ **new PreComputedGroupElement**(`yPlusX?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `yMinusX?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `xy2d?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)): [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md)

Create a new instance of PreComputedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`yPlusX?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | Y + X Element. |
`yMinusX?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | Y - X Element |
`xy2d?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | XY2d Element.  |

**Returns:** [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md)

## Properties

### xy2d

•  **xy2d**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

X Y 2 d Element.

___

### yMinusX

•  **yMinusX**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

Y - X Element

___

### yPlusX

•  **yPlusX**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

Y + X Element.

## Methods

### cMove

▸ **cMove**(`u`: [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md), `b`: number): void

CMove the pre computed element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md) | The u. |
`b` | number | The b.  |

**Returns:** void

___

### selectPoint

▸ **selectPoint**(`pos`: number, `b`: number): void

Select point.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`pos` | number | The position. |
`b` | number | The index.  |

**Returns:** void

___

### zero

▸ **zero**(): void

Set the elements to zero.

**Returns:** void
