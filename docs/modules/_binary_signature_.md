**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "binary/signature"

# Module: "binary/signature"

## Index

### Variables

* [MIN\_ED25519\_SIGNATURE\_LENGTH](_binary_signature_.md#min_ed25519_signature_length)
* [MIN\_SIGNATURE\_LENGTH](_binary_signature_.md#min_signature_length)

### Functions

* [deserializeEd25519Signature](_binary_signature_.md#deserializeed25519signature)
* [deserializeSignature](_binary_signature_.md#deserializesignature)
* [serializeEd25519Signature](_binary_signature_.md#serializeed25519signature)
* [serializeSignature](_binary_signature_.md#serializesignature)

## Variables

### MIN\_ED25519\_SIGNATURE\_LENGTH

• `Const` **MIN\_ED25519\_SIGNATURE\_LENGTH**: number = MIN\_SIGNATURE\_LENGTH + Ed25519.SIGNATURE\_SIZE + Ed25519.PUBLIC\_KEY\_SIZE

The minimum length of an ed25519 signature binary representation.

___

### MIN\_SIGNATURE\_LENGTH

• `Const` **MIN\_SIGNATURE\_LENGTH**: number = SMALL\_TYPE\_LENGTH

The minimum length of a signature binary representation.

## Functions

### deserializeEd25519Signature

▸ **deserializeEd25519Signature**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md)

Deserialize the Ed25519 signature from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md)

The deserialized object.

___

### deserializeSignature

▸ **deserializeSignature**(`readStream`: [ReadStream](../classes/_utils_readstream_.readstream.md)): [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md)

Deserialize the signature from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](../classes/_utils_readstream_.readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md)

The deserialized object.

___

### serializeEd25519Signature

▸ **serializeEd25519Signature**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md)): void

Serialize the Ed25519 signature to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md) | The object to serialize.  |

**Returns:** void

___

### serializeSignature

▸ **serializeSignature**(`writeStream`: [WriteStream](../classes/_utils_writestream_.writestream.md), `object`: [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md)): void

Serialize the signature to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](../classes/_utils_writestream_.writestream.md) | The stream to write the data to. |
`object` | [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md) | The object to serialize.  |

**Returns:** void
