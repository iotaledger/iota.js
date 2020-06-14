# @iota/bundle-validator

Syntactically validates bundle structure and signatures.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/bundle-validator
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/bundle-validator
```

## API Reference

    
* [bundle-validator](#module_bundle-validator)

    * [.validateBundleSignatures(bundle)](#module_bundle-validator.validateBundleSignatures)

    * [.isBundle(bundle)](#module_bundle-validator.isBundle)


<a name="module_bundle-validator.validateBundleSignatures"></a>

### *bundle-validator*.validateBundleSignatures(bundle)
**Summary**: Validates the signatures in a given bundle  

| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Array.&lt;Transaction&gt;</code> | Transaction trytes |

This method takes an array of transaction trytes and checks if the signatures are valid.

## Related methods

To get a bundle's transaction trytes from the Tangle, use the [`getBundle()`](#module_core.getBundle) method.

**Returns**: <code>boolean</code> - Whether the signatures are valid  
**Example**  
```js
let valid = Validator.validateBundleSignatures(bundle);
```
<a name="module_bundle-validator.isBundle"></a>

### *bundle-validator*.isBundle(bundle)
**Summary**: Validates the structure and contents of a given bundle.  

| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Array.&lt;Transaction&gt;</code> | Transaction trytes |

This method takes an array of transaction trytes and validates whether they form a valid bundle by checking the following:

- Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
- Transactions in the bundle array are in the same order as their `currentIndex` field
- The total value of all transactions in the bundle sums to 0
- The bundle hash is valid

## Related methods

To get a bundle's transaction trytes from the Tangle, use the [`getBundle()`](#module_core.getBundle) method.

**Returns**: <code>boolean</code> - bundle - Whether the bundle is valid  
**Example**  
```js
let bundle = Validator.isBundle(bundle);
```
