**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/unlockBlock"

# Module: "binary/unlockBlock"

## Index

### Variables

* [MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH](_binary_unlockblock_.md#min_reference_unlock_block_length)
* [MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH](_binary_unlockblock_.md#min_signature_unlock_block_length)
* [MIN\_UNLOCK\_BLOCK\_LENGTH](_binary_unlockblock_.md#min_unlock_block_length)

### Functions

* [deserializeReferenceUnlockBlock](_binary_unlockblock_.md#deserializereferenceunlockblock)
* [deserializeSignatureUnlockBlock](_binary_unlockblock_.md#deserializesignatureunlockblock)
* [deserializeUnlockBlock](_binary_unlockblock_.md#deserializeunlockblock)
* [deserializeUnlockBlocks](_binary_unlockblock_.md#deserializeunlockblocks)
* [serializeReferenceUnlockBlock](_binary_unlockblock_.md#serializereferenceunlockblock)
* [serializeSignatureUnlockBlock](_binary_unlockblock_.md#serializesignatureunlockblock)
* [serializeUnlockBlock](_binary_unlockblock_.md#serializeunlockblock)
* [serializeUnlockBlocks](_binary_unlockblock_.md#serializeunlockblocks)

## Variables

### MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH

• `Const` **MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH**: number = MIN\_UNLOCK\_BLOCK\_LENGTH + UINT16\_SIZE

The minimum length of a reference unlock block binary representation.

___

### MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH

• `Const` **MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH**: number = MIN\_UNLOCK\_BLOCK\_LENGTH + MIN\_SIGNATURE\_LENGTH

The minimum length of a signature unlock block binary representation.

___

### MIN\_UNLOCK\_BLOCK\_LENGTH

• `Const` **MIN\_UNLOCK\_BLOCK\_LENGTH**: number = SMALL\_TYPE\_LENGTH

The minimum length of an unlock block binary representation.

## Functions

### deserializeReferenceUnlockBlock

▸ **deserializeReferenceUnlockBlock**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md)

Deserialize the reference unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md)

The deserialized object.

___

### deserializeSignatureUnlockBlock

▸ **deserializeSignatureUnlockBlock**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md)

Deserialize the signature unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md)

The deserialized object.

___

### deserializeUnlockBlock

▸ **deserializeUnlockBlock**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md)

Deserialize the unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md)

The deserialized object.

___

### deserializeUnlockBlocks

▸ **deserializeUnlockBlocks**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): ([ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md))[]

Deserialize the unlock blocks from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** ([ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md))[]

The deserialized object.

___

### serializeReferenceUnlockBlock

▸ **serializeReferenceUnlockBlock**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md)): void

Serialize the reference unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md) | The object to serialize.  |

**Returns:** void

___

### serializeSignatureUnlockBlock

▸ **serializeSignatureUnlockBlock**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md)): void

Serialize the signature unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) | The object to serialize.  |

**Returns:** void

___

### serializeUnlockBlock

▸ **serializeUnlockBlock**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md)): void

Serialize the unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md) | The object to serialize.  |

**Returns:** void

___

### serializeUnlockBlocks

▸ **serializeUnlockBlocks**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `objects`: ([ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md))[]): void

Serialize the unlock blocks to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`objects` | ([ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md))[] | The objects to serialize.  |

**Returns:** void
