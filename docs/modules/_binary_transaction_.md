**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/transaction"

# Module: "binary/transaction"

## Index

### Variables

* [MIN\_TRANSACTION\_ESSENCE\_LENGTH](_binary_transaction_.md#min_transaction_essence_length)

### Functions

* [deserializeTransactionEssence](_binary_transaction_.md#deserializetransactionessence)
* [serializeTransactionEssence](_binary_transaction_.md#serializetransactionessence)

## Variables

### MIN\_TRANSACTION\_ESSENCE\_LENGTH

• `Const` **MIN\_TRANSACTION\_ESSENCE\_LENGTH**: number = SMALL\_TYPE\_LENGTH + (2 * ARRAY\_LENGTH) + UINT32\_SIZE

The minimum length of a transaction essence binary representation.

## Functions

### deserializeTransactionEssence

▸ **deserializeTransactionEssence**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ITransactionEssence](../interfaces/_models_itransactionessence_.itransactionessence.md)

Deserialize the transaction essence from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ITransactionEssence](../interfaces/_models_itransactionessence_.itransactionessence.md)

The deserialized object.

___

### serializeTransactionEssence

▸ **serializeTransactionEssence**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ITransactionEssence](../interfaces/_models_itransactionessence_.itransactionessence.md)): void

Serialize the transaction essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ITransactionEssence](../interfaces/_models_itransactionessence_.itransactionessence.md) | The object to serialize.  |

**Returns:** void
