[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / UnitsHelper

# Class: UnitsHelper

Class to help with units formatting.

## Hierarchy

* **UnitsHelper**

## Index

### Constructors

* [constructor](index_node.unitshelper.md#constructor)

### Properties

* [UNIT\_MAP](index_node.unitshelper.md#unit_map)

### Methods

* [calculateBest](index_node.unitshelper.md#calculatebest)
* [convertUnits](index_node.unitshelper.md#convertunits)
* [formatBest](index_node.unitshelper.md#formatbest)
* [formatUnits](index_node.unitshelper.md#formatunits)

## Constructors

### constructor

\+ **new UnitsHelper**(): [*UnitsHelper*](utils_unitshelper.unitshelper.md)

**Returns:** [*UnitsHelper*](utils_unitshelper.unitshelper.md)

## Properties

### UNIT\_MAP

▪ `Readonly` `Static` **UNIT\_MAP**: {}

Map units.

## Methods

### calculateBest

▸ `Static`**calculateBest**(`value`: *number*): Units

Format the value in the best units.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | The value to format.   |

**Returns:** Units

The best units for the value.

___

### convertUnits

▸ `Static`**convertUnits**(`value`: *number*, `fromUnit`: Units, `toUnit`: Units): *number*

Convert the value to different units.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | The value to convert.   |
`fromUnit` | Units | The form unit.   |
`toUnit` | Units | The to unit.   |

**Returns:** *number*

The formatted unit.

___

### formatBest

▸ `Static`**formatBest**(`value`: *number*, `decimalPlaces?`: *number*): *string*

Format the value in the best units.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | *number* | - | The value to format.   |
`decimalPlaces` | *number* | 2 | The number of decimal places to display.   |

**Returns:** *string*

The formated value.

___

### formatUnits

▸ `Static`**formatUnits**(`value`: *number*, `unit`: Units, `decimalPlaces?`: *number*): *string*

Format the value in the best units.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | *number* | - | The value to format.   |
`unit` | Units | - | The unit to format with.   |
`decimalPlaces` | *number* | 2 | The number of decimal places to display.   |

**Returns:** *string*

The formated value.
