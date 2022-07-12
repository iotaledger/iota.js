# Class: UnitsHelper

Class to help with units formatting.

## Table of contents

### Properties

- [MAGNITUDE\_MAP](UnitsHelper.md#magnitude_map)

### Methods

- [formatBest](UnitsHelper.md#formatbest)
- [formatUnits](UnitsHelper.md#formatunits)
- [calculateBest](UnitsHelper.md#calculatebest)
- [convertUnits](UnitsHelper.md#convertunits)

## Properties

### MAGNITUDE\_MAP

▪ `Static` `Readonly` **MAGNITUDE\_MAP**: `Object`

Map units.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `` | { `val`: `number` ; `dp`: `number`  } |
| `.val` | `number` |
| `.dp` | `number` |
| `P` | { `val`: `number` ; `dp`: `number`  } |
| `P.val` | `number` |
| `P.dp` | `number` |
| `T` | { `val`: `number` ; `dp`: `number`  } |
| `T.val` | `number` |
| `T.dp` | `number` |
| `G` | { `val`: `number` ; `dp`: `number`  } |
| `G.val` | `number` |
| `G.dp` | `number` |
| `M` | { `val`: `number` ; `dp`: `number`  } |
| `M.val` | `number` |
| `M.dp` | `number` |
| `K` | { `val`: `number` ; `dp`: `number`  } |
| `K.val` | `number` |
| `K.dp` | `number` |

## Methods

### formatBest

▸ `Static` **formatBest**(`value`, `decimalPlaces?`): `string`

Format the value in the best units.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | The value to format. |
| `decimalPlaces` | `number` | `2` | The number of decimal places to display. |

#### Returns

`string`

The formated value.

___

### formatUnits

▸ `Static` **formatUnits**(`value`, `magnitude`, `decimalPlaces?`): `string`

Format the value in the best units.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | The value to format. |
| `magnitude` | [`Magnitudes`](../api.md#magnitudes) | `undefined` | The magnitude to format with. |
| `decimalPlaces` | `number` | `2` | The number of decimal places to display. |

#### Returns

`string`

The formated value.

___

### calculateBest

▸ `Static` **calculateBest**(`value`): [`Magnitudes`](../api.md#magnitudes)

Format the value in the best units.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to format. |

#### Returns

[`Magnitudes`](../api.md#magnitudes)

The best units for the value.

___

### convertUnits

▸ `Static` **convertUnits**(`value`, `from`, `to`): `number`

Convert the value to different units.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to convert. |
| `from` | [`Magnitudes`](../api.md#magnitudes) | The from magnitude. |
| `to` | [`Magnitudes`](../api.md#magnitudes) | The to magnitude. |

#### Returns

`number`

The formatted unit.
