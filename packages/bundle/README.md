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

    * _static_
        * [.addEntry(entry, bundle)](#module_bundle.addEntry)

        * [.finalizeBundle(bundle)](#module_bundle.finalizeBundle)

        * [.addSignatureOrMessage(bundle, signatureOrMessage, index)](#module_bundle.addSignatureOrMessage)

    * _inner_
        * [~createBundle([entries])](#module_bundle..createBundle)


<a name="module_bundle.addEntry"></a>

### *bundle*.addEntry(entry, bundle)
**Summary**: Adds the given transaction entry to a bundle array.  
**Throws**:

- <code>errors.ILLEGAL\_TRANSACTION\_BUFFER\_LENGTH</code> : Make sure that the `bundle` argument contains valid transaction trits
- <code>errors.ILLEGAL\_SIGNATURE\_OR\_MESSAGE\_LENGTH</code> : Make sure that the `entry.signatureOrMessage` argument contains 6,561 trits
- <code>errors.ILLEGAL\_ADDRESS\_LENGTH</code> : Make sure that the `entry.address` argument contains 243 trits
- <code>errors.ILLEGAL\_VALUE\_LENGTH</code> : Make sure that the `entry.value` argument contains 6,561 trits
- <code>errors.ILLEGAL\_ISSUANCE\_TIMESTAMP\_LENGTH</code> : Make sure that the `entry.timestamp` argument contains 81 trits


| Param | Type | Description |
| --- | --- | --- |
| entry | <code>object</code> | Transaction entry object |
| entry.address | <code>Int8Array</code> | An address in trits |
| entry.value | <code>Int8Array</code> | An amount of IOTA tokens in trits |
| [entry.signatureOrMessage] | <code>Int8Array</code> | Signature fragments or a message in trits |
| [entry.issuanceTimestamp] | <code>Int8Array</code> | Unix epoch in trits |
| [entry.tag] | <code>Int8Array</code> | (deprecated) |
| bundle | <code>Int8Array</code> | Bundle array to which to add the entry object |

Adds transaction trits in the given entry object to a given bundle array.

## Related methods

See the [converter](https://github.com/iotaledger/iota.js/tree/next/packages/converter) package for methods that convert values to trits.

**Returns**: <code>Int8Array</code> - A copy of the original bundle that also includes the added entries.  
**Example**  
```js
let bundle = new Int8Array();

bundle = Bundle.addEntry(bundle, {
 address: Converter.trytesToTrits(outputAddress),
 value: Converter.valueToTrits(value),
 issuanceTimestamp: Converter.valueToTrits(Math.floor(Date.now() / 1000));
});
```
<a name="module_bundle.finalizeBundle"></a>

### *bundle*.finalizeBundle(bundle)
**Summary**: Generates a bundle hash.  
**Throws**:

- <code>errors.ILLEGAL\_TRANSACTION\_BUFFER\_LENGTH</code> : Make sure that the `bundle` argument contains valid transaction trits


| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Int8Array</code> | Transaction trits |

This method takes an array of transaction trits, generates the bundle hash, and adds it to each transaction.

## Related methods

See the [`addEntry()`](#module_bundle.addEntry) method for creating new bundles.

**Returns**: <code>Int8Array</code> - Transaction trits that include a bundle hash  
**Example**  
```js
const result = Bundle.finalizeBundle(bundle);
```
<a name="module_bundle.addSignatureOrMessage"></a>

### *bundle*.addSignatureOrMessage(bundle, signatureOrMessage, index)
**Summary**: Adds signature message fragments to transactions in a bundle.  
**Throws**:

- <code>errors.ILLEGAL\_TRANSACTION\_BUFFER\_LENGTH</code> : Make sure that the `bundle` argument contains valid transaction trits
- <code>errors.ILLEGAL\_TRANSACTION\_INDEX</code> : Make sure that the `index` argument is a number and that the bundle contains enough transactions
- <code>errors.ILLEGAL\_SIGNATURE\_OR\_MESSAGE\_LENGTH</code> : Make sure that the `signatureOrMessage` argument contains at least 6,561 trits


| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Int8Array</code> | Transaction trits |
| signatureOrMessage | <code>Int8Array</code> | Signature or message to add to the bundle |
| index | <code>number</code> | Transaction index at which to start adding the signature or message |

This method takes an array of transaction trits, and add the given message or signature to the transactions, starting from the given index.

If the signature or message is too long to fit in a single transaction, it is split across the next transaction in the bundle, starting from the given index.

## Related methods

See the [`addEntry()`](#module_bundle.addEntry) method for creating new bundles.

**Returns**: <code>Int8Array</code> - Transaction trits that include a bundle hash.  
**Example**  
```js
const signature = Converter.trytesToTrits('SIGNATURE...')
bundle.set(Bundle.addSignatureOrMessage(bundle, signature, 1));
```
<a name="module_bundle..createBundle"></a>

### *bundle*~createBundle([entries])
**Summary**: Creates a bundle array from the given transaction entries.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entries] | <code>Array.&lt;BundleEntry&gt;</code> | <code>[]</code> | Entries of single or multiple transactions with the same address |

**Returns**: <code>Array.&lt;Int8Array&gt;</code> - List of transactions in the bundle  
