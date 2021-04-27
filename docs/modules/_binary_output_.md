**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/output"

# Module: "binary/output"

## Index

### Variables

* [MAX\_OUTPUT\_COUNT](_binary_output_.md#max_output_count)
* [MIN\_OUTPUT\_COUNT](_binary_output_.md#min_output_count)
* [MIN\_OUTPUT\_LENGTH](_binary_output_.md#min_output_length)
* [MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH](_binary_output_.md#min_sig_locked_dust_allowance_output_length)
* [MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH](_binary_output_.md#min_sig_locked_single_output_length)
* [MIN\_TREASURY\_OUTPUT\_LENGTH](_binary_output_.md#min_treasury_output_length)

### Functions

* [deserializeOutput](_binary_output_.md#deserializeoutput)
* [deserializeOutputs](_binary_output_.md#deserializeoutputs)
* [deserializeSigLockedDustAllowanceOutput](_binary_output_.md#deserializesiglockeddustallowanceoutput)
* [deserializeSigLockedSingleOutput](_binary_output_.md#deserializesiglockedsingleoutput)
* [deserializeTreasuryOutput](_binary_output_.md#deserializetreasuryoutput)
* [serializeOutput](_binary_output_.md#serializeoutput)
* [serializeOutputs](_binary_output_.md#serializeoutputs)
* [serializeSigLockedDustAllowanceOutput](_binary_output_.md#serializesiglockeddustallowanceoutput)
* [serializeSigLockedSingleOutput](_binary_output_.md#serializesiglockedsingleoutput)
* [serializeTreasuryOutput](_binary_output_.md#serializetreasuryoutput)

## Variables

### MAX\_OUTPUT\_COUNT

• `Const` **MAX\_OUTPUT\_COUNT**: number = 127

The maximum number of outputs.

___

### MIN\_OUTPUT\_COUNT

• `Const` **MIN\_OUTPUT\_COUNT**: number = 1

The minimum number of outputs.

___

### MIN\_OUTPUT\_LENGTH

• `Const` **MIN\_OUTPUT\_LENGTH**: number = SMALL\_TYPE\_LENGTH

The minimum length of an output binary representation.

___

### MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH

• `Const` **MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH**: number = MIN\_OUTPUT\_LENGTH + MIN\_ADDRESS\_LENGTH + MIN\_ED25519\_ADDRESS\_LENGTH

The minimum length of a sig locked dust allowance output binary representation.

___

### MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH

• `Const` **MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH**: number = MIN\_OUTPUT\_LENGTH + MIN\_ADDRESS\_LENGTH + MIN\_ED25519\_ADDRESS\_LENGTH

The minimum length of a sig locked single output binary representation.

___

### MIN\_TREASURY\_OUTPUT\_LENGTH

• `Const` **MIN\_TREASURY\_OUTPUT\_LENGTH**: number = MIN\_OUTPUT\_LENGTH + UINT64\_SIZE

The minimum length of a treasury output binary representation.

## Functions

### deserializeOutput

▸ **deserializeOutput**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md)

Deserialize the output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md)

The deserialized object.

___

### deserializeOutputs

▸ **deserializeOutputs**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): ([ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md))[]

Deserialize the outputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** ([ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md))[]

The deserialized object.

___

### deserializeSigLockedDustAllowanceOutput

▸ **deserializeSigLockedDustAllowanceOutput**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md)

Deserialize the signature locked dust allowance output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md)

The deserialized object.

___

### deserializeSigLockedSingleOutput

▸ **deserializeSigLockedSingleOutput**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md)

Deserialize the signature locked single output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md)

The deserialized object.

___

### deserializeTreasuryOutput

▸ **deserializeTreasuryOutput**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md)

Deserialize the treasury output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md)

The deserialized object.

___

### serializeOutput

▸ **serializeOutput**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ITypeBase](../interfaces/_models_itypebase_.itypebase.md)<number\>): void

Serialize the output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ITypeBase](../interfaces/_models_itypebase_.itypebase.md)<number\> | The object to serialize.  |

**Returns:** void

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `objects`: ([ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md))[]): void

Serialize the outputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`objects` | ([ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md))[] | The objects to serialize.  |

**Returns:** void

___

### serializeSigLockedDustAllowanceOutput

▸ **serializeSigLockedDustAllowanceOutput**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md)): void

Serialize the signature locked dust allowance output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) | The object to serialize.  |

**Returns:** void

___

### serializeSigLockedSingleOutput

▸ **serializeSigLockedSingleOutput**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md)): void

Serialize the signature locked single output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) | The object to serialize.  |

**Returns:** void

___

### serializeTreasuryOutput

▸ **serializeTreasuryOutput**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md)): void

Serialize the treasury output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md) | The object to serialize.  |

**Returns:** void
