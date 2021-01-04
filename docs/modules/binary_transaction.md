[@iota/iota.js](../README.md) / binary/transaction

# Module: binary/transaction

## Index

### Functions

* [deserializeTransactionEssence](binary_transaction.md#deserializetransactionessence)
* [serializeTransactionEssence](binary_transaction.md#serializetransactionessence)

## Functions

### deserializeTransactionEssence

▸ **deserializeTransactionEssence**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md)

Deserialize the transaction essence from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md)

The deserialized object.

___

### serializeTransactionEssence

▸ **serializeTransactionEssence**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md)): *void*

Serialize the transaction essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md) | The object to serialize.    |

**Returns:** *void*
