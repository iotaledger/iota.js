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

    * _static_
        * [.asTransactionTrytes(transactions)](#module_transaction-converter.asTransactionTrytes)

        * [.asTransactionObject(transaction)](#module_transaction-converter.asTransactionObject)

        * [.asTransactionObjects([hashes])](#module_transaction-converter.asTransactionObjects)

    * _inner_
        * [~transactionObjectsMapper(trytes)](#module_transaction-converter..transactionObjectsMapper)


<a name="module_transaction-converter.asTransactionTrytes"></a>

### *transaction-converter*.asTransactionTrytes(transactions)
**Summary**: Converts one or more transaction objects into transaction trytes.  
**Throws**:

- <code>errors.INVALID\_TRYTES</code> : Make sure that the object fields in the `transactions` argument contains valid trytes (A-Z or 9).


| Param | Type | Description |
| --- | --- | --- |
| transactions | <code>Transaction</code> \| <code>Array.&lt;Transaction&gt;</code> | Transaction objects |

This method takes one or more transaction objects and converts them into trytes.

## Related methods

To get JSON data from the `signatureMessageFragment` field of the transaction trytes, use the [`extractJSON()`](#module_extract-json.extractJSON) method.

**Returns**: <code>Trytes</code> \| <code>Array.&lt;Trytes&gt;</code> - Transaction trytes  
**Example**  
```js
let trytes = TransactionConverter.asTransactionTrytes(transactionObject);
```
<a name="module_transaction-converter.asTransactionObject"></a>

### *transaction-converter*.asTransactionObject(transaction)
**Summary**: Converts transaction trytes into a transaction object.  
**Throws**:

- <code>errors.INVALID\_TRYTES</code> : Make sure that the object fields in the `transaction` argument contains valid trytes (A-Z or 9).


| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Trytes</code> | Transaction trytes |

This method takes 2,673 transaction trytes and converts them into a transaction object.

## Related methods

To convert more than one transaction into an object at once, use the [`asTransactionObjects()`](#module_transaction-converter.asTransactionObjects) method.

To get a transaction's trytes from the Tangle, use the [`getTrytes()`](#module_core.getTrytes) method.

**Returns**: <code>Transaction</code> - transactionObject - A transaction object  
**Example**  
```js
let transactionObject = TransactionConverter.asTransactionObject(transactionTrytes);
```
<a name="module_transaction-converter.asTransactionObjects"></a>

### *transaction-converter*.asTransactionObjects([hashes])
**Summary**: Converts one or more transaction trytes into transaction objects.  
**Throws**:

- <code>errors.INVALID\_TRYTES</code> : Make sure that transcactions contains valid trytes (A-Z or 9).


| Param | Type | Description |
| --- | --- | --- |
| [hashes] | <code>Array.&lt;Hash&gt;</code> | Transaction hashes |

This method takes an array of transaction hashes and returns a mapper.

If any hashes are given, the mapper function maps them to their converted objects. Otherwise, all hashes are recalculated.

## Related methods

To get a transaction's trytes from the Tangle, use the [`getTrytes()`](#module_core.getTrytes) method.

**Returns**: <code>function</code> - [`transactionObjectsMapper()`](#module_transaction.transactionObjectsMapper)  
**Example**  
```js
let transactionObjectsMapper = TransactionConverter.asTransactionObjects([hashes]);
```
<a name="module_transaction-converter..transactionObjectsMapper"></a>

### *transaction-converter*~transactionObjectsMapper(trytes)

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>Array.&lt;Trytes&gt;</code> | List of transaction trytes to convert |

Maps the list of given hashes to a list of converted transaction objects.

**Returns**: <code>Array.&lt;Transaction&gt;</code> - List of transaction objects with hashes  
