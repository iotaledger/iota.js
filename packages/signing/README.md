# @iota/signing

IOTA Signing Scheme

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/signing
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/signing
```

## API Reference

    
* [signing](#module_signing)

    * [~subseed(seed, index)](#module_signing..subseed)

    * [~key(subseedTrits, length)](#module_signing..key)

    * [~digests(key)](#module_signing..digests)

    * [~address(digests)](#module_signing..address)

    * [~digest(normalizedBundleFragment, signatureFragment)](#module_signing..digest)

    * [~signatureFragment(normalizeBundleFragment, keyFragment)](#module_signing..signatureFragment)

    * [~validateSignatures(expectedAddress, signatureFragments, bundleHash)](#module_signing..validateSignatures)

    * [~normalizedBundleHash(bundlehash)](#module_signing..normalizedBundleHash)


<a name="module_signing..subseed"></a>

### *signing*~subseed(seed, index)

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>Int8Array</code> | Seed trits |
| index | <code>number</code> | Private key index |

**Returns**: <code>Int8Array</code> - subseed trits  
<a name="module_signing..key"></a>

### *signing*~key(subseedTrits, length)

| Param | Type | Description |
| --- | --- | --- |
| subseedTrits | <code>Int8Array</code> | Subseed trits |
| length | <code>number</code> | Private key length |

**Returns**: <code>Int8Array</code> - Private key trits  
<a name="module_signing..digests"></a>

### *signing*~digests(key)

| Param | Type | Description |
| --- | --- | --- |
| key | <code>Int8Array</code> | Private key trits |

<a name="module_signing..address"></a>

### *signing*~address(digests)

| Param | Type | Description |
| --- | --- | --- |
| digests | <code>Int8Array</code> | Digests trits |

**Returns**: <code>Int8Array</code> - Address trits  
<a name="module_signing..digest"></a>

### *signing*~digest(normalizedBundleFragment, signatureFragment)

| Param | Type | Description |
| --- | --- | --- |
| normalizedBundleFragment | <code>array</code> | Normalized bundle fragment |
| signatureFragment | <code>Int8Array</code> | Signature fragment trits |

**Returns**: <code>Int8Array</code> - Digest trits  
<a name="module_signing..signatureFragment"></a>

### *signing*~signatureFragment(normalizeBundleFragment, keyFragment)

| Param | Type | Description |
| --- | --- | --- |
| normalizeBundleFragment | <code>array</code> | normalized bundle fragment |
| keyFragment | <code>keyFragment</code> | key fragment trits |

**Returns**: <code>Int8Array</code> - Signature Fragment trits  
<a name="module_signing..validateSignatures"></a>

### *signing*~validateSignatures(expectedAddress, signatureFragments, bundleHash)

| Param | Type | Description |
| --- | --- | --- |
| expectedAddress | <code>string</code> | Expected address trytes |
| signatureFragments | <code>array</code> | Array of signatureFragments trytes |
| bundleHash | <code>string</code> | Bundle hash trytes |

<a name="module_signing..normalizedBundleHash"></a>

### *signing*~normalizedBundleHash(bundlehash)

| Param | Type | Description |
| --- | --- | --- |
| bundlehash | <code>Hash</code> | Bundle hash trytes |

Normalizes the bundle hash, with resulting digits summing to zero.

**Returns**: <code>Int8Array</code> - Normalized bundle hash  
