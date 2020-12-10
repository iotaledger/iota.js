**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / PreComputedGroupElement

# Class: PreComputedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
PreComputedGroupElement: (y+x,y-x,2dxy)

## Hierarchy

* **PreComputedGroupElement**

## Index

### Constructors

* [constructor](precomputedgroupelement.md#constructor)

### Properties

* [xy2d](precomputedgroupelement.md#xy2d)
* [yMinusX](precomputedgroupelement.md#yminusx)
* [yPlusX](precomputedgroupelement.md#yplusx)

### Methods

* [cMove](precomputedgroupelement.md#cmove)
* [selectPoint](precomputedgroupelement.md#selectpoint)
* [zero](precomputedgroupelement.md#zero)

## Constructors

### constructor

\+ **new PreComputedGroupElement**(`yPlusX?`: [FieldElement](fieldelement.md), `yMinusX?`: [FieldElement](fieldelement.md), `xy2d?`: [FieldElement](fieldelement.md)): [PreComputedGroupElement](precomputedgroupelement.md)

Create a new instance of PreComputedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`yPlusX?` | [FieldElement](fieldelement.md) | Y + X Element. |
`yMinusX?` | [FieldElement](fieldelement.md) | Y - X Element |
`xy2d?` | [FieldElement](fieldelement.md) | XY2d Element.  |

**Returns:** [PreComputedGroupElement](precomputedgroupelement.md)

## Properties

### xy2d

•  **xy2d**: [FieldElement](fieldelement.md)

X Y 2 d Element.

___

### yMinusX

•  **yMinusX**: [FieldElement](fieldelement.md)

Y - X Element

___

### yPlusX

•  **yPlusX**: [FieldElement](fieldelement.md)

Y + X Element.

## Methods

### cMove

▸ **cMove**(`u`: [PreComputedGroupElement](precomputedgroupelement.md), `b`: number): void

CMove the pre computed element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | [PreComputedGroupElement](precomputedgroupelement.md) | The u. |
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
