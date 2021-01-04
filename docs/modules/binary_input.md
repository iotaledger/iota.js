[@iota/iota.js](../README.md) / binary/input

# Module: binary/input

## Index

### Functions

* [deserializeInput](binary_input.md#deserializeinput)
* [deserializeInputs](binary_input.md#deserializeinputs)
* [deserializeUTXOInput](binary_input.md#deserializeutxoinput)
* [serializeInput](binary_input.md#serializeinput)
* [serializeInputs](binary_input.md#serializeinputs)
* [serializeUTXOInput](binary_input.md#serializeutxoinput)

## Functions

### deserializeInput

▸ **deserializeInput**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)

Deserialize the input from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)

The deserialized object.

___

### deserializeInputs

▸ **deserializeInputs**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)[]

Deserialize the inputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)[]

The deserialized object.

___

### deserializeUTXOInput

▸ **deserializeUTXOInput**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)

Deserialize the utxo input from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)

The deserialized object.

___

### serializeInput

▸ **serializeInput**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)): *void*

Serialize the input to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeInputs

▸ **serializeInputs**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `objects`: [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)[]): *void*

Serialize the inputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`objects` | [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)[] | The objects to serialize.    |

**Returns:** *void*

___

### serializeUTXOInput

▸ **serializeUTXOInput**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md)): *void*

Serialize the utxo input to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IUTXOInput*](../interfaces/models_iutxoinput.iutxoinput.md) | The object to serialize.    |

**Returns:** *void*
