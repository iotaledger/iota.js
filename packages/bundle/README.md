# @iota/bundle

Utilities for generating and signing bundles.
A bundle in IOTA is an atomic set of transactions.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/bundle
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/bundle
```

## API Reference

    
* [bundle](#module_bundle)

    * [~createBundle(entries)](#module_bundle..createBundle)

    * [~addEntry(transactions, entry)](#module_bundle..addEntry)

    * [~addTrytes(transactions, fragments, [offset])](#module_bundle..addTrytes)

    * [~finalizeBundle(transactions)](#module_bundle..finalizeBundle)


<a name="module_bundle..createBundle"></a>

### *bundle*~createBundle(entries)

| Param | Type | Description |
| --- | --- | --- |
| entries | <code>Array.&lt;BundleEntry&gt;</code> | Entries of single or multiple transactions with the same address |

Creates a bundle with given transaction entries.

**Returns**: <code>Array.&lt;Transaction&gt;</code> - List of transactions in the bundle  
<a name="module_bundle..addEntry"></a>

### *bundle*~addEntry(transactions, entry)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transactions | <code>Array.&lt;Transaction&gt;</code> |  | List of transactions currently in the bundle |
| entry | <code>object</code> |  | Entry of a single or multiple transactions with the same address |
| [entry.length] | <code>number</code> | <code>1</code> | Entry length, which indicates how many transactions in the bundle it will occupy |
| [entry.address] | <code>Hash</code> |  | Address, defaults to all-9s |
| [entry.value] | <code>number</code> | <code>0</code> | Value to transfer in iotas |
| [entry.signatureMessageFragments] | <code>Array.&lt;Trytes&gt;</code> |  | List of signature message fragments, defaults to all-9s |
| [entry.timestamp] | <code>number</code> |  | Transaction timestamp, defaults to `Math.floor(Date.now() / 1000)` |
| [entry.tag] | <code>string</code> |  | Optional Tag, defaults to null tag (all-9s) |

Adds given transaction entry to a bundle.

**Returns**: <code>Array.&lt;Transaction&gt;</code> - List of transactions in the updated bundle  
<a name="module_bundle..addTrytes"></a>

### *bundle*~addTrytes(transactions, fragments, [offset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transactions | <code>Array.&lt;Transaction&gt;</code> |  | List of transactions in the bundle |
| fragments | <code>Array.&lt;Trytes&gt;</code> |  | List of signature message fragments to add |
| [offset] | <code>number</code> | <code>0</code> | Optional offset to start appending signature message fragments |

Adds signature message fragments to transactions in a bundle starting at offset.

**Returns**: <code>Array.&lt;Transaction&gt;</code> - List of transactions in the updated bundle  
<a name="module_bundle..finalizeBundle"></a>

### *bundle*~finalizeBundle(transactions)

| Param | Type | Description |
| --- | --- | --- |
| transactions | <code>Array.&lt;Transaction&gt;</code> | List of transactions in the bundle |

Finalizes a bundle by calculating the bundle hash.

**Returns**: <code>Array.&lt;Transaction&gt;</code> - List of transactions in the finalized bundle  
