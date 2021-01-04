[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / Converter

# Class: Converter

Convert arrays to and from different formats.

## Hierarchy

* **Converter**

## Index

### Constructors

* [constructor](index_node.converter.md#constructor)

### Methods

* [asciiToBytes](index_node.converter.md#asciitobytes)
* [asciiToHex](index_node.converter.md#asciitohex)
* [binaryToBytes](index_node.converter.md#binarytobytes)
* [bytesToAscii](index_node.converter.md#bytestoascii)
* [bytesToBinary](index_node.converter.md#bytestobinary)
* [bytesToHex](index_node.converter.md#bytestohex)
* [hexToAscii](index_node.converter.md#hextoascii)
* [hexToBytes](index_node.converter.md#hextobytes)
* [isHex](index_node.converter.md#ishex)

## Constructors

### constructor

\+ **new Converter**(): [*Converter*](utils_converter.converter.md)

**Returns:** [*Converter*](utils_converter.converter.md)

## Methods

### asciiToBytes

▸ `Static`**asciiToBytes**(`ascii`: *string*): *Uint8Array*

Decode a text string to raw array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ascii` | *string* | The text to decode.   |

**Returns:** *Uint8Array*

The array.

___

### asciiToHex

▸ `Static`**asciiToHex**(`ascii`: *string*): *string*

Convert the ascii text to hex.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ascii` | *string* | The ascii to convert.   |

**Returns:** *string*

The hex version of the bytes.

___

### binaryToBytes

▸ `Static`**binaryToBytes**(`binary`: *string*): *Uint8Array*

Convert a binary string to bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`binary` | *string* | The binary string.   |

**Returns:** *Uint8Array*

The bytes.

___

### bytesToAscii

▸ `Static`**bytesToAscii**(`array`: *ArrayLike*<*number*\>, `startIndex?`: *number*, `length?`: *number*): *string*

Encode a raw array to text string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | *ArrayLike*<*number*\> | The bytes to encode.   |
`startIndex?` | *number* | The index to start in the bytes.   |
`length?` | *number* | The length of bytes to read.   |

**Returns:** *string*

The array formated as hex.

___

### bytesToBinary

▸ `Static`**bytesToBinary**(`bytes`: *Uint8Array*): *string*

Convert bytes to binary string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bytes` | *Uint8Array* | The bytes to convert.   |

**Returns:** *string*

A binary string of the bytes.

___

### bytesToHex

▸ `Static`**bytesToHex**(`array`: *ArrayLike*<*number*\>, `startIndex?`: *number*, `length?`: *number*, `reverse?`: *boolean*): *string*

Encode a raw array to hex string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | *ArrayLike*<*number*\> | The bytes to encode.   |
`startIndex?` | *number* | The index to start in the bytes.   |
`length?` | *number* | The length of bytes to read.   |
`reverse?` | *boolean* | Reverse the combine direction.   |

**Returns:** *string*

The array formated as hex.

___

### hexToAscii

▸ `Static`**hexToAscii**(`hex`: *string*): *string*

Convert the hex text to ascii.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`hex` | *string* | The hex to convert.   |

**Returns:** *string*

The ascii version of the bytes.

___

### hexToBytes

▸ `Static`**hexToBytes**(`hex`: *string*, `reverse?`: *boolean*): *Uint8Array*

Decode a hex string to raw array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`hex` | *string* | The hex to decode.   |
`reverse?` | *boolean* | Store the characters in reverse.   |

**Returns:** *Uint8Array*

The array.

___

### isHex

▸ `Static`**isHex**(`value`: *string*): *boolean*

Is the data hex format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | The value to test.   |

**Returns:** *boolean*

true if the string is hex.
