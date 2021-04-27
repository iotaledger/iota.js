**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/addresses"

# Module: "highLevel/addresses"

## Index

### Functions

* [generateBip44Address](_highlevel_addresses_.md#generatebip44address)
* [generateBip44Path](_highlevel_addresses_.md#generatebip44path)

## Functions

### generateBip44Address

▸ **generateBip44Address**(`generatorState`: [IBip44GeneratorState](../interfaces/_models_ibip44generatorstate_.ibip44generatorstate.md), `isFirst`: boolean): string

Generate addresses based on the account indexing style.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`generatorState` | [IBip44GeneratorState](../interfaces/_models_ibip44generatorstate_.ibip44generatorstate.md) | The address state. |
`isFirst` | boolean | Is this the first address we are generating. |

**Returns:** string

The key pair for the address.

___

### generateBip44Path

▸ **generateBip44Path**(`accountIndex`: number, `addressIndex`: number, `isInternal`: boolean): [Bip32Path](../classes/_crypto_bip32path_.bip32path.md)

Generate a bip44 path based on all its parts.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`accountIndex` | number | The account index. |
`addressIndex` | number | The address index. |
`isInternal` | boolean | Is this an internal address. |

**Returns:** [Bip32Path](../classes/_crypto_bip32path_.bip32path.md)

The generated address.
