# @iota/iota.js

## Table of contents

### Classes

- [Ed25519Address](classes/Ed25519Address.md)
- [ClientError](classes/ClientError.md)
- [SingleNodeClient](classes/SingleNodeClient.md)
- [B1T6](classes/B1T6.md)
- [LocalPowProvider](classes/LocalPowProvider.md)
- [Ed25519Seed](classes/Ed25519Seed.md)
- [Bech32Helper](classes/Bech32Helper.md)
- [PowHelper](classes/PowHelper.md)
- [UnitsHelper](classes/UnitsHelper.md)

### Variables

- [MIN\_ADDRESS\_LENGTH](api.md#min_address_length)
- [MIN\_ED25519\_ADDRESS\_LENGTH](api.md#min_ed25519_address_length)
- [BYTE\_SIZE](api.md#byte_size)
- [UINT16\_SIZE](api.md#uint16_size)
- [UINT32\_SIZE](api.md#uint32_size)
- [UINT64\_SIZE](api.md#uint64_size)
- [MESSAGE\_ID\_LENGTH](api.md#message_id_length)
- [TRANSACTION\_ID\_LENGTH](api.md#transaction_id_length)
- [MERKLE\_PROOF\_LENGTH](api.md#merkle_proof_length)
- [TYPE\_LENGTH](api.md#type_length)
- [SMALL\_TYPE\_LENGTH](api.md#small_type_length)
- [STRING\_LENGTH](api.md#string_length)
- [ARRAY\_LENGTH](api.md#array_length)
- [TAIL\_HASH\_LENGTH](api.md#tail_hash_length)
- [MIN\_MIGRATED\_FUNDS\_LENGTH](api.md#min_migrated_funds_length)
- [MAX\_FUNDS\_COUNT](api.md#max_funds_count)
- [MIN\_INPUT\_LENGTH](api.md#min_input_length)
- [MIN\_UTXO\_INPUT\_LENGTH](api.md#min_utxo_input_length)
- [MIN\_TREASURY\_INPUT\_LENGTH](api.md#min_treasury_input_length)
- [MIN\_INPUT\_COUNT](api.md#min_input_count)
- [MAX\_INPUT\_COUNT](api.md#max_input_count)
- [MAX\_MESSAGE\_LENGTH](api.md#max_message_length)
- [MAX\_NUMBER\_PARENTS](api.md#max_number_parents)
- [MIN\_NUMBER\_PARENTS](api.md#min_number_parents)
- [MIN\_OUTPUT\_LENGTH](api.md#min_output_length)
- [MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH](api.md#min_sig_locked_single_output_length)
- [MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH](api.md#min_sig_locked_dust_allowance_output_length)
- [MIN\_TREASURY\_OUTPUT\_LENGTH](api.md#min_treasury_output_length)
- [MIN\_OUTPUT\_COUNT](api.md#min_output_count)
- [MAX\_OUTPUT\_COUNT](api.md#max_output_count)
- [MIN\_PAYLOAD\_LENGTH](api.md#min_payload_length)
- [MIN\_MILESTONE\_PAYLOAD\_LENGTH](api.md#min_milestone_payload_length)
- [MIN\_INDEXATION\_PAYLOAD\_LENGTH](api.md#min_indexation_payload_length)
- [MIN\_TRANSACTION\_PAYLOAD\_LENGTH](api.md#min_transaction_payload_length)
- [MIN\_RECEIPT\_PAYLOAD\_LENGTH](api.md#min_receipt_payload_length)
- [MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH](api.md#min_treasury_transaction_payload_length)
- [MIN\_INDEXATION\_KEY\_LENGTH](api.md#min_indexation_key_length)
- [MAX\_INDEXATION\_KEY\_LENGTH](api.md#max_indexation_key_length)
- [MIN\_SIGNATURE\_LENGTH](api.md#min_signature_length)
- [MIN\_ED25519\_SIGNATURE\_LENGTH](api.md#min_ed25519_signature_length)
- [MIN\_TRANSACTION\_ESSENCE\_LENGTH](api.md#min_transaction_essence_length)
- [MIN\_UNLOCK\_BLOCK\_LENGTH](api.md#min_unlock_block_length)
- [MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH](api.md#min_signature_unlock_block_length)
- [MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH](api.md#min_reference_unlock_block_length)
- [ED25519\_ADDRESS\_TYPE](api.md#ed25519_address_type)
- [ED25519\_SIGNATURE\_TYPE](api.md#ed25519_signature_type)
- [INDEXATION\_PAYLOAD\_TYPE](api.md#indexation_payload_type)
- [MILESTONE\_PAYLOAD\_TYPE](api.md#milestone_payload_type)
- [RECEIPT\_PAYLOAD\_TYPE](api.md#receipt_payload_type)
- [REFERENCE\_UNLOCK\_BLOCK\_TYPE](api.md#reference_unlock_block_type)
- [SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_TYPE](api.md#sig_locked_dust_allowance_output_type)
- [SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE](api.md#sig_locked_single_output_type)
- [SIGNATURE\_UNLOCK\_BLOCK\_TYPE](api.md#signature_unlock_block_type)
- [TRANSACTION\_ESSENCE\_TYPE](api.md#transaction_essence_type)
- [TRANSACTION\_PAYLOAD\_TYPE](api.md#transaction_payload_type)
- [TREASURY\_INPUT\_TYPE](api.md#treasury_input_type)
- [TREASURY\_OUTPUT\_TYPE](api.md#treasury_output_type)
- [TREASURY\_TRANSACTION\_PAYLOAD\_TYPE](api.md#treasury_transaction_payload_type)
- [UTXO\_INPUT\_TYPE](api.md#utxo_input_type)
- [CONFLICT\_REASON\_STRINGS](api.md#conflict_reason_strings)
- [ED25519\_SEED\_TYPE](api.md#ed25519_seed_type)

### Functions

- [deserializeAddress](api.md#deserializeaddress)
- [serializeAddress](api.md#serializeaddress)
- [deserializeEd25519Address](api.md#deserializeed25519address)
- [serializeEd25519Address](api.md#serializeed25519address)
- [deserializeFunds](api.md#deserializefunds)
- [serializeFunds](api.md#serializefunds)
- [deserializeMigratedFunds](api.md#deserializemigratedfunds)
- [serializeMigratedFunds](api.md#serializemigratedfunds)
- [deserializeInputs](api.md#deserializeinputs)
- [serializeInputs](api.md#serializeinputs)
- [deserializeInput](api.md#deserializeinput)
- [serializeInput](api.md#serializeinput)
- [deserializeUTXOInput](api.md#deserializeutxoinput)
- [serializeUTXOInput](api.md#serializeutxoinput)
- [deserializeTreasuryInput](api.md#deserializetreasuryinput)
- [serializeTreasuryInput](api.md#serializetreasuryinput)
- [deserializeMessage](api.md#deserializemessage)
- [serializeMessage](api.md#serializemessage)
- [deserializeOutputs](api.md#deserializeoutputs)
- [serializeOutputs](api.md#serializeoutputs)
- [deserializeOutput](api.md#deserializeoutput)
- [serializeOutput](api.md#serializeoutput)
- [deserializeSigLockedSingleOutput](api.md#deserializesiglockedsingleoutput)
- [serializeSigLockedSingleOutput](api.md#serializesiglockedsingleoutput)
- [deserializeSigLockedDustAllowanceOutput](api.md#deserializesiglockeddustallowanceoutput)
- [serializeSigLockedDustAllowanceOutput](api.md#serializesiglockeddustallowanceoutput)
- [deserializeTreasuryOutput](api.md#deserializetreasuryoutput)
- [serializeTreasuryOutput](api.md#serializetreasuryoutput)
- [deserializePayload](api.md#deserializepayload)
- [serializePayload](api.md#serializepayload)
- [deserializeTransactionPayload](api.md#deserializetransactionpayload)
- [serializeTransactionPayload](api.md#serializetransactionpayload)
- [deserializeMilestonePayload](api.md#deserializemilestonepayload)
- [serializeMilestonePayload](api.md#serializemilestonepayload)
- [deserializeIndexationPayload](api.md#deserializeindexationpayload)
- [serializeIndexationPayload](api.md#serializeindexationpayload)
- [deserializeReceiptPayload](api.md#deserializereceiptpayload)
- [serializeReceiptPayload](api.md#serializereceiptpayload)
- [deserializeTreasuryTransactionPayload](api.md#deserializetreasurytransactionpayload)
- [serializeTreasuryTransactionPayload](api.md#serializetreasurytransactionpayload)
- [deserializeSignature](api.md#deserializesignature)
- [serializeSignature](api.md#serializesignature)
- [deserializeEd25519Signature](api.md#deserializeed25519signature)
- [serializeEd25519Signature](api.md#serializeed25519signature)
- [deserializeTransactionEssence](api.md#deserializetransactionessence)
- [serializeTransactionEssence](api.md#serializetransactionessence)
- [deserializeUnlockBlocks](api.md#deserializeunlockblocks)
- [serializeUnlockBlocks](api.md#serializeunlockblocks)
- [deserializeUnlockBlock](api.md#deserializeunlockblock)
- [serializeUnlockBlock](api.md#serializeunlockblock)
- [deserializeSignatureUnlockBlock](api.md#deserializesignatureunlockblock)
- [serializeSignatureUnlockBlock](api.md#serializesignatureunlockblock)
- [deserializeReferenceUnlockBlock](api.md#deserializereferenceunlockblock)
- [serializeReferenceUnlockBlock](api.md#serializereferenceunlockblock)
- [generateBip44Path](api.md#generatebip44path)
- [generateBip44Address](api.md#generatebip44address)
- [getBalance](api.md#getbalance)
- [getUnspentAddress](api.md#getunspentaddress)
- [getUnspentAddresses](api.md#getunspentaddresses)
- [getUnspentAddressesWithAddressGenerator](api.md#getunspentaddresseswithaddressgenerator)
- [promote](api.md#promote)
- [reattach](api.md#reattach)
- [retrieveData](api.md#retrievedata)
- [retry](api.md#retry)
- [send](api.md#send)
- [sendEd25519](api.md#sended25519)
- [sendMultiple](api.md#sendmultiple)
- [sendMultipleEd25519](api.md#sendmultipleed25519)
- [sendWithAddressGenerator](api.md#sendwithaddressgenerator)
- [calculateInputs](api.md#calculateinputs)
- [sendAdvanced](api.md#sendadvanced)
- [buildTransactionPayload](api.md#buildtransactionpayload)
- [sendData](api.md#senddata)
- [setLogger](api.md#setlogger)
- [logInfo](api.md#loginfo)
- [logTips](api.md#logtips)
- [logMessage](api.md#logmessage)
- [logMessageMetadata](api.md#logmessagemetadata)
- [logPayload](api.md#logpayload)
- [logTransactionPayload](api.md#logtransactionpayload)
- [logIndexationPayload](api.md#logindexationpayload)
- [logMilestonePayload](api.md#logmilestonepayload)
- [logReceiptPayload](api.md#logreceiptpayload)
- [logTreasuryTransactionPayload](api.md#logtreasurytransactionpayload)
- [logAddress](api.md#logaddress)
- [logSignature](api.md#logsignature)
- [logInput](api.md#loginput)
- [logOutput](api.md#logoutput)
- [logUnlockBlock](api.md#logunlockblock)
- [logFunds](api.md#logfunds)

### Interfaces

- [SingleNodeClientOptions](interfaces/SingleNodeClientOptions.md)
- [IAddress](interfaces/IAddress.md)
- [IBip44GeneratorState](interfaces/IBip44GeneratorState.md)
- [IClient](interfaces/IClient.md)
- [IEd25519Address](interfaces/IEd25519Address.md)
- [IEd25519Signature](interfaces/IEd25519Signature.md)
- [IGossipHeartbeat](interfaces/IGossipHeartbeat.md)
- [IGossipMetrics](interfaces/IGossipMetrics.md)
- [IIndexationPayload](interfaces/IIndexationPayload.md)
- [IKeyPair](interfaces/IKeyPair.md)
- [IMessage](interfaces/IMessage.md)
- [IMessageMetadata](interfaces/IMessageMetadata.md)
- [IMigratedFunds](interfaces/IMigratedFunds.md)
- [IMilestonePayload](interfaces/IMilestonePayload.md)
- [INodeInfo](interfaces/INodeInfo.md)
- [IPeer](interfaces/IPeer.md)
- [IPowProvider](interfaces/IPowProvider.md)
- [IReceiptPayload](interfaces/IReceiptPayload.md)
- [IReferenceUnlockBlock](interfaces/IReferenceUnlockBlock.md)
- [ISeed](interfaces/ISeed.md)
- [ISigLockedDustAllowanceOutput](interfaces/ISigLockedDustAllowanceOutput.md)
- [ISigLockedSingleOutput](interfaces/ISigLockedSingleOutput.md)
- [ISignatureUnlockBlock](interfaces/ISignatureUnlockBlock.md)
- [ITransactionEssence](interfaces/ITransactionEssence.md)
- [ITransactionPayload](interfaces/ITransactionPayload.md)
- [ITreasury](interfaces/ITreasury.md)
- [ITreasuryInput](interfaces/ITreasuryInput.md)
- [ITreasuryOutput](interfaces/ITreasuryOutput.md)
- [ITreasuryTransactionPayload](interfaces/ITreasuryTransactionPayload.md)
- [ITypeBase](interfaces/ITypeBase.md)
- [IUTXOInput](interfaces/IUTXOInput.md)
- [IAddressOutputsResponse](interfaces/IAddressOutputsResponse.md)
- [IAddressResponse](interfaces/IAddressResponse.md)
- [IChildrenResponse](interfaces/IChildrenResponse.md)
- [IMessageIdResponse](interfaces/IMessageIdResponse.md)
- [IMessagesResponse](interfaces/IMessagesResponse.md)
- [IMilestoneResponse](interfaces/IMilestoneResponse.md)
- [IMilestoneUtxoChangesResponse](interfaces/IMilestoneUtxoChangesResponse.md)
- [IOutputResponse](interfaces/IOutputResponse.md)
- [IReceiptsResponse](interfaces/IReceiptsResponse.md)
- [IResponse](interfaces/IResponse.md)
- [ITipsResponse](interfaces/ITipsResponse.md)

### Enumerations

- [ConflictReason](enums/ConflictReason.md)

### Type Aliases

- [LedgerInclusionState](api.md#ledgerinclusionstate)
- [Units](api.md#units)

## Variables

### MIN\_ADDRESS\_LENGTH

• `Const` **MIN\_ADDRESS\_LENGTH**: `number` = `SMALL_TYPE_LENGTH`

The minimum length of an address binary representation.

___

### MIN\_ED25519\_ADDRESS\_LENGTH

• `Const` **MIN\_ED25519\_ADDRESS\_LENGTH**: `number`

The minimum length of an ed25519 address binary representation.

___

### BYTE\_SIZE

• `Const` **BYTE\_SIZE**: `number` = `1`

Byte length for a byte field.

___

### UINT16\_SIZE

• `Const` **UINT16\_SIZE**: `number` = `2`

Byte length for a uint16 field.

___

### UINT32\_SIZE

• `Const` **UINT32\_SIZE**: `number` = `4`

Byte length for a uint32 field.

___

### UINT64\_SIZE

• `Const` **UINT64\_SIZE**: `number` = `8`

Byte length for a uint64 field.

___

### MESSAGE\_ID\_LENGTH

• `Const` **MESSAGE\_ID\_LENGTH**: `number` = `Blake2b.SIZE_256`

Byte length for a message id.

___

### TRANSACTION\_ID\_LENGTH

• `Const` **TRANSACTION\_ID\_LENGTH**: `number` = `Blake2b.SIZE_256`

Byte length for a transaction id.

___

### MERKLE\_PROOF\_LENGTH

• `Const` **MERKLE\_PROOF\_LENGTH**: `number` = `Blake2b.SIZE_256`

Byte length for a merkle prrof.

___

### TYPE\_LENGTH

• `Const` **TYPE\_LENGTH**: `number` = `UINT32_SIZE`

Byte length for a type length.

___

### SMALL\_TYPE\_LENGTH

• `Const` **SMALL\_TYPE\_LENGTH**: `number` = `BYTE_SIZE`

Byte length for a small type length.

___

### STRING\_LENGTH

• `Const` **STRING\_LENGTH**: `number` = `UINT16_SIZE`

Byte length for a string length.

___

### ARRAY\_LENGTH

• `Const` **ARRAY\_LENGTH**: `number` = `UINT16_SIZE`

Byte length for an array length.

___

### TAIL\_HASH\_LENGTH

• `Const` **TAIL\_HASH\_LENGTH**: `number` = `49`

The length of the tail hash length in bytes.

___

### MIN\_MIGRATED\_FUNDS\_LENGTH

• `Const` **MIN\_MIGRATED\_FUNDS\_LENGTH**: `number`

The minimum length of a migrated fund binary representation.

___

### MAX\_FUNDS\_COUNT

• `Const` **MAX\_FUNDS\_COUNT**: `number` = `127`

The maximum number of funds.

___

### MIN\_INPUT\_LENGTH

• `Const` **MIN\_INPUT\_LENGTH**: `number` = `SMALL_TYPE_LENGTH`

The minimum length of an input binary representation.

___

### MIN\_UTXO\_INPUT\_LENGTH

• `Const` **MIN\_UTXO\_INPUT\_LENGTH**: `number`

The minimum length of a utxo input binary representation.

___

### MIN\_TREASURY\_INPUT\_LENGTH

• `Const` **MIN\_TREASURY\_INPUT\_LENGTH**: `number`

The minimum length of a treasury input binary representation.

___

### MIN\_INPUT\_COUNT

• `Const` **MIN\_INPUT\_COUNT**: `number` = `1`

The minimum number of inputs.

___

### MAX\_INPUT\_COUNT

• `Const` **MAX\_INPUT\_COUNT**: `number` = `127`

The maximum number of inputs.

___

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

___

### MIN\_OUTPUT\_LENGTH

• `Const` **MIN\_OUTPUT\_LENGTH**: `number` = `SMALL_TYPE_LENGTH`

The minimum length of an output binary representation.

___

### MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH

• `Const` **MIN\_SIG\_LOCKED\_SINGLE\_OUTPUT\_LENGTH**: `number`

The minimum length of a sig locked single output binary representation.

___

### MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH

• `Const` **MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH**: `number`

The minimum length of a sig locked dust allowance output binary representation.

___

### MIN\_TREASURY\_OUTPUT\_LENGTH

• `Const` **MIN\_TREASURY\_OUTPUT\_LENGTH**: `number`

The minimum length of a treasury output binary representation.

___

### MIN\_OUTPUT\_COUNT

• `Const` **MIN\_OUTPUT\_COUNT**: `number` = `1`

The minimum number of outputs.

___

### MAX\_OUTPUT\_COUNT

• `Const` **MAX\_OUTPUT\_COUNT**: `number` = `127`

The maximum number of outputs.

___

### MIN\_PAYLOAD\_LENGTH

• `Const` **MIN\_PAYLOAD\_LENGTH**: `number` = `TYPE_LENGTH`

The minimum length of a payload binary representation.

___

### MIN\_MILESTONE\_PAYLOAD\_LENGTH

• `Const` **MIN\_MILESTONE\_PAYLOAD\_LENGTH**: `number`

The minimum length of a milestone payload binary representation.

___

### MIN\_INDEXATION\_PAYLOAD\_LENGTH

• `Const` **MIN\_INDEXATION\_PAYLOAD\_LENGTH**: `number`

The minimum length of an indexation payload binary representation.

___

### MIN\_TRANSACTION\_PAYLOAD\_LENGTH

• `Const` **MIN\_TRANSACTION\_PAYLOAD\_LENGTH**: `number`

The minimum length of a transaction payload binary representation.

___

### MIN\_RECEIPT\_PAYLOAD\_LENGTH

• `Const` **MIN\_RECEIPT\_PAYLOAD\_LENGTH**: `number`

The minimum length of a receipt payload binary representation.

___

### MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH

• `Const` **MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH**: `number`

The minimum length of a treasure transaction payload binary representation.

___

### MIN\_INDEXATION\_KEY\_LENGTH

• `Const` **MIN\_INDEXATION\_KEY\_LENGTH**: `number` = `1`

The minimum length of a indexation key.

___

### MAX\_INDEXATION\_KEY\_LENGTH

• `Const` **MAX\_INDEXATION\_KEY\_LENGTH**: `number` = `64`

The maximum length of a indexation key.

___

### MIN\_SIGNATURE\_LENGTH

• `Const` **MIN\_SIGNATURE\_LENGTH**: `number` = `SMALL_TYPE_LENGTH`

The minimum length of a signature binary representation.

___

### MIN\_ED25519\_SIGNATURE\_LENGTH

• `Const` **MIN\_ED25519\_SIGNATURE\_LENGTH**: `number`

The minimum length of an ed25519 signature binary representation.

___

### MIN\_TRANSACTION\_ESSENCE\_LENGTH

• `Const` **MIN\_TRANSACTION\_ESSENCE\_LENGTH**: `number`

The minimum length of a transaction essence binary representation.

___

### MIN\_UNLOCK\_BLOCK\_LENGTH

• `Const` **MIN\_UNLOCK\_BLOCK\_LENGTH**: `number` = `SMALL_TYPE_LENGTH`

The minimum length of an unlock block binary representation.

___

### MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH

• `Const` **MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH**: `number`

The minimum length of a signature unlock block binary representation.

___

### MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH

• `Const` **MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH**: `number`

The minimum length of a reference unlock block binary representation.

___

### ED25519\_ADDRESS\_TYPE

• `Const` **ED25519\_ADDRESS\_TYPE**: ``0``

The global type for the address type.

___

### ED25519\_SIGNATURE\_TYPE

• `Const` **ED25519\_SIGNATURE\_TYPE**: ``0``

The global type for the signature type.

___

### INDEXATION\_PAYLOAD\_TYPE

• `Const` **INDEXATION\_PAYLOAD\_TYPE**: ``2``

The global type for the payload.

___

### MILESTONE\_PAYLOAD\_TYPE

• `Const` **MILESTONE\_PAYLOAD\_TYPE**: ``1``

The global type for the payload.

___

### RECEIPT\_PAYLOAD\_TYPE

• `Const` **RECEIPT\_PAYLOAD\_TYPE**: ``3``

The global type for the payload.

___

### REFERENCE\_UNLOCK\_BLOCK\_TYPE

• `Const` **REFERENCE\_UNLOCK\_BLOCK\_TYPE**: ``1``

The global type for the unlock block.

___

### SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_TYPE

• `Const` **SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_TYPE**: ``1``

The global type for the sig locked dust allowance output.

___

### SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE

• `Const` **SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE**: ``0``

The global type for the sig locked single output.

___

### SIGNATURE\_UNLOCK\_BLOCK\_TYPE

• `Const` **SIGNATURE\_UNLOCK\_BLOCK\_TYPE**: ``0``

The global type for the unlock block.

___

### TRANSACTION\_ESSENCE\_TYPE

• `Const` **TRANSACTION\_ESSENCE\_TYPE**: ``0``

The global type for the transaction essence.

___

### TRANSACTION\_PAYLOAD\_TYPE

• `Const` **TRANSACTION\_PAYLOAD\_TYPE**: ``0``

The global type for the payload.

___

### TREASURY\_INPUT\_TYPE

• `Const` **TREASURY\_INPUT\_TYPE**: ``1``

The global type for the treasury input.

___

### TREASURY\_OUTPUT\_TYPE

• `Const` **TREASURY\_OUTPUT\_TYPE**: ``2``

The global type for the treasury output.

___

### TREASURY\_TRANSACTION\_PAYLOAD\_TYPE

• `Const` **TREASURY\_TRANSACTION\_PAYLOAD\_TYPE**: ``4``

The global type for the payload.

___

### UTXO\_INPUT\_TYPE

• `Const` **UTXO\_INPUT\_TYPE**: ``0``

The global type for the input.

___

### CONFLICT\_REASON\_STRINGS

• `Const` **CONFLICT\_REASON\_STRINGS**: { [key in ConflictReason]: string }

Conflict reason strings.

___

### ED25519\_SEED\_TYPE

• `Const` **ED25519\_SEED\_TYPE**: `number` = `1`

The global type for the seed.

## Functions

### deserializeAddress

▸ **deserializeAddress**(`readStream`): [`IEd25519Address`](interfaces/IEd25519Address.md)

Deserialize the address from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IEd25519Address`](interfaces/IEd25519Address.md)

The deserialized object.

___

### serializeAddress

▸ **serializeAddress**(`writeStream`, `object`): `void`

Serialize the address to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IEd25519Address`](interfaces/IEd25519Address.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeEd25519Address

▸ **deserializeEd25519Address**(`readStream`): [`IEd25519Address`](interfaces/IEd25519Address.md)

Deserialize the Ed25519 address from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IEd25519Address`](interfaces/IEd25519Address.md)

The deserialized object.

___

### serializeEd25519Address

▸ **serializeEd25519Address**(`writeStream`, `object`): `void`

Serialize the ed25519 address to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IEd25519Address`](interfaces/IEd25519Address.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeFunds

▸ **deserializeFunds**(`readStream`): [`IMigratedFunds`](interfaces/IMigratedFunds.md)[]

Deserialize the receipt payload funds from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IMigratedFunds`](interfaces/IMigratedFunds.md)[]

The deserialized object.

___

### serializeFunds

▸ **serializeFunds**(`writeStream`, `objects`): `void`

Serialize the receipt payload funds to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`IMigratedFunds`](interfaces/IMigratedFunds.md)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeMigratedFunds

▸ **deserializeMigratedFunds**(`readStream`): [`IMigratedFunds`](interfaces/IMigratedFunds.md)

Deserialize the migrated fund from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IMigratedFunds`](interfaces/IMigratedFunds.md)

The deserialized object.

___

### serializeMigratedFunds

▸ **serializeMigratedFunds**(`writeStream`, `object`): `void`

Serialize the migrated funds to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IMigratedFunds`](interfaces/IMigratedFunds.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeInputs

▸ **deserializeInputs**(`readStream`): ([`IUTXOInput`](interfaces/IUTXOInput.md) \| [`ITreasuryInput`](interfaces/ITreasuryInput.md))[]

Deserialize the inputs from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

([`IUTXOInput`](interfaces/IUTXOInput.md) \| [`ITreasuryInput`](interfaces/ITreasuryInput.md))[]

The deserialized object.

___

### serializeInputs

▸ **serializeInputs**(`writeStream`, `objects`): `void`

Serialize the inputs to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | ([`ITreasuryInput`](interfaces/ITreasuryInput.md) \| [`IUTXOInput`](interfaces/IUTXOInput.md))[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeInput

▸ **deserializeInput**(`readStream`): [`IUTXOInput`](interfaces/IUTXOInput.md) \| [`ITreasuryInput`](interfaces/ITreasuryInput.md)

Deserialize the input from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IUTXOInput`](interfaces/IUTXOInput.md) \| [`ITreasuryInput`](interfaces/ITreasuryInput.md)

The deserialized object.

___

### serializeInput

▸ **serializeInput**(`writeStream`, `object`): `void`

Serialize the input to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITreasuryInput`](interfaces/ITreasuryInput.md) \| [`IUTXOInput`](interfaces/IUTXOInput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeUTXOInput

▸ **deserializeUTXOInput**(`readStream`): [`IUTXOInput`](interfaces/IUTXOInput.md)

Deserialize the utxo input from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IUTXOInput`](interfaces/IUTXOInput.md)

The deserialized object.

___

### serializeUTXOInput

▸ **serializeUTXOInput**(`writeStream`, `object`): `void`

Serialize the utxo input to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IUTXOInput`](interfaces/IUTXOInput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTreasuryInput

▸ **deserializeTreasuryInput**(`readStream`): [`ITreasuryInput`](interfaces/ITreasuryInput.md)

Deserialize the treasury input from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITreasuryInput`](interfaces/ITreasuryInput.md)

The deserialized object.

___

### serializeTreasuryInput

▸ **serializeTreasuryInput**(`writeStream`, `object`): `void`

Serialize the treasury input to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITreasuryInput`](interfaces/ITreasuryInput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeMessage

▸ **deserializeMessage**(`readStream`): [`IMessage`](interfaces/IMessage.md)

Deserialize the message from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The message to deserialize. |

#### Returns

[`IMessage`](interfaces/IMessage.md)

The deserialized message.

___

### serializeMessage

▸ **serializeMessage**(`writeStream`, `object`): `void`

Serialize the message essence to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IMessage`](interfaces/IMessage.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeOutputs

▸ **deserializeOutputs**(`readStream`): ([`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md) \| [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) \| [`ITreasuryOutput`](interfaces/ITreasuryOutput.md))[]

Deserialize the outputs from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

([`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md) \| [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) \| [`ITreasuryOutput`](interfaces/ITreasuryOutput.md))[]

The deserialized object.

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`, `objects`): `void`

Serialize the outputs to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | ([`ITreasuryOutput`](interfaces/ITreasuryOutput.md) \| [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) \| [`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md))[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeOutput

▸ **deserializeOutput**(`readStream`): [`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md) \| [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) \| [`ITreasuryOutput`](interfaces/ITreasuryOutput.md)

Deserialize the output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md) \| [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) \| [`ITreasuryOutput`](interfaces/ITreasuryOutput.md)

The deserialized object.

___

### serializeOutput

▸ **serializeOutput**(`writeStream`, `object`): `void`

Serialize the output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITypeBase`](interfaces/ITypeBase.md)<`number`\> | The object to serialize. |

#### Returns

`void`

___

### deserializeSigLockedSingleOutput

▸ **deserializeSigLockedSingleOutput**(`readStream`): [`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md)

Deserialize the signature locked single output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md)

The deserialized object.

___

### serializeSigLockedSingleOutput

▸ **serializeSigLockedSingleOutput**(`writeStream`, `object`): `void`

Serialize the signature locked single output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeSigLockedDustAllowanceOutput

▸ **deserializeSigLockedDustAllowanceOutput**(`readStream`): [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md)

Deserialize the signature locked dust allowance output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md)

The deserialized object.

___

### serializeSigLockedDustAllowanceOutput

▸ **serializeSigLockedDustAllowanceOutput**(`writeStream`, `object`): `void`

Serialize the signature locked dust allowance output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTreasuryOutput

▸ **deserializeTreasuryOutput**(`readStream`): [`ITreasuryOutput`](interfaces/ITreasuryOutput.md)

Deserialize the treasury output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITreasuryOutput`](interfaces/ITreasuryOutput.md)

The deserialized object.

___

### serializeTreasuryOutput

▸ **serializeTreasuryOutput**(`writeStream`, `object`): `void`

Serialize the treasury output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITreasuryOutput`](interfaces/ITreasuryOutput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializePayload

▸ **deserializePayload**(`readStream`): [`ITransactionPayload`](interfaces/ITransactionPayload.md) \| [`IMilestonePayload`](interfaces/IMilestonePayload.md) \| [`IIndexationPayload`](interfaces/IIndexationPayload.md) \| [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md) \| [`IReceiptPayload`](interfaces/IReceiptPayload.md) \| `undefined`

Deserialize the payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITransactionPayload`](interfaces/ITransactionPayload.md) \| [`IMilestonePayload`](interfaces/IMilestonePayload.md) \| [`IIndexationPayload`](interfaces/IIndexationPayload.md) \| [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md) \| [`IReceiptPayload`](interfaces/IReceiptPayload.md) \| `undefined`

The deserialized object.

___

### serializePayload

▸ **serializePayload**(`writeStream`, `object`): `void`

Serialize the payload essence to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | `undefined` \| [`IIndexationPayload`](interfaces/IIndexationPayload.md) \| [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md) \| [`IReceiptPayload`](interfaces/IReceiptPayload.md) \| [`IMilestonePayload`](interfaces/IMilestonePayload.md) \| [`ITransactionPayload`](interfaces/ITransactionPayload.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTransactionPayload

▸ **deserializeTransactionPayload**(`readStream`): [`ITransactionPayload`](interfaces/ITransactionPayload.md)

Deserialize the transaction payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITransactionPayload`](interfaces/ITransactionPayload.md)

The deserialized object.

___

### serializeTransactionPayload

▸ **serializeTransactionPayload**(`writeStream`, `object`): `void`

Serialize the transaction payload to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITransactionPayload`](interfaces/ITransactionPayload.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeMilestonePayload

▸ **deserializeMilestonePayload**(`readStream`): [`IMilestonePayload`](interfaces/IMilestonePayload.md)

Deserialize the milestone payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IMilestonePayload`](interfaces/IMilestonePayload.md)

The deserialized object.

___

### serializeMilestonePayload

▸ **serializeMilestonePayload**(`writeStream`, `object`): `void`

Serialize the milestone payload to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IMilestonePayload`](interfaces/IMilestonePayload.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeIndexationPayload

▸ **deserializeIndexationPayload**(`readStream`): [`IIndexationPayload`](interfaces/IIndexationPayload.md)

Deserialize the indexation payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IIndexationPayload`](interfaces/IIndexationPayload.md)

The deserialized object.

___

### serializeIndexationPayload

▸ **serializeIndexationPayload**(`writeStream`, `object`): `void`

Serialize the indexation payload to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IIndexationPayload`](interfaces/IIndexationPayload.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeReceiptPayload

▸ **deserializeReceiptPayload**(`readStream`): [`IReceiptPayload`](interfaces/IReceiptPayload.md)

Deserialize the receipt payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IReceiptPayload`](interfaces/IReceiptPayload.md)

The deserialized object.

___

### serializeReceiptPayload

▸ **serializeReceiptPayload**(`writeStream`, `object`): `void`

Serialize the receipt payload to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IReceiptPayload`](interfaces/IReceiptPayload.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTreasuryTransactionPayload

▸ **deserializeTreasuryTransactionPayload**(`readStream`): [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md)

Deserialize the treasury transaction payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md)

The deserialized object.

___

### serializeTreasuryTransactionPayload

▸ **serializeTreasuryTransactionPayload**(`writeStream`, `object`): `void`

Serialize the treasury transaction payload to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeSignature

▸ **deserializeSignature**(`readStream`): [`IEd25519Signature`](interfaces/IEd25519Signature.md)

Deserialize the signature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IEd25519Signature`](interfaces/IEd25519Signature.md)

The deserialized object.

___

### serializeSignature

▸ **serializeSignature**(`writeStream`, `object`): `void`

Serialize the signature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IEd25519Signature`](interfaces/IEd25519Signature.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeEd25519Signature

▸ **deserializeEd25519Signature**(`readStream`): [`IEd25519Signature`](interfaces/IEd25519Signature.md)

Deserialize the Ed25519 signature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IEd25519Signature`](interfaces/IEd25519Signature.md)

The deserialized object.

___

### serializeEd25519Signature

▸ **serializeEd25519Signature**(`writeStream`, `object`): `void`

Serialize the Ed25519 signature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IEd25519Signature`](interfaces/IEd25519Signature.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTransactionEssence

▸ **deserializeTransactionEssence**(`readStream`): [`ITransactionEssence`](interfaces/ITransactionEssence.md)

Deserialize the transaction essence from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITransactionEssence`](interfaces/ITransactionEssence.md)

The deserialized object.

___

### serializeTransactionEssence

▸ **serializeTransactionEssence**(`writeStream`, `object`): `void`

Serialize the transaction essence to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITransactionEssence`](interfaces/ITransactionEssence.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeUnlockBlocks

▸ **deserializeUnlockBlocks**(`readStream`): ([`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) \| [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md))[]

Deserialize the unlock blocks from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

([`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) \| [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md))[]

The deserialized object.

___

### serializeUnlockBlocks

▸ **serializeUnlockBlocks**(`writeStream`, `objects`): `void`

Serialize the unlock blocks to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | ([`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md) \| [`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md))[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeUnlockBlock

▸ **deserializeUnlockBlock**(`readStream`): [`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) \| [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md)

Deserialize the unlock block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) \| [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md)

The deserialized object.

___

### serializeUnlockBlock

▸ **serializeUnlockBlock**(`writeStream`, `object`): `void`

Serialize the unlock block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md) \| [`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeSignatureUnlockBlock

▸ **deserializeSignatureUnlockBlock**(`readStream`): [`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md)

Deserialize the signature unlock block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md)

The deserialized object.

___

### serializeSignatureUnlockBlock

▸ **serializeSignatureUnlockBlock**(`writeStream`, `object`): `void`

Serialize the signature unlock block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeReferenceUnlockBlock

▸ **deserializeReferenceUnlockBlock**(`readStream`): [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md)

Deserialize the reference unlock block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md)

The deserialized object.

___

### serializeReferenceUnlockBlock

▸ **serializeReferenceUnlockBlock**(`writeStream`, `object`): `void`

Serialize the reference unlock block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md) | The object to serialize. |

#### Returns

`void`

___

### generateBip44Path

▸ **generateBip44Path**(`accountIndex`, `addressIndex`, `isInternal`): `Bip32Path`

Generate a bip44 path based on all its parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountIndex` | `number` | The account index. |
| `addressIndex` | `number` | The address index. |
| `isInternal` | `boolean` | Is this an internal address. |

#### Returns

`Bip32Path`

The generated address.

___

### generateBip44Address

▸ **generateBip44Address**(`generatorState`): `string`

Generate addresses based on the account indexing style.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generatorState` | [`IBip44GeneratorState`](interfaces/IBip44GeneratorState.md) | The address state. |

#### Returns

`string`

The key pair for the address.

___

### getBalance

▸ **getBalance**(`client`, `seed`, `accountIndex`, `addressOptions?`): `Promise`<`number`\>

Get the balance for a list of addresses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<`number`\>

The balance.

___

### getUnspentAddress

▸ **getUnspentAddress**(`client`, `seed`, `accountIndex`, `addressOptions?`): `Promise`<{ `address`: `string` ; `path`: `string` ; `balance`: `number`  } \| `undefined`\>

Get the first unspent address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{ `address`: `string` ; `path`: `string` ; `balance`: `number`  } \| `undefined`\>

The first unspent address.

___

### getUnspentAddresses

▸ **getUnspentAddresses**(`client`, `seed`, `accountIndex`, `addressOptions?`): `Promise`<{ `address`: `string` ; `path`: `string` ; `balance`: `number`  }[]\>

Get all the unspent addresses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |
| `addressOptions.requiredCount?` | `number` | The max number of addresses to find. |

#### Returns

`Promise`<{ `address`: `string` ; `path`: `string` ; `balance`: `number`  }[]\>

All the unspent addresses.

___

### getUnspentAddressesWithAddressGenerator

▸ **getUnspentAddressesWithAddressGenerator**<`T`\>(`client`, `seed`, `initialAddressState`, `nextAddressPath`, `addressOptions?`): `Promise`<{ `address`: `string` ; `path`: `string` ; `balance`: `number`  }[]\>

Get all the unspent addresses using an address generator.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to get the addresses from. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `initialAddressState` | `T` | The initial address state for calculating the addresses. |
| `nextAddressPath` | (`addressState`: `T`) => `string` | Calculate the next address for inputs. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |
| `addressOptions.requiredCount?` | `number` | The max number of addresses to find. |

#### Returns

`Promise`<{ `address`: `string` ; `path`: `string` ; `balance`: `number`  }[]\>

All the unspent addresses.

___

### promote

▸ **promote**(`client`, `messageId`): `Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

Promote an existing message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The clientor node endpoint to perform the promote with. |
| `messageId` | `string` | The message to promote. |

#### Returns

`Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

The id and message that were promoted.

___

### reattach

▸ **reattach**(`client`, `messageId`): `Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

Reattach an existing message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to perform the reattach with. |
| `messageId` | `string` | The message to reattach. |

#### Returns

`Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

The id and message that were reattached.

___

### retrieveData

▸ **retrieveData**(`client`, `messageId`): `Promise`<{ `index`: `Uint8Array` ; `data?`: `Uint8Array`  } \| `undefined`\>

Retrieve a data message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to retrieve the data with. |
| `messageId` | `string` | The message id of the data to get. |

#### Returns

`Promise`<{ `index`: `Uint8Array` ; `data?`: `Uint8Array`  } \| `undefined`\>

The message index and data.

___

### retry

▸ **retry**(`client`, `messageId`): `Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

Retry an existing message either by promoting or reattaching.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to perform the retry with. |
| `messageId` | `string` | The message to retry. |

#### Returns

`Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

The id and message that were retried.

___

### send

▸ **send**(`client`, `seed`, `accountIndex`, `addressBech32`, `amount`, `indexation?`, `addressOptions?`): `Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

Send a transfer from the balance on the seed to a single output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressBech32` | `string` | The address to send the funds to in bech32 format. |
| `amount` | `number` | The amount to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `indexation.key` | `string` \| `Uint8Array` | Indexation key. |
| `indexation.data?` | `string` \| `Uint8Array` | Optional index data. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

The id of the message created and the contructed message.

___

### sendEd25519

▸ **sendEd25519**(`client`, `seed`, `accountIndex`, `addressEd25519`, `amount`, `indexation?`, `addressOptions?`): `Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

Send a transfer from the balance on the seed to a single output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressEd25519` | `string` | The address to send the funds to in ed25519 format. |
| `amount` | `number` | The amount to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `indexation.key` | `Uint8Array` | Indexation key. |
| `indexation.data?` | `Uint8Array` | Optional index data. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

The id of the message created and the contructed message.

___

### sendMultiple

▸ **sendMultiple**(`client`, `seed`, `accountIndex`, `outputs`, `indexation?`, `addressOptions?`): `Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

Send a transfer from the balance on the seed to multiple outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `outputs` | { `addressBech32`: `string` ; `amount`: `number` ; `isDustAllowance?`: `boolean`  }[] | The address to send the funds to in bech32 format and amounts. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `indexation.key` | `string` \| `Uint8Array` | Indexation key. |
| `indexation.data?` | `string` \| `Uint8Array` | Optional index data. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

The id of the message created and the contructed message.

___

### sendMultipleEd25519

▸ **sendMultipleEd25519**(`client`, `seed`, `accountIndex`, `outputs`, `indexation?`, `addressOptions?`): `Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

Send a transfer from the balance on the seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `outputs` | { `addressEd25519`: `string` ; `amount`: `number` ; `isDustAllowance?`: `boolean`  }[] | The outputs including address to send the funds to in ed25519 format and amount. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `indexation.key` | `Uint8Array` | Indexation key. |
| `indexation.data?` | `Uint8Array` | Optional index data. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |
| `addressOptions.startIndex?` | `number` | The start index for the wallet count address, defaults to 0. |
| `addressOptions.zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

The id of the message created and the contructed message.

___

### sendWithAddressGenerator

▸ **sendWithAddressGenerator**<`T`\>(`client`, `seed`, `initialAddressState`, `nextAddressPath`, `outputs`, `indexation?`, `zeroCount?`): `Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

Send a transfer using account based indexing for the inputs.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `initialAddressState` | `T` | The initial address state for calculating the addresses. |
| `nextAddressPath` | (`addressState`: `T`) => `string` | Calculate the next address for inputs. |
| `outputs` | { `address`: `string` ; `addressType`: `number` ; `amount`: `number` ; `isDustAllowance?`: `boolean`  }[] | The address to send the funds to in bech32 format and amounts. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `indexation.key` | `string` \| `Uint8Array` | Indexation key. |
| `indexation.data?` | `string` \| `Uint8Array` | Optional index data. |
| `zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

The id of the message created and the contructed message.

___

### calculateInputs

▸ **calculateInputs**<`T`\>(`client`, `seed`, `initialAddressState`, `nextAddressPath`, `outputs`, `zeroCount?`): `Promise`<{ `input`: [`IUTXOInput`](interfaces/IUTXOInput.md) ; `addressKeyPair`: [`IKeyPair`](interfaces/IKeyPair.md)  }[]\>

Calculate the inputs from the seed and basePath.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | `undefined` | The client or node endpoint to calculate the inputs with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | `undefined` | The seed to use for address generation. |
| `initialAddressState` | `T` | `undefined` | The initial address state for calculating the addresses. |
| `nextAddressPath` | (`addressState`: `T`) => `string` | `undefined` | Calculate the next address for inputs. |
| `outputs` | { `address`: `string` ; `addressType`: `number` ; `amount`: `number`  }[] | `undefined` | The outputs to send. |
| `zeroCount` | `number` | `5` | Abort when the number of zero balances is exceeded. |

#### Returns

`Promise`<{ `input`: [`IUTXOInput`](interfaces/IUTXOInput.md) ; `addressKeyPair`: [`IKeyPair`](interfaces/IKeyPair.md)  }[]\>

The id of the message created and the contructed message.

___

### sendAdvanced

▸ **sendAdvanced**(`client`, `inputsAndSignatureKeyPairs`, `outputs`, `indexation?`): `Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

Send a transfer from the balance on the seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `inputsAndSignatureKeyPairs` | { `input`: [`IUTXOInput`](interfaces/IUTXOInput.md) ; `addressKeyPair`: [`IKeyPair`](interfaces/IKeyPair.md)  }[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | { `address`: `string` ; `addressType`: `number` ; `amount`: `number` ; `isDustAllowance?`: `boolean`  }[] | The outputs to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `indexation.key` | `string` \| `Uint8Array` | Indexation key. |
| `indexation.data?` | `string` \| `Uint8Array` | Optional index data. |

#### Returns

`Promise`<{ `messageId`: `string` ; `message`: [`IMessage`](interfaces/IMessage.md)  }\>

The id of the message created and the remainder address if one was needed.

___

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`, `outputs`, `indexation?`): [`ITransactionPayload`](interfaces/ITransactionPayload.md)

Build a transaction payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputsAndSignatureKeyPairs` | { `input`: [`IUTXOInput`](interfaces/IUTXOInput.md) ; `addressKeyPair`: [`IKeyPair`](interfaces/IKeyPair.md)  }[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | { `address`: `string` ; `addressType`: `number` ; `amount`: `number` ; `isDustAllowance?`: `boolean`  }[] | The outputs to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `indexation.key` | `string` \| `Uint8Array` | Indexation key. |
| `indexation.data?` | `string` \| `Uint8Array` | Optional index data. |

#### Returns

[`ITransactionPayload`](interfaces/ITransactionPayload.md)

The transaction payload.

___

### sendData

▸ **sendData**(`client`, `indexationKey`, `indexationData?`): `Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

Send a data message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the data with. |
| `indexationKey` | `string` \| `Uint8Array` | The index name. |
| `indexationData?` | `string` \| `Uint8Array` | The index data as either UTF8 text or Uint8Array bytes. |

#### Returns

`Promise`<{ `message`: [`IMessage`](interfaces/IMessage.md) ; `messageId`: `string`  }\>

The id of the message created and the message.

___

### setLogger

▸ **setLogger**(`log`): `void`

Set the logger for output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `log` | (`message`: `string`, `data?`: `unknown`) => `void` | The logger. |

#### Returns

`void`

___

### logInfo

▸ **logInfo**(`prefix`, `info`): `void`

Log the node information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `info` | [`INodeInfo`](interfaces/INodeInfo.md) | The info to log. |

#### Returns

`void`

___

### logTips

▸ **logTips**(`prefix`, `tipsResponse`): `void`

Log the tips information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `tipsResponse` | [`ITipsResponse`](interfaces/ITipsResponse.md) | The tips to log. |

#### Returns

`void`

___

### logMessage

▸ **logMessage**(`prefix`, `message`): `void`

Log a message to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `message` | [`IMessage`](interfaces/IMessage.md) | The message to log. |

#### Returns

`void`

___

### logMessageMetadata

▸ **logMessageMetadata**(`prefix`, `messageMetadata`): `void`

Log the message metadata to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `messageMetadata` | [`IMessageMetadata`](interfaces/IMessageMetadata.md) | The messageMetadata to log. |

#### Returns

`void`

___

### logPayload

▸ **logPayload**(`prefix`, `unknownPayload?`): `void`

Log a message to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownPayload?` | [`IIndexationPayload`](interfaces/IIndexationPayload.md) \| [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md) \| [`IReceiptPayload`](interfaces/IReceiptPayload.md) \| [`IMilestonePayload`](interfaces/IMilestonePayload.md) \| [`ITransactionPayload`](interfaces/ITransactionPayload.md) | The payload. |

#### Returns

`void`

___

### logTransactionPayload

▸ **logTransactionPayload**(`prefix`, `payload?`): `void`

Log a transaction payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`ITransactionPayload`](interfaces/ITransactionPayload.md) | The payload. |

#### Returns

`void`

___

### logIndexationPayload

▸ **logIndexationPayload**(`prefix`, `payload?`): `void`

Log a indexation payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`IIndexationPayload`](interfaces/IIndexationPayload.md) | The payload. |

#### Returns

`void`

___

### logMilestonePayload

▸ **logMilestonePayload**(`prefix`, `payload?`): `void`

Log a milestone payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`IMilestonePayload`](interfaces/IMilestonePayload.md) | The payload. |

#### Returns

`void`

___

### logReceiptPayload

▸ **logReceiptPayload**(`prefix`, `payload?`): `void`

Log a receipt payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`IReceiptPayload`](interfaces/IReceiptPayload.md) | The payload. |

#### Returns

`void`

___

### logTreasuryTransactionPayload

▸ **logTreasuryTransactionPayload**(`prefix`, `payload?`): `void`

Log a treasury transaction payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md) | The payload. |

#### Returns

`void`

___

### logAddress

▸ **logAddress**(`prefix`, `unknownAddress?`): `void`

Log an address to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownAddress?` | [`IEd25519Address`](interfaces/IEd25519Address.md) | The address to log. |

#### Returns

`void`

___

### logSignature

▸ **logSignature**(`prefix`, `unknownSignature?`): `void`

Log signature to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownSignature?` | [`IEd25519Signature`](interfaces/IEd25519Signature.md) | The signature to log. |

#### Returns

`void`

___

### logInput

▸ **logInput**(`prefix`, `unknownInput?`): `void`

Log input to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownInput?` | [`ITreasuryInput`](interfaces/ITreasuryInput.md) \| [`IUTXOInput`](interfaces/IUTXOInput.md) | The input to log. |

#### Returns

`void`

___

### logOutput

▸ **logOutput**(`prefix`, `unknownOutput?`): `void`

Log output to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownOutput?` | [`ITreasuryOutput`](interfaces/ITreasuryOutput.md) \| [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) \| [`ISigLockedSingleOutput`](interfaces/ISigLockedSingleOutput.md) | The output to log. |

#### Returns

`void`

___

### logUnlockBlock

▸ **logUnlockBlock**(`prefix`, `unknownUnlockBlock?`): `void`

Log unlock block to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownUnlockBlock?` | [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md) \| [`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) | The unlock block to log. |

#### Returns

`void`

___

### logFunds

▸ **logFunds**(`prefix`, `fund?`): `void`

Log fund to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `fund?` | [`IMigratedFunds`](interfaces/IMigratedFunds.md) | The fund to log. |

#### Returns

`void`

## Type Aliases

### LedgerInclusionState

Ƭ **LedgerInclusionState**: ``"noTransaction"`` \| ``"included"`` \| ``"conflicting"``

The different states of ledger inclusion.

___

### Units

Ƭ **Units**: ``"Pi"`` \| ``"Ti"`` \| ``"Gi"`` \| ``"Mi"`` \| ``"Ki"`` \| ``"i"``

Units for the token.
