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
- [ALIAS\_ADDRESS\_LENGTH](api.md#alias_address_length)
- [MIN\_ALIAS\_ADDRESS\_LENGTH](api.md#min_alias_address_length)
- [BLS\_ADDRESS\_LENGTH](api.md#bls_address_length)
- [MIN\_BLS\_ADDRESS\_LENGTH](api.md#min_bls_address_length)
- [MIN\_ED25519\_ADDRESS\_LENGTH](api.md#min_ed25519_address_length)
- [NFT\_ADDRESS\_LENGTH](api.md#nft_address_length)
- [MIN\_NFT\_ADDRESS\_LENGTH](api.md#min_nft_address_length)
- [UINT8\_SIZE](api.md#uint8_size)
- [UINT16\_SIZE](api.md#uint16_size)
- [UINT32\_SIZE](api.md#uint32_size)
- [UINT64\_SIZE](api.md#uint64_size)
- [UINT256\_SIZE](api.md#uint256_size)
- [MESSAGE\_ID\_LENGTH](api.md#message_id_length)
- [TRANSACTION\_ID\_LENGTH](api.md#transaction_id_length)
- [MERKLE\_PROOF\_LENGTH](api.md#merkle_proof_length)
- [TYPE\_LENGTH](api.md#type_length)
- [SMALL\_TYPE\_LENGTH](api.md#small_type_length)
- [STRING\_LENGTH](api.md#string_length)
- [ARRAY\_LENGTH](api.md#array_length)
- [MIN\_DUST\_DEPOSIT\_RETURN\_FEATURE\_BLOCK\_LENGTH](api.md#min_dust_deposit_return_feature_block_length)
- [MIN\_EXPIRATION\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_LENGTH](api.md#min_expiration_milestone_index_feature_block_length)
- [MIN\_EXPIRATION\_UNIX\_FEATURE\_BLOCK\_LENGTH](api.md#min_expiration_unix_feature_block_length)
- [MIN\_FEATURE\_BLOCKS\_LENGTH](api.md#min_feature_blocks_length)
- [MIN\_FEATURE\_BLOCK\_LENGTH](api.md#min_feature_block_length)
- [MIN\_INDEXATION\_FEATURE\_BLOCK\_LENGTH](api.md#min_indexation_feature_block_length)
- [MIN\_ISSUER\_FEATURE\_BLOCK\_LENGTH](api.md#min_issuer_feature_block_length)
- [MIN\_METADATA\_FEATURE\_BLOCK\_LENGTH](api.md#min_metadata_feature_block_length)
- [MIN\_SENDER\_FEATURE\_BLOCK\_LENGTH](api.md#min_sender_feature_block_length)
- [MIN\_TIMELOCK\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_LENGTH](api.md#min_timelock_milestone_index_feature_block_length)
- [MIN\_TIMELOCK\_UNIX\_FEATURE\_BLOCK\_LENGTH](api.md#min_timelock_unix_feature_block_length)
- [TAIL\_HASH\_LENGTH](api.md#tail_hash_length)
- [MIN\_MIGRATED\_FUNDS\_LENGTH](api.md#min_migrated_funds_length)
- [MAX\_FUNDS\_COUNT](api.md#max_funds_count)
- [MIN\_INPUT\_LENGTH](api.md#min_input_length)
- [MIN\_INPUT\_COUNT](api.md#min_input_count)
- [MAX\_INPUT\_COUNT](api.md#max_input_count)
- [MIN\_TREASURY\_INPUT\_LENGTH](api.md#min_treasury_input_length)
- [MIN\_UTXO\_INPUT\_LENGTH](api.md#min_utxo_input_length)
- [MAX\_MESSAGE\_LENGTH](api.md#max_message_length)
- [MAX\_NUMBER\_PARENTS](api.md#max_number_parents)
- [MIN\_NUMBER\_PARENTS](api.md#min_number_parents)
- [ALIAS\_ID\_LENGTH](api.md#alias_id_length)
- [MIN\_ALIAS\_OUTPUT\_LENGTH](api.md#min_alias_output_length)
- [MIN\_EXTENDED\_OUTPUT\_LENGTH](api.md#min_extended_output_length)
- [MIN\_FOUNDRY\_OUTPUT\_LENGTH](api.md#min_foundry_output_length)
- [NFT\_ID\_LENGTH](api.md#nft_id_length)
- [MIN\_NFT\_OUTPUT\_LENGTH](api.md#min_nft_output_length)
- [MIN\_OUTPUT\_LENGTH](api.md#min_output_length)
- [MIN\_OUTPUT\_COUNT](api.md#min_output_count)
- [MAX\_OUTPUT\_COUNT](api.md#max_output_count)
- [MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH](api.md#min_sig_locked_dust_allowance_output_length)
- [MIN\_SIMPLE\_OUTPUT\_LENGTH](api.md#min_simple_output_length)
- [MIN\_TREASURY\_OUTPUT\_LENGTH](api.md#min_treasury_output_length)
- [MIN\_PAYLOAD\_LENGTH](api.md#min_payload_length)
- [MIN\_ED25519\_SIGNATURE\_LENGTH](api.md#min_ed25519_signature_length)
- [MIN\_SIGNATURE\_LENGTH](api.md#min_signature_length)
- [MIN\_SIMPLE\_TOKEN\_SCHEME\_LENGTH](api.md#min_simple_token_scheme_length)
- [MIN\_TOKEN\_SCHEME\_LENGTH](api.md#min_token_scheme_length)
- [MIN\_TRANSACTION\_ESSENCE\_LENGTH](api.md#min_transaction_essence_length)
- [MIN\_ALIAS\_UNLOCK\_BLOCK\_LENGTH](api.md#min_alias_unlock_block_length)
- [MIN\_NFT\_UNLOCK\_BLOCK\_LENGTH](api.md#min_nft_unlock_block_length)
- [MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH](api.md#min_reference_unlock_block_length)
- [MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH](api.md#min_signature_unlock_block_length)
- [MIN\_UNLOCK\_BLOCK\_LENGTH](api.md#min_unlock_block_length)
- [TRANSACTION\_ESSENCE\_TYPE](api.md#transaction_essence_type)
- [ALIAS\_ADDRESS\_TYPE](api.md#alias_address_type)
- [BLS\_ADDRESS\_TYPE](api.md#bls_address_type)
- [ED25519\_ADDRESS\_TYPE](api.md#ed25519_address_type)
- [NFT\_ADDRESS\_TYPE](api.md#nft_address_type)
- [DUST\_DEPOSIT\_RETURN\_FEATURE\_BLOCK\_TYPE](api.md#dust_deposit_return_feature_block_type)
- [EXPIRATION\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_TYPE](api.md#expiration_milestone_index_feature_block_type)
- [EXPIRATION\_UNIX\_FEATURE\_BLOCK\_TYPE](api.md#expiration_unix_feature_block_type)
- [INDEXATION\_FEATURE\_BLOCK\_TYPE](api.md#indexation_feature_block_type)
- [ISSUER\_FEATURE\_BLOCK\_TYPE](api.md#issuer_feature_block_type)
- [METADATA\_FEATURE\_BLOCK\_TYPE](api.md#metadata_feature_block_type)
- [SENDER\_FEATURE\_BLOCK\_TYPE](api.md#sender_feature_block_type)
- [TIMELOCK\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_TYPE](api.md#timelock_milestone_index_feature_block_type)
- [TIMELOCK\_UNIX\_FEATURE\_BLOCK\_TYPE](api.md#timelock_unix_feature_block_type)
- [TREASURY\_INPUT\_TYPE](api.md#treasury_input_type)
- [UTXO\_INPUT\_TYPE](api.md#utxo_input_type)
- [ALIAS\_OUTPUT\_TYPE](api.md#alias_output_type)
- [EXTENDED\_OUTPUT\_TYPE](api.md#extended_output_type)
- [FOUNDRY\_OUTPUT\_TYPE](api.md#foundry_output_type)
- [NFT\_OUTPUT\_TYPE](api.md#nft_output_type)
- [SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_TYPE](api.md#sig_locked_dust_allowance_output_type)
- [SIMPLE\_OUTPUT\_TYPE](api.md#simple_output_type)
- [TREASURY\_OUTPUT\_TYPE](api.md#treasury_output_type)
- [INDEXATION\_PAYLOAD\_TYPE](api.md#indexation_payload_type)
- [MILESTONE\_PAYLOAD\_TYPE](api.md#milestone_payload_type)
- [RECEIPT\_PAYLOAD\_TYPE](api.md#receipt_payload_type)
- [TRANSACTION\_PAYLOAD\_TYPE](api.md#transaction_payload_type)
- [TREASURY\_TRANSACTION\_PAYLOAD\_TYPE](api.md#treasury_transaction_payload_type)
- [ED25519\_SIGNATURE\_TYPE](api.md#ed25519_signature_type)
- [SIMPLE\_TOKEN\_SCHEME\_TYPE](api.md#simple_token_scheme_type)
- [ALIAS\_UNLOCK\_BLOCK\_TYPE](api.md#alias_unlock_block_type)
- [NFT\_UNLOCK\_BLOCK\_TYPE](api.md#nft_unlock_block_type)
- [REFERENCE\_UNLOCK\_BLOCK\_TYPE](api.md#reference_unlock_block_type)
- [SIGNATURE\_UNLOCK\_BLOCK\_TYPE](api.md#signature_unlock_block_type)
- [CONFLICT\_REASON\_STRINGS](api.md#conflict_reason_strings)
- [ED25519\_SEED\_TYPE](api.md#ed25519_seed_type)

### Functions

- [deserializeAddress](api.md#deserializeaddress)
- [serializeAddress](api.md#serializeaddress)
- [deserializeAliasAddress](api.md#deserializealiasaddress)
- [serializeAliasAddress](api.md#serializealiasaddress)
- [deserializeBlsAddress](api.md#deserializeblsaddress)
- [serializeBlsAddress](api.md#serializeblsaddress)
- [deserializeEd25519Address](api.md#deserializeed25519address)
- [serializeEd25519Address](api.md#serializeed25519address)
- [deserializeNftAddress](api.md#deserializenftaddress)
- [serializeNftAddress](api.md#serializenftaddress)
- [deserializeDustDepositReturnFeatureBlock](api.md#deserializedustdepositreturnfeatureblock)
- [serializeDustDepositReturnFeatureBlock](api.md#serializedustdepositreturnfeatureblock)
- [deserializeExpirationMilestoneIndexFeatureBlock](api.md#deserializeexpirationmilestoneindexfeatureblock)
- [serializeExpirationMilestoneIndexFeatureBlock](api.md#serializeexpirationmilestoneindexfeatureblock)
- [deserializeExpirationUnixFeatureBlock](api.md#deserializeexpirationunixfeatureblock)
- [serializeExpirationUnixFeatureBlock](api.md#serializeexpirationunixfeatureblock)
- [deserializeFeatureBlocks](api.md#deserializefeatureblocks)
- [serializeFeatureBlocks](api.md#serializefeatureblocks)
- [deserializeFeatureBlock](api.md#deserializefeatureblock)
- [serializeFeatureBlock](api.md#serializefeatureblock)
- [deserializeIndexationFeatureBlock](api.md#deserializeindexationfeatureblock)
- [serializeIndexationFeatureBlock](api.md#serializeindexationfeatureblock)
- [deserializeIssuerFeatureBlock](api.md#deserializeissuerfeatureblock)
- [serializeIssuerFeatureBlock](api.md#serializeissuerfeatureblock)
- [deserializeMetadataFeatureBlock](api.md#deserializemetadatafeatureblock)
- [serializeMetadataFeatureBlock](api.md#serializemetadatafeatureblock)
- [deserializeSenderFeatureBlock](api.md#deserializesenderfeatureblock)
- [serializeSenderFeatureBlock](api.md#serializesenderfeatureblock)
- [deserializeTimelockMilestoneIndexFeatureBlock](api.md#deserializetimelockmilestoneindexfeatureblock)
- [serializeTimelockMilestoneIndexFeatureBlock](api.md#serializetimelockmilestoneindexfeatureblock)
- [deserializeTimelockUnixFeatureBlock](api.md#deserializetimelockunixfeatureblock)
- [serializeTimelockUnixFeatureBlock](api.md#serializetimelockunixfeatureblock)
- [deserializeFunds](api.md#deserializefunds)
- [serializeFunds](api.md#serializefunds)
- [deserializeMigratedFunds](api.md#deserializemigratedfunds)
- [serializeMigratedFunds](api.md#serializemigratedfunds)
- [deserializeInputs](api.md#deserializeinputs)
- [serializeInputs](api.md#serializeinputs)
- [deserializeInput](api.md#deserializeinput)
- [serializeInput](api.md#serializeinput)
- [deserializeTreasuryInput](api.md#deserializetreasuryinput)
- [serializeTreasuryInput](api.md#serializetreasuryinput)
- [deserializeUTXOInput](api.md#deserializeutxoinput)
- [serializeUTXOInput](api.md#serializeutxoinput)
- [deserializeMessage](api.md#deserializemessage)
- [serializeMessage](api.md#serializemessage)
- [deserializeAliasOutput](api.md#deserializealiasoutput)
- [serializeAliasOutput](api.md#serializealiasoutput)
- [deserializeExtendedOutput](api.md#deserializeextendedoutput)
- [serializeExtendedOutput](api.md#serializeextendedoutput)
- [deserializeFoundryOutput](api.md#deserializefoundryoutput)
- [serializeFoundryOutput](api.md#serializefoundryoutput)
- [deserializeNftOutput](api.md#deserializenftoutput)
- [serializeNftOutput](api.md#serializenftoutput)
- [deserializeOutputs](api.md#deserializeoutputs)
- [serializeOutputs](api.md#serializeoutputs)
- [deserializeOutput](api.md#deserializeoutput)
- [serializeOutput](api.md#serializeoutput)
- [deserializeSigLockedDustAllowanceOutput](api.md#deserializesiglockeddustallowanceoutput)
- [serializeSigLockedDustAllowanceOutput](api.md#serializesiglockeddustallowanceoutput)
- [deserializeSimpleOutput](api.md#deserializesimpleoutput)
- [serializeSimpleOutput](api.md#serializesimpleoutput)
- [deserializeTreasuryOutput](api.md#deserializetreasuryoutput)
- [serializeTreasuryOutput](api.md#serializetreasuryoutput)
- [deserializePayload](api.md#deserializepayload)
- [serializePayload](api.md#serializepayload)
- [deserializeEd25519Signature](api.md#deserializeed25519signature)
- [serializeEd25519Signature](api.md#serializeed25519signature)
- [deserializeSignature](api.md#deserializesignature)
- [serializeSignature](api.md#serializesignature)
- [deserializeSimpleTokenScheme](api.md#deserializesimpletokenscheme)
- [serializeSimpleTokenScheme](api.md#serializesimpletokenscheme)
- [deserializeTokenScheme](api.md#deserializetokenscheme)
- [serializeTokenScheme](api.md#serializetokenscheme)
- [deserializeTransactionEssence](api.md#deserializetransactionessence)
- [serializeTransactionEssence](api.md#serializetransactionessence)
- [deserializeAliasUnlockBlock](api.md#deserializealiasunlockblock)
- [serializeAliasUnlockBlock](api.md#serializealiasunlockblock)
- [deserializeNftUnlockBlock](api.md#deserializenftunlockblock)
- [serializeNftUnlockBlock](api.md#serializenftunlockblock)
- [deserializeReferenceUnlockBlock](api.md#deserializereferenceunlockblock)
- [serializeReferenceUnlockBlock](api.md#serializereferenceunlockblock)
- [deserializeSignatureUnlockBlock](api.md#deserializesignatureunlockblock)
- [serializeSignatureUnlockBlock](api.md#serializesignatureunlockblock)
- [deserializeUnlockBlocks](api.md#deserializeunlockblocks)
- [serializeUnlockBlocks](api.md#serializeunlockblocks)
- [deserializeUnlockBlock](api.md#deserializeunlockblock)
- [serializeUnlockBlock](api.md#serializeunlockblock)
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
- [logNativeTokens](api.md#lognativetokens)
- [logTokenScheme](api.md#logtokenscheme)
- [logFeatureBlocks](api.md#logfeatureblocks)
- [logFeatureBlock](api.md#logfeatureblock)

### Interfaces

- [SingleNodeClientOptions](interfaces/SingleNodeClientOptions.md)
- [IAddress](interfaces/IAddress.md)
- [IBip44GeneratorState](interfaces/IBip44GeneratorState.md)
- [IClient](interfaces/IClient.md)
- [IGossipHeartbeat](interfaces/IGossipHeartbeat.md)
- [IGossipMetrics](interfaces/IGossipMetrics.md)
- [IKeyPair](interfaces/IKeyPair.md)
- [IMessage](interfaces/IMessage.md)
- [IMessageMetadata](interfaces/IMessageMetadata.md)
- [IMigratedFunds](interfaces/IMigratedFunds.md)
- [INativeToken](interfaces/INativeToken.md)
- [INodeInfo](interfaces/INodeInfo.md)
- [IPeer](interfaces/IPeer.md)
- [IPowProvider](interfaces/IPowProvider.md)
- [ISeed](interfaces/ISeed.md)
- [ITransactionEssence](interfaces/ITransactionEssence.md)
- [ITreasury](interfaces/ITreasury.md)
- [ITypeBase](interfaces/ITypeBase.md)
- [IAliasAddress](interfaces/IAliasAddress.md)
- [IBlsAddress](interfaces/IBlsAddress.md)
- [IEd25519Address](interfaces/IEd25519Address.md)
- [INftAddress](interfaces/INftAddress.md)
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
- [IDustDepositReturnFeatureBlock](interfaces/IDustDepositReturnFeatureBlock.md)
- [IExpirationMilestoneIndexFeatureBlock](interfaces/IExpirationMilestoneIndexFeatureBlock.md)
- [IExpirationUnixFeatureBlock](interfaces/IExpirationUnixFeatureBlock.md)
- [IIndexationFeatureBlock](interfaces/IIndexationFeatureBlock.md)
- [IIssuerFeatureBlock](interfaces/IIssuerFeatureBlock.md)
- [IMetadataFeatureBlock](interfaces/IMetadataFeatureBlock.md)
- [ISenderFeatureBlock](interfaces/ISenderFeatureBlock.md)
- [ITimelockMilestoneIndexFeatureBlock](interfaces/ITimelockMilestoneIndexFeatureBlock.md)
- [ITimelockUnixFeatureBlock](interfaces/ITimelockUnixFeatureBlock.md)
- [ITreasuryInput](interfaces/ITreasuryInput.md)
- [IUTXOInput](interfaces/IUTXOInput.md)
- [IAliasOutput](interfaces/IAliasOutput.md)
- [IExtendedOutput](interfaces/IExtendedOutput.md)
- [IFoundryOutput](interfaces/IFoundryOutput.md)
- [INftOutput](interfaces/INftOutput.md)
- [ISigLockedDustAllowanceOutput](interfaces/ISigLockedDustAllowanceOutput.md)
- [ISimpleOutput](interfaces/ISimpleOutput.md)
- [ITreasuryOutput](interfaces/ITreasuryOutput.md)
- [IIndexationPayload](interfaces/IIndexationPayload.md)
- [IMilestonePayload](interfaces/IMilestonePayload.md)
- [IReceiptPayload](interfaces/IReceiptPayload.md)
- [ITransactionPayload](interfaces/ITransactionPayload.md)
- [ITreasuryTransactionPayload](interfaces/ITreasuryTransactionPayload.md)
- [IEd25519Signature](interfaces/IEd25519Signature.md)
- [ISimpleTokenScheme](interfaces/ISimpleTokenScheme.md)
- [IAliasUnlockBlock](interfaces/IAliasUnlockBlock.md)
- [INftUnlockBlock](interfaces/INftUnlockBlock.md)
- [IReferenceUnlockBlock](interfaces/IReferenceUnlockBlock.md)
- [ISignatureUnlockBlock](interfaces/ISignatureUnlockBlock.md)

### Type aliases

- [AddressTypes](api.md#addresstypes)
- [FeatureBlockTypes](api.md#featureblocktypes)
- [InputTypes](api.md#inputtypes)
- [LedgerInclusionState](api.md#ledgerinclusionstate)
- [OutputTypes](api.md#outputtypes)
- [PayloadTypes](api.md#payloadtypes)
- [SignatureTypes](api.md#signaturetypes)
- [TokenSchemeTypes](api.md#tokenschemetypes)
- [Units](api.md#units)
- [UnlockBlockTypes](api.md#unlockblocktypes)

### Enumerations

- [ConflictReason](enums/ConflictReason.md)

## Variables

### MIN\_ADDRESS\_LENGTH

• **MIN\_ADDRESS\_LENGTH**: `number`

The minimum length of an address binary representation.

___

### ALIAS\_ADDRESS\_LENGTH

• **ALIAS\_ADDRESS\_LENGTH**: `number` = `20`

The length of an alias address.

___

### MIN\_ALIAS\_ADDRESS\_LENGTH

• **MIN\_ALIAS\_ADDRESS\_LENGTH**: `number`

The minimum length of an alias address binary representation.

___

### BLS\_ADDRESS\_LENGTH

• **BLS\_ADDRESS\_LENGTH**: `number` = `32`

The length of a BLS address.

___

### MIN\_BLS\_ADDRESS\_LENGTH

• **MIN\_BLS\_ADDRESS\_LENGTH**: `number`

The minimum length of an bls address binary representation.

___

### MIN\_ED25519\_ADDRESS\_LENGTH

• **MIN\_ED25519\_ADDRESS\_LENGTH**: `number`

The minimum length of an ed25519 address binary representation.

___

### NFT\_ADDRESS\_LENGTH

• **NFT\_ADDRESS\_LENGTH**: `number` = `20`

The length of an NFT address.

___

### MIN\_NFT\_ADDRESS\_LENGTH

• **MIN\_NFT\_ADDRESS\_LENGTH**: `number`

The minimum length of an nft address binary representation.

___

### UINT8\_SIZE

• **UINT8\_SIZE**: `number` = `1`

Byte length for a uint8 field.

___

### UINT16\_SIZE

• **UINT16\_SIZE**: `number` = `2`

Byte length for a uint16 field.

___

### UINT32\_SIZE

• **UINT32\_SIZE**: `number` = `4`

Byte length for a uint32 field.

___

### UINT64\_SIZE

• **UINT64\_SIZE**: `number` = `8`

Byte length for a uint64 field.

___

### UINT256\_SIZE

• **UINT256\_SIZE**: `number` = `32`

Byte length for a uint256 field.

___

### MESSAGE\_ID\_LENGTH

• **MESSAGE\_ID\_LENGTH**: `number` = `Blake2b.SIZE_256`

Byte length for a message id.

___

### TRANSACTION\_ID\_LENGTH

• **TRANSACTION\_ID\_LENGTH**: `number` = `Blake2b.SIZE_256`

Byte length for a transaction id.

___

### MERKLE\_PROOF\_LENGTH

• **MERKLE\_PROOF\_LENGTH**: `number` = `Blake2b.SIZE_256`

Byte length for a merkle prrof.

___

### TYPE\_LENGTH

• **TYPE\_LENGTH**: `number` = `UINT32_SIZE`

Byte length for a type length.

___

### SMALL\_TYPE\_LENGTH

• **SMALL\_TYPE\_LENGTH**: `number` = `UINT8_SIZE`

Byte length for a small type length.

___

### STRING\_LENGTH

• **STRING\_LENGTH**: `number` = `UINT16_SIZE`

Byte length for a string length.

___

### ARRAY\_LENGTH

• **ARRAY\_LENGTH**: `number` = `UINT16_SIZE`

Byte length for an array length.

___

### MIN\_DUST\_DEPOSIT\_RETURN\_FEATURE\_BLOCK\_LENGTH

• **MIN\_DUST\_DEPOSIT\_RETURN\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a return feature block binary representation.

___

### MIN\_EXPIRATION\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_LENGTH

• **MIN\_EXPIRATION\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a expiration milestone index feature block binary representation.

___

### MIN\_EXPIRATION\_UNIX\_FEATURE\_BLOCK\_LENGTH

• **MIN\_EXPIRATION\_UNIX\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a expiration unix feature block binary representation.

___

### MIN\_FEATURE\_BLOCKS\_LENGTH

• **MIN\_FEATURE\_BLOCKS\_LENGTH**: `number` = `UINT8_SIZE`

The minimum length of a feature blocks tokens list.

___

### MIN\_FEATURE\_BLOCK\_LENGTH

• **MIN\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a feature block binary representation.

___

### MIN\_INDEXATION\_FEATURE\_BLOCK\_LENGTH

• **MIN\_INDEXATION\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a indexation feature block binary representation.

___

### MIN\_ISSUER\_FEATURE\_BLOCK\_LENGTH

• **MIN\_ISSUER\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a issuer feature block binary representation.

___

### MIN\_METADATA\_FEATURE\_BLOCK\_LENGTH

• **MIN\_METADATA\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a metadata feature block binary representation.

___

### MIN\_SENDER\_FEATURE\_BLOCK\_LENGTH

• **MIN\_SENDER\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a sender feature block binary representation.

___

### MIN\_TIMELOCK\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_LENGTH

• **MIN\_TIMELOCK\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a timelock milestone index feature block binary representation.

___

### MIN\_TIMELOCK\_UNIX\_FEATURE\_BLOCK\_LENGTH

• **MIN\_TIMELOCK\_UNIX\_FEATURE\_BLOCK\_LENGTH**: `number`

The minimum length of a timelock unix feature block binary representation.

___

### TAIL\_HASH\_LENGTH

• **TAIL\_HASH\_LENGTH**: `number` = `49`

The length of the tail hash length in bytes.

___

### MIN\_MIGRATED\_FUNDS\_LENGTH

• **MIN\_MIGRATED\_FUNDS\_LENGTH**: `number`

The minimum length of a migrated fund binary representation.

___

### MAX\_FUNDS\_COUNT

• **MAX\_FUNDS\_COUNT**: `number` = `127`

The maximum number of funds.

___

### MIN\_INPUT\_LENGTH

• **MIN\_INPUT\_LENGTH**: `number`

The minimum length of an input binary representation.

___

### MIN\_INPUT\_COUNT

• **MIN\_INPUT\_COUNT**: `number` = `1`

The minimum number of inputs.

___

### MAX\_INPUT\_COUNT

• **MAX\_INPUT\_COUNT**: `number` = `127`

The maximum number of inputs.

___

### MIN\_TREASURY\_INPUT\_LENGTH

• **MIN\_TREASURY\_INPUT\_LENGTH**: `number`

The minimum length of a treasury input binary representation.

___

### MIN\_UTXO\_INPUT\_LENGTH

• **MIN\_UTXO\_INPUT\_LENGTH**: `number`

The minimum length of a utxo input binary representation.

___

### MAX\_MESSAGE\_LENGTH

• **MAX\_MESSAGE\_LENGTH**: `number` = `32768`

The maximum length of a message.

___

### MAX\_NUMBER\_PARENTS

• **MAX\_NUMBER\_PARENTS**: `number` = `8`

The maximum number of parents.

___

### MIN\_NUMBER\_PARENTS

• **MIN\_NUMBER\_PARENTS**: `number` = `1`

The minimum number of parents.

___

### ALIAS\_ID\_LENGTH

• **ALIAS\_ID\_LENGTH**: `number` = `20`

The length of an alias id.

___

### MIN\_ALIAS\_OUTPUT\_LENGTH

• **MIN\_ALIAS\_OUTPUT\_LENGTH**: `number`

The minimum length of a alias output binary representation.

___

### MIN\_EXTENDED\_OUTPUT\_LENGTH

• **MIN\_EXTENDED\_OUTPUT\_LENGTH**: `number`

The minimum length of a extended output binary representation.

___

### MIN\_FOUNDRY\_OUTPUT\_LENGTH

• **MIN\_FOUNDRY\_OUTPUT\_LENGTH**: `number`

The minimum length of a foundry output binary representation.

___

### NFT\_ID\_LENGTH

• **NFT\_ID\_LENGTH**: `number` = `20`

The length of an NFT Id.

___

### MIN\_NFT\_OUTPUT\_LENGTH

• **MIN\_NFT\_OUTPUT\_LENGTH**: `number`

The minimum length of a nft output binary representation.

___

### MIN\_OUTPUT\_LENGTH

• **MIN\_OUTPUT\_LENGTH**: `number`

The minimum length of an output binary representation.

___

### MIN\_OUTPUT\_COUNT

• **MIN\_OUTPUT\_COUNT**: `number` = `1`

The minimum number of outputs.

___

### MAX\_OUTPUT\_COUNT

• **MAX\_OUTPUT\_COUNT**: `number` = `127`

The maximum number of outputs.

___

### MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH

• **MIN\_SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_LENGTH**: `number`

The minimum length of a sig locked dust allowance output binary representation.

___

### MIN\_SIMPLE\_OUTPUT\_LENGTH

• **MIN\_SIMPLE\_OUTPUT\_LENGTH**: `number`

The minimum length of a simple output binary representation.

___

### MIN\_TREASURY\_OUTPUT\_LENGTH

• **MIN\_TREASURY\_OUTPUT\_LENGTH**: `number`

The minimum length of a treasury output binary representation.

___

### MIN\_PAYLOAD\_LENGTH

• **MIN\_PAYLOAD\_LENGTH**: `number`

The minimum length of a payload binary representation.

___

### MIN\_ED25519\_SIGNATURE\_LENGTH

• **MIN\_ED25519\_SIGNATURE\_LENGTH**: `number`

The minimum length of an ed25519 signature binary representation.

___

### MIN\_SIGNATURE\_LENGTH

• **MIN\_SIGNATURE\_LENGTH**: `number` = `MIN_ED25519_SIGNATURE_LENGTH`

The minimum length of a signature binary representation.

___

### MIN\_SIMPLE\_TOKEN\_SCHEME\_LENGTH

• **MIN\_SIMPLE\_TOKEN\_SCHEME\_LENGTH**: `number` = `SMALL_TYPE_LENGTH`

The minimum length of an simple token scheme binary representation.

___

### MIN\_TOKEN\_SCHEME\_LENGTH

• **MIN\_TOKEN\_SCHEME\_LENGTH**: `number` = `MIN_SIMPLE_TOKEN_SCHEME_LENGTH`

The minimum length of a simple token scheme binary representation.

___

### MIN\_TRANSACTION\_ESSENCE\_LENGTH

• **MIN\_TRANSACTION\_ESSENCE\_LENGTH**: `number`

The minimum length of a transaction essence binary representation.

___

### MIN\_ALIAS\_UNLOCK\_BLOCK\_LENGTH

• **MIN\_ALIAS\_UNLOCK\_BLOCK\_LENGTH**: `number`

The minimum length of a alias unlock block binary representation.

___

### MIN\_NFT\_UNLOCK\_BLOCK\_LENGTH

• **MIN\_NFT\_UNLOCK\_BLOCK\_LENGTH**: `number`

The minimum length of a nft unlock block binary representation.

___

### MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH

• **MIN\_REFERENCE\_UNLOCK\_BLOCK\_LENGTH**: `number`

The minimum length of a reference unlock block binary representation.

___

### MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH

• **MIN\_SIGNATURE\_UNLOCK\_BLOCK\_LENGTH**: `number`

The minimum length of a signature unlock block binary representation.

___

### MIN\_UNLOCK\_BLOCK\_LENGTH

• **MIN\_UNLOCK\_BLOCK\_LENGTH**: `number`

The minimum length of an unlock block binary representation.

___

### TRANSACTION\_ESSENCE\_TYPE

• **TRANSACTION\_ESSENCE\_TYPE**: ``0``

The global type for the transaction essence.

___

### ALIAS\_ADDRESS\_TYPE

• **ALIAS\_ADDRESS\_TYPE**: ``8``

The global type for the alias address type.

___

### BLS\_ADDRESS\_TYPE

• **BLS\_ADDRESS\_TYPE**: ``1``

The global type for the BLS address type.

___

### ED25519\_ADDRESS\_TYPE

• **ED25519\_ADDRESS\_TYPE**: ``0``

The global type for the ed25519 address type.

___

### NFT\_ADDRESS\_TYPE

• **NFT\_ADDRESS\_TYPE**: ``16``

The global type for the NFT address type.

___

### DUST\_DEPOSIT\_RETURN\_FEATURE\_BLOCK\_TYPE

• **DUST\_DEPOSIT\_RETURN\_FEATURE\_BLOCK\_TYPE**: ``2``

The global type for the dust deposit return feature block.

___

### EXPIRATION\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_TYPE

• **EXPIRATION\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_TYPE**: ``5``

The global type for the expiration milestone feature block.

___

### EXPIRATION\_UNIX\_FEATURE\_BLOCK\_TYPE

• **EXPIRATION\_UNIX\_FEATURE\_BLOCK\_TYPE**: ``6``

The global type for the expiration unix feature block.

___

### INDEXATION\_FEATURE\_BLOCK\_TYPE

• **INDEXATION\_FEATURE\_BLOCK\_TYPE**: ``8``

The global type for the indexation feature block.

___

### ISSUER\_FEATURE\_BLOCK\_TYPE

• **ISSUER\_FEATURE\_BLOCK\_TYPE**: ``1``

The global type for the issuer feature block.

___

### METADATA\_FEATURE\_BLOCK\_TYPE

• **METADATA\_FEATURE\_BLOCK\_TYPE**: ``7``

The global type for the metadata feature block.

___

### SENDER\_FEATURE\_BLOCK\_TYPE

• **SENDER\_FEATURE\_BLOCK\_TYPE**: ``0``

The global type for the sender feature block.

___

### TIMELOCK\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_TYPE

• **TIMELOCK\_MILESTONE\_INDEX\_FEATURE\_BLOCK\_TYPE**: ``3``

The global type for the timelock milestone feature block.

___

### TIMELOCK\_UNIX\_FEATURE\_BLOCK\_TYPE

• **TIMELOCK\_UNIX\_FEATURE\_BLOCK\_TYPE**: ``4``

The global type for the timelock unix feature block.

___

### TREASURY\_INPUT\_TYPE

• **TREASURY\_INPUT\_TYPE**: ``1``

The global type for the treasury input.

___

### UTXO\_INPUT\_TYPE

• **UTXO\_INPUT\_TYPE**: ``0``

The global type for the input.

___

### ALIAS\_OUTPUT\_TYPE

• **ALIAS\_OUTPUT\_TYPE**: ``4``

The global type for the alias output.

___

### EXTENDED\_OUTPUT\_TYPE

• **EXTENDED\_OUTPUT\_TYPE**: ``3``

The global type for the extended output.

___

### FOUNDRY\_OUTPUT\_TYPE

• **FOUNDRY\_OUTPUT\_TYPE**: ``5``

The global type for the foundry output.

___

### NFT\_OUTPUT\_TYPE

• **NFT\_OUTPUT\_TYPE**: ``6``

The global type for the NFT output.

___

### SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_TYPE

• **SIG\_LOCKED\_DUST\_ALLOWANCE\_OUTPUT\_TYPE**: ``1``

The global type for the sig locked dust allowance output.

**`deprecated`**

___

### SIMPLE\_OUTPUT\_TYPE

• **SIMPLE\_OUTPUT\_TYPE**: ``0``

The global type for the simple output.

___

### TREASURY\_OUTPUT\_TYPE

• **TREASURY\_OUTPUT\_TYPE**: ``2``

The global type for the treasury output.

___

### INDEXATION\_PAYLOAD\_TYPE

• **INDEXATION\_PAYLOAD\_TYPE**: ``2``

The global type for the payload.

___

### MILESTONE\_PAYLOAD\_TYPE

• **MILESTONE\_PAYLOAD\_TYPE**: ``1``

The global type for the payload.

___

### RECEIPT\_PAYLOAD\_TYPE

• **RECEIPT\_PAYLOAD\_TYPE**: ``3``

The global type for the payload.

___

### TRANSACTION\_PAYLOAD\_TYPE

• **TRANSACTION\_PAYLOAD\_TYPE**: ``0``

The global type for the payload.

___

### TREASURY\_TRANSACTION\_PAYLOAD\_TYPE

• **TREASURY\_TRANSACTION\_PAYLOAD\_TYPE**: ``4``

The global type for the payload.

___

### ED25519\_SIGNATURE\_TYPE

• **ED25519\_SIGNATURE\_TYPE**: ``0``

The global type for the signature type.

___

### SIMPLE\_TOKEN\_SCHEME\_TYPE

• **SIMPLE\_TOKEN\_SCHEME\_TYPE**: ``0``

The global type for the simple token scheme.

___

### ALIAS\_UNLOCK\_BLOCK\_TYPE

• **ALIAS\_UNLOCK\_BLOCK\_TYPE**: ``2``

The global type for the alias unlock block.

___

### NFT\_UNLOCK\_BLOCK\_TYPE

• **NFT\_UNLOCK\_BLOCK\_TYPE**: ``3``

The global type for the NFT unlock block.

___

### REFERENCE\_UNLOCK\_BLOCK\_TYPE

• **REFERENCE\_UNLOCK\_BLOCK\_TYPE**: ``1``

The global type for the reference unlock block.

___

### SIGNATURE\_UNLOCK\_BLOCK\_TYPE

• **SIGNATURE\_UNLOCK\_BLOCK\_TYPE**: ``0``

The global type for the unlock block.

___

### CONFLICT\_REASON\_STRINGS

• **CONFLICT\_REASON\_STRINGS**: { [key in ConflictReason]: string }

Conflict reason strings.

___

### ED25519\_SEED\_TYPE

• **ED25519\_SEED\_TYPE**: `number` = `1`

The global type for the seed.

## Functions

### deserializeAddress

▸ **deserializeAddress**(`readStream`): [`AddressTypes`](api.md#addresstypes)

Deserialize the address from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`AddressTypes`](api.md#addresstypes)

The deserialized object.

___

### serializeAddress

▸ **serializeAddress**(`writeStream`, `object`): `void`

Serialize the address to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITypeBase`](interfaces/ITypeBase.md)<`number`\> | The object to serialize. |

#### Returns

`void`

___

### deserializeAliasAddress

▸ **deserializeAliasAddress**(`readStream`): [`IAliasAddress`](interfaces/IAliasAddress.md)

Deserialize the alias address from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IAliasAddress`](interfaces/IAliasAddress.md)

The deserialized object.

___

### serializeAliasAddress

▸ **serializeAliasAddress**(`writeStream`, `object`): `void`

Serialize the alias address to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IAliasAddress`](interfaces/IAliasAddress.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeBlsAddress

▸ **deserializeBlsAddress**(`readStream`): [`IBlsAddress`](interfaces/IBlsAddress.md)

Deserialize the bls address from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IBlsAddress`](interfaces/IBlsAddress.md)

The deserialized object.

___

### serializeBlsAddress

▸ **serializeBlsAddress**(`writeStream`, `object`): `void`

Serialize the bls address to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IBlsAddress`](interfaces/IBlsAddress.md) | The object to serialize. |

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

### deserializeNftAddress

▸ **deserializeNftAddress**(`readStream`): [`INftAddress`](interfaces/INftAddress.md)

Deserialize the nft address from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`INftAddress`](interfaces/INftAddress.md)

The deserialized object.

___

### serializeNftAddress

▸ **serializeNftAddress**(`writeStream`, `object`): `void`

Serialize the nft address to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`INftAddress`](interfaces/INftAddress.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeDustDepositReturnFeatureBlock

▸ **deserializeDustDepositReturnFeatureBlock**(`readStream`): [`IDustDepositReturnFeatureBlock`](interfaces/IDustDepositReturnFeatureBlock.md)

Deserialize the dust deposit return feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IDustDepositReturnFeatureBlock`](interfaces/IDustDepositReturnFeatureBlock.md)

The deserialized object.

___

### serializeDustDepositReturnFeatureBlock

▸ **serializeDustDepositReturnFeatureBlock**(`writeStream`, `object`): `void`

Serialize the dust deposit return feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IDustDepositReturnFeatureBlock`](interfaces/IDustDepositReturnFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeExpirationMilestoneIndexFeatureBlock

▸ **deserializeExpirationMilestoneIndexFeatureBlock**(`readStream`): [`IExpirationMilestoneIndexFeatureBlock`](interfaces/IExpirationMilestoneIndexFeatureBlock.md)

Deserialize the expiration milestone index feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IExpirationMilestoneIndexFeatureBlock`](interfaces/IExpirationMilestoneIndexFeatureBlock.md)

The deserialized object.

___

### serializeExpirationMilestoneIndexFeatureBlock

▸ **serializeExpirationMilestoneIndexFeatureBlock**(`writeStream`, `object`): `void`

Serialize the expiration milestone index feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IExpirationMilestoneIndexFeatureBlock`](interfaces/IExpirationMilestoneIndexFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeExpirationUnixFeatureBlock

▸ **deserializeExpirationUnixFeatureBlock**(`readStream`): [`IExpirationUnixFeatureBlock`](interfaces/IExpirationUnixFeatureBlock.md)

Deserialize the expiration unix feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IExpirationUnixFeatureBlock`](interfaces/IExpirationUnixFeatureBlock.md)

The deserialized object.

___

### serializeExpirationUnixFeatureBlock

▸ **serializeExpirationUnixFeatureBlock**(`writeStream`, `object`): `void`

Serialize the expiration unix feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IExpirationUnixFeatureBlock`](interfaces/IExpirationUnixFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeFeatureBlocks

▸ **deserializeFeatureBlocks**(`readStream`): [`FeatureBlockTypes`](api.md#featureblocktypes)[]

Deserialize the feature blocks from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`FeatureBlockTypes`](api.md#featureblocktypes)[]

The deserialized object.

___

### serializeFeatureBlocks

▸ **serializeFeatureBlocks**(`writeStream`, `objects`): `void`

Serialize the feature blocks to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`FeatureBlockTypes`](api.md#featureblocktypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeFeatureBlock

▸ **deserializeFeatureBlock**(`readStream`): [`FeatureBlockTypes`](api.md#featureblocktypes)

Deserialize the feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`FeatureBlockTypes`](api.md#featureblocktypes)

The deserialized object.

___

### serializeFeatureBlock

▸ **serializeFeatureBlock**(`writeStream`, `object`): `void`

Serialize the feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITypeBase`](interfaces/ITypeBase.md)<`number`\> | The object to serialize. |

#### Returns

`void`

___

### deserializeIndexationFeatureBlock

▸ **deserializeIndexationFeatureBlock**(`readStream`): [`IIndexationFeatureBlock`](interfaces/IIndexationFeatureBlock.md)

Deserialize the indexation feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IIndexationFeatureBlock`](interfaces/IIndexationFeatureBlock.md)

The deserialized object.

___

### serializeIndexationFeatureBlock

▸ **serializeIndexationFeatureBlock**(`writeStream`, `object`): `void`

Serialize the indexation feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IIndexationFeatureBlock`](interfaces/IIndexationFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeIssuerFeatureBlock

▸ **deserializeIssuerFeatureBlock**(`readStream`): [`IIssuerFeatureBlock`](interfaces/IIssuerFeatureBlock.md)

Deserialize the issuer feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IIssuerFeatureBlock`](interfaces/IIssuerFeatureBlock.md)

The deserialized object.

___

### serializeIssuerFeatureBlock

▸ **serializeIssuerFeatureBlock**(`writeStream`, `object`): `void`

Serialize the issuer feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IIssuerFeatureBlock`](interfaces/IIssuerFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeMetadataFeatureBlock

▸ **deserializeMetadataFeatureBlock**(`readStream`): [`IMetadataFeatureBlock`](interfaces/IMetadataFeatureBlock.md)

Deserialize the metadata feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IMetadataFeatureBlock`](interfaces/IMetadataFeatureBlock.md)

The deserialized object.

___

### serializeMetadataFeatureBlock

▸ **serializeMetadataFeatureBlock**(`writeStream`, `object`): `void`

Serialize the metadata feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IMetadataFeatureBlock`](interfaces/IMetadataFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeSenderFeatureBlock

▸ **deserializeSenderFeatureBlock**(`readStream`): [`ISenderFeatureBlock`](interfaces/ISenderFeatureBlock.md)

Deserialize the sender feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISenderFeatureBlock`](interfaces/ISenderFeatureBlock.md)

The deserialized object.

___

### serializeSenderFeatureBlock

▸ **serializeSenderFeatureBlock**(`writeStream`, `object`): `void`

Serialize the sender feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISenderFeatureBlock`](interfaces/ISenderFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTimelockMilestoneIndexFeatureBlock

▸ **deserializeTimelockMilestoneIndexFeatureBlock**(`readStream`): [`ITimelockMilestoneIndexFeatureBlock`](interfaces/ITimelockMilestoneIndexFeatureBlock.md)

Deserialize the timelock milestone index feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITimelockMilestoneIndexFeatureBlock`](interfaces/ITimelockMilestoneIndexFeatureBlock.md)

The deserialized object.

___

### serializeTimelockMilestoneIndexFeatureBlock

▸ **serializeTimelockMilestoneIndexFeatureBlock**(`writeStream`, `object`): `void`

Serialize the timelock milestone index feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITimelockMilestoneIndexFeatureBlock`](interfaces/ITimelockMilestoneIndexFeatureBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTimelockUnixFeatureBlock

▸ **deserializeTimelockUnixFeatureBlock**(`readStream`): [`ITimelockUnixFeatureBlock`](interfaces/ITimelockUnixFeatureBlock.md)

Deserialize the timelock unix feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITimelockUnixFeatureBlock`](interfaces/ITimelockUnixFeatureBlock.md)

The deserialized object.

___

### serializeTimelockUnixFeatureBlock

▸ **serializeTimelockUnixFeatureBlock**(`writeStream`, `object`): `void`

Serialize the timelock unix feature block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITimelockUnixFeatureBlock`](interfaces/ITimelockUnixFeatureBlock.md) | The object to serialize. |

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

▸ **deserializeInputs**(`readStream`): [`InputTypes`](api.md#inputtypes)[]

Deserialize the inputs from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`InputTypes`](api.md#inputtypes)[]

The deserialized object.

___

### serializeInputs

▸ **serializeInputs**(`writeStream`, `objects`): `void`

Serialize the inputs to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`InputTypes`](api.md#inputtypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeInput

▸ **deserializeInput**(`readStream`): [`InputTypes`](api.md#inputtypes)

Deserialize the input from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`InputTypes`](api.md#inputtypes)

The deserialized object.

___

### serializeInput

▸ **serializeInput**(`writeStream`, `object`): `void`

Serialize the input to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`InputTypes`](api.md#inputtypes) | The object to serialize. |

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

### deserializeAliasOutput

▸ **deserializeAliasOutput**(`readStream`): [`IAliasOutput`](interfaces/IAliasOutput.md)

Deserialize the alias output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IAliasOutput`](interfaces/IAliasOutput.md)

The deserialized object.

___

### serializeAliasOutput

▸ **serializeAliasOutput**(`writeStream`, `object`): `void`

Serialize the alias output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IAliasOutput`](interfaces/IAliasOutput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeExtendedOutput

▸ **deserializeExtendedOutput**(`readStream`): [`IExtendedOutput`](interfaces/IExtendedOutput.md)

Deserialize the extended output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IExtendedOutput`](interfaces/IExtendedOutput.md)

The deserialized object.

___

### serializeExtendedOutput

▸ **serializeExtendedOutput**(`writeStream`, `object`): `void`

Serialize the extended output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IExtendedOutput`](interfaces/IExtendedOutput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeFoundryOutput

▸ **deserializeFoundryOutput**(`readStream`): [`IFoundryOutput`](interfaces/IFoundryOutput.md)

Deserialize the foundry output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IFoundryOutput`](interfaces/IFoundryOutput.md)

The deserialized object.

___

### serializeFoundryOutput

▸ **serializeFoundryOutput**(`writeStream`, `object`): `void`

Serialize the foundry output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IFoundryOutput`](interfaces/IFoundryOutput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeNftOutput

▸ **deserializeNftOutput**(`readStream`): [`INftOutput`](interfaces/INftOutput.md)

Deserialize the nft output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`INftOutput`](interfaces/INftOutput.md)

The deserialized object.

___

### serializeNftOutput

▸ **serializeNftOutput**(`writeStream`, `object`): `void`

Serialize the nft output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`INftOutput`](interfaces/INftOutput.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeOutputs

▸ **deserializeOutputs**(`readStream`): [`OutputTypes`](api.md#outputtypes)[]

Deserialize the outputs from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`OutputTypes`](api.md#outputtypes)[]

The deserialized object.

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`, `objects`): `void`

Serialize the outputs to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`OutputTypes`](api.md#outputtypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeOutput

▸ **deserializeOutput**(`readStream`): [`OutputTypes`](api.md#outputtypes)

Deserialize the output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`OutputTypes`](api.md#outputtypes)

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

### deserializeSimpleOutput

▸ **deserializeSimpleOutput**(`readStream`): [`ISimpleOutput`](interfaces/ISimpleOutput.md)

Deserialize the simple output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISimpleOutput`](interfaces/ISimpleOutput.md)

The deserialized object.

___

### serializeSimpleOutput

▸ **serializeSimpleOutput**(`writeStream`, `object`): `void`

Serialize the simple output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISimpleOutput`](interfaces/ISimpleOutput.md) | The object to serialize. |

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

▸ **deserializePayload**(`readStream`): [`PayloadTypes`](api.md#payloadtypes) \| `undefined`

Deserialize the payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`PayloadTypes`](api.md#payloadtypes) \| `undefined`

The deserialized object.

___

### serializePayload

▸ **serializePayload**(`writeStream`, `object`): `void`

Serialize the payload essence to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | `undefined` \| [`PayloadTypes`](api.md#payloadtypes) | The object to serialize. |

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

### deserializeSignature

▸ **deserializeSignature**(`readStream`): [`SignatureTypes`](api.md#signaturetypes)

Deserialize the signature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`SignatureTypes`](api.md#signaturetypes)

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

### deserializeSimpleTokenScheme

▸ **deserializeSimpleTokenScheme**(`readStream`): [`ISimpleTokenScheme`](interfaces/ISimpleTokenScheme.md)

Deserialize the simple token scheme from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISimpleTokenScheme`](interfaces/ISimpleTokenScheme.md)

The deserialized object.

___

### serializeSimpleTokenScheme

▸ **serializeSimpleTokenScheme**(`writeStream`, `object`): `void`

Serialize the simple token scheme to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISimpleTokenScheme`](interfaces/ISimpleTokenScheme.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTokenScheme

▸ **deserializeTokenScheme**(`readStream`): [`TokenSchemeTypes`](api.md#tokenschemetypes)

Deserialize the token scheme from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`TokenSchemeTypes`](api.md#tokenschemetypes)

The deserialized object.

___

### serializeTokenScheme

▸ **serializeTokenScheme**(`writeStream`, `object`): `void`

Serialize the token scheme to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISimpleTokenScheme`](interfaces/ISimpleTokenScheme.md) | The object to serialize. |

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

### deserializeAliasUnlockBlock

▸ **deserializeAliasUnlockBlock**(`readStream`): [`IAliasUnlockBlock`](interfaces/IAliasUnlockBlock.md)

Deserialize the alias unlock block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IAliasUnlockBlock`](interfaces/IAliasUnlockBlock.md)

The deserialized object.

___

### serializeAliasUnlockBlock

▸ **serializeAliasUnlockBlock**(`writeStream`, `object`): `void`

Serialize the alias unlock block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IAliasUnlockBlock`](interfaces/IAliasUnlockBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeNftUnlockBlock

▸ **deserializeNftUnlockBlock**(`readStream`): [`INftUnlockBlock`](interfaces/INftUnlockBlock.md)

Deserialize the nft unlock block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`INftUnlockBlock`](interfaces/INftUnlockBlock.md)

The deserialized object.

___

### serializeNftUnlockBlock

▸ **serializeNftUnlockBlock**(`writeStream`, `object`): `void`

Serialize the nft unlock block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`INftUnlockBlock`](interfaces/INftUnlockBlock.md) | The object to serialize. |

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

### deserializeUnlockBlocks

▸ **deserializeUnlockBlocks**(`readStream`): [`UnlockBlockTypes`](api.md#unlockblocktypes)[]

Deserialize the unlock blocks from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`UnlockBlockTypes`](api.md#unlockblocktypes)[]

The deserialized object.

___

### serializeUnlockBlocks

▸ **serializeUnlockBlocks**(`writeStream`, `objects`): `void`

Serialize the unlock blocks to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`UnlockBlockTypes`](api.md#unlockblocktypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeUnlockBlock

▸ **deserializeUnlockBlock**(`readStream`): [`UnlockBlockTypes`](api.md#unlockblocktypes)

Deserialize the unlock block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`UnlockBlockTypes`](api.md#unlockblocktypes)

The deserialized object.

___

### serializeUnlockBlock

▸ **serializeUnlockBlock**(`writeStream`, `object`): `void`

Serialize the unlock block to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`UnlockBlockTypes`](api.md#unlockblocktypes) | The object to serialize. |

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

#### Returns

`Promise`<`number`\>

The balance.

___

### getUnspentAddress

▸ **getUnspentAddress**(`client`, `seed`, `accountIndex`, `addressOptions?`): `Promise`<{} \| `undefined`\>

Get the first unspent address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{} \| `undefined`\>

The first unspent address.

___

### getUnspentAddresses

▸ **getUnspentAddresses**(`client`, `seed`, `accountIndex`, `addressOptions?`): `Promise`<{}[]\>

Get all the unspent addresses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}[]\>

All the unspent addresses.

___

### getUnspentAddressesWithAddressGenerator

▸ **getUnspentAddressesWithAddressGenerator**<`T`\>(`client`, `seed`, `initialAddressState`, `nextAddressPath`, `addressOptions?`): `Promise`<{}[]\>

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

#### Returns

`Promise`<{}[]\>

All the unspent addresses.

___

### promote

▸ **promote**(`client`, `messageId`): `Promise`<{}\>

Promote an existing message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The clientor node endpoint to perform the promote with. |
| `messageId` | `string` | The message to promote. |

#### Returns

`Promise`<{}\>

The id and message that were promoted.

___

### reattach

▸ **reattach**(`client`, `messageId`): `Promise`<{}\>

Reattach an existing message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to perform the reattach with. |
| `messageId` | `string` | The message to reattach. |

#### Returns

`Promise`<{}\>

The id and message that were reattached.

___

### retrieveData

▸ **retrieveData**(`client`, `messageId`): `Promise`<{} \| `undefined`\>

Retrieve a data message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to retrieve the data with. |
| `messageId` | `string` | The message id of the data to get. |

#### Returns

`Promise`<{} \| `undefined`\>

The message index and data.

___

### retry

▸ **retry**(`client`, `messageId`): `Promise`<{}\>

Retry an existing message either by promoting or reattaching.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to perform the retry with. |
| `messageId` | `string` | The message to retry. |

#### Returns

`Promise`<{}\>

The id and message that were retried.

___

### send

▸ **send**(`client`, `seed`, `accountIndex`, `addressBech32`, `amount`, `indexation?`, `addressOptions?`): `Promise`<{}\>

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
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the message created and the contructed message.

___

### sendEd25519

▸ **sendEd25519**(`client`, `seed`, `accountIndex`, `addressEd25519`, `amount`, `indexation?`, `addressOptions?`): `Promise`<{}\>

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
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the message created and the contructed message.

___

### sendMultiple

▸ **sendMultiple**(`client`, `seed`, `accountIndex`, `outputs`, `indexation?`, `addressOptions?`): `Promise`<{}\>

Send a transfer from the balance on the seed to multiple outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `outputs` | {}[] | The address to send the funds to in bech32 format and amounts. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the message created and the contructed message.

___

### sendMultipleEd25519

▸ **sendMultipleEd25519**(`client`, `seed`, `accountIndex`, `outputs`, `indexation?`, `addressOptions?`): `Promise`<{}\>

Send a transfer from the balance on the seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `outputs` | {}[] | The outputs including address to send the funds to in ed25519 format and amount. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the message created and the contructed message.

___

### sendWithAddressGenerator

▸ **sendWithAddressGenerator**<`T`\>(`client`, `seed`, `initialAddressState`, `nextAddressPath`, `outputs`, `indexation?`, `zeroCount?`): `Promise`<{}\>

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
| `outputs` | {}[] | The address to send the funds to in bech32 format and amounts. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |
| `zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{}\>

The id of the message created and the contructed message.

___

### calculateInputs

▸ **calculateInputs**<`T`\>(`client`, `seed`, `initialAddressState`, `nextAddressPath`, `outputs`, `zeroCount?`): `Promise`<{}[]\>

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
| `outputs` | {}[] | `undefined` | The outputs to send. |
| `zeroCount` | `number` | `5` | Abort when the number of zero balances is exceeded. |

#### Returns

`Promise`<{}[]\>

The id of the message created and the contructed message.

___

### sendAdvanced

▸ **sendAdvanced**(`client`, `inputsAndSignatureKeyPairs`, `outputs`, `indexation?`): `Promise`<{}\>

Send a transfer from the balance on the seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | {}[] | The outputs to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |

#### Returns

`Promise`<{}\>

The id of the message created and the remainder address if one was needed.

___

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`, `outputs`, `indexation?`): [`ITransactionPayload`](interfaces/ITransactionPayload.md)

Build a transaction payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | {}[] | The outputs to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |

#### Returns

[`ITransactionPayload`](interfaces/ITransactionPayload.md)

The transaction payload.

___

### sendData

▸ **sendData**(`client`, `indexationKey`, `indexationData?`): `Promise`<{}\>

Send a data message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the data with. |
| `indexationKey` | `string` \| `Uint8Array` | The index name. |
| `indexationData?` | `string` \| `Uint8Array` | The index data as either UTF8 text or Uint8Array bytes. |

#### Returns

`Promise`<{}\>

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

▸ **logPayload**(`prefix`, `payload?`): `void`

Log a message to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`PayloadTypes`](api.md#payloadtypes) | The payload. |

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

▸ **logAddress**(`prefix`, `address?`): `void`

Log an address to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `address?` | [`AddressTypes`](api.md#addresstypes) | The address to log. |

#### Returns

`void`

___

### logSignature

▸ **logSignature**(`prefix`, `signature?`): `void`

Log signature to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `signature?` | [`IEd25519Signature`](interfaces/IEd25519Signature.md) | The signature to log. |

#### Returns

`void`

___

### logInput

▸ **logInput**(`prefix`, `input?`): `void`

Log input to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `input?` | [`InputTypes`](api.md#inputtypes) | The input to log. |

#### Returns

`void`

___

### logOutput

▸ **logOutput**(`prefix`, `output?`): `void`

Log output to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `output?` | [`OutputTypes`](api.md#outputtypes) | The output to log. |

#### Returns

`void`

___

### logUnlockBlock

▸ **logUnlockBlock**(`prefix`, `unlockBlock?`): `void`

Log unlock block to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unlockBlock?` | [`UnlockBlockTypes`](api.md#unlockblocktypes) | The unlock block to log. |

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

___

### logNativeTokens

▸ **logNativeTokens**(`prefix`, `nativeTokens`): `void`

Log native tokens to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `nativeTokens` | [`INativeToken`](interfaces/INativeToken.md)[] | The native tokens. |

#### Returns

`void`

___

### logTokenScheme

▸ **logTokenScheme**(`prefix`, `tokenScheme`): `void`

Log token scheme to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `tokenScheme` | [`ISimpleTokenScheme`](interfaces/ISimpleTokenScheme.md) | The native tokens. |

#### Returns

`void`

___

### logFeatureBlocks

▸ **logFeatureBlocks**(`prefix`, `featureBlocks`): `void`

Log feature blocks to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `featureBlocks` | [`FeatureBlockTypes`](api.md#featureblocktypes)[] | The native tokens. |

#### Returns

`void`

___

### logFeatureBlock

▸ **logFeatureBlock**(`prefix`, `featureBlock`): `void`

Log feature block to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `featureBlock` | [`FeatureBlockTypes`](api.md#featureblocktypes) | The native tokens. |

#### Returns

`void`

## Type aliases

### AddressTypes

Ƭ **AddressTypes**: [`IEd25519Address`](interfaces/IEd25519Address.md) \| [`IAliasAddress`](interfaces/IAliasAddress.md) \| [`INftAddress`](interfaces/INftAddress.md) \| [`IBlsAddress`](interfaces/IBlsAddress.md)

All of the address types.

___

### FeatureBlockTypes

Ƭ **FeatureBlockTypes**: [`ISenderFeatureBlock`](interfaces/ISenderFeatureBlock.md) \| [`IIssuerFeatureBlock`](interfaces/IIssuerFeatureBlock.md) \| [`IDustDepositReturnFeatureBlock`](interfaces/IDustDepositReturnFeatureBlock.md) \| [`ITimelockMilestoneIndexFeatureBlock`](interfaces/ITimelockMilestoneIndexFeatureBlock.md) \| [`ITimelockUnixFeatureBlock`](interfaces/ITimelockUnixFeatureBlock.md) \| [`IExpirationMilestoneIndexFeatureBlock`](interfaces/IExpirationMilestoneIndexFeatureBlock.md) \| [`IExpirationUnixFeatureBlock`](interfaces/IExpirationUnixFeatureBlock.md) \| [`IMetadataFeatureBlock`](interfaces/IMetadataFeatureBlock.md) \| [`IIndexationFeatureBlock`](interfaces/IIndexationFeatureBlock.md)

All of the feature block types.

___

### InputTypes

Ƭ **InputTypes**: [`IUTXOInput`](interfaces/IUTXOInput.md) \| [`ITreasuryInput`](interfaces/ITreasuryInput.md)

All of the input types.

___

### LedgerInclusionState

Ƭ **LedgerInclusionState**: ``"noTransaction"`` \| ``"included"`` \| ``"conflicting"``

The different states of ledger inclusion.

___

### OutputTypes

Ƭ **OutputTypes**: [`ISimpleOutput`](interfaces/ISimpleOutput.md) \| [`ISigLockedDustAllowanceOutput`](interfaces/ISigLockedDustAllowanceOutput.md) \| [`ITreasuryOutput`](interfaces/ITreasuryOutput.md) \| [`IExtendedOutput`](interfaces/IExtendedOutput.md) \| [`IAliasOutput`](interfaces/IAliasOutput.md) \| [`IFoundryOutput`](interfaces/IFoundryOutput.md) \| [`INftOutput`](interfaces/INftOutput.md)

All of the output types.

___

### PayloadTypes

Ƭ **PayloadTypes**: [`ITransactionPayload`](interfaces/ITransactionPayload.md) \| [`IMilestonePayload`](interfaces/IMilestonePayload.md) \| [`IReceiptPayload`](interfaces/IReceiptPayload.md) \| [`IIndexationPayload`](interfaces/IIndexationPayload.md) \| [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md)

All of the payload types.

___

### SignatureTypes

Ƭ **SignatureTypes**: [`IEd25519Signature`](interfaces/IEd25519Signature.md)

All of the signature types.

___

### TokenSchemeTypes

Ƭ **TokenSchemeTypes**: [`ISimpleTokenScheme`](interfaces/ISimpleTokenScheme.md)

All of the token scheme types.

___

### Units

Ƭ **Units**: ``"Pi"`` \| ``"Ti"`` \| ``"Gi"`` \| ``"Mi"`` \| ``"Ki"`` \| ``"i"``

Units for the token.

___

### UnlockBlockTypes

Ƭ **UnlockBlockTypes**: [`ISignatureUnlockBlock`](interfaces/ISignatureUnlockBlock.md) \| [`IReferenceUnlockBlock`](interfaces/IReferenceUnlockBlock.md) \| [`IAliasUnlockBlock`](interfaces/IAliasUnlockBlock.md) \| [`INftUnlockBlock`](interfaces/INftUnlockBlock.md)

All of the unlock block types.
