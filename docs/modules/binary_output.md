[@iota/iota.js](../README.md) / binary/output

# Module: binary/output

## Table of contents

### Variables

- [MAX\_OUTPUT\_COUNT](binary_output.md#max_output_count)
- [MIN\_OUTPUT\_LENGTH](binary_output.md#min_output_length)
- [MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH](binary_output.md#min_sig_locked_dust_allowance_output_length)
- [MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH](binary_output.md#min_sig_locked_single_output_length)

### Functions

- [deserializeOutput](binary_output.md#deserializeoutput)
- [deserializeOutputs](binary_output.md#deserializeoutputs)
- [deserializeSigLockedDustAllowanceOutput](binary_output.md#deserializesiglockeddustallowanceoutput)
- [deserializeSigLockedSingleOutput](binary_output.md#deserializesiglockedsingleoutput)
- [serializeOutput](binary_output.md#serializeoutput)
- [serializeOutputs](binary_output.md#serializeoutputs)
- [serializeSigLockedDustAllowanceOutput](binary_output.md#serializesiglockeddustallowanceoutput)
- [serializeSigLockedSingleOutput](binary_output.md#serializesiglockedsingleoutput)

## Variables

### MAX\_OUTPUT\_COUNT

• `Const` **MAX\_OUTPUT\_COUNT**: *number*= 127

The maximum number of outputs.

___

### MIN\_OUTPUT\_LENGTH

• `Const` **MIN\_OUTPUT\_LENGTH**: *number*

The minimum length of an output binary representation.

___

### MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH

• `Const` **MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH**: *number*

The minimum length of a sig locked dust allowance output binary representation.

___

### MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH

• `Const` **MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH**: *number*

The minimum length of a sig locked single output binary representation.

## Functions

### deserializeOutput

▸ **deserializeOutput**(`readStream`: [*ReadStream*](../classes/utils/readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md)

Deserialize the output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils/readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md)

The deserialized object.

___

### deserializeOutputs

▸ **deserializeOutputs**(`readStream`: [*ReadStream*](../classes/utils/readstream.readstream.md)): ([*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md))[]

Deserialize the outputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils/readstream.readstream.md) | The stream to read the data from.   |

**Returns:** ([*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md))[]

The deserialized object.

___

### deserializeSigLockedDustAllowanceOutput

▸ **deserializeSigLockedDustAllowanceOutput**(`readStream`: [*ReadStream*](../classes/utils/readstream.readstream.md)): [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md)

Deserialize the signature locked dust allowance output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils/readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md)

The deserialized object.

___

### deserializeSigLockedSingleOutput

▸ **deserializeSigLockedSingleOutput**(`readStream`: [*ReadStream*](../classes/utils/readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md)

Deserialize the signature locked single output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils/readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md)

The deserialized object.

___

### serializeOutput

▸ **serializeOutput**(`writeStream`: [*WriteStream*](../classes/utils/writestream.writestream.md), `object`: [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md)): *void*

Serialize the output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils/writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`: [*WriteStream*](../classes/utils/writestream.writestream.md), `objects`: ([*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md))[]): *void*

Serialize the outputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils/writestream.writestream.md) | The stream to write the data to.   |
`objects` | ([*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md))[] | The objects to serialize.    |

**Returns:** *void*

___

### serializeSigLockedDustAllowanceOutput

▸ **serializeSigLockedDustAllowanceOutput**(`writeStream`: [*WriteStream*](../classes/utils/writestream.writestream.md), `object`: [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md)): *void*

Serialize the signature locked dust allowance output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils/writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISigLockedDustAllowanceOutput*](../interfaces/models/isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeSigLockedSingleOutput

▸ **serializeSigLockedSingleOutput**(`writeStream`: [*WriteStream*](../classes/utils/writestream.writestream.md), `object`: [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md)): *void*

Serialize the signature locked single output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils/writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISigLockedSingleOutput*](../interfaces/models/isiglockedsingleoutput.isiglockedsingleoutput.md) | The object to serialize.    |

**Returns:** *void*
