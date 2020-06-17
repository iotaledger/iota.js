# @iota/transaction

Utilities and validators for transactions.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/transaction
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/transaction
```

## API Reference

    
* [transaction](#module_transaction)

    * _static_
        * [.transactionHash(buffer, [offset])](#module_transaction.transactionHash)

        * [.isTransaction(transaction, [minWeightMagnitude])](#module_transaction.isTransaction)

        * [.isTailTransaction(transaction)](#module_transaction.isTailTransaction)

        * [.isHeadTransaction(transaction)](#module_transaction.isHeadTransaction)

    * _inner_
        * [~isMultipleOfTransactionLength(lengthOrOffset)](#module_transaction..isMultipleOfTransactionLength)

        * [~signatureOrMessage(buffer)](#module_transaction..signatureOrMessage)

        * [~address(buffer, [offset])](#module_transaction..address)

        * [~value(buffer, [offset])](#module_transaction..value)

        * [~obsoleteTag(buffer, [offset])](#module_transaction..obsoleteTag)

        * [~issuanceTimestamp(buffer, [offset])](#module_transaction..issuanceTimestamp)

        * [~currentIndex(buffer, [offset])](#module_transaction..currentIndex)

        * [~lastIndex(buffer, [offset])](#module_transaction..lastIndex)

        * [~bundle(buffer, [offset])](#module_transaction..bundle)

        * [~trunkTransaction(buffer, [offset])](#module_transaction..trunkTransaction)

        * [~branchTransaction(buffer, [offset])](#module_transaction..branchTransaction)

        * [~tag(buffer, [offset])](#module_transaction..tag)

        * [~attachmentTimestamp(buffer, [offset])](#module_transaction..attachmentTimestamp)

        * [~attachmentTimestampLowerBound(buffer, [offset])](#module_transaction..attachmentTimestampLowerBound)

        * [~attachmentTimestampUpperBound(buffer, [offset])](#module_transaction..attachmentTimestampUpperBound)

        * [~transactionNonce(buffer, [offset])](#module_transaction..transactionNonce)

        * [~bundle(buffer, [offset])](#module_transaction..bundle)


<a name="module_transaction.transactionHash"></a>

### *transaction*.transactionHash(buffer, [offset])
**Summary**: Generates the transaction hash for a given transaction.  
**Throws**:

- <code>errors.ILLEGAL\_TRANSACTION\_BUFFER\_LENGTH</code> : Make sure that the `buffer` argument contains 8,019 trits (the length of a transaction without the transaction hash).
- <code>errors.ILLEGAL\_TRANSACTION\_OFFSET</code> : Make sure that the `offset` argument is a multiple of 8,019 (the length of a transaction without the transaction hash).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transactions in trits |
| [offset] | <code>Number</code> | <code>0</code> | Offset in trits to define a transaction to hash in the `buffer` argument |

This method takes transaction trits, and returns the transaction hash.

## Related methods

To validate the length of transaction trits, use the [`isMultipleOfTransactionLength()`](#module_transaction.isMultipleOfTransactionLength) method.

To get a transaction's trits from the Tangle, use the [`getTrytes()`](#module_core.getTrytes) method, then convert them to trits, using the [`trytesToTrits()`](#module_converter.trytesToTrits) method.

**Returns**: <code>Int8Array</code> - Transaction hash  
**Example**  
```js
let hash = Transaction.transactionHash(transactions);
```
<a name="module_transaction.isTransaction"></a>

### *transaction*.isTransaction(transaction, [minWeightMagnitude])
**Summary**: Validates the structure and contents of a given transaction.  
**Throws**:

- <code>errors.ILLEGAL\_MIN\_WEIGHT\_MAGNITUDE</code> : Make sure that the `minWeightMagnitude` argument is a number between 1 and 81.
- <code>errors.ILLEGAL\_TRANSACTION\_BUFFER\_LENGTH</code> : Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction | <code>Int8Array</code> |  | Transaction trits |
| [minWeightMagnitude] | <code>number</code> | <code>0</code> | Minimum weight magnitude |

This method takes an array of transaction trits and validates whether they form a valid transaction by checking the following:

- Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
- The transaction would result in a valid hash, according to the given [`minWeightMagnitude`](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) argument

## Related methods

To get a transaction's trits from the Tangle, use the [`getTrytes()`](#module_core.getTrytes) method, then convert them to trits, using the [`trytesToTrits()`](#module_converter.trytesToTrits) method.

**Returns**: <code>boolean</code> - valid - Whether the transaction is valid.  
**Example**  
```js
let valid = Transaction.isTransaction(transaction);
```
<a name="module_transaction.isTailTransaction"></a>

### *transaction*.isTailTransaction(transaction)
**Summary**: Checks if the given transaction is a tail transaction in a bundle.  
**Throws**:

- <code>errors.ILLEGAL\_TRANSACTION\_BUFFER\_LENGTH</code> : Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).


| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Int8Array</code> | Transaction trits |

This method takes an array of transaction trits, and checks its `currentIndex` field to validate whether it is the tail transaction in a bundle.

## Related methods

To get a transaction's trits from the Tangle, use the [`getTrytes()`](#module_core.getTrytes) method, then convert them to trits, using the [`trytesToTrits()`](#module_converter.trytesToTrits) method.

**Returns**: <code>boolean</code> - tail - Whether the transaction is a tail transaction.  
**Example**  
```js
let tail = Transaction.isTailTransaction(transaction);
```
<a name="module_transaction.isHeadTransaction"></a>

### *transaction*.isHeadTransaction(transaction)
**Summary**: Checks if the given transaction is a head transaction in a bundle.  
**Throws**:

- <code>errors.ILLEGAL\_TRANSACTION\_BUFFER\_LENGTH</code> : Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).


| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Int8Array</code> | Transaction trits |

This method takes an array of transaction trits, and checks its `currentIndex` field to validate whether it is the head transaction in a bundle.

## Related methods

To get a transaction's trits from the Tangle, use the [`getTrytes()`](#module_core.getTrytes) method, then convert them to trits, using the [`trytesToTrits()`](#module_converter.trytesToTrits) method.

**Returns**: <code>boolean</code> - head - Whether the transaction is a head transaction.  
**Example**  
```js
let head = Transaction.isHeadTransaction(transaction);
```
<a name="module_transaction..isMultipleOfTransactionLength"></a>

### *transaction*~isMultipleOfTransactionLength(lengthOrOffset)

| Param | Type |
| --- | --- |
| lengthOrOffset | <code>Int8Array</code> | 

Checks if given value is a valid transaction buffer length or offset.

<a name="module_transaction..signatureOrMessage"></a>

### *transaction*~signatureOrMessage(buffer)

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Int8Array</code> | Transaction trytes |

Gets the `signatureOrMessage` field of all transactions in a bundle.

<a name="module_transaction..address"></a>

### *transaction*~address(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `address` field.

<a name="module_transaction..value"></a>

### *transaction*~value(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `value` field.

<a name="module_transaction..obsoleteTag"></a>

### *transaction*~obsoleteTag(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `obsoleteTag` field.

<a name="module_transaction..issuanceTimestamp"></a>

### *transaction*~issuanceTimestamp(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `issuanceTimestamp` field.

<a name="module_transaction..currentIndex"></a>

### *transaction*~currentIndex(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `currentIndex` field.

<a name="module_transaction..lastIndex"></a>

### *transaction*~lastIndex(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `lastIndex` field.

<a name="module_transaction..bundle"></a>

### *transaction*~bundle(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `bundle` field.

<a name="module_transaction..trunkTransaction"></a>

### *transaction*~trunkTransaction(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `trunkTransaction` field.

<a name="module_transaction..branchTransaction"></a>

### *transaction*~branchTransaction(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `branchTransaction` field.

<a name="module_transaction..tag"></a>

### *transaction*~tag(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `tag` field.

<a name="module_transaction..attachmentTimestamp"></a>

### *transaction*~attachmentTimestamp(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `attachmentTimestamp` field.

<a name="module_transaction..attachmentTimestampLowerBound"></a>

### *transaction*~attachmentTimestampLowerBound(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `attachmentTimestampLowerBound` field.

<a name="module_transaction..attachmentTimestampUpperBound"></a>

### *transaction*~attachmentTimestampUpperBound(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `attachmentTimestampUpperBound` field.

<a name="module_transaction..transactionNonce"></a>

### *transaction*~transactionNonce(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of `tansactionNonce` field.

<a name="module_transaction..bundle"></a>

### *transaction*~bundle(buffer, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>Int8Array</code> |  | Transaction buffer. Buffer length must be a multiple of transaction length. |
| [offset] | <code>Number</code> | <code>0</code> | Transaction trit offset. It must be a multiple of transaction length. |

Returns a copy of transaction essence fields.

