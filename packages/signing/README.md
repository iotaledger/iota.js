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

    * [.subseed(seed, index)](#module_signing.subseed)

    * [.key(subseedTrits, numberOfFragments)](#module_signing.key)

    * [.digests(key)](#module_signing.digests)

    * [.address(digests)](#module_signing.address)

    * [.validateSignatures(expectedAddress, signatureFragments, bundle)](#module_signing.validateSignatures)

    * [.normalizedBundle(bundle)](#module_signing.normalizedBundle)


<a name="module_signing.subseed"></a>

### *signing*.subseed(seed, index)
**Summary**: Generates a subseed.  
**Throws**:

- <code>errors.ILLEGAL\_SUBSEED\_INDEX</code> : Make sure that the `index` argument is a number greater than 0.


| Param | Type | Description |
| --- | --- | --- |
| seed | <code>Int8Array</code> | A 243-trit seed to use to derive the subseed |
| index | <code>number</code> | The private key index to use to derive the subseed |

This method derives a subseed from a seed and a private key index.

You can use the subseed to [derive private keys and their addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys).

**Note:** If the given seed is less then 243 trits, 0 trits are appended to it until it is 243 trits long.

## Related methods

To convert a seed from trytes to trits, use the [`trytesToTrits()`](#module_converter.trytesToTrits) method.

To derive a private key from the subseed, use the [`key()`](#module_signing.key) method.

**Returns**: <code>Int8Array</code> - subseed - A subseed in trits  
**Example**  
```js
const seed = 'MYSUPERSECRETSEED...';
const subseed = Sign.subseed(Converter.trytesToTrits(seed), 0);
```
<a name="module_signing.key"></a>

### *signing*.key(subseedTrits, numberOfFragments)
**Summary**: Generates a private key.  
**Throws**:

- <code>errors.ILLEGAL\_SUBSEED\_LENGTH</code> : Make sure that the `subseedTrits` argument contains 243 trits.
- <code>errors.ILLEGAL\_NUMBER\_OF\_FRAGMENTS</code> : Make sure that the `numberOfFragments` argument is a valid security level (between 1 and 3).


| Param | Type | Description |
| --- | --- | --- |
| subseedTrits | <code>Int8Array</code> | A subseed in trits |
| numberOfFragments | <code>number</code> | The security level that you want the private key to have |

This method derives a private key from a subseed.

You can use the private key to [derive an address](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys) and to sign bundles that withdraw from that address.

## Related methods

To generate a subseed, use the [`subseed()`](#module_signing.subseed) method.

**Returns**: <code>Int8Array</code> - privateKey - A private key in trits.  
**Example**  
```js
const seed = 'MYSUPERSECRETSEED...';
const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);

const privateKey = Signing.key(subseed, 2);
```
<a name="module_signing.digests"></a>

### *signing*.digests(key)
**Summary**: Generates key digests for a given private key.  
**Throws**:

- <code>errors.ILLEGAL\_KEY\_LENGTH</code> : Make sure that the `key` argument contains 2,187, 4,374, or 6,561 trits.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>Int8Array</code> | Private key in trits |

This method derives key digests from a private key.

You can use the key digests to [generate an address](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys).

## Related methods

To generate a private key, use the [`key()`](#module_signing.key) method.

**Returns**: <code>Int8Array</code> - digests - Key digests in trits  
**Example**  
```js
const seed = 'MYSUPERSECRETSEED...';
const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);

const privateKey = Signing.key(subseed, 2);

const digests = Signing.digests(privateKey);
```
<a name="module_signing.address"></a>

### *signing*.address(digests)
**Summary**: Derives an address from the given key digests.  
**Throws**:

- <code>errors.ILLEGAL\_DIGESTS\_LENGTH</code> : Make sure that the `digests` argument contains a multiple of 243 trits.


| Param | Type | Description |
| --- | --- | --- |
| digests | <code>Int8Array</code> | Key digests in trits |

This method derives a 243-trit address from the given key digests.

## Related methods

To generate a private key, use the [`key()`](#module_signing.key) method.

**Returns**: <code>Int8Array</code> - address - Address in trits  
**Example**  
```js
const seed = 'MYSUPERSECRETSEED...';
const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);

const privateKey = Signing.key(subseed, 2);

const digests = Signing.digests(privateKey);

const address = Signing.address(digests);
```
<a name="module_signing.validateSignatures"></a>

### *signing*.validateSignatures(expectedAddress, signatureFragments, bundle)
**Summary**: Validates the given signature, using the given bundle and address.  
**Throws**:

- <code>errors.ILLEGAL\_BUNDLE\_HASH\_LENGTH</code> : Make sure that the `bundle` argument contains a 243-trit bundle hash.


| Param | Type | Description |
| --- | --- | --- |
| expectedAddress | <code>Int8Array</code> | Input address in trits |
| signatureFragments | <code>Array.&lt;Int8Array&gt;</code> | Signature fragments in trits |
| bundle | <code>Int8Array</code> | Bundle hash in trits |

This method validates a signature by doing the following:

- Normalizing the bundle hash
- Deriving the key digests of the address, using the normalized bundle hash and the signature
-.Deriving an address from the key digests
- Comparing the derived address to the `expectedAddress` argument to find out if they match

If the addresses match, the signature is valid.

For more information about signatures see the [documentation portal](https://docs.iota.org/docs/getting-started/0.1/clients/signatures).

## Related methods

To convert trytes such as bundle hashes and addresses to trits, use the [`trytesToTrits()`](#module_converter.trytesToTrits) method.

**Returns**: <code>boolean</code> - valid - Whether the signatures are valid.  
**Example**  
```js
let valid = Signing.validateSignatures(expectedAddress, signatureFragments, bundle);
```
<a name="module_signing.normalizedBundle"></a>

### *signing*.normalizedBundle(bundle)
**Summary**: Normalizes the bundle hash.  
**Throws**:

- <code>errors.ILLEGAL\_BUNDLE\_HASH\_LENGTH</code> : Make sure that the `bundle` argument contains a 243-trit bundle hash.


| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>Int8Array</code> | Bundle hash in trits |

This method normalizes the given bundle hash to make sure that only around half of the private key is revealed when the bundle hash is signed.

For more information about signatures see the [documentation portal](https://docs.iota.org/docs/getting-started/0.1/clients/signatures).

To find out more about why the bundle hash is normalized, see [this answer on StackExchange](https://iota.stackexchange.com/questions/1588/why-is-the-bundle-hash-normalized).

## Related methods

To convert a bundle hash from trytes to trits, use the [`trytesToTrits()`](#module_converter.trytesToTrits) method.

**Returns**: <code>Int8Array</code> - Normalized bundle hash in trits  
**Example**  
```js
let normalizedBundleHash = Signing.normalizedBundle(bundle);
```
