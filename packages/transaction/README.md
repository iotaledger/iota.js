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

    * [~transactionHash(trits)](#module_transaction..transactionHash)

    * [~isTransactionHash(hash, mwm)](#module_transaction..isTransactionHash)

    * [~isTransactionHashArray(hashes)](#module_transaction..isTransactionHashArray)

    * [~isTransactionTrytes(trytes, mwm)](#module_transaction..isTransactionTrytes)

    * [~isTransactionTrytesArray(trytesArray)](#module_transaction..isTransactionTrytesArray)

    * [~isAttachedTrytesArray(trytesArray)](#module_transaction..isAttachedTrytesArray)

    * [~isTransaction(tx)](#module_transaction..isTransaction)

    * [~isTransactionArray(bundle)](#module_transaction..isTransactionArray)

    * [~isTailTransaction(transaction)](#module_transaction..isTailTransaction)


<a name="module_transaction..transactionHash"></a>

### *transaction*~transactionHash(trits)

| Param | Type | Description |
| --- | --- | --- |
| trits | <code>Int8Array</code> | Int8Array of 8019 transaction trits |

Calculates the transaction hash out of 8019 transaction trits.

**Returns**: <code>Hash</code> - Transaction hash  
<a name="module_transaction..isTransactionHash"></a>

### *transaction*~isTransactionHash(hash, mwm)

| Param | Type |
| --- | --- |
| hash | <code>string</code> | 
| mwm | <code>number</code> | 

Checks if input is correct transaction hash (81 trytes)

<a name="module_transaction..isTransactionHashArray"></a>

### *transaction*~isTransactionHashArray(hashes)

| Param | Type |
| --- | --- |
| hashes | <code>Array.&lt;string&gt;</code> | 

Checks if input is array of valid transaction hashes.

<a name="module_transaction..isTransactionTrytes"></a>

### *transaction*~isTransactionTrytes(trytes, mwm)

| Param | Type |
| --- | --- |
| trytes | <code>string</code> | 
| mwm | <code>number</code> | 

Checks if input is correct transaction trytes (2673 trytes)

<a name="module_transaction..isTransactionTrytesArray"></a>

### *transaction*~isTransactionTrytesArray(trytesArray)

| Param | Type |
| --- | --- |
| trytesArray | <code>Array.&lt;string&gt;</code> | 

Checks if input is array of valid transaction trytes.

<a name="module_transaction..isAttachedTrytesArray"></a>

### *transaction*~isAttachedTrytesArray(trytesArray)

| Param | Type |
| --- | --- |
| trytesArray | <code>Array.&lt;string&gt;</code> | 

Checks if input is array of valid attached transaction trytes.
For attached transactions last 241 trytes are non-zero.

<a name="module_transaction..isTransaction"></a>

### *transaction*~isTransaction(tx)

| Param | Type |
| --- | --- |
| tx | <code>object</code> | 

Checks if input is valid transaction object.

<a name="module_transaction..isTransactionArray"></a>

### *transaction*~isTransactionArray(bundle)

| Param | Type |
| --- | --- |
| bundle | <code>Array.&lt;object&gt;</code> | 

Checks if input is valid array of transaction objects.

<a name="module_transaction..isTailTransaction"></a>

### *transaction*~isTailTransaction(transaction)

| Param | Type |
| --- | --- |
| transaction | <code>object</code> | 

Checks if given transaction object is tail transaction.
A tail transaction is one with `currentIndex=0`.

