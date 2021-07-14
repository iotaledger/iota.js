[@iota/iota.js](../README.md) / binary/message

# Module: binary/message

## Table of contents

### Variables

- [MAX\_MESSAGE\_LENGTH](binary_message.md#max_message_length)
- [MAX\_NUMBER\_PARENTS](binary_message.md#max_number_parents)
- [MIN\_NUMBER\_PARENTS](binary_message.md#min_number_parents)

### Functions

- [deserializeMessage](binary_message.md#deserializemessage)
- [serializeMessage](binary_message.md#serializemessage)

## Variables

### MAX\_MESSAGE\_LENGTH

• `Const` **MAX\_MESSAGE\_LENGTH**: `number` = `32768`

The maximum length of a message.

___

### MAX\_NUMBER\_PARENTS

• `Const` **MAX\_NUMBER\_PARENTS**: `number` = `8`

The maximum number of parents.

___

### MIN\_NUMBER\_PARENTS

• `Const` **MIN\_NUMBER\_PARENTS**: `number` = `1`

The minimum number of parents.

## Functions

### deserializeMessage

▸ **deserializeMessage**(`readStream`): [`IMessage`](../interfaces/models_IMessage.IMessage.md)

Deserialize the message from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | [`ReadStream`](../classes/utils_readStream.ReadStream.md) | The message to deserialize. |

#### Returns

[`IMessage`](../interfaces/models_IMessage.IMessage.md)

The deserialized message.

___

### serializeMessage

▸ **serializeMessage**(`writeStream`, `object`): `void`

Serialize the message essence to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | [`WriteStream`](../classes/utils_writeStream.WriteStream.md) | The stream to write the data to. |
| `object` | [`IMessage`](../interfaces/models_IMessage.IMessage.md) | The object to serialize. |

#### Returns

`void`
