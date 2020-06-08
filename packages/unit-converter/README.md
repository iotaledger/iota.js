# @iota/unit-converter

Converts value across different IOTA units.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/unit-converter
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/unit-converter
```

## API Reference

    <a name="module_unit-converter.convertUnits"></a>

### *unit-converter*.convertUnits(value, fromUnit, toUnit)
**Summary**: Converts a value of IOTA tokens from one unit to another.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> \| <code>integer</code> \| <code>float</code> | Number of IOTA tokens |
| fromUnit | <code>String</code> | Unit of the `value` argument |
| toUnit | <code>String</code> | Unit to which to convert the value to |

This method converts a value of [IOTA tokens](https://docs.iota.org/docs/getting-started/0.1/clients/token) from a given unit to another given unit.

Valid unit names include the following:
- `i`: 1
- `Ki`: 1,000
- `Mi`: 1,000,000
- `Gi`: 1,000,000,000
- `Ti`: 1,000,000,000,000
- `Pi`: 1,000,000,000,000,000

**Returns**: <code>number</code> - newUnit - The number of units of IOTA tokens  
**Example**  
```js
let newUnit = UnitConverter.convertUnits(100, 'Ti', 'Pi');
```
