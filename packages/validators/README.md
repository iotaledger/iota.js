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

    * _static_
        * [.isAddress(address)](#module_validators.isAddress)

    * _inner_
        * [~isTrits(input)](#module_validators..isTrits)

        * [~isNullTrits(trits)](#module_validators..isNullTrits)

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


<a name="module_validators.isAddress"></a>

### *validators*.isAddress(address)
**Summary**: Validates the checksum of the given address.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address with a checksum |

This method takes an address with a checksum and validates that the checksum is correct.

## Related methods

To generate a new address with a checksum, use the [`getNewAddress()`](#module_core.getNewAddress) method.

**Returns**: <code>boolean</code> - valid - Whether the checksum is valid  
**Example**  
```js
let valid = Validator.isAddress('9FNJWLMBECSQDKHQAGDHDPXBMZFMQIMAFAUIQTDECJVGKJBKHLEBVU9TWCTPRJGYORFDSYENIQKBVSYKW9NSLGS9UW');
```
<a name="module_validators..isTrits"></a>

### *validators*~isTrits(input)

| Param | Type |
| --- | --- |
| input | <code>any</code> | 

Checks if input is an `Int8Array` of trit values; `-1, 0, 1`.

<a name="module_validators..isNullTrits"></a>

### *validators*~isNullTrits(trits)

| Param | Type |
| --- | --- |
| trits | <code>Int8Array</code> | 

Checks if trits are NULL.

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
