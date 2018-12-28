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

    * [~validateSignatures(bundle)](#module_bundle-validator..validateSignatures)

    * [~isBundle(bundle)](#module_bundle-validator..isBundle)


<a name="module_bundle-validator..validateSignatures"></a>

### *bundle-validator*~validateSignatures(bundle)

| Param | Type |
| --- | --- |
| bundle | <code>Array.&lt;Transaction&gt;</code> | 

Validates all signatures of a bundle.

<a name="module_bundle-validator..isBundle"></a>

### *bundle-validator*~isBundle(bundle)

| Param | Type |
| --- | --- |
| bundle | <code>Array.&lt;Transaction&gt;</code> | 

Checks if a bundle is _syntactically_ valid.
Validates signatures and overall structure.

