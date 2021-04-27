**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/message"

# Module: "binary/message"

## Index

### Variables

* [MAX\_MESSAGE\_LENGTH](_binary_message_.md#max_message_length)
* [MAX\_NUMBER\_PARENTS](_binary_message_.md#max_number_parents)
* [MIN\_MESSAGE\_LENGTH](_binary_message_.md#min_message_length)
* [MIN\_NUMBER\_PARENTS](_binary_message_.md#min_number_parents)

### Functions

* [deserializeMessage](_binary_message_.md#deserializemessage)
* [serializeMessage](_binary_message_.md#serializemessage)

## Variables

### MAX\_MESSAGE\_LENGTH

• `Const` **MAX\_MESSAGE\_LENGTH**: number = 32768

The maximum length of a message.

___

### MAX\_NUMBER\_PARENTS

• `Const` **MAX\_NUMBER\_PARENTS**: number = 8

The maximum number of parents.

___

### MIN\_MESSAGE\_LENGTH

• `Const` **MIN\_MESSAGE\_LENGTH**: number = UINT64\_SIZE + // Network id BYTE\_SIZE + // Parent count MESSAGE\_ID\_LENGTH + // Single parent MIN\_PAYLOAD\_LENGTH + // Min payload length UINT64\_SIZE

The minimum length of a message binary representation.

___

### MIN\_NUMBER\_PARENTS

• `Const` **MIN\_NUMBER\_PARENTS**: number = 1

The minimum number of parents.

## Functions

### deserializeMessage

▸ **deserializeMessage**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IMessage](../interfaces/_models_imessage_.imessage.md)

Deserialize the message from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The message to deserialize. |

**Returns:** [IMessage](../interfaces/_models_imessage_.imessage.md)

The deserialized message.

___

### serializeMessage

▸ **serializeMessage**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IMessage](../interfaces/_models_imessage_.imessage.md)): void

Serialize the message essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IMessage](../interfaces/_models_imessage_.imessage.md) | The object to serialize.  |

**Returns:** void
