[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / HmacSha256

# Class: HmacSha256

Class to help with HmacSha256 scheme.
TypeScript conversion from https://github.com/emn178/js-sha256

## Hierarchy

* **HmacSha256**

## Index

### Constructors

* [constructor](index_browser.hmacsha256.md#constructor)

### Methods

* [digest](index_browser.hmacsha256.md#digest)
* [update](index_browser.hmacsha256.md#update)
* [sum256](index_browser.hmacsha256.md#sum256)

## Constructors

### constructor

\+ **new HmacSha256**(`key`: *Uint8Array*, `bits?`: *number*): [*HmacSha256*](crypto_hmacsha256.hmacsha256.md)

Create a new instance of HmacSha256.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`key` | *Uint8Array* | - | The key for the hmac.   |
`bits` | *number* | 256 | The number of bits.    |

**Returns:** [*HmacSha256*](crypto_hmacsha256.hmacsha256.md)

## Methods

### digest

▸ **digest**(): *Uint8Array*

Get the digest.

**Returns:** *Uint8Array*

The digest.

___

### update

▸ **update**(`message`: *Uint8Array*): [*HmacSha256*](crypto_hmacsha256.hmacsha256.md)

Update the hash with the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | *Uint8Array* | The data to update the hash with.   |

**Returns:** [*HmacSha256*](crypto_hmacsha256.hmacsha256.md)

The instance for chaining.

___

### sum256

▸ `Static`**sum256**(`key`: *Uint8Array*, `data`: *Uint8Array*): *Uint8Array*

Perform Sum 256 on the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *Uint8Array* | The key for the hmac.   |
`data` | *Uint8Array* | The data to operate on.   |

**Returns:** *Uint8Array*

The sum 256 of the data.
