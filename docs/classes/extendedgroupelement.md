**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ExtendedGroupElement

# Class: ExtendedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
ExtendedGroupElement: (X:Y:Z:T) satisfying x=X/Z, y=Y/Z, XY=ZT

## Hierarchy

* **ExtendedGroupElement**

## Index

### Constructors

* [constructor](extendedgroupelement.md#constructor)

### Properties

* [T](extendedgroupelement.md#t)
* [X](extendedgroupelement.md#x)
* [Y](extendedgroupelement.md#y)
* [Z](extendedgroupelement.md#z)

### Methods

* [cofactorEqual](extendedgroupelement.md#cofactorequal)
* [double](extendedgroupelement.md#double)
* [fromBytes](extendedgroupelement.md#frombytes)
* [scalarMultBase](extendedgroupelement.md#scalarmultbase)
* [toBytes](extendedgroupelement.md#tobytes)
* [toCached](extendedgroupelement.md#tocached)
* [toProjective](extendedgroupelement.md#toprojective)
* [zero](extendedgroupelement.md#zero)

## Constructors

### constructor

\+ **new ExtendedGroupElement**(`X?`: [FieldElement](fieldelement.md), `Y?`: [FieldElement](fieldelement.md), `Z?`: [FieldElement](fieldelement.md), `T?`: [FieldElement](fieldelement.md)): [ExtendedGroupElement](extendedgroupelement.md)

Create a new instance of ExtendedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [FieldElement](fieldelement.md) | The X element. |
`Y?` | [FieldElement](fieldelement.md) | The Y Element. |
`Z?` | [FieldElement](fieldelement.md) | The Z Element. |
`T?` | [FieldElement](fieldelement.md) | The T Element.  |

**Returns:** [ExtendedGroupElement](extendedgroupelement.md)

## Properties

### T

•  **T**: [FieldElement](fieldelement.md)

The T Element.

___

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

### cofactorEqual

▸ **cofactorEqual**(`q`: [ExtendedGroupElement](extendedgroupelement.md)): boolean

CofactorEqual checks whether p, q are equal up to cofactor multiplication
(ie. if their difference is of small order).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [ExtendedGroupElement](extendedgroupelement.md) | The extended group element. |

**Returns:** boolean

True if they are equal.

___

### double

▸ **double**(`cachedGroupElement`: [CompletedGroupElement](completedgroupelement.md)): void

Double the element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cachedGroupElement` | [CompletedGroupElement](completedgroupelement.md) | The element to populate.  |

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

▸ **toCached**(`cacheGroupElement`: [CachedGroupElement](cachedgroupelement.md)): void

Convert to a cached group element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cacheGroupElement` | [CachedGroupElement](cachedgroupelement.md) | The element to populate.  |

**Returns:** void

___

### toProjective

▸ **toProjective**(`projectiveGroupElement`: [ProjectiveGroupElement](projectivegroupelement.md)): void

Convert to a projective group element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`projectiveGroupElement` | [ProjectiveGroupElement](projectivegroupelement.md) | The element to populate.  |

**Returns:** void

___

### zero

▸ **zero**(): void

Zero the elements.

**Returns:** void
