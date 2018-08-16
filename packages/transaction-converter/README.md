# @iota/transaction-converter

Methods for calculating transaction hashes and converting transaction objects to transaction trytes and back.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/transaction-converter
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/transaction-converter
```

## API Reference

    
* [transaction-converter](#module_transaction-converter)

    * [~asTransactionTrytes(transactions)](#module_transaction-converter..asTransactionTrytes)

    * [~asTransactionObject(trytes)](#module_transaction-converter..asTransactionObject)

    * [~asTransactionObjects([hashes])](#module_transaction-converter..asTransactionObjects)

    * [~transactionObjectsMapper(trytes)](#module_transaction-converter..transactionObjectsMapper)


<a name="module_transaction-converter..asTransactionTrytes"></a>

### *transaction-converter*~asTransactionTrytes(transactions)

| Param | Type | Description |
| --- | --- | --- |
| transactions | <code>Transaction</code> \| <code>Array.&lt;Transaction&gt;</code> | Transaction object(s) |

Converts a transaction object or a list of those into transaction trytes.

**Returns**: <code>Trytes</code> \| <code>Array.&lt;Trytes&gt;</code> - Transaction trytes  
<a name="module_transaction-converter..asTransactionObject"></a>

### *transaction-converter*~asTransactionObject(trytes)

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>Trytes</code> | Transaction trytes |

Converts transaction trytes of 2673 trytes into a transaction object.

**Returns**: <code>Transaction</code> - Transaction object  
<a name="module_transaction-converter..asTransactionObjects"></a>

### *transaction-converter*~asTransactionObjects([hashes])

| Param | Type | Description |
| --- | --- | --- |
| [hashes] | <code>Array.&lt;Hash&gt;</code> | Optional list of known hashes. Known hashes are directly mapped to transaction objects, otherwise all hashes are being recalculated. |

Converts a list of transaction trytes into list of transaction objects.
Accepts a list of hashes and returns a mapper. In cases hashes are given,
the mapper function map them to converted objects.

**Returns**: <code>function</code> - [`transactionObjectsMapper`](#module_transaction.transactionObjectsMapper)  
<a name="module_transaction-converter..transactionObjectsMapper"></a>

### *transaction-converter*~transactionObjectsMapper(trytes)

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>Array.&lt;Trytes&gt;</code> | List of transaction trytes to convert |

Maps the list of given hashes to a list of converted transaction objects.

**Returns**: <code>Array.&lt;Transaction&gt;</code> - List of transaction objects with hashes  
