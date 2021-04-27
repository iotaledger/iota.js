**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/address"

# Module: "binary/address"

## Index

### Variables

* [MIN\_ADDRESS\_LENGTH](_binary_address_.md#min_address_length)
* [MIN\_ED25519\_ADDRESS\_LENGTH](_binary_address_.md#min_ed25519_address_length)

### Functions

* [deserializeAddress](_binary_address_.md#deserializeaddress)
* [deserializeEd25519Address](_binary_address_.md#deserializeed25519address)
* [serializeAddress](_binary_address_.md#serializeaddress)
* [serializeEd25519Address](_binary_address_.md#serializeed25519address)

## Variables

### MIN\_ADDRESS\_LENGTH

• `Const` **MIN\_ADDRESS\_LENGTH**: number = SMALL\_TYPE\_LENGTH

The minimum length of an address binary representation.

___

### MIN\_ED25519\_ADDRESS\_LENGTH

• `Const` **MIN\_ED25519\_ADDRESS\_LENGTH**: number = MIN\_ADDRESS\_LENGTH + Ed25519Address.ADDRESS\_LENGTH

The minimum length of an ed25519 address binary representation.

## Functions

### deserializeAddress

▸ **deserializeAddress**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md)

Deserialize the address from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md)

The deserialized object.

___

### deserializeEd25519Address

▸ **deserializeEd25519Address**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md)

Deserialize the Ed25519 address from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md)

The deserialized object.

___

### serializeAddress

▸ **serializeAddress**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md)): void

Serialize the address to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md) | The object to serialize.  |

**Returns:** void

___

### serializeEd25519Address

▸ **serializeEd25519Address**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md)): void

Serialize the ed25519 address to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md) | The object to serialize.  |

**Returns:** void
