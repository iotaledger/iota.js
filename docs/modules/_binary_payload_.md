**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/payload"

# Module: "binary/payload"

## Index

### Variables

* [MAX\_INDEXATION\_KEY\_LENGTH](_binary_payload_.md#max_indexation_key_length)
* [MIN\_INDEXATION\_KEY\_LENGTH](_binary_payload_.md#min_indexation_key_length)
* [MIN\_INDEXATION\_PAYLOAD\_LENGTH](_binary_payload_.md#min_indexation_payload_length)
* [MIN\_MILESTONE\_PAYLOAD\_LENGTH](_binary_payload_.md#min_milestone_payload_length)
* [MIN\_PAYLOAD\_LENGTH](_binary_payload_.md#min_payload_length)
* [MIN\_RECEIPT\_PAYLOAD\_LENGTH](_binary_payload_.md#min_receipt_payload_length)
* [MIN\_TRANSACTION\_PAYLOAD\_LENGTH](_binary_payload_.md#min_transaction_payload_length)
* [MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH](_binary_payload_.md#min_treasury_transaction_payload_length)

### Functions

* [deserializeIndexationPayload](_binary_payload_.md#deserializeindexationpayload)
* [deserializeMilestonePayload](_binary_payload_.md#deserializemilestonepayload)
* [deserializePayload](_binary_payload_.md#deserializepayload)
* [deserializeReceiptPayload](_binary_payload_.md#deserializereceiptpayload)
* [deserializeTransactionPayload](_binary_payload_.md#deserializetransactionpayload)
* [deserializeTreasuryTransactionPayload](_binary_payload_.md#deserializetreasurytransactionpayload)
* [serializeIndexationPayload](_binary_payload_.md#serializeindexationpayload)
* [serializeMilestonePayload](_binary_payload_.md#serializemilestonepayload)
* [serializePayload](_binary_payload_.md#serializepayload)
* [serializeReceiptPayload](_binary_payload_.md#serializereceiptpayload)
* [serializeTransactionPayload](_binary_payload_.md#serializetransactionpayload)
* [serializeTreasuryTransactionPayload](_binary_payload_.md#serializetreasurytransactionpayload)

## Variables

### MAX\_INDEXATION\_KEY\_LENGTH

• `Const` **MAX\_INDEXATION\_KEY\_LENGTH**: number = 64

The maximum length of a indexation key.

___

### MIN\_INDEXATION\_KEY\_LENGTH

• `Const` **MIN\_INDEXATION\_KEY\_LENGTH**: number = 1

The minimum length of a indexation key.

___

### MIN\_INDEXATION\_PAYLOAD\_LENGTH

• `Const` **MIN\_INDEXATION\_PAYLOAD\_LENGTH**: number = MIN\_PAYLOAD\_LENGTH + // min payload STRING\_LENGTH + // index length 1 + // index min 1 byte STRING\_LENGTH

The minimum length of an indexation payload binary representation.

___

### MIN\_MILESTONE\_PAYLOAD\_LENGTH

• `Const` **MIN\_MILESTONE\_PAYLOAD\_LENGTH**: number = MIN\_PAYLOAD\_LENGTH + // min payload UINT32\_SIZE + // index UINT64\_SIZE + // timestamp MESSAGE\_ID\_LENGTH + // parent 1 MESSAGE\_ID\_LENGTH + // parent 2 MERKLE\_PROOF\_LENGTH + // merkle proof (2 * UINT32\_SIZE) + // Next pow score and pow score milestone index BYTE\_SIZE + // publicKeysCount Ed25519.PUBLIC\_KEY\_SIZE + // 1 public key BYTE\_SIZE + // signatureCount Ed25519.SIGNATURE\_SIZE

The minimum length of a milestone payload binary representation.

___

### MIN\_PAYLOAD\_LENGTH

• `Const` **MIN\_PAYLOAD\_LENGTH**: number = TYPE\_LENGTH

The minimum length of a payload binary representation.

___

### MIN\_RECEIPT\_PAYLOAD\_LENGTH

• `Const` **MIN\_RECEIPT\_PAYLOAD\_LENGTH**: number = MIN\_PAYLOAD\_LENGTH + UINT32\_SIZE + // migratedAt UINT16\_SIZE + // numFunds MIN\_MIGRATED\_FUNDS\_LENGTH

The minimum length of a receipt payload binary representation.

___

### MIN\_TRANSACTION\_PAYLOAD\_LENGTH

• `Const` **MIN\_TRANSACTION\_PAYLOAD\_LENGTH**: number = MIN\_PAYLOAD\_LENGTH + // min payload UINT32\_SIZE

The minimum length of a transaction payload binary representation.

___

### MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH

• `Const` **MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH**: number = MIN\_PAYLOAD\_LENGTH + MIN\_TREASURY\_INPUT\_LENGTH + MIN\_TREASURY\_OUTPUT\_LENGTH

The minimum length of a treasure transaction payload binary representation.

## Functions

### deserializeIndexationPayload

▸ **deserializeIndexationPayload**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md)

Deserialize the indexation payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md)

The deserialized object.

___

### deserializeMilestonePayload

▸ **deserializeMilestonePayload**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md)

Deserialize the milestone payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md)

The deserialized object.

___

### deserializePayload

▸ **deserializePayload**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) \| [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) \| [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) \| [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) \| [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md) \| undefined

Deserialize the payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) \| [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) \| [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) \| [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) \| [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md) \| undefined

The deserialized object.

___

### deserializeReceiptPayload

▸ **deserializeReceiptPayload**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md)

Deserialize the receipt payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md)

The deserialized object.

___

### deserializeTransactionPayload

▸ **deserializeTransactionPayload**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md)

Deserialize the transaction payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md)

The deserialized object.

___

### deserializeTreasuryTransactionPayload

▸ **deserializeTreasuryTransactionPayload**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md)

Deserialize the treasury transaction payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md)

The deserialized object.

___

### serializeIndexationPayload

▸ **serializeIndexationPayload**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md)): void

Serialize the indexation payload to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) | The object to serialize.  |

**Returns:** void

___

### serializeMilestonePayload

▸ **serializeMilestonePayload**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md)): void

Serialize the milestone payload to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) | The object to serialize.  |

**Returns:** void

___

### serializePayload

▸ **serializePayload**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) \| [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) \| [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) \| [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) \| [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md) \| undefined): void

Serialize the payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) \| [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) \| [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) \| [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) \| [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md) \| undefined | The object to serialize.  |

**Returns:** void

___

### serializeReceiptPayload

▸ **serializeReceiptPayload**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md)): void

Serialize the receipt payload to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md) | The object to serialize.  |

**Returns:** void

___

### serializeTransactionPayload

▸ **serializeTransactionPayload**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md)): void

Serialize the transaction payload to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) | The object to serialize.  |

**Returns:** void

___

### serializeTreasuryTransactionPayload

▸ **serializeTreasuryTransactionPayload**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md)): void

Serialize the treasury transaction payload to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) | The object to serialize.  |

**Returns:** void
