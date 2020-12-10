**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / CompletedGroupElement

# Class: CompletedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
CompletedGroupElement: ((X:Z),(Y:T)) satisfying x=X/Z, y=Y/T

## Hierarchy

* **CompletedGroupElement**

## Index

### Constructors

* [constructor](completedgroupelement.md#constructor)

### Properties

* [T](completedgroupelement.md#t)
* [X](completedgroupelement.md#x)
* [Y](completedgroupelement.md#y)
* [Z](completedgroupelement.md#z)

### Methods

* [add](completedgroupelement.md#add)
* [mixedAdd](completedgroupelement.md#mixedadd)
* [mixedSub](completedgroupelement.md#mixedsub)
* [sub](completedgroupelement.md#sub)
* [toExtended](completedgroupelement.md#toextended)
* [toProjective](completedgroupelement.md#toprojective)

## Constructors

### constructor

\+ **new CompletedGroupElement**(`X?`: [FieldElement](fieldelement.md), `Y?`: [FieldElement](fieldelement.md), `Z?`: [FieldElement](fieldelement.md), `T?`: [FieldElement](fieldelement.md)): [CompletedGroupElement](completedgroupelement.md)

Create a new instance of CompletedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [FieldElement](fieldelement.md) | The X element. |
`Y?` | [FieldElement](fieldelement.md) | The Y Element. |
`Z?` | [FieldElement](fieldelement.md) | The Z Element. |
`T?` | [FieldElement](fieldelement.md) | The T Element.  |

**Returns:** [CompletedGroupElement](completedgroupelement.md)

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

### add

▸ **add**(`p`: [ExtendedGroupElement](extendedgroupelement.md), `q`: [CachedGroupElement](cachedgroupelement.md)): void

Group Element add

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](extendedgroupelement.md) | The extended group element. |
`q` | [CachedGroupElement](cachedgroupelement.md) | The cached group element.  |

**Returns:** void

___

### mixedAdd

▸ **mixedAdd**(`p`: [ExtendedGroupElement](extendedgroupelement.md), `q`: [PreComputedGroupElement](precomputedgroupelement.md)): void

Mixed add.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](extendedgroupelement.md) | The p. |
`q` | [PreComputedGroupElement](precomputedgroupelement.md) | The q.  |

**Returns:** void

___

### mixedSub

▸ **mixedSub**(`p`: [ExtendedGroupElement](extendedgroupelement.md), `q`: [PreComputedGroupElement](precomputedgroupelement.md)): void

Mixed subtract.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](extendedgroupelement.md) | The p. |
`q` | [PreComputedGroupElement](precomputedgroupelement.md) | The q.  |

**Returns:** void

___

### sub

▸ **sub**(`p`: [ExtendedGroupElement](extendedgroupelement.md), `q`: [CachedGroupElement](cachedgroupelement.md)): void

Group Element substract.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](extendedgroupelement.md) | The p. |
`q` | [CachedGroupElement](cachedgroupelement.md) | The q.  |

**Returns:** void

___

### toExtended

▸ **toExtended**(`e`: [ExtendedGroupElement](extendedgroupelement.md)): void

Convert to extended element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`e` | [ExtendedGroupElement](extendedgroupelement.md) | The extended element to fill.  |

**Returns:** void

___

### toProjective

▸ **toProjective**(`p`: [ProjectiveGroupElement](projectivegroupelement.md)): void

Convert to projective element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ProjectiveGroupElement](projectivegroupelement.md) | The projective element to fill.  |

**Returns:** void
