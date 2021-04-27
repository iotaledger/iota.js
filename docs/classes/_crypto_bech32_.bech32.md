**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["crypto/bech32"](../modules/_crypto_bech32_.md) / Bech32

# Class: Bech32

Class to help with Bech32 encoding/decoding.
Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js

## Hierarchy

* **Bech32**

## Index

### Methods

* [decode](_crypto_bech32_.bech32.md#decode)
* [decodeTo5BitArray](_crypto_bech32_.bech32.md#decodeto5bitarray)
* [encode](_crypto_bech32_.bech32.md#encode)
* [encode5BitArray](_crypto_bech32_.bech32.md#encode5bitarray)
* [from5Bit](_crypto_bech32_.bech32.md#from5bit)
* [matches](_crypto_bech32_.bech32.md#matches)
* [to5Bit](_crypto_bech32_.bech32.md#to5bit)

## Methods

### decode

▸ `Static`**decode**(`bech`: string): { data: Uint8Array ; humanReadablePart: string  } \| undefined

Decode a bech32 string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bech` | string | The text to decode. |

**Returns:** { data: Uint8Array ; humanReadablePart: string  } \| undefined

The decoded data or undefined if it could not be decoded.

___

### decodeTo5BitArray

▸ `Static`**decodeTo5BitArray**(`bech`: string): { data: Uint8Array ; humanReadablePart: string  } \| undefined

Decode a bech32 string to 5 bit array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bech` | string | The text to decode. |

**Returns:** { data: Uint8Array ; humanReadablePart: string  } \| undefined

The decoded data or undefined if it could not be decoded.

___

### encode

▸ `Static`**encode**(`humanReadablePart`: string, `data`: Uint8Array): string

Encode the buffer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`humanReadablePart` | string | The header |
`data` | Uint8Array | The data to encode. |

**Returns:** string

The encoded data.

___

### encode5BitArray

▸ `Static`**encode5BitArray**(`humanReadablePart`: string, `data5Bit`: Uint8Array): string

Encode the 5 bit data buffer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`humanReadablePart` | string | The header |
`data5Bit` | Uint8Array | The data to encode. |

**Returns:** string

The encoded data.

___

### from5Bit

▸ `Static`**from5Bit**(`fiveBit`: Uint8Array): Uint8Array

Convert the 5 bit data to 8 bit.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`fiveBit` | Uint8Array | The 5 bit data to convert. |

**Returns:** Uint8Array

The 5 bit data converted to 8 bit.

___

### matches

▸ `Static`**matches**(`humanReadablePart`: string, `bech32Text?`: undefined \| string): boolean

Does the given string match the bech32 pattern.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`humanReadablePart` | string | The human readable part. |
`bech32Text?` | undefined \| string | The text to test. |

**Returns:** boolean

True if this is potentially a match.

___

### to5Bit

▸ `Static`**to5Bit**(`bytes`: Uint8Array): Uint8Array

Convert the input bytes into 5 bit data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Uint8Array | The bytes to convert. |

**Returns:** Uint8Array

The data in 5 bit form.
