# @iota/validators

Collection of guards and validators, useful in IOTA development.

## Installation

Instal using [npm](https://www.npmjs.org/):
```
npm install @iota/validators
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/validators
```

## API Reference

    
* [validators](#module_validators)

    * [~isTrytes(trytes, [length])](#module_validators..isTrytes)

    * [~isTrytesOfExactLength(trytes, length)](#module_validators..isTrytesOfExactLength)

    * [~isTrytesOfMaxLength(trytes, length)](#module_validators..isTrytesOfMaxLength)

    * [~isEmpty(hash)](#module_validators..isEmpty)

    * [~isHash(hash)](#module_validators..isHash)

    * [~isInput(address)](#module_validators..isInput)

    * [~isTag(tag)](#module_validators..isTag)

    * [~isTransfer(transfer)](#module_validators..isTransfer)

    * [~isUri(uri)](#module_validators..isUri)

    * [~validate()](#module_validators..validate)

    * [~isAddress(address)](#module_validators..isAddress)


<a name="module_validators..isTrytes"></a>

### *validators*~isTrytes(trytes, [length])

| Param | Type | Default |
| --- | --- | --- |
| trytes | <code>string</code> |  | 
| [length] | <code>string</code> \| <code>number</code> | <code>&quot;&#x27;1,&#x27;&quot;</code> | 

Checks if input is correct trytes consisting of [9A-Z]; optionally validate length

<a name="module_validators..isTrytesOfExactLength"></a>

### *validators*~isTrytesOfExactLength(trytes, length)

| Param | Type |
| --- | --- |
| trytes | <code>string</code> | 
| length | <code>number</code> | 

<a name="module_validators..isTrytesOfMaxLength"></a>

### *validators*~isTrytesOfMaxLength(trytes, length)

| Param | Type |
| --- | --- |
| trytes | <code>string</code> | 
| length | <code>number</code> | 

<a name="module_validators..isEmpty"></a>

### *validators*~isEmpty(hash)

| Param | Type |
| --- | --- |
| hash | <code>string</code> | 

Checks if input contains `9`s only.

<a name="module_validators..isHash"></a>

### *validators*~isHash(hash)

| Param | Type |
| --- | --- |
| hash | <code>string</code> | 

Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)

<a name="module_validators..isInput"></a>

### *validators*~isInput(address)

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

Checks if input is valid input object. Address can be passed with or without checksum.
It does not validate the checksum.

<a name="module_validators..isTag"></a>

### *validators*~isTag(tag)

| Param | Type |
| --- | --- |
| tag | <code>string</code> | 

Checks that input is valid tag trytes.

<a name="module_validators..isTransfer"></a>

### *validators*~isTransfer(transfer)

| Param | Type |
| --- | --- |
| transfer | <code>Transfer</code> | 

Checks if input is valid `transfer` object.

<a name="module_validators..isUri"></a>

### *validators*~isUri(uri)

| Param | Type |
| --- | --- |
| uri | <code>string</code> | 

Checks that a given `URI` is valid

Valid Examples:
- `udp://[2001:db8:a0b:12f0::1]:14265`
- `udp://[2001:db8:a0b:12f0::1]`
- `udp://8.8.8.8:14265`
- `udp://domain.com`
- `udp://domain2.com:14265`

<a name="module_validators..validate"></a>

### *validators*~validate()
**Throws**:

- <code>Error</code> error

Runs each validator in sequence, and throws on the first occurence of invalid data.
Validators are passed as arguments and executed in given order.
You might want place `validate()` in promise chains before operations that require valid inputs,
taking advantage of built-in promise branching.

**Example**  
```js
try {
  validate([
    value, // Given value
    isTrytes, // Validator function
    'Invalid trytes' // Error message
  ])
} catch (err) {
  console.log(err.message) // 'Invalid trytes'
}
```
<a name="module_validators..isAddress"></a>

### *validators*~isAddress(address)

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address trytes, with checksum |

Checks integrity of given address by validating the checksum.

