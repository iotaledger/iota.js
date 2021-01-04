[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / Bech32Helper

# Class: Bech32Helper

Convert address to bech32.

## Hierarchy

* **Bech32Helper**

## Index

### Constructors

* [constructor](index_node.bech32helper.md#constructor)

### Properties

* [BECH32\_DEFAULT\_HRP\_MAIN](index_node.bech32helper.md#bech32_default_hrp_main)
* [BECH32\_DEFAULT\_HRP\_TEST](index_node.bech32helper.md#bech32_default_hrp_test)

### Methods

* [fromBech32](index_node.bech32helper.md#frombech32)
* [matches](index_node.bech32helper.md#matches)
* [toBech32](index_node.bech32helper.md#tobech32)

## Constructors

### constructor

\+ **new Bech32Helper**(): [*Bech32Helper*](utils_bech32helper.bech32helper.md)

**Returns:** [*Bech32Helper*](utils_bech32helper.bech32helper.md)

## Properties

### BECH32\_DEFAULT\_HRP\_MAIN

▪ `Static` **BECH32\_DEFAULT\_HRP\_MAIN**: *string*= "iot"

The default human readable part of the bech32 addresses for mainnet, currently 'iot'.

___

### BECH32\_DEFAULT\_HRP\_TEST

▪ `Static` **BECH32\_DEFAULT\_HRP\_TEST**: *string*= "toi"

The default human readable part of the bech32 addresses for testnet, currently 'toi'.

## Methods

### fromBech32

▸ `Static`**fromBech32**(`bech32Text`: *string*, `humanReadablePart?`: *string*): *undefined* \| {}

Decode an address from bech32.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`bech32Text` | *string* | - | The bech32 text to decode.   |
`humanReadablePart` | *string* | ... | The human readable part to use.   |

**Returns:** *undefined* \| {}

The address type and address bytes or undefined if it cannot be decoded.

___

### matches

▸ `Static`**matches**(`bech32Text?`: *string*, `humanReadablePart?`: *string*): *boolean*

Does the provided string look like it might be an bech32 address with matching hrp.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`bech32Text?` | *string* | - | The bech32 text to text.   |
`humanReadablePart` | *string* | ... | The human readable part to match.   |

**Returns:** *boolean*

True if the passed address matches the pattern for a bech32 address.

___

### toBech32

▸ `Static`**toBech32**(`addressType`: *number*, `addressBytes`: *Uint8Array*, `humanReadablePart?`: *string*): *string*

Encode an address to bech32.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`addressType` | *number* | - | The address type to encode.   |
`addressBytes` | *Uint8Array* | - | The address bytes to encode.   |
`humanReadablePart` | *string* | ... | The human readable part to use.   |

**Returns:** *string*

The array formated as hex.
