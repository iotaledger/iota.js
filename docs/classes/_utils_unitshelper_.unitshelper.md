**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["utils/unitsHelper"](../modules/_utils_unitshelper_.md) / UnitsHelper

# Class: UnitsHelper

Class to help with units formatting.

## Hierarchy

* **UnitsHelper**

## Index

### Methods

* [calculateBest](_utils_unitshelper_.unitshelper.md#calculatebest)
* [convertUnits](_utils_unitshelper_.unitshelper.md#convertunits)
* [formatBest](_utils_unitshelper_.unitshelper.md#formatbest)
* [formatUnits](_utils_unitshelper_.unitshelper.md#formatunits)

### Object literals

* [UNIT\_MAP](_utils_unitshelper_.unitshelper.md#unit_map)

## Methods

### calculateBest

▸ `Static`**calculateBest**(`value`: number): Units

Format the value in the best units.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | The value to format. |

**Returns:** Units

The best units for the value.

___

### convertUnits

▸ `Static`**convertUnits**(`value`: number, `fromUnit`: Units, `toUnit`: Units): number

Convert the value to different units.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | The value to convert. |
`fromUnit` | Units | The form unit. |
`toUnit` | Units | The to unit. |

**Returns:** number

The formatted unit.

___

### formatBest

▸ `Static`**formatBest**(`value`: number, `decimalPlaces?`: number): string

Format the value in the best units.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | number | - | The value to format. |
`decimalPlaces` | number | 2 | The number of decimal places to display. |

**Returns:** string

The formated value.

___

### formatUnits

▸ `Static`**formatUnits**(`value`: number, `unit`: Units, `decimalPlaces?`: number): string

Format the value in the best units.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | number | - | The value to format. |
`unit` | Units | - | The unit to format with. |
`decimalPlaces` | number | 2 | The number of decimal places to display. |

**Returns:** string

The formated value.

## Object literals

### UNIT\_MAP

▪ `Static` `Readonly` **UNIT\_MAP**: object

Map units.

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`Gi` | object | { dp: number = 9; val: number = 1000000000 } |
`Ki` | object | { dp: number = 3; val: number = 1000 } |
`Mi` | object | { dp: number = 6; val: number = 1000000 } |
`Pi` | object | { dp: number = 15; val: number = 1000000000000000 } |
`Ti` | object | { dp: number = 12; val: number = 1000000000000 } |
`i` | object | { dp: number = 0; val: number = 1 } |
