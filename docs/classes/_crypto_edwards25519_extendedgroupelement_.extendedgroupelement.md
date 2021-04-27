**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/edwards25519/extendedGroupElement"](../modules/_crypto_edwards25519_extendedgroupelement_.md) / ExtendedGroupElement

# Class: ExtendedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
ExtendedGroupElement: (X:Y:Z:T) satisfying x=X/Z, y=Y/Z, XY=ZT

## Hierarchy

* **ExtendedGroupElement**

## Index

### Constructors

* [constructor](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#constructor)

### Properties

* [T](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#t)
* [X](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#x)
* [Y](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#y)
* [Z](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#z)

### Methods

* [cofactorEqual](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#cofactorequal)
* [double](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#double)
* [fromBytes](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#frombytes)
* [scalarMultBase](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#scalarmultbase)
* [toBytes](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#tobytes)
* [toCached](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#tocached)
* [toProjective](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#toprojective)
* [zero](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md#zero)

## Constructors

### constructor

\+ **new ExtendedGroupElement**(`X?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `Y?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `Z?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `T?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)): [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md)

Create a new instance of ExtendedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The X element. |
`Y?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The Y Element. |
`Z?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The Z Element. |
`T?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The T Element.  |

**Returns:** [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md)

## Properties

### T

•  **T**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

The T Element.

___

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

### cofactorEqual

▸ **cofactorEqual**(`q`: [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md)): boolean

CofactorEqual checks whether p, q are equal up to cofactor multiplication
(ie. if their difference is of small order).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md) | The extended group element. |

**Returns:** boolean

True if they are equal.

___

### double

▸ **double**(`cachedGroupElement`: [CompletedGroupElement](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md)): void

Double the element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cachedGroupElement` | [CompletedGroupElement](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md) | The element to populate.  |

**Returns:** void

___

### fromBytes

▸ **fromBytes**(`bytes`: Uint8Array): boolean

Populate the element from bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Uint8Array | The butes to populate from. |

**Returns:** boolean

False is non-zero check.

___

### scalarMultBase

▸ **scalarMultBase**(`a`: Uint8Array): void

GeScalarMultBase computes h = a*B, where
 a = a[0]+256*a[1]+...+256^31 a[31]
 B is the Ed25519 base point (x,4/5) with x positive.
Preconditions:
 a[31] <= 127

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | Uint8Array | The a.  |

**Returns:** void

___

### toBytes

▸ **toBytes**(`bytes`: Uint8Array): void

Convert the element to bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Uint8Array | The array to store the bytes in.  |

**Returns:** void

___

### toCached

▸ **toCached**(`cacheGroupElement`: [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md)): void

Convert to a cached group element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cacheGroupElement` | [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md) | The element to populate.  |

**Returns:** void

___

### toProjective

▸ **toProjective**(`projectiveGroupElement`: [ProjectiveGroupElement](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md)): void

Convert to a projective group element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`projectiveGroupElement` | [ProjectiveGroupElement](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md) | The element to populate.  |

**Returns:** void

___

### zero

▸ **zero**(): void

Zero the elements.

**Returns:** void
