# @iota/converter

Methods for converting ascii, values &amp; trytes to trits and back.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/converter
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/converter
```

## API Reference

    
* [converter](#module_converter)

    * [.asciiToTrytes(input)](#module_converter.asciiToTrytes)

    * [.trytesToAscii(trytes)](#module_converter.trytesToAscii)

    * [.trits(input)](#module_converter.trits)

    * [.trytes(trits)](#module_converter.trytes)

    * [.value(trits)](#module_converter.value)

    * [.fromValue(value)](#module_converter.fromValue)


<a name="module_converter.asciiToTrytes"></a>

### *converter*.asciiToTrytes(input)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | ascii input |

Converts an ascii encoded string to trytes.

### How conversion works:

An ascii value of `1 Byte` can be represented in `2 Trytes`:

1. We get the decimal unicode value of an individual ASCII character.

2. From the decimal value, we then derive the two tryte values by calculating the tryte equivalent
(e.g.: `100` is expressed as `19 + 3 * 27`), given that tryte alphabet contains `27` trytes values:
  a. The first tryte value is the decimal value modulo `27` (which is the length of the alphabet).
  b. The second value is the remainder of `decimal value - first value` devided by `27`.

3. The two values returned from Step 2. are then input as indices into the available
trytes alphabet (`9ABCDEFGHIJKLMNOPQRSTUVWXYZ`), to get the correct tryte value.

### Example:

Lets say we want to convert ascii character `Z`.

1. `Z` has a decimal unicode value of `90`.

2. `90` can be represented as `9 + 3 * 27`. To make it simpler:
  a. First value is `90 % 27 = 9`.
  b. Second value is `(90 - 9) / 27 = 3`.

3. Our two values are `9` and `3`. To get the tryte value now we simply insert it as indices
into the tryte alphabet:
  a. The first tryte value is `'9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[9] = I`
  b. The second tryte value is `'9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[3] = C`

Therefore ascii character `Z` is represented as `IC` in trytes.

**Returns**: <code>string</code> - string of trytes  
<a name="module_converter.trytesToAscii"></a>

### *converter*.trytesToAscii(trytes)

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>string</code> | trytes |

Converts trytes of _even_ length to an ascii string

**Returns**: <code>string</code> - string in ascii  
<a name="module_converter.trits"></a>

### *converter*.trits(input)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> \| <code>Number</code> | Tryte string or value to be converted. |

Converts trytes or values to trits

**Returns**: <code>Int8Array</code> - trits  
<a name="module_converter.trytes"></a>

### *converter*.trytes(trits)

| Param | Type |
| --- | --- |
| trits | <code>Int8Array</code> | 

Converts trits to trytes

**Returns**: <code>String</code> - trytes  
<a name="module_converter.value"></a>

### *converter*.value(trits)

| Param | Type |
| --- | --- |
| trits | <code>Int8Array</code> | 

Converts trits into an integer value

<a name="module_converter.fromValue"></a>

### *converter*.fromValue(value)

| Param | Type |
| --- | --- |
| value | <code>Number</code> | 

Converts an integer value to trits

**Returns**: <code>Int8Array</code> - trits  
