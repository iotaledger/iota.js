[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / HmacSha512

# Class: HmacSha512

Class to help with HmacSha512 scheme.
TypeScript conversion from https://github.com/emn178/js-sha512

## Hierarchy

* **HmacSha512**

## Index

### Constructors

* [constructor](index_browser.hmacsha512.md#constructor)

### Methods

* [digest](index_browser.hmacsha512.md#digest)
* [update](index_browser.hmacsha512.md#update)
* [sum512](index_browser.hmacsha512.md#sum512)

## Constructors

### constructor

\+ **new HmacSha512**(`key`: *Uint8Array*, `bits?`: *number*): [*HmacSha512*](crypto_hmacsha512.hmacsha512.md)

Create a new instance of HmacSha512.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`key` | *Uint8Array* | - | The key for the hmac.   |
`bits` | *number* | 512 | The number of bits.    |

**Returns:** [*HmacSha512*](crypto_hmacsha512.hmacsha512.md)

## Methods

### digest

▸ **digest**(): *Uint8Array*

Get the digest.

**Returns:** *Uint8Array*

The digest.

___

### update

▸ **update**(`message`: *Uint8Array*): [*HmacSha512*](crypto_hmacsha512.hmacsha512.md)

Update the hash with the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | *Uint8Array* | The data to update the hash with.   |

**Returns:** [*HmacSha512*](crypto_hmacsha512.hmacsha512.md)

The instance for chaining.

___

### sum512

▸ `Static`**sum512**(`key`: *Uint8Array*, `data`: *Uint8Array*): *Uint8Array*

Perform Sum 512 on the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *Uint8Array* | The key for the hmac.   |
`data` | *Uint8Array* | The data to operate on.   |

**Returns:** *Uint8Array*

The sum 512 of the data.
