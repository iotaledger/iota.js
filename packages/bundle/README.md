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

    * [~createBundle([entries])](#module_bundle..createBundle)

    * [~addEntry(entry, bundle)](#module_bundle..addEntry)

    * [~finalizeBundle(bundle)](#module_bundle..finalizeBundle)

    * [~addSignatureOrMessage(bundle, signatureOrMessage, index)](#module_bundle..addSignatureOrMessage)

    * [~valueSum(bundle, offset, length)](#module_bundle..valueSum)


<a name="module_bundle..createBundle"></a>

### *bundle*~createBundle([entries])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entries] | <code>Array.&lt;BundleEntry&gt;</code> | <code>[]</code> | Entries of single or multiple transactions with the same address |

Creates a bundle with given transaction entries.

**Returns**: <code>Array.&lt;Int8Array&gt;</code> - List of transactions in the bundle  
<a name="module_bundle..addEntry"></a>

### *bundle*~addEntry(entry, bundle)

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>object</code> | Entry of a single or multiple transactions with the same address. |
| entry.address | <code>Int8Array</code> | Address. |
| entry.value | <code>Int8Array</code> | Value to transfer in iotas. |
| [entry.signatureOrMessage] | <code>Int8Array</code> | Signature or message fragment(s). |
| [entry.timestamp] | <code>Int8Array</code> | Issuance timestamp (in seconds). |
| [entry.tag] | <code>Int8Array</code> | Optional Tag, **Deprecated**. |
| bundle | <code>Int8Array</code> | Bundle buffer. |

Adds given transaction entry to a bundle.

**Returns**: <code>Int8Array</code> - Bundle copy with new entries.  
<a name="module_bundle..finalizeBundle"></a>

### *bundle*~finalizeBundle(bundle)

| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Int8Array</code> | Bundle transaction trits |

Finalizes a bundle by calculating the bundle hash.

**Returns**: <code>Int8Array</code> - List of transactions in the finalized bundle  
<a name="module_bundle..addSignatureOrMessage"></a>

### *bundle*~addSignatureOrMessage(bundle, signatureOrMessage, index)

| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Int8Array</code> | Bundle buffer. |
| signatureOrMessage | <code>Int8Array</code> | Signature or message to add. |
| index | <code>number</code> | Transaction index as entry point for signature or message fragments. |

Adds signature message fragments to transactions in a bundle starting at offset.

**Returns**: <code>Int8Array</code> - List of transactions in the updated bundle  
<a name="module_bundle..valueSum"></a>

### *bundle*~valueSum(bundle, offset, length)

| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Int8Array</code> | Bundle buffer. |
| offset | <code>number</code> | Offset from the start of the bundle buffer. |
| length | <code>number</code> | Length of transactions in which values should be summed. |

Sums up transaction values in a bundle starting at offset.

**Returns**: <code>number</code> - Total value of 'length' transactions in the bundle starting at offset.  
