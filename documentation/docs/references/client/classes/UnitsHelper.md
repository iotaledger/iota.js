---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
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

### Constructors

- [constructor](UnitsHelper.md#constructor)

## Properties

### MAGNITUDE\_MAP

▪ `Static` `Readonly` **MAGNITUDE\_MAP**: `Object`

Map units.

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
| `magnitude` | [`Magnitudes`](../api_ref.md#magnitudes) | `undefined` | The magnitude to format with. |
| `decimalPlaces` | `number` | `2` | The number of decimal places to display. |

#### Returns

`string`

The formated value.

___

### calculateBest

▸ `Static` **calculateBest**(`value`): [`Magnitudes`](../api_ref.md#magnitudes)

Format the value in the best units.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to format. |

#### Returns

[`Magnitudes`](../api_ref.md#magnitudes)

The best units for the value.

___

### convertUnits

▸ `Static` **convertUnits**(`value`, `from`, `to`): `number`

Convert the value to different units.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to convert. |
| `from` | [`Magnitudes`](../api_ref.md#magnitudes) | The from magnitude. |
| `to` | [`Magnitudes`](../api_ref.md#magnitudes) | The to magnitude. |

#### Returns

`number`

The formatted unit.

## Constructors

### constructor

• **new UnitsHelper**()
