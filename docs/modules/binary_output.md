[@iota/iota.js](../README.md) / binary/output

# Module: binary/output

## Index

### Functions

* [deserializeOutput](binary_output.md#deserializeoutput)
* [deserializeOutputs](binary_output.md#deserializeoutputs)
* [deserializeSigLockedSingleOutput](binary_output.md#deserializesiglockedsingleoutput)
* [serializeOutput](binary_output.md#serializeoutput)
* [serializeOutputs](binary_output.md#serializeoutputs)
* [serializeSigLockedSingleOutput](binary_output.md#serializesiglockedsingleoutput)

## Functions

### deserializeOutput

▸ **deserializeOutput**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

Deserialize the output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

The deserialized object.

___

### deserializeOutputs

▸ **deserializeOutputs**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[]

Deserialize the outputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[]

The deserialized object.

___

### deserializeSigLockedSingleOutput

▸ **deserializeSigLockedSingleOutput**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

Deserialize the signature locked single output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

The deserialized object.

___

### serializeOutput

▸ **serializeOutput**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)): *void*

Serialize the output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `objects`: [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[]): *void*

Serialize the outputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`objects` | [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[] | The objects to serialize.    |

**Returns:** *void*

___

### serializeSigLockedSingleOutput

▸ **serializeSigLockedSingleOutput**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)): *void*

Serialize the signature locked single output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md) | The object to serialize.    |

**Returns:** *void*
