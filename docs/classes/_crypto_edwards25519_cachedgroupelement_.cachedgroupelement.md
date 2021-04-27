**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/edwards25519/cachedGroupElement"](../modules/_crypto_edwards25519_cachedgroupelement_.md) / CachedGroupElement

# Class: CachedGroupElement

Cached group element.

## Hierarchy

* **CachedGroupElement**

## Index

### Constructors

* [constructor](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md#constructor)

### Properties

* [T2d](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md#t2d)
* [Z](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md#z)
* [yMinusX](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md#yminusx)
* [yPlusX](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md#yplusx)

## Constructors

### constructor

\+ **new CachedGroupElement**(`yPlusX?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `yMinusX?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `Z?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md), `T2d?`: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)): [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md)

Create a new instance of CachedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`yPlusX?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | Y + X Element. |
`yMinusX?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | Y - X Element |
`Z?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | Z Element. |
`T2d?` | [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md) | T2d Element.  |

**Returns:** [CachedGroupElement](_crypto_edwards25519_cachedgroupelement_.cachedgroupelement.md)

## Properties

### T2d

•  **T2d**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

T2d Element.

___

### Z

•  **Z**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

Z Element.

___

### yMinusX

•  **yMinusX**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

Y - X Element

___

### yPlusX

•  **yPlusX**: [FieldElement](_crypto_edwards25519_fieldelement_.fieldelement.md)

Y + X Element.
