[@iota/iota.js](../README.md) / binary/message

# Module: binary/message

## Table of contents

### Variables

- [MAX\_MESSAGE\_LENGTH](binary_message.md#max_message_length)

### Functions

- [deserializeMessage](binary_message.md#deserializemessage)
- [serializeMessage](binary_message.md#serializemessage)

## Variables

### MAX\_MESSAGE\_LENGTH

• `Const` **MAX\_MESSAGE\_LENGTH**: *number*= 32768

The maximum length of a message.

## Functions

### deserializeMessage

▸ **deserializeMessage**(`readStream`: [*ReadStream*](../classes/utils/readstream.readstream.md)): [*IMessage*](../interfaces/models/imessage.imessage.md)

Deserialize the message from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils/readstream.readstream.md) | The message to deserialize.   |

**Returns:** [*IMessage*](../interfaces/models/imessage.imessage.md)

The deserialized message.

___

### serializeMessage

▸ **serializeMessage**(`writeStream`: [*WriteStream*](../classes/utils/writestream.writestream.md), `object`: [*IMessage*](../interfaces/models/imessage.imessage.md)): *void*

Serialize the message essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils/writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IMessage*](../interfaces/models/imessage.imessage.md) | The object to serialize.    |

**Returns:** *void*
