**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/edwards25519/projectiveGroupElement"](../modules/_crypto_edwards25519_projectivegroupelement_.md) / ProjectiveGroupElement

# Class: ProjectiveGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
ProjectiveGroupElement: (X:Y:Z) satisfying x=X/Z, y=Y/Z

## Hierarchy

* **ProjectiveGroupElement**

## Index

### Constructors

* [constructor](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md#constructor)

### Properties

* [X](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md#x)
* [Y](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md#y)
* [Z](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md#z)

### Methods

* [doubleScalarMultVartime](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md#doublescalarmultvartime)

## Constructors

### constructor

\+ **new ProjectiveGroupElement**(`X?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `Y?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `Z?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)): [ProjectiveGroupElement](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md)

Create a new instance of CompletedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The X element. |
`Y?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The Y Element. |
`Z?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The Z Element.  |

**Returns:** [ProjectiveGroupElement](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md)

## Properties

### X

•  **X**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

The X element.

___

### Y

•  **Y**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

The Y Element.

___

### Z

•  **Z**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

The Z Element.

## Methods

### doubleScalarMultVartime

▸ **doubleScalarMultVartime**(`a`: Uint8Array, `A`: [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md), `b`: Uint8Array): void

GeDoubleScalarMultVartime sets r = a*A + b*B
where a = a[0]+256*a[1]+...+256^31 a[31].
and b = b[0]+256*b[1]+...+256^31 b[31].
B is the Ed25519 base point (x,4/5) with x positive.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | Uint8Array | The a |
`A` | [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md) | The A |
`b` | Uint8Array | The b  |

**Returns:** void
