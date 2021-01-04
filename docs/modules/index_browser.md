[@iota/iota.js](../README.md) / index.browser

# Module: index.browser

## Index

### Classes

* [ArrayHelper](../classes/index_browser.arrayhelper.md)
* [Bech32](../classes/index_browser.bech32.md)
* [Bech32Helper](../classes/index_browser.bech32helper.md)
* [BigIntHelper](../classes/index_browser.biginthelper.md)
* [Bip32Path](../classes/index_browser.bip32path.md)
* [Bip39](../classes/index_browser.bip39.md)
* [Blake2b](../classes/index_browser.blake2b.md)
* [Converter](../classes/index_browser.converter.md)
* [Curl](../classes/index_browser.curl.md)
* [Ed25519Address](../classes/index_browser.ed25519address.md)
* [Ed25519Seed](../classes/index_browser.ed25519seed.md)
* [HmacSha256](../classes/index_browser.hmacsha256.md)
* [HmacSha512](../classes/index_browser.hmacsha512.md)
* [LocalPowProvider](../classes/index_browser.localpowprovider.md)
* [MessageHelper](../classes/index_browser.messagehelper.md)
* [MqttClient](../classes/index_browser.mqttclient.md)
* [Pbkdf2](../classes/index_browser.pbkdf2.md)
* [PowHelper](../classes/index_browser.powhelper.md)
* [RandomHelper](../classes/index_browser.randomhelper.md)
* [ReadStream](../classes/index_browser.readstream.md)
* [Sha256](../classes/index_browser.sha256.md)
* [Sha512](../classes/index_browser.sha512.md)
* [SingleNodeClient](../classes/index_browser.singlenodeclient.md)
* [Slip0010](../classes/index_browser.slip0010.md)
* [UnitsHelper](../classes/index_browser.unitshelper.md)
* [WriteStream](../classes/index_browser.writestream.md)

### Interfaces

* [IAddress](../interfaces/index_browser.iaddress.md)
* [IAddressOutputsResponse](../interfaces/index_browser.iaddressoutputsresponse.md)
* [IAddressResponse](../interfaces/index_browser.iaddressresponse.md)
* [IBip44GeneratorState](../interfaces/index_browser.ibip44generatorstate.md)
* [IChildrenResponse](../interfaces/index_browser.ichildrenresponse.md)
* [IClient](../interfaces/index_browser.iclient.md)
* [IEd25519Address](../interfaces/index_browser.ied25519address.md)
* [IEd25519Signature](../interfaces/index_browser.ied25519signature.md)
* [IGossipMetrics](../interfaces/index_browser.igossipmetrics.md)
* [IIndexationPayload](../interfaces/index_browser.iindexationpayload.md)
* [IKeyPair](../interfaces/index_browser.ikeypair.md)
* [IMessage](../interfaces/index_browser.imessage.md)
* [IMessageIdResponse](../interfaces/index_browser.imessageidresponse.md)
* [IMessageMetadata](../interfaces/index_browser.imessagemetadata.md)
* [IMessagesResponse](../interfaces/index_browser.imessagesresponse.md)
* [IMilestonePayload](../interfaces/index_browser.imilestonepayload.md)
* [IMilestoneResponse](../interfaces/index_browser.imilestoneresponse.md)
* [IMqttClient](../interfaces/index_browser.imqttclient.md)
* [IMqttStatus](../interfaces/index_browser.imqttstatus.md)
* [INodeInfo](../interfaces/index_browser.inodeinfo.md)
* [IOutputResponse](../interfaces/index_browser.ioutputresponse.md)
* [IPeer](../interfaces/index_browser.ipeer.md)
* [IPowProvider](../interfaces/index_browser.ipowprovider.md)
* [IReferenceUnlockBlock](../interfaces/index_browser.ireferenceunlockblock.md)
* [IResponse](../interfaces/index_browser.iresponse.md)
* [ISeed](../interfaces/index_browser.iseed.md)
* [ISigLockedSingleOutput](../interfaces/index_browser.isiglockedsingleoutput.md)
* [ISignatureUnlockBlock](../interfaces/index_browser.isignatureunlockblock.md)
* [ITipsResponse](../interfaces/index_browser.itipsresponse.md)
* [ITransactionEssence](../interfaces/index_browser.itransactionessence.md)
* [ITransactionPayload](../interfaces/index_browser.itransactionpayload.md)
* [ITypeBase](../interfaces/index_browser.itypebase.md)
* [IUTXOInput](../interfaces/index_browser.iutxoinput.md)

### Type aliases

* [LedgerInclusionState](index_browser.md#ledgerinclusionstate)

### Variables

* [ED25519\_ADDRESS\_TYPE](index_browser.md#ed25519_address_type)
* [ED25519\_SEED\_TYPE](index_browser.md#ed25519_seed_type)
* [ED25519\_SIGNATURE\_TYPE](index_browser.md#ed25519_signature_type)
* [INDEXATION\_PAYLOAD\_TYPE](index_browser.md#indexation_payload_type)
* [MAX\_INDEXATION\_KEY\_LENGTH](index_browser.md#max_indexation_key_length)
* [MAX\_MESSAGE\_LENGTH](index_browser.md#max_message_length)
* [MILESTONE\_PAYLOAD\_TYPE](index_browser.md#milestone_payload_type)
* [REFERENCE\_UNLOCK\_BLOCK\_TYPE](index_browser.md#reference_unlock_block_type)
* [SIGNATURE\_UNLOCK\_BLOCK\_TYPE](index_browser.md#signature_unlock_block_type)
* [SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE](index_browser.md#sig_locked_single_output_type)
* [TRANSACTION\_ESSENCE\_TYPE](index_browser.md#transaction_essence_type)
* [TRANSACTION\_PAYLOAD\_TYPE](index_browser.md#transaction_payload_type)
* [UTXO\_INPUT\_TYPE](index_browser.md#utxo_input_type)

### Functions

* [buildTransactionPayload](index_browser.md#buildtransactionpayload)
* [calculateInputs](index_browser.md#calculateinputs)
* [deserializeAddress](index_browser.md#deserializeaddress)
* [deserializeEd25519Address](index_browser.md#deserializeed25519address)
* [deserializeEd25519Signature](index_browser.md#deserializeed25519signature)
* [deserializeIndexationPayload](index_browser.md#deserializeindexationpayload)
* [deserializeInput](index_browser.md#deserializeinput)
* [deserializeInputs](index_browser.md#deserializeinputs)
* [deserializeMessage](index_browser.md#deserializemessage)
* [deserializeMilestonePayload](index_browser.md#deserializemilestonepayload)
* [deserializeOutput](index_browser.md#deserializeoutput)
* [deserializeOutputs](index_browser.md#deserializeoutputs)
* [deserializePayload](index_browser.md#deserializepayload)
* [deserializeReferenceUnlockBlock](index_browser.md#deserializereferenceunlockblock)
* [deserializeSigLockedSingleOutput](index_browser.md#deserializesiglockedsingleoutput)
* [deserializeSignature](index_browser.md#deserializesignature)
* [deserializeSignatureUnlockBlock](index_browser.md#deserializesignatureunlockblock)
* [deserializeTransactionEssence](index_browser.md#deserializetransactionessence)
* [deserializeTransactionPayload](index_browser.md#deserializetransactionpayload)
* [deserializeUTXOInput](index_browser.md#deserializeutxoinput)
* [deserializeUnlockBlock](index_browser.md#deserializeunlockblock)
* [deserializeUnlockBlocks](index_browser.md#deserializeunlockblocks)
* [generateBip44Address](index_browser.md#generatebip44address)
* [generateBip44Path](index_browser.md#generatebip44path)
* [getBalance](index_browser.md#getbalance)
* [getUnspentAddress](index_browser.md#getunspentaddress)
* [getUnspentAddresses](index_browser.md#getunspentaddresses)
* [getUnspentAddressesWithAddressGenerator](index_browser.md#getunspentaddresseswithaddressgenerator)
* [logAddress](index_browser.md#logaddress)
* [logInfo](index_browser.md#loginfo)
* [logInput](index_browser.md#loginput)
* [logMessage](index_browser.md#logmessage)
* [logMessageMetadata](index_browser.md#logmessagemetadata)
* [logOutput](index_browser.md#logoutput)
* [logPayload](index_browser.md#logpayload)
* [logSignature](index_browser.md#logsignature)
* [logTips](index_browser.md#logtips)
* [logUnlockBlock](index_browser.md#logunlockblock)
* [promote](index_browser.md#promote)
* [reattach](index_browser.md#reattach)
* [retrieveData](index_browser.md#retrievedata)
* [retry](index_browser.md#retry)
* [send](index_browser.md#send)
* [sendAdvanced](index_browser.md#sendadvanced)
* [sendData](index_browser.md#senddata)
* [sendEd25519](index_browser.md#sended25519)
* [sendMultiple](index_browser.md#sendmultiple)
* [sendMultipleEd25519](index_browser.md#sendmultipleed25519)
* [sendWithAddressGenerator](index_browser.md#sendwithaddressgenerator)
* [serializeAddress](index_browser.md#serializeaddress)
* [serializeEd25519Address](index_browser.md#serializeed25519address)
* [serializeEd25519Signature](index_browser.md#serializeed25519signature)
* [serializeIndexationPayload](index_browser.md#serializeindexationpayload)
* [serializeInput](index_browser.md#serializeinput)
* [serializeInputs](index_browser.md#serializeinputs)
* [serializeMessage](index_browser.md#serializemessage)
* [serializeMilestonePayload](index_browser.md#serializemilestonepayload)
* [serializeOutput](index_browser.md#serializeoutput)
* [serializeOutputs](index_browser.md#serializeoutputs)
* [serializePayload](index_browser.md#serializepayload)
* [serializeReferenceUnlockBlock](index_browser.md#serializereferenceunlockblock)
* [serializeSigLockedSingleOutput](index_browser.md#serializesiglockedsingleoutput)
* [serializeSignature](index_browser.md#serializesignature)
* [serializeSignatureUnlockBlock](index_browser.md#serializesignatureunlockblock)
* [serializeTransactionEssence](index_browser.md#serializetransactionessence)
* [serializeTransactionPayload](index_browser.md#serializetransactionpayload)
* [serializeUTXOInput](index_browser.md#serializeutxoinput)
* [serializeUnlockBlock](index_browser.md#serializeunlockblock)
* [serializeUnlockBlocks](index_browser.md#serializeunlockblocks)
* [setLogger](index_browser.md#setlogger)

## Type aliases

### LedgerInclusionState

Ƭ **LedgerInclusionState**: *noTransaction* \| *included* \| *conflicting*

The different states of ledger inclusion.

## Variables

### ED25519\_ADDRESS\_TYPE

• `Const` **ED25519\_ADDRESS\_TYPE**: *number*= 1

The global type for the address type.

___

### ED25519\_SEED\_TYPE

• `Const` **ED25519\_SEED\_TYPE**: *number*= 1

The global type for the seed.

___

### ED25519\_SIGNATURE\_TYPE

• `Const` **ED25519\_SIGNATURE\_TYPE**: *number*= 1

The global type for the signature type.

___

### INDEXATION\_PAYLOAD\_TYPE

• `Const` **INDEXATION\_PAYLOAD\_TYPE**: *number*= 2

The global type for the payload.

___

### MAX\_INDEXATION\_KEY\_LENGTH

• `Const` **MAX\_INDEXATION\_KEY\_LENGTH**: *number*= 64

The maximum length of a indexation key.

___

### MAX\_MESSAGE\_LENGTH

• `Const` **MAX\_MESSAGE\_LENGTH**: *number*= 32768

The maximum length of a message.

___

### MILESTONE\_PAYLOAD\_TYPE

• `Const` **MILESTONE\_PAYLOAD\_TYPE**: *number*= 1

The global type for the payload.

___

### REFERENCE\_UNLOCK\_BLOCK\_TYPE

• `Const` **REFERENCE\_UNLOCK\_BLOCK\_TYPE**: *number*= 1

The global type for the unlock block.

___

### SIGNATURE\_UNLOCK\_BLOCK\_TYPE

• `Const` **SIGNATURE\_UNLOCK\_BLOCK\_TYPE**: *number*= 0

The global type for the unlock block.

___

### SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE

• `Const` **SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE**: *number*= 0

The global type for the sig locked single output.

___

### TRANSACTION\_ESSENCE\_TYPE

• `Const` **TRANSACTION\_ESSENCE\_TYPE**: *number*= 0

The global type for the transaction essence.

___

### TRANSACTION\_PAYLOAD\_TYPE

• `Const` **TRANSACTION\_PAYLOAD\_TYPE**: *number*= 0

The global type for the payload.

___

### UTXO\_INPUT\_TYPE

• `Const` **UTXO\_INPUT\_TYPE**: *number*= 0

The global type for the input.

## Functions

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`: {}[], `outputs`: {}[], `indexationKey?`: *string*, `indexationData?`: *Uint8Array*): [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

Build a transaction payload.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers.   |
`outputs` | {}[] | The outputs to send.   |
`indexationKey?` | *string* | Optional indexation key.   |
`indexationData?` | *Uint8Array* | Optional index data.   |

**Returns:** [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

The transaction payload.

___

### calculateInputs

▸ **calculateInputs**<T\>(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `initialAddressState`: T, `nextAddressPath`: (`addressState`: T, `isFirst`: *boolean*) => *string*, `outputs`: {}[], `zeroCount?`: *number*): *Promise*<{}[]\>

Calculate the inputs from the seed and basePath.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | - | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | - | The seed to use for address generation.   |
`initialAddressState` | T | - | The initial address state for calculating the addresses.   |
`nextAddressPath` | (`addressState`: T, `isFirst`: *boolean*) => *string* | - | Calculate the next address for inputs.   |
`outputs` | {}[] | - | The outputs to send.   |
`zeroCount` | *number* | 5 | Abort when the number of zero balances is exceeded.   |

**Returns:** *Promise*<{}[]\>

The id of the message created and the contructed message.

___

### deserializeAddress

▸ **deserializeAddress**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md)

Deserialize the address from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md)

The deserialized object.

___

### deserializeEd25519Address

▸ **deserializeEd25519Address**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md)

Deserialize the Ed25519 address from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md)

The deserialized object.

___

### deserializeEd25519Signature

▸ **deserializeEd25519Signature**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md)

Deserialize the Ed25519 signature from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md)

The deserialized object.

___

### deserializeIndexationPayload

▸ **deserializeIndexationPayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md)

Deserialize the indexation payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md)

The deserialized object.

___

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

### deserializeMessage

▸ **deserializeMessage**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IMessage*](../interfaces/models_imessage.imessage.md)

Deserialize the message from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The message to deserialize.   |

**Returns:** [*IMessage*](../interfaces/models_imessage.imessage.md)

The deserialized message.

___

### deserializeMilestonePayload

▸ **deserializeMilestonePayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md)

Deserialize the milestone payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md)

The deserialized object.

___

### deserializeOutput

▸ **deserializeOutput**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

Deserialize the output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

The deserialized object.

___

### deserializeOutputs

▸ **deserializeOutputs**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[]

Deserialize the outputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[]

The deserialized object.

___

### deserializePayload

▸ **deserializePayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

Deserialize the payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

The deserialized object.

___

### deserializeReferenceUnlockBlock

▸ **deserializeReferenceUnlockBlock**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md)

Deserialize the reference unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md)

The deserialized object.

___

### deserializeSigLockedSingleOutput

▸ **deserializeSigLockedSingleOutput**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

Deserialize the signature locked single output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)

The deserialized object.

___

### deserializeSignature

▸ **deserializeSignature**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md)

Deserialize the signature from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md)

The deserialized object.

___

### deserializeSignatureUnlockBlock

▸ **deserializeSignatureUnlockBlock**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

Deserialize the signature unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

The deserialized object.

___

### deserializeTransactionEssence

▸ **deserializeTransactionEssence**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md)

Deserialize the transaction essence from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md)

The deserialized object.

___

### deserializeTransactionPayload

▸ **deserializeTransactionPayload**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

Deserialize the transaction payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

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

### deserializeUnlockBlock

▸ **deserializeUnlockBlock**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

Deserialize the unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)

The deserialized object.

___

### deserializeUnlockBlocks

▸ **deserializeUnlockBlocks**(`readStream`: [*ReadStream*](../classes/utils_readstream.readstream.md)): ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[]

Deserialize the unlock blocks from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [*ReadStream*](../classes/utils_readstream.readstream.md) | The stream to read the data from.   |

**Returns:** ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[]

The deserialized object.

___

### generateBip44Address

▸ **generateBip44Address**(`generatorState`: [*IBip44GeneratorState*](../interfaces/models_ibip44generatorstate.ibip44generatorstate.md), `isFirst`: *boolean*): *string*

Generate addresses based on the account indexing style.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`generatorState` | [*IBip44GeneratorState*](../interfaces/models_ibip44generatorstate.ibip44generatorstate.md) | The address state.   |
`isFirst` | *boolean* | Is this the first address we are generating.   |

**Returns:** *string*

The key pair for the address.

___

### generateBip44Path

▸ **generateBip44Path**(`accountIndex`: *number*, `addressIndex`: *number*, `isInternal`: *boolean*): [*Bip32Path*](../classes/crypto_bip32path.bip32path.md)

Generate a bip44 path based on all its parts.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`accountIndex` | *number* | The account index.   |
`addressIndex` | *number* | The address index.   |
`isInternal` | *boolean* | Is this an internal address.   |

**Returns:** [*Bip32Path*](../classes/crypto_bip32path.bip32path.md)

The generated address.

___

### getBalance

▸ **getBalance**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `startIndex?`: *number*): *Promise*<*number*\>

Get the balance for a list of addresses.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | - | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | - | The seed.   |
`accountIndex` | *number* | - | The account index in the wallet.   |
`startIndex` | *number* | 0 | The start index to generate from, defaults to 0.   |

**Returns:** *Promise*<*number*\>

The balance.

___

### getUnspentAddress

▸ **getUnspentAddress**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `startIndex?`: *number*): *Promise*<*undefined* \| {}\>

Get the first unspent address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`accountIndex` | *number* | The account index in the wallet.   |
`startIndex?` | *number* | Optional start index for the wallet count address, defaults to 0.   |

**Returns:** *Promise*<*undefined* \| {}\>

The first unspent address.

___

### getUnspentAddresses

▸ **getUnspentAddresses**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `startIndex?`: *number*, `countLimit?`: *number*, `zeroCount?`: *number*): *Promise*<{}[]\>

Get all the unspent addresses.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`accountIndex` | *number* | The account index in the wallet.   |
`startIndex?` | *number* | Optional start index for the wallet count address, defaults to 0.   |
`countLimit?` | *number* | Limit the number of items to find.   |
`zeroCount?` | *number* | Abort when the number of zero balances is exceeded.   |

**Returns:** *Promise*<{}[]\>

All the unspent addresses.

___

### getUnspentAddressesWithAddressGenerator

▸ **getUnspentAddressesWithAddressGenerator**<T\>(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `initialAddressState`: T, `nextAddressPath`: (`addressState`: T, `isFirst`: *boolean*) => *string*, `countLimit?`: *number*, `zeroCount?`: *number*): *Promise*<{}[]\>

Get all the unspent addresses using an address generator.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | - | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | - | The seed to use for address generation.   |
`initialAddressState` | T | - | The initial address state for calculating the addresses.   |
`nextAddressPath` | (`addressState`: T, `isFirst`: *boolean*) => *string* | - | Calculate the next address for inputs.   |
`countLimit` | *number* | ... | Limit the number of items to find.   |
`zeroCount` | *number* | 5 | Abort when the number of zero balances is exceeded.   |

**Returns:** *Promise*<{}[]\>

All the unspent addresses.

___

### logAddress

▸ **logAddress**(`prefix`: *string*, `unknownAddress?`: [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\>): *void*

Log an address to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownAddress?` | [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\> | The address to log.    |

**Returns:** *void*

___

### logInfo

▸ **logInfo**(`prefix`: *string*, `info`: [*INodeInfo*](../interfaces/models_inodeinfo.inodeinfo.md)): *void*

Log the node information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`info` | [*INodeInfo*](../interfaces/models_inodeinfo.inodeinfo.md) | The info to log.    |

**Returns:** *void*

___

### logInput

▸ **logInput**(`prefix`: *string*, `unknownInput?`: [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\>): *void*

Log input to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownInput?` | [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\> | The input to log.    |

**Returns:** *void*

___

### logMessage

▸ **logMessage**(`prefix`: *string*, `message`: [*IMessage*](../interfaces/models_imessage.imessage.md)): *void*

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`message` | [*IMessage*](../interfaces/models_imessage.imessage.md) | The message to log.    |

**Returns:** *void*

___

### logMessageMetadata

▸ **logMessageMetadata**(`prefix`: *string*, `messageMetadata`: [*IMessageMetadata*](../interfaces/models_imessagemetadata.imessagemetadata.md)): *void*

Log the message metadata to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`messageMetadata` | [*IMessageMetadata*](../interfaces/models_imessagemetadata.imessagemetadata.md) | The messageMetadata to log.    |

**Returns:** *void*

___

### logOutput

▸ **logOutput**(`prefix`: *string*, `unknownOutput?`: [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\>): *void*

Log output to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownOutput?` | [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\> | The output to log.    |

**Returns:** *void*

___

### logPayload

▸ **logPayload**(`prefix`: *string*, `unknownPayload?`: [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\>): *void*

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownPayload?` | [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\> | The payload.    |

**Returns:** *void*

___

### logSignature

▸ **logSignature**(`prefix`: *string*, `unknownSignature?`: [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\>): *void*

Log signature to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownSignature?` | [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\> | The signature to log.    |

**Returns:** *void*

___

### logTips

▸ **logTips**(`prefix`: *string*, `tipsResponse`: [*ITipsResponse*](../interfaces/models_api_itipsresponse.itipsresponse.md)): *void*

Log the tips information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`tipsResponse` | [*ITipsResponse*](../interfaces/models_api_itipsresponse.itipsresponse.md) | The tips to log.    |

**Returns:** *void*

___

### logUnlockBlock

▸ **logUnlockBlock**(`prefix`: *string*, `unknownUnlockBlock?`: [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\>): *void*

Log unlock block to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownUnlockBlock?` | [*ITypeBase*](../interfaces/models_itypebase.itypebase.md)<*unknown*\> | The unlock block to log.    |

**Returns:** *void*

___

### promote

▸ **promote**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `messageId`: *string*): *Promise*<{}\>

Promote an existing message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to perform the promote with.   |
`messageId` | *string* | The message to promote.   |

**Returns:** *Promise*<{}\>

The id and message that were promoted.

___

### reattach

▸ **reattach**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `messageId`: *string*): *Promise*<{}\>

Reattach an existing message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to perform the reattach with.   |
`messageId` | *string* | The message to reattach.   |

**Returns:** *Promise*<{}\>

The id and message that were reattached.

___

### retrieveData

▸ **retrieveData**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `messageId`: *string*): *Promise*<*undefined* \| {}\>

Retrieve a data message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`messageId` | *string* | The message id of the data to get.   |

**Returns:** *Promise*<*undefined* \| {}\>

The message index and data.

___

### retry

▸ **retry**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `messageId`: *string*): *Promise*<{}\>

Retry an existing message either by promoting or reattaching.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to perform the retry with.   |
`messageId` | *string* | The message to retry.   |

**Returns:** *Promise*<{}\>

The id and message that were retried.

___

### send

▸ **send**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `addressBech32`: *string*, `amount`: *number*, `startIndex?`: *number*): *Promise*<{}\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`accountIndex` | *number* | The account index in the wallet.   |
`addressBech32` | *string* | The address to send the funds to in bech32 format.   |
`amount` | *number* | The amount to send.   |
`startIndex?` | *number* | The start index for the wallet count address, defaults to 0.   |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendAdvanced

▸ **sendAdvanced**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `inputsAndSignatureKeyPairs`: {}[], `outputs`: {}[], `indexationKey?`: *string*, `indexationData?`: *Uint8Array*): *Promise*<{}\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers.   |
`outputs` | {}[] | The outputs to send.   |
`indexationKey?` | *string* | Optional indexation key.   |
`indexationData?` | *Uint8Array* | Optional index data.   |

**Returns:** *Promise*<{}\>

The id of the message created and the remainder address if one was needed.

___

### sendData

▸ **sendData**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `indexationKey`: *string*, `indexationData?`: *Uint8Array*): *Promise*<{}\>

Send a data message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`indexationKey` | *string* | The index name.   |
`indexationData?` | *Uint8Array* | The index data.   |

**Returns:** *Promise*<{}\>

The id of the message created and the message.

___

### sendEd25519

▸ **sendEd25519**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `addressEd25519`: *string*, `amount`: *number*, `startIndex?`: *number*): *Promise*<{}\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`accountIndex` | *number* | The account index in the wallet.   |
`addressEd25519` | *string* | The address to send the funds to in ed25519 format.   |
`amount` | *number* | The amount to send.   |
`startIndex?` | *number* | The start index for the wallet count address, defaults to 0.   |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendMultiple

▸ **sendMultiple**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `outputs`: {}[], `startIndex?`: *number*): *Promise*<{}\>

Send a transfer from the balance on the seed to multiple outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`accountIndex` | *number* | The account index in the wallet.   |
`outputs` | {}[] | The address to send the funds to in bech32 format and amounts.   |
`startIndex?` | *number* | The start index for the wallet count address, defaults to 0.   |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendMultipleEd25519

▸ **sendMultipleEd25519**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `outputs`: {}[], `startIndex?`: *number*): *Promise*<{}\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`accountIndex` | *number* | The account index in the wallet.   |
`outputs` | {}[] | The outputs including address to send the funds to in ed25519 format and amount.   |
`startIndex?` | *number* | The start index for the wallet count address, defaults to 0.   |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendWithAddressGenerator

▸ **sendWithAddressGenerator**<T\>(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `initialAddressState`: T, `nextAddressPath`: (`addressState`: T, `isFirst`: *boolean*) => *string*, `outputs`: {}[]): *Promise*<{}\>

Send a transfer using account based indexing for the inputs.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`initialAddressState` | T | The initial address state for calculating the addresses.   |
`nextAddressPath` | (`addressState`: T, `isFirst`: *boolean*) => *string* | Calculate the next address for inputs.   |
`outputs` | {}[] | The address to send the funds to in bech32 format and amounts.   |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### serializeAddress

▸ **serializeAddress**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md)): *void*

Serialize the address to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeEd25519Address

▸ **serializeEd25519Address**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md)): *void*

Serialize the ed25519 address to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IEd25519Address*](../interfaces/models_ied25519address.ied25519address.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeEd25519Signature

▸ **serializeEd25519Signature**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md)): *void*

Serialize the Ed25519 signature to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeIndexationPayload

▸ **serializeIndexationPayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md)): *void*

Serialize the indexation payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) | The object to serialize.    |

**Returns:** *void*

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

### serializeMessage

▸ **serializeMessage**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IMessage*](../interfaces/models_imessage.imessage.md)): *void*

Serialize the message essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IMessage*](../interfaces/models_imessage.imessage.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeMilestonePayload

▸ **serializeMilestonePayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md)): *void*

Serialize the milestone payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeOutput

▸ **serializeOutput**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)): *void*

Serialize the output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `objects`: [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[]): *void*

Serialize the outputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`objects` | [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)[] | The objects to serialize.    |

**Returns:** *void*

___

### serializePayload

▸ **serializePayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)): *void*

Serialize the payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | *undefined* \| [*IIndexationPayload*](../interfaces/models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](../interfaces/models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeReferenceUnlockBlock

▸ **serializeReferenceUnlockBlock**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md)): *void*

Serialize the reference unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeSigLockedSingleOutput

▸ **serializeSigLockedSingleOutput**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md)): *void*

Serialize the signature locked single output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISigLockedSingleOutput*](../interfaces/models_isiglockedsingleoutput.isiglockedsingleoutput.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeSignature

▸ **serializeSignature**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md)): *void*

Serialize the signature to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IEd25519Signature*](../interfaces/models_ied25519signature.ied25519signature.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeSignatureUnlockBlock

▸ **serializeSignatureUnlockBlock**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)): *void*

Serialize the signature unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeTransactionEssence

▸ **serializeTransactionEssence**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md)): *void*

Serialize the transaction essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ITransactionEssence*](../interfaces/models_itransactionessence.itransactionessence.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeTransactionPayload

▸ **serializeTransactionPayload**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)): *void*

Serialize the transaction payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md) | The object to serialize.    |

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

___

### serializeUnlockBlock

▸ **serializeUnlockBlock**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `object`: [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md)): *void*

Serialize the unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`object` | [*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md) | The object to serialize.    |

**Returns:** *void*

___

### serializeUnlockBlocks

▸ **serializeUnlockBlocks**(`writeStream`: [*WriteStream*](../classes/utils_writestream.writestream.md), `objects`: ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[]): *void*

Serialize the unlock blocks to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [*WriteStream*](../classes/utils_writestream.writestream.md) | The stream to write the data to.   |
`objects` | ([*IReferenceUnlockBlock*](../interfaces/models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](../interfaces/models_isignatureunlockblock.isignatureunlockblock.md))[] | The objects to serialize.    |

**Returns:** *void*

___

### setLogger

▸ **setLogger**(`log`: (`message`: *string*, `data?`: *unknown*) => *void*): *void*

Set the logger for output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`log` | (`message`: *string*, `data?`: *unknown*) => *void* | The logger.    |

**Returns:** *void*
