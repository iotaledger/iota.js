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

    * [~validate()](#module_validators..validate)

    * [~isTrytesOfExactLength(trytes, length)](#module_validators..isTrytesOfExactLength)

    * [~isTrytesOfMaxLength(trytes, length)](#module_validators..isTrytesOfMaxLength)

    * [~isTrytes(trytes, [length])](#module_validators..isTrytes)

    * [~isHash(hash)](#module_validators..isHash)

    * [~isTransactionHash(hash)](#module_validators..isTransactionHash)

    * [~isEmpty(hash)](#module_validators..isEmpty)

    * [~isTransfer(transfer)](#module_validators..isTransfer)

    * [~isTransfersArray(transfers)](#module_validators..isTransfersArray)

    * [~isHashArray(hashes)](#module_validators..isHashArray)

    * [~isTransactionHashArray(hashes)](#module_validators..isTransactionHashArray)

    * [~isTransactionTrytesArray(trytes)](#module_validators..isTransactionTrytesArray)

    * [~isAttachedTrytesArray(trytes)](#module_validators..isAttachedTrytesArray)

    * [~isTransaction(tx)](#module_validators..isTransaction)

    * [~isTransactionArray(bundle)](#module_validators..isTransactionArray)

    * [~isAddress(address)](#module_validators..isAddress)

    * [~isAddresses(address)](#module_validators..isAddresses)

    * [~isUri(uri)](#module_validators..isUri)

    * [~isUriArray(uris)](#module_validators..isUriArray)

    * [~isTag(tag)](#module_validators..isTag)

    * [~isTagArray(tags)](#module_validators..isTagArray)

    * [~isTailTransaction(transaction)](#module_validators..isTailTransaction)

    * [~isInputArray(inputs)](#module_validators..isInputArray)


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

<a name="module_validators..isTrytes"></a>

### *validators*~isTrytes(trytes, [length])

| Param | Type | Default |
| --- | --- | --- |
| trytes | <code>string</code> |  | 
| [length] | <code>string</code> \| <code>number</code> | <code>&quot;&#x27;1,&#x27;&quot;</code> | 

Checks if input is correct trytes consisting of [9A-Z]; optionally validate length

<a name="module_validators..isHash"></a>

### *validators*~isHash(hash)

| Param | Type |
| --- | --- |
| hash | <code>string</code> | 

Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)

<a name="module_validators..isTransactionHash"></a>

### *validators*~isTransactionHash(hash)

| Param | Type |
| --- | --- |
| hash | <code>string</code> | 

Checks if input is correct transaction hash (81 trytes)

<a name="module_validators..isEmpty"></a>

### *validators*~isEmpty(hash)

| Param | Type |
| --- | --- |
| hash | <code>string</code> | 

Checks if input contains `9`s only.

<a name="module_validators..isTransfer"></a>

### *validators*~isTransfer(transfer)

| Param | Type |
| --- | --- |
| transfer | <code>Transfer</code> | 

Checks if input is valid `transfer` object.

<a name="module_validators..isTransfersArray"></a>

### *validators*~isTransfersArray(transfers)

| Param | Type |
| --- | --- |
| transfers | <code>Array.&lt;Transfer&gt;</code> | 

Checks if input is array of valid `transfer` objects.

<a name="module_validators..isHashArray"></a>

### *validators*~isHashArray(hashes)

| Param | Type |
| --- | --- |
| hashes | <code>Array.&lt;string&gt;</code> | 

Checks if input is array of valid hashes.
Valid hashes are `81` trytes in length, or `90` trytes in case of addresses with checksum.

<a name="module_validators..isTransactionHashArray"></a>

### *validators*~isTransactionHashArray(hashes)

| Param | Type |
| --- | --- |
| hashes | <code>Array.&lt;string&gt;</code> | 

Checks if input is array of valid transaction hashes.

<a name="module_validators..isTransactionTrytesArray"></a>

### *validators*~isTransactionTrytesArray(trytes)

| Param | Type |
| --- | --- |
| trytes | <code>Array.&lt;string&gt;</code> | 

Checks if input is array of valid tranasction trytes.

<a name="module_validators..isAttachedTrytesArray"></a>

### *validators*~isAttachedTrytesArray(trytes)

| Param | Type |
| --- | --- |
| trytes | <code>Array.&lt;string&gt;</code> | 

Checks if input is array of valid attached tranasction trytes.
For attached transactions last 241 trytes are non-zero.

<a name="module_validators..isTransaction"></a>

### *validators*~isTransaction(tx)

| Param | Type |
| --- | --- |
| tx | <code>Array.&lt;Object&gt;</code> | 

Checks if input is valid transaction object.

<a name="module_validators..isTransactionArray"></a>

### *validators*~isTransactionArray(bundle)

| Param | Type |
| --- | --- |
| bundle | <code>Array.&lt;Object&gt;</code> | 

Checks if input is valid array of transaction objects.

<a name="module_validators..isAddress"></a>

### *validators*~isAddress(address)

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

Checks if input is valid address. Address can be passed with or without checksum.
It does not validate the checksum.

<a name="module_validators..isAddresses"></a>

### *validators*~isAddresses(address)

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

Checks if input is valid array of address. Similarly to [`isAddress`](#module_validators.isAddress),
it does not validate the checksum.

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

<a name="module_validators..isUriArray"></a>

### *validators*~isUriArray(uris)

| Param | Type |
| --- | --- |
| uris | <code>Array.&lt;string&gt;</code> | 

Checks that a given input is array of value `URI`s

<a name="module_validators..isTag"></a>

### *validators*~isTag(tag)

| Param | Type |
| --- | --- |
| tag | <code>string</code> | 

Checks that input is valid tag trytes.

<a name="module_validators..isTagArray"></a>

### *validators*~isTagArray(tags)

| Param | Type |
| --- | --- |
| tags | <code>Array.&lt;string&gt;</code> | 

Checks that input is array of valid tag trytes.

<a name="module_validators..isTailTransaction"></a>

### *validators*~isTailTransaction(transaction)

| Param | Type |
| --- | --- |
| transaction | <code>object</code> | 

Checks if given transaction object is tail transaction.
A tail transaction is one with `currentIndex=0`.

<a name="module_validators..isInputArray"></a>

### *validators*~isInputArray(inputs)

| Param | Type |
| --- | --- |
| inputs | <code>Array.&lt;object&gt;</code> | 

Checks if input is valid array of `input` objects.

