[@iota/iota.js](../../../README.md) / [crypto/edwards25519/completedGroupElement](../../../modules/crypto_edwards25519_completedgroupelement.md) / CompletedGroupElement

# Class: CompletedGroupElement

[crypto/edwards25519/completedGroupElement](../../../modules/crypto_edwards25519_completedgroupelement.md).CompletedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
CompletedGroupElement: ((X:Z),(Y:T)) satisfying x=X/Z, y=Y/T

## Hierarchy

* **CompletedGroupElement**

## Table of contents

### Constructors

- [constructor](completedgroupelement.completedgroupelement.md#constructor)

### Properties

- [T](completedgroupelement.completedgroupelement.md#t)
- [X](completedgroupelement.completedgroupelement.md#x)
- [Y](completedgroupelement.completedgroupelement.md#y)
- [Z](completedgroupelement.completedgroupelement.md#z)

### Methods

- [add](completedgroupelement.completedgroupelement.md#add)
- [mixedAdd](completedgroupelement.completedgroupelement.md#mixedadd)
- [mixedSub](completedgroupelement.completedgroupelement.md#mixedsub)
- [sub](completedgroupelement.completedgroupelement.md#sub)
- [toExtended](completedgroupelement.completedgroupelement.md#toextended)
- [toProjective](completedgroupelement.completedgroupelement.md#toprojective)

## Constructors

### constructor

\+ **new CompletedGroupElement**(`X?`: [*FieldElement*](fieldelement.fieldelement.md), `Y?`: [*FieldElement*](fieldelement.fieldelement.md), `Z?`: [*FieldElement*](fieldelement.fieldelement.md), `T?`: [*FieldElement*](fieldelement.fieldelement.md)): [*CompletedGroupElement*](completedgroupelement.completedgroupelement.md)

Create a new instance of CompletedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [*FieldElement*](fieldelement.fieldelement.md) | The X element.   |
`Y?` | [*FieldElement*](fieldelement.fieldelement.md) | The Y Element.   |
`Z?` | [*FieldElement*](fieldelement.fieldelement.md) | The Z Element.   |
`T?` | [*FieldElement*](fieldelement.fieldelement.md) | The T Element.    |

**Returns:** [*CompletedGroupElement*](completedgroupelement.completedgroupelement.md)

## Properties

### T

• **T**: [*FieldElement*](fieldelement.fieldelement.md)

The T Element.

___

### X

• **X**: [*FieldElement*](fieldelement.fieldelement.md)

The X element.

___

### Y

• **Y**: [*FieldElement*](fieldelement.fieldelement.md)

The Y Element.

___

### Z

• **Z**: [*FieldElement*](fieldelement.fieldelement.md)

The Z Element.

## Methods

### add

▸ **add**(`p`: [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md), `q`: [*CachedGroupElement*](cachedgroupelement.cachedgroupelement.md)): *void*

Group Element add

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md) | The extended group element.   |
`q` | [*CachedGroupElement*](cachedgroupelement.cachedgroupelement.md) | The cached group element.    |

**Returns:** *void*

___

### mixedAdd

▸ **mixedAdd**(`p`: [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md), `q`: [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md)): *void*

Mixed add.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md) | The p.   |
`q` | [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md) | The q.    |

**Returns:** *void*

___

### mixedSub

▸ **mixedSub**(`p`: [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md), `q`: [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md)): *void*

Mixed subtract.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md) | The p.   |
`q` | [*PreComputedGroupElement*](precomputedgroupelement.precomputedgroupelement.md) | The q.    |

**Returns:** *void*

___

### sub

▸ **sub**(`p`: [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md), `q`: [*CachedGroupElement*](cachedgroupelement.cachedgroupelement.md)): *void*

Group Element substract.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md) | The p.   |
`q` | [*CachedGroupElement*](cachedgroupelement.cachedgroupelement.md) | The q.    |

**Returns:** *void*

___

### toExtended

▸ **toExtended**(`e`: [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md)): *void*

Convert to extended element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`e` | [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md) | The extended element to fill.    |

**Returns:** *void*

___

### toProjective

▸ **toProjective**(`p`: [*ProjectiveGroupElement*](projectivegroupelement.projectivegroupelement.md)): *void*

Convert to projective element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [*ProjectiveGroupElement*](projectivegroupelement.projectivegroupelement.md) | The projective element to fill.    |

**Returns:** *void*
