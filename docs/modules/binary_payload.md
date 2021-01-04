[@iota/iota.js](../README.md) / binary/payload

# Module: binary/payload

## Index

### Variables

* [MAX\_INDEXATION\_KEY\_LENGTH](binary_payload.md#max_indexation_key_length)

### Functions

* [deserializeIndexationPayload](binary_payload.md#deserializeindexationpayload)
* [deserializeMilestonePayload](binary_payload.md#deserializemilestonepayload)
* [deserializePayload](binary_payload.md#deserializepayload)
* [deserializeTransactionPayload](binary_payload.md#deserializetransactionpayload)
* [serializeIndexationPayload](binary_payload.md#serializeindexationpayload)
* [serializeMilestonePayload](binary_payload.md#serializemilestonepayload)
* [serializePayload](binary_payload.md#serializepayload)
* [serializeTransactionPayload](binary_payload.md#serializetransactionpayload)

## Variables

### MAX\_INDEXATION\_KEY\_LENGTH

• `Const` **MAX\_INDEXATION\_KEY\_LENGTH**: *number*= 64

The maximum length of a indexation key.

## Functions

### deserializeIndexationPayload

▸ **deserializeIndexationPayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md)

Deserialize the indexation payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md)

The deserialized object.

___

### deserializeMilestonePayload

▸ **deserializeMilestonePayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md)

Deserialize the milestone payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md)

The deserialized object.

___

### deserializePayload

▸ **deserializePayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

Deserialize the payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

The deserialized object.

___

### deserializeTransactionPayload

▸ **deserializeTransactionPayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

Deserialize the transaction payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

The deserialized object.

___

### serializeIndexationPayload

▸ **serializeIndexationPayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md)): *void*

Serialize the indexation payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeMilestonePayload

▸ **serializeMilestonePayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md)): *void*

Serialize the milestone payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) | The object to serialize.    |

**Returns:** *void*

___

### serializePayload

▸ **serializePayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)): *void*

Serialize the payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeTransactionPayload

▸ **serializeTransactionPayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)): *void*

Serialize the transaction payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md) | The object to serialize.    |

**Returns:** *void*
