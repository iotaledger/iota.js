**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/input"

# Module: "binary/input"

## Index

### Variables

* [MAX\_INPUT\_COUNT](_binary_input_.md#max_input_count)
* [MIN\_INPUT\_COUNT](_binary_input_.md#min_input_count)
* [MIN\_INPUT\_LENGTH](_binary_input_.md#min_input_length)
* [MIN\_TREASURY\_INPUT\_LENGTH](_binary_input_.md#min_treasury_input_length)
* [MIN\_UTXO\_INPUT\_LENGTH](_binary_input_.md#min_utxo_input_length)

### Functions

* [deserializeInput](_binary_input_.md#deserializeinput)
* [deserializeInputs](_binary_input_.md#deserializeinputs)
* [deserializeTreasuryInput](_binary_input_.md#deserializetreasuryinput)
* [deserializeUTXOInput](_binary_input_.md#deserializeutxoinput)
* [serializeInput](_binary_input_.md#serializeinput)
* [serializeInputs](_binary_input_.md#serializeinputs)
* [serializeTreasuryInput](_binary_input_.md#serializetreasuryinput)
* [serializeUTXOInput](_binary_input_.md#serializeutxoinput)

## Variables

### MAX\_INPUT\_COUNT

• `Const` **MAX\_INPUT\_COUNT**: number = 127

The maximum number of inputs.

___

### MIN\_INPUT\_COUNT

• `Const` **MIN\_INPUT\_COUNT**: number = 1

The minimum number of inputs.

___

### MIN\_INPUT\_LENGTH

• `Const` **MIN\_INPUT\_LENGTH**: number = SMALL\_TYPE\_LENGTH

The minimum length of an input binary representation.

___

### MIN\_TREASURY\_INPUT\_LENGTH

• `Const` **MIN\_TREASURY\_INPUT\_LENGTH**: number = MIN\_INPUT\_LENGTH + TRANSACTION\_ID\_LENGTH

The minimum length of a treasury input binary representation.

___

### MIN\_UTXO\_INPUT\_LENGTH

• `Const` **MIN\_UTXO\_INPUT\_LENGTH**: number = MIN\_INPUT\_LENGTH + TRANSACTION\_ID\_LENGTH + UINT16\_SIZE

The minimum length of a utxo input binary representation.

## Functions

### deserializeInput

▸ **deserializeInput**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md)

Deserialize the input from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md)

The deserialized object.

___

### deserializeInputs

▸ **deserializeInputs**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): ([IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md))[]

Deserialize the inputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** ([IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md))[]

The deserialized object.

___

### deserializeTreasuryInput

▸ **deserializeTreasuryInput**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md)

Deserialize the treasury input from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md)

The deserialized object.

___

### deserializeUTXOInput

▸ **deserializeUTXOInput**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)

Deserialize the utxo input from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)

The deserialized object.

___

### serializeInput

▸ **serializeInput**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md)): void

Serialize the input to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md) | The object to serialize.  |

**Returns:** void

___

### serializeInputs

▸ **serializeInputs**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `objects`: ([IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md))[]): void

Serialize the inputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`objects` | ([IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md))[] | The objects to serialize.  |

**Returns:** void

___

### serializeTreasuryInput

▸ **serializeTreasuryInput**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md)): void

Serialize the treasury input to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md) | The object to serialize.  |

**Returns:** void

___

### serializeUTXOInput

▸ **serializeUTXOInput**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)): void

Serialize the utxo input to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) | The object to serialize.  |

**Returns:** void
