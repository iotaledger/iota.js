**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ProjectiveGroupElement

# Class: ProjectiveGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
ProjectiveGroupElement: (X:Y:Z) satisfying x=X/Z, y=Y/Z

## Hierarchy

* **ProjectiveGroupElement**

## Index

### Constructors

* [constructor](projectivegroupelement.md#constructor)

### Properties

* [X](projectivegroupelement.md#x)
* [Y](projectivegroupelement.md#y)
* [Z](projectivegroupelement.md#z)

### Methods

* [doubleScalarMultVartime](projectivegroupelement.md#doublescalarmultvartime)

## Constructors

### constructor

\+ **new ProjectiveGroupElement**(`X?`: [FieldElement](fieldelement.md), `Y?`: [FieldElement](fieldelement.md), `Z?`: [FieldElement](fieldelement.md)): [ProjectiveGroupElement](projectivegroupelement.md)

Create a new instance of CompletedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [FieldElement](fieldelement.md) | The X element. |
`Y?` | [FieldElement](fieldelement.md) | The Y Element. |
`Z?` | [FieldElement](fieldelement.md) | The Z Element.  |

**Returns:** [ProjectiveGroupElement](projectivegroupelement.md)

## Properties

### X

•  **X**: [FieldElement](fieldelement.md)

The X element.

___

### Y

•  **Y**: [FieldElement](fieldelement.md)

The Y Element.

___

### Z

•  **Z**: [FieldElement](fieldelement.md)

The Z Element.

## Methods

### doubleScalarMultVartime

▸ **doubleScalarMultVartime**(`a`: Uint8Array, `A`: [ExtendedGroupElement](extendedgroupelement.md), `b`: Uint8Array): void

GeDoubleScalarMultVartime sets r = a*A + b*B
where a = a[0]+256*a[1]+...+256^31 a[31].
and b = b[0]+256*b[1]+...+256^31 b[31].
B is the Ed25519 base point (x,4/5) with x positive.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | Uint8Array | The a |
`A` | [ExtendedGroupElement](extendedgroupelement.md) | The A |
`b` | Uint8Array | The b  |

**Returns:** void
