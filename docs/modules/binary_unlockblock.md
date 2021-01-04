[@iota/iota.js](../README.md) / binary/unlockBlock

# Module: binary/unlockBlock

## Index

### Functions

* [deserializeReferenceUnlockBlock](binary_unlockblock.md#deserializereferenceunlockblock)
* [deserializeSignatureUnlockBlock](binary_unlockblock.md#deserializesignatureunlockblock)
* [deserializeUnlockBlock](binary_unlockblock.md#deserializeunlockblock)
* [deserializeUnlockBlocks](binary_unlockblock.md#deserializeunlockblocks)
* [serializeReferenceUnlockBlock](binary_unlockblock.md#serializereferenceunlockblock)
* [serializeSignatureUnlockBlock](binary_unlockblock.md#serializesignatureunlockblock)
* [serializeUnlockBlock](binary_unlockblock.md#serializeunlockblock)
* [serializeUnlockBlocks](binary_unlockblock.md#serializeunlockblocks)

## Functions

### deserializeReferenceUnlockBlock

▸ **deserializeReferenceUnlockBlock**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md)

Deserialize the reference unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md)

The deserialized object.

___

### deserializeSignatureUnlockBlock

▸ **deserializeSignatureUnlockBlock**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

Deserialize the signature unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

The deserialized object.

___

### deserializeUnlockBlock

▸ **deserializeUnlockBlock**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

Deserialize the unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

The deserialized object.

___

### deserializeUnlockBlocks

▸ **deserializeUnlockBlocks**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[]

Deserialize the unlock blocks from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[]

The deserialized object.

___

### serializeReferenceUnlockBlock

▸ **serializeReferenceUnlockBlock**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md)): *void*

Serialize the reference unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeSignatureUnlockBlock

▸ **serializeSignatureUnlockBlock**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)): *void*

Serialize the signature unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeUnlockBlock

▸ **serializeUnlockBlock**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)): *void*

Serialize the unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeUnlockBlocks

▸ **serializeUnlockBlocks**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `objects`: ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[]): *void*

Serialize the unlock blocks to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`objects` | ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[] | The objects to serialize.    |

**Returns:** *void*
