**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/edwards25519/completedGroupElement"](../modules/_crypto_edwards25519_completedgroupelement_.md) / CompletedGroupElement

# Class: CompletedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
CompletedGroupElement: ((X:Z),(Y:T)) satisfying x=X/Z, y=Y/T

## Hierarchy

* **CompletedGroupElement**

## Index

### Constructors

* [constructor](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#constructor)

### Properties

* [T](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#t)
* [X](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#x)
* [Y](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#y)
* [Z](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#z)

### Methods

* [add](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#add)
* [mixedAdd](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#mixedadd)
* [mixedSub](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#mixedsub)
* [sub](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#sub)
* [toExtended](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#toextended)
* [toProjective](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md#toprojective)

## Constructors

### constructor

\+ **new CompletedGroupElement**(`X?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `Y?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `Z?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `T?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)): [CompletedGroupElement](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md)

Create a new instance of CompletedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The X element. |
`Y?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The Y Element. |
`Z?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The Z Element. |
`T?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | The T Element.  |

**Returns:** [CompletedGroupElement](_crypto_edwards25519_completedgroupelement_.completedgroupelement.md)

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

### add

▸ **add**(`p`: [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md), `q`: [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md)): void

Group Element add

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md) | The extended group element. |
`q` | [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md) | The cached group element.  |

**Returns:** void

___

### mixedAdd

▸ **mixedAdd**(`p`: [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md), `q`: [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md)): void

Mixed add.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md) | The p. |
`q` | [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md) | The q.  |

**Returns:** void

___

### mixedSub

▸ **mixedSub**(`p`: [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md), `q`: [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md)): void

Mixed subtract.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md) | The p. |
`q` | [PreComputedGroupElement](_crypto_edwards25519_precomputedgroupelement_.precomputedgroupelement.md) | The q.  |

**Returns:** void

___

### sub

▸ **sub**(`p`: [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md), `q`: [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md)): void

Group Element substract.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md) | The p. |
`q` | [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md) | The q.  |

**Returns:** void

___

### toExtended

▸ **toExtended**(`e`: [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md)): void

Convert to extended element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`e` | [ExtendedGroupElement](_crypto_edwards25519_extendedgroupelement_.extendedgroupelement.md) | The extended element to fill.  |

**Returns:** void

___

### toProjective

▸ **toProjective**(`p`: [ProjectiveGroupElement](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md)): void

Convert to projective element.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [ProjectiveGroupElement](_crypto_edwards25519_projectivegroupelement_.projectivegroupelement.md) | The projective element to fill.  |

**Returns:** void
