[@iota/iota.js](../README.md) / [crypto/edwards25519/completedGroupElement](../modules/crypto_edwards25519_completedGroupElement.md) / CompletedGroupElement

# Class: CompletedGroupElement

[crypto/edwards25519/completedGroupElement](../modules/crypto_edwards25519_completedGroupElement.md).CompletedGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
CompletedGroupElement: ((X:Z),(Y:T)) satisfying x=X/Z, y=Y/T.

## Table of contents

### Constructors

- [constructor](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#constructor)

### Properties

- [T](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#t)
- [X](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#x)
- [Y](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#y)
- [Z](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#z)

### Methods

- [add](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#add)
- [mixedAdd](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#mixedadd)
- [mixedSub](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#mixedsub)
- [sub](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#sub)
- [toExtended](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#toextended)
- [toProjective](crypto_edwards25519_completedGroupElement.CompletedGroupElement.md#toprojective)

## Constructors

### constructor

• **new CompletedGroupElement**(`X?`, `Y?`, `Z?`, `T?`)

Create a new instance of CompletedGroupElement.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `X?` | [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md) | The X element. |
| `Y?` | [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md) | The Y Element. |
| `Z?` | [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md) | The Z Element. |
| `T?` | [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md) | The T Element. |

## Properties

### T

• **T**: [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md)

The T Element.

___

### X

• **X**: [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md)

The X element.

___

### Y

• **Y**: [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md)

The Y Element.

___

### Z

• **Z**: [`FieldElement`](crypto_edwards25519_fieldElement.FieldElement.md)

The Z Element.

## Methods

### add

▸ **add**(`p`, `q`): `void`

Group Element add.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`ExtendedGroupElement`](crypto_edwards25519_extendedGroupElement.ExtendedGroupElement.md) | The extended group element. |
| `q` | [`CachedGroupElement`](crypto_edwards25519_cachedGroupElement.CachedGroupElement.md) | The cached group element. |

#### Returns

`void`

___

### mixedAdd

▸ **mixedAdd**(`p`, `q`): `void`

Mixed add.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`ExtendedGroupElement`](crypto_edwards25519_extendedGroupElement.ExtendedGroupElement.md) | The p. |
| `q` | [`PreComputedGroupElement`](crypto_edwards25519_preComputedGroupElement.PreComputedGroupElement.md) | The q. |

#### Returns

`void`

___

### mixedSub

▸ **mixedSub**(`p`, `q`): `void`

Mixed subtract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`ExtendedGroupElement`](crypto_edwards25519_extendedGroupElement.ExtendedGroupElement.md) | The p. |
| `q` | [`PreComputedGroupElement`](crypto_edwards25519_preComputedGroupElement.PreComputedGroupElement.md) | The q. |

#### Returns

`void`

___

### sub

▸ **sub**(`p`, `q`): `void`

Group Element substract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`ExtendedGroupElement`](crypto_edwards25519_extendedGroupElement.ExtendedGroupElement.md) | The p. |
| `q` | [`CachedGroupElement`](crypto_edwards25519_cachedGroupElement.CachedGroupElement.md) | The q. |

#### Returns

`void`

___

### toExtended

▸ **toExtended**(`e`): `void`

Convert to extended element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | [`ExtendedGroupElement`](crypto_edwards25519_extendedGroupElement.ExtendedGroupElement.md) | The extended element to fill. |

#### Returns

`void`

___

### toProjective

▸ **toProjective**(`p`): `void`

Convert to projective element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`ProjectiveGroupElement`](crypto_edwards25519_projectiveGroupElement.ProjectiveGroupElement.md) | The projective element to fill. |

#### Returns

`void`
