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

    <a name="module_unit-converter..convertUnits"></a>

### *unit-converter*~convertUnits(value, fromUnit, toUnit)

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>int</code> \| <code>float</code> |  |
| fromUnit | <code>string</code> | Name of original value unit |
| toUnit | <code>string</code> | Name of unit wich we convert to |

Converts accross IOTA units. Valid unit names are:
`i`, `Ki`, `Mi`, `Gi`, `Ti`, `Pi`

