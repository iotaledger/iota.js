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

    * [.trytesToTrits(input)](#module_converter.trytesToTrits)

    * [.tritsToTrytes(input)](#module_converter.tritsToTrytes)

    * [.tritsToValue(input)](#module_converter.tritsToValue)

    * [.valueToTrits(input)](#module_converter.valueToTrits)


<a name="module_converter.asciiToTrytes"></a>

### *converter*.asciiToTrytes(input)
**Summary**: Converts ASCII characters to trytes.  
**Throws**:

- <code>errors.INVALID\_ASCII\_CHARS</code> : Make sure that the `input` argument contains only valid ASCII characters.


| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | ASCII input |

This method converts ASCII characters to [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).

## Related methods

To convert trytes to ASCII characters, use the [`trytesToAscii()`](#module_converter.trytesToAscii) method.

**Returns**: <code>string</code> - Trytes  
**Example**  
```js
let trytes = Converter.asciiToTrytes('Hello, where is my coffee?');
```
<a name="module_converter.trytesToAscii"></a>

### *converter*.trytesToAscii(trytes)
**Summary**: Converts trytes to ASCII characters.  
**Throws**:

- <code>errors.INVALID\_TRYTES</code> : Make sure that the `trytes` argument contains only valid trytes (A-Z or 9).
- <code>errors.INVALID\_ODD\_LENGTH</code> : Make sure that the `trytes` argument contains an even number of trytes.


| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>string</code> | An even number of trytes |

This method converts trytes to ASCII characters.

Because each ASCII character is represented as 2 trytes, the given trytes must be of an even length.

## Related methods

To convert ASCII characters to trytes, use the [`asciiToTrytes()`](#module_converter.asciiToTrytes) method.

**Returns**: <code>string</code> - ASCII characters  
**Example**  
```js
let message = Converter.trytesToAscii('IOTA');
```
<a name="module_converter.trytesToTrits"></a>

### *converter*.trytesToTrits(input)
**Summary**: Converts trytes to trits.  
**Throws**:

- <code>errors.INVALID\_TRYTES</code> : Make sure that the `input` argument contains only valid trytes (A-Z or 9).


| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> \| <code>number</code> | Trytes |

This method converts [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trits.

## Related methods

To convert ASCII characters to trytes, use the [`asciiToTrytes()`](#module_converter.asciiToTrytes) method.

**Returns**: <code>Int8Array</code> - trits  
**Example**  
```js
let trits = Converter.trytesToTrits('IOTA');
```
<a name="module_converter.tritsToTrytes"></a>

### *converter*.tritsToTrytes(input)
**Summary**: Converts trits to trytes.  
**Throws**:

- <code>errors.INVALID\_TRITS</code> : Make sure that the `input` argument contains an array of trits.


| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> \| <code>number</code> | Trits |

This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trytes.

## Related methods

To convert trytes to ASCII characters, use the [`trytesToAscii()`](#module_converter.trytesToAscii) method.

**Returns**: <code>Int8Array</code> - trytes  
**Example**  
```js
let trytes = Converter.tritsToTrytes(trits);
```
<a name="module_converter.tritsToValue"></a>

### *converter*.tritsToValue(input)
**Summary**: Converts trits to a number.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> \| <code>number</code> | Trits |

This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to a number.

## Related methods

To convert trytes to trits, use the [`trytesToTrits()`](#module_converter.trytesToTrits) method.
To convert trits to trytes, use the [`tritsToTrytes()`](#module_converter.tritsToTrytes) method.

**Returns**: <code>Int8Array</code> - number  
**Example**  
```js
let number = Converter.tritsToValue(trits);
```
<a name="module_converter.valueToTrits"></a>

### *converter*.valueToTrits(input)
**Summary**: Converts trits to a number.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> \| <code>number</code> | Number |

This method converts a number to [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).

## Related methods

To convert trits to trytes, use the [`tritsToTrytes()`](#module_converter.tritsToTrytes) method.

**Returns**: <code>Int8Array</code> - trits  
**Example**  
```js
let trits = Converter.valueToTrits(9);
```
