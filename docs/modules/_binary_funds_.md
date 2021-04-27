**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/funds"

# Module: "binary/funds"

## Index

### Variables

* [MAX\_FUNDS\_COUNT](_binary_funds_.md#max_funds_count)
* [MIN\_MIGRATED\_FUNDS\_LENGTH](_binary_funds_.md#min_migrated_funds_length)
* [TAIL\_HASH\_LENGTH](_binary_funds_.md#tail_hash_length)

### Functions

* [deserializeFunds](_binary_funds_.md#deserializefunds)
* [deserializeMigratedFunds](_binary_funds_.md#deserializemigratedfunds)
* [serializeFunds](_binary_funds_.md#serializefunds)
* [serializeMigratedFunds](_binary_funds_.md#serializemigratedfunds)

## Variables

### MAX\_FUNDS\_COUNT

• `Const` **MAX\_FUNDS\_COUNT**: number = 127

The maximum number of funds.

___

### MIN\_MIGRATED\_FUNDS\_LENGTH

• `Const` **MIN\_MIGRATED\_FUNDS\_LENGTH**: number = TAIL\_HASH\_LENGTH + // tailTransactionHash MIN\_ED25519\_ADDRESS\_LENGTH + // address UINT64\_SIZE

The minimum length of a migrated fund binary representation.

___

### TAIL\_HASH\_LENGTH

• `Const` **TAIL\_HASH\_LENGTH**: number = 49

The length of the tail hash length in bytes.

## Functions

### deserializeFunds

▸ **deserializeFunds**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)[]

Deserialize the receipt payload funds from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)[]

The deserialized object.

___

### deserializeMigratedFunds

▸ **deserializeMigratedFunds**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)

Deserialize the migrated fund from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)

The deserialized object.

___

### serializeFunds

▸ **serializeFunds**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `objects`: [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)[]): void

Serialize the receipt payload funds to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`objects` | [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)[] | The objects to serialize.  |

**Returns:** void

___

### serializeMigratedFunds

▸ **serializeMigratedFunds**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)): void

Serialize the migrated funds to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md) | The object to serialize.  |

**Returns:** void
