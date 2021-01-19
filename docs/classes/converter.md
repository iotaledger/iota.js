**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / Converter

# Class: Converter

Convert arrays to and from different formats.

## Hierarchy

* **Converter**

## Index

### Methods

* [base64ToBytes](converter.md#base64tobytes)
* [binaryToBytes](converter.md#binarytobytes)
* [bytesToBase64](converter.md#bytestobase64)
* [bytesToBinary](converter.md#bytestobinary)
* [bytesToHex](converter.md#bytestohex)
* [bytesToUtf8](converter.md#bytestoutf8)
* [hexToBytes](converter.md#hextobytes)
* [hexToUtf8](converter.md#hextoutf8)
* [isHex](converter.md#ishex)
* [utf8ToBytes](converter.md#utf8tobytes)
* [utf8ToHex](converter.md#utf8tohex)

## Methods

### base64ToBytes

▸ `Static`**base64ToBytes**(`base64`: string): Uint8Array

Convert a base64 string to bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`base64` | string | The base64 string. |

**Returns:** Uint8Array

The bytes.

___

### binaryToBytes

▸ `Static`**binaryToBytes**(`binary`: string): Uint8Array

Convert a binary string to bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`binary` | string | The binary string. |

**Returns:** Uint8Array

The bytes.

___

### bytesToBase64

▸ `Static`**bytesToBase64**(`bytes`: Uint8Array): string

Convert bytes to base64 string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Uint8Array | The bytes to convert. |

**Returns:** string

A base64 string of the bytes.

___

### bytesToBinary

▸ `Static`**bytesToBinary**(`bytes`: Uint8Array): string

Convert bytes to binary string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Uint8Array | The bytes to convert. |

**Returns:** string

A binary string of the bytes.

___

### bytesToHex

▸ `Static`**bytesToHex**(`array`: ArrayLike<number\>, `startIndex?`: undefined \| number, `length?`: number \| undefined, `reverse?`: undefined \| false \| true): string

Encode a raw array to hex string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | ArrayLike<number\> | The bytes to encode. |
`startIndex?` | undefined \| number | The index to start in the bytes. |
`length?` | number \| undefined | The length of bytes to read. |
`reverse?` | undefined \| false \| true | Reverse the combine direction. |

**Returns:** string

The array formated as hex.

___

### bytesToUtf8

▸ `Static`**bytesToUtf8**(`array`: ArrayLike<number\>, `startIndex?`: undefined \| number, `length?`: number \| undefined): string

Encode a raw array to UTF8 string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | ArrayLike<number\> | The bytes to encode. |
`startIndex?` | undefined \| number | The index to start in the bytes. |
`length?` | number \| undefined | The length of bytes to read. |

**Returns:** string

The array formated as UTF8.

___

### hexToBytes

▸ `Static`**hexToBytes**(`hex`: string, `reverse?`: undefined \| false \| true): Uint8Array

Decode a hex string to raw array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`hex` | string | The hex to decode. |
`reverse?` | undefined \| false \| true | Store the characters in reverse. |

**Returns:** Uint8Array

The array.

___

### hexToUtf8

▸ `Static`**hexToUtf8**(`hex`: string): string

Convert the hex text to text.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`hex` | string | The hex to convert. |

**Returns:** string

The UTF8 version of the bytes.

___

### isHex

▸ `Static`**isHex**(`value`: string): boolean

Is the data hex format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | The value to test. |

**Returns:** boolean

true if the string is hex.

___

### utf8ToBytes

▸ `Static`**utf8ToBytes**(`utf8`: string): Uint8Array

Convert a UTF8 string to raw array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`utf8` | string | The text to decode. |

**Returns:** Uint8Array

The array.

___

### utf8ToHex

▸ `Static`**utf8ToHex**(`utf8`: string): string

Convert the UTF8 to hex.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`utf8` | string | The text to convert. |

**Returns:** string

The hex version of the bytes.
