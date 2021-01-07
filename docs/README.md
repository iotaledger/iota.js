**[@iota/iota.js](README.md)**

> Globals

# @iota/iota.js

## Index

### Classes

* [ArrayHelper](classes/arrayhelper.md)
* [B1T6](classes/b1t6.md)
* [Bech32](classes/bech32.md)
* [Bech32Helper](classes/bech32helper.md)
* [BigIntHelper](classes/biginthelper.md)
* [Bip32Path](classes/bip32path.md)
* [Bip39](classes/bip39.md)
* [Blake2b](classes/blake2b.md)
* [CachedGroupElement](classes/cachedgroupelement.md)
* [CompletedGroupElement](classes/completedgroupelement.md)
* [Converter](classes/converter.md)
* [Curl](classes/curl.md)
* [Ed25519Address](classes/ed25519address.md)
* [Ed25519Seed](classes/ed25519seed.md)
* [ExtendedGroupElement](classes/extendedgroupelement.md)
* [FieldElement](classes/fieldelement.md)
* [HmacSha256](classes/hmacsha256.md)
* [HmacSha512](classes/hmacsha512.md)
* [LocalPowProvider](classes/localpowprovider.md)
* [MqttClient](classes/mqttclient.md)
* [Pbkdf2](classes/pbkdf2.md)
* [PowHelper](classes/powhelper.md)
* [PreComputedGroupElement](classes/precomputedgroupelement.md)
* [ProjectiveGroupElement](classes/projectivegroupelement.md)
* [RandomHelper](classes/randomhelper.md)
* [ReadStream](classes/readstream.md)
* [Sha256](classes/sha256.md)
* [Sha512](classes/sha512.md)
* [SingleNodeClient](classes/singlenodeclient.md)
* [Slip0010](classes/slip0010.md)
* [UnitsHelper](classes/unitshelper.md)
* [WriteStream](classes/writestream.md)

### Interfaces

* [IAddress](interfaces/iaddress.md)
* [IAddressOutputsResponse](interfaces/iaddressoutputsresponse.md)
* [IAddressResponse](interfaces/iaddressresponse.md)
* [IBip44GeneratorState](interfaces/ibip44generatorstate.md)
* [IChildrenResponse](interfaces/ichildrenresponse.md)
* [IClient](interfaces/iclient.md)
* [IEd25519Address](interfaces/ied25519address.md)
* [IEd25519Signature](interfaces/ied25519signature.md)
* [IGossipMetrics](interfaces/igossipmetrics.md)
* [IIndexationPayload](interfaces/iindexationpayload.md)
* [IKeyPair](interfaces/ikeypair.md)
* [IMessage](interfaces/imessage.md)
* [IMessageIdResponse](interfaces/imessageidresponse.md)
* [IMessageMetadata](interfaces/imessagemetadata.md)
* [IMessagesResponse](interfaces/imessagesresponse.md)
* [IMilestonePayload](interfaces/imilestonepayload.md)
* [IMilestoneResponse](interfaces/imilestoneresponse.md)
* [IMqttClient](interfaces/imqttclient.md)
* [IMqttMilestoneResponse](interfaces/imqttmilestoneresponse.md)
* [IMqttStatus](interfaces/imqttstatus.md)
* [INodeInfo](interfaces/inodeinfo.md)
* [IOutputResponse](interfaces/ioutputresponse.md)
* [IPeer](interfaces/ipeer.md)
* [IPowProvider](interfaces/ipowprovider.md)
* [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md)
* [IResponse](interfaces/iresponse.md)
* [ISeed](interfaces/iseed.md)
* [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)
* [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md)
* [ITipsResponse](interfaces/itipsresponse.md)
* [ITransactionEssence](interfaces/itransactionessence.md)
* [ITransactionPayload](interfaces/itransactionpayload.md)
* [ITypeBase](interfaces/itypebase.md)
* [IUTXOInput](interfaces/iutxoinput.md)

### Type aliases

* [LedgerInclusionState](README.md#ledgerinclusionstate)

### Variables

* [BIG\_1\_SHIFTL\_20](README.md#big_1_shiftl_20)
* [ED25519\_ADDRESS\_TYPE](README.md#ed25519_address_type)
* [ED25519\_SEED\_TYPE](README.md#ed25519_seed_type)
* [ED25519\_SIGNATURE\_TYPE](README.md#ed25519_signature_type)
* [INDEXATION\_PAYLOAD\_TYPE](README.md#indexation_payload_type)
* [MAX\_INDEXATION\_KEY\_LENGTH](README.md#max_indexation_key_length)
* [MAX\_MESSAGE\_LENGTH](README.md#max_message_length)
* [MILESTONE\_PAYLOAD\_TYPE](README.md#milestone_payload_type)
* [REFERENCE\_UNLOCK\_BLOCK\_TYPE](README.md#reference_unlock_block_type)
* [SIGNATURE\_UNLOCK\_BLOCK\_TYPE](README.md#signature_unlock_block_type)
* [SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE](README.md#sig_locked_single_output_type)
* [TRANSACTION\_ESSENCE\_TYPE](README.md#transaction_essence_type)
* [TRANSACTION\_PAYLOAD\_TYPE](README.md#transaction_payload_type)
* [UTXO\_INPUT\_TYPE](README.md#utxo_input_type)

### Functions

* [buildTransactionPayload](README.md#buildtransactionpayload)
* [calculateInputs](README.md#calculateinputs)
* [deserializeAddress](README.md#deserializeaddress)
* [deserializeEd25519Address](README.md#deserializeed25519address)
* [deserializeEd25519Signature](README.md#deserializeed25519signature)
* [deserializeIndexationPayload](README.md#deserializeindexationpayload)
* [deserializeInput](README.md#deserializeinput)
* [deserializeInputs](README.md#deserializeinputs)
* [deserializeMessage](README.md#deserializemessage)
* [deserializeMilestonePayload](README.md#deserializemilestonepayload)
* [deserializeOutput](README.md#deserializeoutput)
* [deserializeOutputs](README.md#deserializeoutputs)
* [deserializePayload](README.md#deserializepayload)
* [deserializeReferenceUnlockBlock](README.md#deserializereferenceunlockblock)
* [deserializeSigLockedSingleOutput](README.md#deserializesiglockedsingleoutput)
* [deserializeSignature](README.md#deserializesignature)
* [deserializeSignatureUnlockBlock](README.md#deserializesignatureunlockblock)
* [deserializeTransactionEssence](README.md#deserializetransactionessence)
* [deserializeTransactionPayload](README.md#deserializetransactionpayload)
* [deserializeUTXOInput](README.md#deserializeutxoinput)
* [deserializeUnlockBlock](README.md#deserializeunlockblock)
* [deserializeUnlockBlocks](README.md#deserializeunlockblocks)
* [generateBip44Address](README.md#generatebip44address)
* [generateBip44Path](README.md#generatebip44path)
* [getBalance](README.md#getbalance)
* [getUnspentAddress](README.md#getunspentaddress)
* [getUnspentAddresses](README.md#getunspentaddresses)
* [getUnspentAddressesWithAddressGenerator](README.md#getunspentaddresseswithaddressgenerator)
* [logAddress](README.md#logaddress)
* [logInfo](README.md#loginfo)
* [logInput](README.md#loginput)
* [logMessage](README.md#logmessage)
* [logMessageMetadata](README.md#logmessagemetadata)
* [logOutput](README.md#logoutput)
* [logPayload](README.md#logpayload)
* [logSignature](README.md#logsignature)
* [logTips](README.md#logtips)
* [logUnlockBlock](README.md#logunlockblock)
* [logger](README.md#logger)
* [promote](README.md#promote)
* [reattach](README.md#reattach)
* [retrieveData](README.md#retrievedata)
* [retry](README.md#retry)
* [scalarMinimal](README.md#scalarminimal)
* [scalarMulAdd](README.md#scalarmuladd)
* [scalarReduce](README.md#scalarreduce)
* [send](README.md#send)
* [sendAdvanced](README.md#sendadvanced)
* [sendData](README.md#senddata)
* [sendEd25519](README.md#sended25519)
* [sendMultiple](README.md#sendmultiple)
* [sendMultipleEd25519](README.md#sendmultipleed25519)
* [sendWithAddressGenerator](README.md#sendwithaddressgenerator)
* [serializeAddress](README.md#serializeaddress)
* [serializeEd25519Address](README.md#serializeed25519address)
* [serializeEd25519Signature](README.md#serializeed25519signature)
* [serializeIndexationPayload](README.md#serializeindexationpayload)
* [serializeInput](README.md#serializeinput)
* [serializeInputs](README.md#serializeinputs)
* [serializeMessage](README.md#serializemessage)
* [serializeMilestonePayload](README.md#serializemilestonepayload)
* [serializeOutput](README.md#serializeoutput)
* [serializeOutputs](README.md#serializeoutputs)
* [serializePayload](README.md#serializepayload)
* [serializeReferenceUnlockBlock](README.md#serializereferenceunlockblock)
* [serializeSigLockedSingleOutput](README.md#serializesiglockedsingleoutput)
* [serializeSignature](README.md#serializesignature)
* [serializeSignatureUnlockBlock](README.md#serializesignatureunlockblock)
* [serializeTransactionEssence](README.md#serializetransactionessence)
* [serializeTransactionPayload](README.md#serializetransactionpayload)
* [serializeUTXOInput](README.md#serializeutxoinput)
* [serializeUnlockBlock](README.md#serializeunlockblock)
* [serializeUnlockBlocks](README.md#serializeunlockblocks)
* [setLogger](README.md#setlogger)

### Object literals

* [CONFLICT\_REASON\_STRINGS](README.md#conflict_reason_strings)

## Type aliases

### LedgerInclusionState

Ƭ  **LedgerInclusionState**: \"noTransaction\" \| \"included\" \| \"conflicting\"

The different states of ledger inclusion.

## Variables

### BIG\_1\_SHIFTL\_20

• `Const` **BIG\_1\_SHIFTL\_20**: bigint = BigInt(1) << BigInt(20)

This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
which is an extension of https://github.com/golang/crypto/tree/master/ed25519
which is in turn a port of the “ref10” implementation of ed25519 from SUPERCOP

___

### ED25519\_ADDRESS\_TYPE

• `Const` **ED25519\_ADDRESS\_TYPE**: number = 1

The global type for the address type.

___

### ED25519\_SEED\_TYPE

• `Const` **ED25519\_SEED\_TYPE**: number = 1

The global type for the seed.

___

### ED25519\_SIGNATURE\_TYPE

• `Const` **ED25519\_SIGNATURE\_TYPE**: number = 1

The global type for the signature type.

___

### INDEXATION\_PAYLOAD\_TYPE

• `Const` **INDEXATION\_PAYLOAD\_TYPE**: number = 2

The global type for the payload.

___

### MAX\_INDEXATION\_KEY\_LENGTH

• `Const` **MAX\_INDEXATION\_KEY\_LENGTH**: number = 64

The maximum length of a indexation key.

___

### MAX\_MESSAGE\_LENGTH

• `Const` **MAX\_MESSAGE\_LENGTH**: number = 32768

The maximum length of a message.

___

### MILESTONE\_PAYLOAD\_TYPE

• `Const` **MILESTONE\_PAYLOAD\_TYPE**: number = 1

The global type for the payload.

___

### REFERENCE\_UNLOCK\_BLOCK\_TYPE

• `Const` **REFERENCE\_UNLOCK\_BLOCK\_TYPE**: number = 1

The global type for the unlock block.

___

### SIGNATURE\_UNLOCK\_BLOCK\_TYPE

• `Const` **SIGNATURE\_UNLOCK\_BLOCK\_TYPE**: number = 0

The global type for the unlock block.

___

### SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE

• `Const` **SIG\_LOCKED\_SINGLE\_OUTPUT\_TYPE**: number = 0

The global type for the sig locked single output.

___

### TRANSACTION\_ESSENCE\_TYPE

• `Const` **TRANSACTION\_ESSENCE\_TYPE**: number = 0

The global type for the transaction essence.

___

### TRANSACTION\_PAYLOAD\_TYPE

• `Const` **TRANSACTION\_PAYLOAD\_TYPE**: number = 0

The global type for the payload.

___

### UTXO\_INPUT\_TYPE

• `Const` **UTXO\_INPUT\_TYPE**: number = 0

The global type for the input.

## Functions

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`: { addressKeyPair: [IKeyPair](interfaces/ikeypair.md) ; input: [IUTXOInput](interfaces/iutxoinput.md)  }[], `outputs`: { address: string ; addressType: number ; amount: number  }[], `indexationKey?`: undefined \| string, `indexationData?`: Uint8Array): [ITransactionPayload](interfaces/itransactionpayload.md)

Build a transaction payload.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`inputsAndSignatureKeyPairs` | { addressKeyPair: [IKeyPair](interfaces/ikeypair.md) ; input: [IUTXOInput](interfaces/iutxoinput.md)  }[] | The inputs with the signature key pairs needed to sign transfers. |
`outputs` | { address: string ; addressType: number ; amount: number  }[] | The outputs to send. |
`indexationKey?` | undefined \| string | Optional indexation key. |
`indexationData?` | Uint8Array | Optional index data. |

**Returns:** [ITransactionPayload](interfaces/itransactionpayload.md)

The transaction payload.

___

### calculateInputs

▸ **calculateInputs**<T\>(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `initialAddressState`: T, `nextAddressPath`: (addressState: T, isFirst: boolean) => string, `outputs`: { address: string ; addressType: number ; amount: number  }[], `zeroCount`: number): Promise<{ addressKeyPair: [IKeyPair](interfaces/ikeypair.md) ; input: [IUTXOInput](interfaces/iutxoinput.md)  }[]\>

Calculate the inputs from the seed and basePath.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`initialAddressState` | T | The initial address state for calculating the addresses. |
`nextAddressPath` | (addressState: T, isFirst: boolean) => string | Calculate the next address for inputs. |
`outputs` | { address: string ; addressType: number ; amount: number  }[] | The outputs to send. |
`zeroCount` | number | Abort when the number of zero balances is exceeded. |

**Returns:** Promise<{ addressKeyPair: [IKeyPair](interfaces/ikeypair.md) ; input: [IUTXOInput](interfaces/iutxoinput.md)  }[]\>

The id of the message created and the contructed message.

___

### deserializeAddress

▸ **deserializeAddress**(`readStream`: [ReadStream](classes/readstream.md)): [IEd25519Address](interfaces/ied25519address.md)

Deserialize the address from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Address](interfaces/ied25519address.md)

The deserialized object.

___

### deserializeEd25519Address

▸ **deserializeEd25519Address**(`readStream`: [ReadStream](classes/readstream.md)): [IEd25519Address](interfaces/ied25519address.md)

Deserialize the Ed25519 address from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Address](interfaces/ied25519address.md)

The deserialized object.

___

### deserializeEd25519Signature

▸ **deserializeEd25519Signature**(`readStream`: [ReadStream](classes/readstream.md)): [IEd25519Signature](interfaces/ied25519signature.md)

Deserialize the Ed25519 signature from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Signature](interfaces/ied25519signature.md)

The deserialized object.

___

### deserializeIndexationPayload

▸ **deserializeIndexationPayload**(`readStream`: [ReadStream](classes/readstream.md)): [IIndexationPayload](interfaces/iindexationpayload.md)

Deserialize the indexation payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IIndexationPayload](interfaces/iindexationpayload.md)

The deserialized object.

___

### deserializeInput

▸ **deserializeInput**(`readStream`: [ReadStream](classes/readstream.md)): [IUTXOInput](interfaces/iutxoinput.md)

Deserialize the input from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IUTXOInput](interfaces/iutxoinput.md)

The deserialized object.

___

### deserializeInputs

▸ **deserializeInputs**(`readStream`: [ReadStream](classes/readstream.md)): [IUTXOInput](interfaces/iutxoinput.md)[]

Deserialize the inputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IUTXOInput](interfaces/iutxoinput.md)[]

The deserialized object.

___

### deserializeMessage

▸ **deserializeMessage**(`readStream`: [ReadStream](classes/readstream.md)): [IMessage](interfaces/imessage.md)

Deserialize the message from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The message to deserialize. |

**Returns:** [IMessage](interfaces/imessage.md)

The deserialized message.

___

### deserializeMilestonePayload

▸ **deserializeMilestonePayload**(`readStream`: [ReadStream](classes/readstream.md)): [IMilestonePayload](interfaces/imilestonepayload.md)

Deserialize the milestone payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IMilestonePayload](interfaces/imilestonepayload.md)

The deserialized object.

___

### deserializeOutput

▸ **deserializeOutput**(`readStream`: [ReadStream](classes/readstream.md)): [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)

Deserialize the output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)

The deserialized object.

___

### deserializeOutputs

▸ **deserializeOutputs**(`readStream`: [ReadStream](classes/readstream.md)): [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)[]

Deserialize the outputs from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)[]

The deserialized object.

___

### deserializePayload

▸ **deserializePayload**(`readStream`: [ReadStream](classes/readstream.md)): [IIndexationPayload](interfaces/iindexationpayload.md) \| [IMilestonePayload](interfaces/imilestonepayload.md) \| [ITransactionPayload](interfaces/itransactionpayload.md) \| undefined

Deserialize the payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IIndexationPayload](interfaces/iindexationpayload.md) \| [IMilestonePayload](interfaces/imilestonepayload.md) \| [ITransactionPayload](interfaces/itransactionpayload.md) \| undefined

The deserialized object.

___

### deserializeReferenceUnlockBlock

▸ **deserializeReferenceUnlockBlock**(`readStream`: [ReadStream](classes/readstream.md)): [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md)

Deserialize the reference unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md)

The deserialized object.

___

### deserializeSigLockedSingleOutput

▸ **deserializeSigLockedSingleOutput**(`readStream`: [ReadStream](classes/readstream.md)): [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)

Deserialize the signature locked single output from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)

The deserialized object.

___

### deserializeSignature

▸ **deserializeSignature**(`readStream`: [ReadStream](classes/readstream.md)): [IEd25519Signature](interfaces/ied25519signature.md)

Deserialize the signature from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IEd25519Signature](interfaces/ied25519signature.md)

The deserialized object.

___

### deserializeSignatureUnlockBlock

▸ **deserializeSignatureUnlockBlock**(`readStream`: [ReadStream](classes/readstream.md)): [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md)

Deserialize the signature unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md)

The deserialized object.

___

### deserializeTransactionEssence

▸ **deserializeTransactionEssence**(`readStream`: [ReadStream](classes/readstream.md)): [ITransactionEssence](interfaces/itransactionessence.md)

Deserialize the transaction essence from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [ITransactionEssence](interfaces/itransactionessence.md)

The deserialized object.

___

### deserializeTransactionPayload

▸ **deserializeTransactionPayload**(`readStream`: [ReadStream](classes/readstream.md)): [ITransactionPayload](interfaces/itransactionpayload.md)

Deserialize the transaction payload from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [ITransactionPayload](interfaces/itransactionpayload.md)

The deserialized object.

___

### deserializeUTXOInput

▸ **deserializeUTXOInput**(`readStream`: [ReadStream](classes/readstream.md)): [IUTXOInput](interfaces/iutxoinput.md)

Deserialize the utxo input from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IUTXOInput](interfaces/iutxoinput.md)

The deserialized object.

___

### deserializeUnlockBlock

▸ **deserializeUnlockBlock**(`readStream`: [ReadStream](classes/readstream.md)): [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md)

Deserialize the unlock block from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md)

The deserialized object.

___

### deserializeUnlockBlocks

▸ **deserializeUnlockBlocks**(`readStream`: [ReadStream](classes/readstream.md)): ([IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md))[]

Deserialize the unlock blocks from binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readStream` | [ReadStream](classes/readstream.md) | The stream to read the data from. |

**Returns:** ([IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md))[]

The deserialized object.

___

### generateBip44Address

▸ **generateBip44Address**(`generatorState`: [IBip44GeneratorState](interfaces/ibip44generatorstate.md), `isFirst`: boolean): string

Generate addresses based on the account indexing style.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`generatorState` | [IBip44GeneratorState](interfaces/ibip44generatorstate.md) | The address state. |
`isFirst` | boolean | Is this the first address we are generating. |

**Returns:** string

The key pair for the address.

___

### generateBip44Path

▸ **generateBip44Path**(`accountIndex`: number, `addressIndex`: number, `isInternal`: boolean): [Bip32Path](classes/bip32path.md)

Generate a bip44 path based on all its parts.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`accountIndex` | number | The account index. |
`addressIndex` | number | The address index. |
`isInternal` | boolean | Is this an internal address. |

**Returns:** [Bip32Path](classes/bip32path.md)

The generated address.

___

### getBalance

▸ **getBalance**(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `accountIndex`: number, `startIndex?`: number): Promise<number\>

Get the balance for a list of addresses.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | - | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | - | The seed. |
`accountIndex` | number | - | The account index in the wallet. |
`startIndex` | number | 0 | The start index to generate from, defaults to 0. |

**Returns:** Promise<number\>

The balance.

___

### getUnspentAddress

▸ **getUnspentAddress**(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `accountIndex`: number, `startIndex?`: undefined \| number): Promise<{ address: string ; balance: number ; path: string  } \| undefined\>

Get the first unspent address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`startIndex?` | undefined \| number | Optional start index for the wallet count address, defaults to 0. |

**Returns:** Promise<{ address: string ; balance: number ; path: string  } \| undefined\>

The first unspent address.

___

### getUnspentAddresses

▸ **getUnspentAddresses**(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `accountIndex`: number, `startIndex?`: undefined \| number, `countLimit?`: undefined \| number, `zeroCount?`: undefined \| number): Promise<{ address: string ; balance: number ; path: string  }[]\>

Get all the unspent addresses.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`startIndex?` | undefined \| number | Optional start index for the wallet count address, defaults to 0. |
`countLimit?` | undefined \| number | Limit the number of items to find. |
`zeroCount?` | undefined \| number | Abort when the number of zero balances is exceeded. |

**Returns:** Promise<{ address: string ; balance: number ; path: string  }[]\>

All the unspent addresses.

___

### getUnspentAddressesWithAddressGenerator

▸ **getUnspentAddressesWithAddressGenerator**<T\>(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `initialAddressState`: T, `nextAddressPath`: (addressState: T, isFirst: boolean) => string, `countLimit?`: undefined \| number, `zeroCount?`: undefined \| number): Promise<{ address: string ; balance: number ; path: string  }[]\>

Get all the unspent addresses using an address generator.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`initialAddressState` | T | The initial address state for calculating the addresses. |
`nextAddressPath` | (addressState: T, isFirst: boolean) => string | Calculate the next address for inputs. |
`countLimit?` | undefined \| number | Limit the number of items to find. |
`zeroCount?` | undefined \| number | Abort when the number of zero balances is exceeded. |

**Returns:** Promise<{ address: string ; balance: number ; path: string  }[]\>

All the unspent addresses.

___

### logAddress

▸ **logAddress**(`prefix`: string, `unknownAddress?`: [ITypeBase](interfaces/itypebase.md)<unknown\>): void

Log an address to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownAddress?` | [ITypeBase](interfaces/itypebase.md)<unknown\> | The address to log.  |

**Returns:** void

___

### logInfo

▸ **logInfo**(`prefix`: string, `info`: [INodeInfo](interfaces/inodeinfo.md)): void

Log the node information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`info` | [INodeInfo](interfaces/inodeinfo.md) | The info to log.  |

**Returns:** void

___

### logInput

▸ **logInput**(`prefix`: string, `unknownInput?`: [ITypeBase](interfaces/itypebase.md)<unknown\>): void

Log input to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownInput?` | [ITypeBase](interfaces/itypebase.md)<unknown\> | The input to log.  |

**Returns:** void

___

### logMessage

▸ **logMessage**(`prefix`: string, `message`: [IMessage](interfaces/imessage.md)): void

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`message` | [IMessage](interfaces/imessage.md) | The message to log.  |

**Returns:** void

___

### logMessageMetadata

▸ **logMessageMetadata**(`prefix`: string, `messageMetadata`: [IMessageMetadata](interfaces/imessagemetadata.md)): void

Log the message metadata to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`messageMetadata` | [IMessageMetadata](interfaces/imessagemetadata.md) | The messageMetadata to log.  |

**Returns:** void

___

### logOutput

▸ **logOutput**(`prefix`: string, `unknownOutput?`: [ITypeBase](interfaces/itypebase.md)<unknown\>): void

Log output to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownOutput?` | [ITypeBase](interfaces/itypebase.md)<unknown\> | The output to log.  |

**Returns:** void

___

### logPayload

▸ **logPayload**(`prefix`: string, `unknownPayload?`: [ITypeBase](interfaces/itypebase.md)<unknown\>): void

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownPayload?` | [ITypeBase](interfaces/itypebase.md)<unknown\> | The payload.  |

**Returns:** void

___

### logSignature

▸ **logSignature**(`prefix`: string, `unknownSignature?`: [ITypeBase](interfaces/itypebase.md)<unknown\>): void

Log signature to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownSignature?` | [ITypeBase](interfaces/itypebase.md)<unknown\> | The signature to log.  |

**Returns:** void

___

### logTips

▸ **logTips**(`prefix`: string, `tips`: [ITipsResponse](interfaces/itipsresponse.md)): void

Log the tips information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`tips` | [ITipsResponse](interfaces/itipsresponse.md) | The tips to log.  |

**Returns:** void

___

### logUnlockBlock

▸ **logUnlockBlock**(`prefix`: string, `unknownUnlockBlock?`: [ITypeBase](interfaces/itypebase.md)<unknown\>): void

Log unlock block to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownUnlockBlock?` | [ITypeBase](interfaces/itypebase.md)<unknown\> | The unlock block to log.  |

**Returns:** void

___

### logger

▸ `Let`**logger**(`message`: string, `data`: unknown): void

The logger used by the log methods.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The message to output. |
`data` | unknown | The data to output. |

**Returns:** void

Nothing.

___

### promote

▸ **promote**(`client`: [IClient](interfaces/iclient.md), `messageId`: string): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Promote an existing message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to perform the promote with. |
`messageId` | string | The message to promote. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id and message that were promoted.

___

### reattach

▸ **reattach**(`client`: [IClient](interfaces/iclient.md), `messageId`: string): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Reattach an existing message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to perform the reattach with. |
`messageId` | string | The message to reattach. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id and message that were reattached.

___

### retrieveData

▸ **retrieveData**(`client`: [IClient](interfaces/iclient.md), `messageId`: string): Promise<{ data: Uint8Array ; index: string  } \| undefined\>

Retrieve a data message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`messageId` | string | The message id of the data to get. |

**Returns:** Promise<{ data: Uint8Array ; index: string  } \| undefined\>

The message index and data.

___

### retry

▸ **retry**(`client`: [IClient](interfaces/iclient.md), `messageId`: string): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Retry an existing message either by promoting or reattaching.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to perform the retry with. |
`messageId` | string | The message to retry. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id and message that were retried.

___

### scalarMinimal

▸ **scalarMinimal**(`scalar`: Uint8Array): boolean

Scalar Minimal returns true if the given scalar is less than the order of the Curve

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`scalar` | Uint8Array | The scalar. |

**Returns:** boolean

True if the given scalar is less than the order of the Curve

___

### scalarMulAdd

▸ **scalarMulAdd**(`s`: Uint8Array, `a`: Uint8Array, `b`: Uint8Array, `c`: Uint8Array): void

The scalars are GF(2^252 + 27742317777372353535851937790883648493).

Input:
  a[0]+256*a[1]+...+256^31*a[31] = a
  b[0]+256*b[1]+...+256^31*b[31] = b
  c[0]+256*c[1]+...+256^31*c[31] = c

Output:
  s[0]+256*s[1]+...+256^31*s[31] = (ab+c) mod l
  where l = 2^252 + 27742317777372353535851937790883648493.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`s` | Uint8Array | The scalar. |
`a` | Uint8Array | The a. |
`b` | Uint8Array | The b. |
`c` | Uint8Array | The c.  |

**Returns:** void

___

### scalarReduce

▸ **scalarReduce**(`out`: Uint8Array, `s`: Uint8Array): void

Scalar reduce.
where l = 2^252 + 27742317777372353535851937790883648493.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`out` | Uint8Array | s[0]+256*s[1]+...+256^31*s[31] = s mod l |
`s` | Uint8Array | s[0]+256*s[1]+...+256^63*s[63] = s  |

**Returns:** void

___

### send

▸ **send**(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `accountIndex`: number, `addressBech32`: string, `amount`: number, `startIndex?`: undefined \| number): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`addressBech32` | string | The address to send the funds to in bech32 format. |
`amount` | number | The amount to send. |
`startIndex?` | undefined \| number | The start index for the wallet count address, defaults to 0. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendAdvanced

▸ **sendAdvanced**(`client`: [IClient](interfaces/iclient.md), `inputsAndSignatureKeyPairs`: { addressKeyPair: [IKeyPair](interfaces/ikeypair.md) ; input: [IUTXOInput](interfaces/iutxoinput.md)  }[], `outputs`: { address: string ; addressType: number ; amount: number  }[], `indexationKey?`: undefined \| string, `indexationData?`: Uint8Array): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`inputsAndSignatureKeyPairs` | { addressKeyPair: [IKeyPair](interfaces/ikeypair.md) ; input: [IUTXOInput](interfaces/iutxoinput.md)  }[] | The inputs with the signature key pairs needed to sign transfers. |
`outputs` | { address: string ; addressType: number ; amount: number  }[] | The outputs to send. |
`indexationKey?` | undefined \| string | Optional indexation key. |
`indexationData?` | Uint8Array | Optional index data. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id of the message created and the remainder address if one was needed.

___

### sendData

▸ **sendData**(`client`: [IClient](interfaces/iclient.md), `indexationKey`: string, `indexationData?`: Uint8Array): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Send a data message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`indexationKey` | string | The index name. |
`indexationData?` | Uint8Array | The index data. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id of the message created and the message.

___

### sendEd25519

▸ **sendEd25519**(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `accountIndex`: number, `addressEd25519`: string, `amount`: number, `startIndex?`: undefined \| number): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`addressEd25519` | string | The address to send the funds to in ed25519 format. |
`amount` | number | The amount to send. |
`startIndex?` | undefined \| number | The start index for the wallet count address, defaults to 0. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendMultiple

▸ **sendMultiple**(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `accountIndex`: number, `outputs`: { addressBech32: string ; amount: number  }[], `startIndex?`: undefined \| number): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed to multiple outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`outputs` | { addressBech32: string ; amount: number  }[] | The address to send the funds to in bech32 format and amounts. |
`startIndex?` | undefined \| number | The start index for the wallet count address, defaults to 0. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendMultipleEd25519

▸ **sendMultipleEd25519**(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `accountIndex`: number, `outputs`: { addressEd25519: string ; amount: number  }[], `startIndex?`: undefined \| number): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`outputs` | { addressEd25519: string ; amount: number  }[] | The outputs including address to send the funds to in ed25519 format and amount. |
`startIndex?` | undefined \| number | The start index for the wallet count address, defaults to 0. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendWithAddressGenerator

▸ **sendWithAddressGenerator**<T\>(`client`: [IClient](interfaces/iclient.md), `seed`: [ISeed](interfaces/iseed.md), `initialAddressState`: T, `nextAddressPath`: (addressState: T, isFirst: boolean) => string, `outputs`: { address: string ; addressType: number ; amount: number  }[]): Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

Send a transfer using account based indexing for the inputs.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](interfaces/iclient.md) | The client to send the transfer with. |
`seed` | [ISeed](interfaces/iseed.md) | The seed to use for address generation. |
`initialAddressState` | T | The initial address state for calculating the addresses. |
`nextAddressPath` | (addressState: T, isFirst: boolean) => string | Calculate the next address for inputs. |
`outputs` | { address: string ; addressType: number ; amount: number  }[] | The address to send the funds to in bech32 format and amounts. |

**Returns:** Promise<{ message: [IMessage](interfaces/imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### serializeAddress

▸ **serializeAddress**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IEd25519Address](interfaces/ied25519address.md)): void

Serialize the address to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IEd25519Address](interfaces/ied25519address.md) | The object to serialize.  |

**Returns:** void

___

### serializeEd25519Address

▸ **serializeEd25519Address**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IEd25519Address](interfaces/ied25519address.md)): void

Serialize the ed25519 address to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IEd25519Address](interfaces/ied25519address.md) | The object to serialize.  |

**Returns:** void

___

### serializeEd25519Signature

▸ **serializeEd25519Signature**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IEd25519Signature](interfaces/ied25519signature.md)): void

Serialize the Ed25519 signature to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IEd25519Signature](interfaces/ied25519signature.md) | The object to serialize.  |

**Returns:** void

___

### serializeIndexationPayload

▸ **serializeIndexationPayload**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IIndexationPayload](interfaces/iindexationpayload.md)): void

Serialize the indexation payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IIndexationPayload](interfaces/iindexationpayload.md) | The object to serialize.  |

**Returns:** void

___

### serializeInput

▸ **serializeInput**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IUTXOInput](interfaces/iutxoinput.md)): void

Serialize the input to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IUTXOInput](interfaces/iutxoinput.md) | The object to serialize.  |

**Returns:** void

___

### serializeInputs

▸ **serializeInputs**(`writeStream`: [WriteStream](classes/writestream.md), `objects`: [IUTXOInput](interfaces/iutxoinput.md)[]): void

Serialize the inputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`objects` | [IUTXOInput](interfaces/iutxoinput.md)[] | The objects to serialize.  |

**Returns:** void

___

### serializeMessage

▸ **serializeMessage**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IMessage](interfaces/imessage.md)): void

Serialize the message essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IMessage](interfaces/imessage.md) | The object to serialize.  |

**Returns:** void

___

### serializeMilestonePayload

▸ **serializeMilestonePayload**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IMilestonePayload](interfaces/imilestonepayload.md)): void

Serialize the milestone payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IMilestonePayload](interfaces/imilestonepayload.md) | The object to serialize.  |

**Returns:** void

___

### serializeOutput

▸ **serializeOutput**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)): void

Serialize the output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md) | The object to serialize.  |

**Returns:** void

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`: [WriteStream](classes/writestream.md), `objects`: [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)[]): void

Serialize the outputs to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`objects` | [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)[] | The objects to serialize.  |

**Returns:** void

___

### serializePayload

▸ **serializePayload**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IIndexationPayload](interfaces/iindexationpayload.md) \| [IMilestonePayload](interfaces/imilestonepayload.md) \| [ITransactionPayload](interfaces/itransactionpayload.md) \| undefined): void

Serialize the payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IIndexationPayload](interfaces/iindexationpayload.md) \| [IMilestonePayload](interfaces/imilestonepayload.md) \| [ITransactionPayload](interfaces/itransactionpayload.md) \| undefined | The object to serialize.  |

**Returns:** void

___

### serializeReferenceUnlockBlock

▸ **serializeReferenceUnlockBlock**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md)): void

Serialize the reference unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) | The object to serialize.  |

**Returns:** void

___

### serializeSigLockedSingleOutput

▸ **serializeSigLockedSingleOutput**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md)): void

Serialize the signature locked single output to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [ISigLockedSingleOutput](interfaces/isiglockedsingleoutput.md) | The object to serialize.  |

**Returns:** void

___

### serializeSignature

▸ **serializeSignature**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IEd25519Signature](interfaces/ied25519signature.md)): void

Serialize the signature to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IEd25519Signature](interfaces/ied25519signature.md) | The object to serialize.  |

**Returns:** void

___

### serializeSignatureUnlockBlock

▸ **serializeSignatureUnlockBlock**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md)): void

Serialize the signature unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md) | The object to serialize.  |

**Returns:** void

___

### serializeTransactionEssence

▸ **serializeTransactionEssence**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [ITransactionEssence](interfaces/itransactionessence.md)): void

Serialize the transaction essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [ITransactionEssence](interfaces/itransactionessence.md) | The object to serialize.  |

**Returns:** void

___

### serializeTransactionPayload

▸ **serializeTransactionPayload**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [ITransactionPayload](interfaces/itransactionpayload.md)): void

Serialize the transaction payload essence to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [ITransactionPayload](interfaces/itransactionpayload.md) | The object to serialize.  |

**Returns:** void

___

### serializeUTXOInput

▸ **serializeUTXOInput**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IUTXOInput](interfaces/iutxoinput.md)): void

Serialize the utxo input to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IUTXOInput](interfaces/iutxoinput.md) | The object to serialize.  |

**Returns:** void

___

### serializeUnlockBlock

▸ **serializeUnlockBlock**(`writeStream`: [WriteStream](classes/writestream.md), `object`: [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md)): void

Serialize the unlock block to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`object` | [IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md) | The object to serialize.  |

**Returns:** void

___

### serializeUnlockBlocks

▸ **serializeUnlockBlocks**(`writeStream`: [WriteStream](classes/writestream.md), `objects`: ([IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md))[]): void

Serialize the unlock blocks to binary.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`writeStream` | [WriteStream](classes/writestream.md) | The stream to write the data to. |
`objects` | ([IReferenceUnlockBlock](interfaces/ireferenceunlockblock.md) \| [ISignatureUnlockBlock](interfaces/isignatureunlockblock.md))[] | The objects to serialize.  |

**Returns:** void

___

### setLogger

▸ **setLogger**(`log`: (message: string, data?: unknown) => void): void

Set the logger for output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`log` | (message: string, data?: unknown) => void | The logger.  |

**Returns:** void

## Object literals

### CONFLICT\_REASON\_STRINGS

▪ `Const` **CONFLICT\_REASON\_STRINGS**: object

Conflict reason strings.

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`[ConflictReason.inputOutputSumMismatch]` | string | "The sum of the inputs and output values does not match" |
`[ConflictReason.inputUTXOAlreadySpentInThisMilestone]` | string | "The referenced UTXO was already spent while confirming this milestone" |
`[ConflictReason.inputUTXOAlreadySpent]` | string | "The referenced UTXO was already spent" |
`[ConflictReason.inputUTXONotFound]` | string | "The referenced UTXO cannot be found" |
`[ConflictReason.invalidSignature]` | string | "The unlock block signature is invalid" |
`[ConflictReason.none]` | string | "Not conflicting" |
`[ConflictReason.semanticValidationFailed]` | string | "The semantic validation failed" |
`[ConflictReason.unsupportedAddressType]` | string | "The address type used is unsupported" |
`[ConflictReason.unsupportedInputOrOutputType]` | string | "The input or output type used is unsupported" |
