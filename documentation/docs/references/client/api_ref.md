---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# @iota/iota.js

## Table of contents

### Classes

- [Ed25519Address](classes/Ed25519Address.md)
- [ClientError](classes/ClientError.md)
- [IndexerPluginClient](classes/IndexerPluginClient.md)
- [SingleNodeClient](classes/SingleNodeClient.md)
- [B1T6](classes/B1T6.md)
- [LocalPowProvider](classes/LocalPowProvider.md)
- [Ed25519Seed](classes/Ed25519Seed.md)
- [Bech32Helper](classes/Bech32Helper.md)
- [PowHelper](classes/PowHelper.md)
- [TransactionHelper](classes/TransactionHelper.md)
- [UnitsHelper](classes/UnitsHelper.md)

### Variables

- [MIN\_ADDRESS\_LENGTH](api_ref.md#min_address_length)
- [ALIAS\_ID\_LENGTH](api_ref.md#alias_id_length)
- [MIN\_ALIAS\_ADDRESS\_LENGTH](api_ref.md#min_alias_address_length)
- [MIN\_ED25519\_ADDRESS\_LENGTH](api_ref.md#min_ed25519_address_length)
- [NFT\_ID\_LENGTH](api_ref.md#nft_id_length)
- [MIN\_NFT\_ADDRESS\_LENGTH](api_ref.md#min_nft_address_length)
- [MAX\_BLOCK\_LENGTH](api_ref.md#max_block_length)
- [MAX\_NUMBER\_PARENTS](api_ref.md#max_number_parents)
- [MIN\_NUMBER\_PARENTS](api_ref.md#min_number_parents)
- [UINT8\_SIZE](api_ref.md#uint8_size)
- [UINT16\_SIZE](api_ref.md#uint16_size)
- [UINT32\_SIZE](api_ref.md#uint32_size)
- [UINT64\_SIZE](api_ref.md#uint64_size)
- [UINT256\_SIZE](api_ref.md#uint256_size)
- [BLOCK\_ID\_LENGTH](api_ref.md#block_id_length)
- [TRANSACTION\_ID\_LENGTH](api_ref.md#transaction_id_length)
- [MERKLE\_PROOF\_LENGTH](api_ref.md#merkle_proof_length)
- [TYPE\_LENGTH](api_ref.md#type_length)
- [SMALL\_TYPE\_LENGTH](api_ref.md#small_type_length)
- [STRING\_LENGTH](api_ref.md#string_length)
- [ARRAY\_LENGTH](api_ref.md#array_length)
- [MIN\_FEATURES\_LENGTH](api_ref.md#min_features_length)
- [MIN\_FEATURE\_LENGTH](api_ref.md#min_feature_length)
- [MIN\_ISSUER\_FEATURE\_LENGTH](api_ref.md#min_issuer_feature_length)
- [MIN\_METADATA\_FEATURE\_LENGTH](api_ref.md#min_metadata_feature_length)
- [MIN\_SENDER\_FEATURE\_LENGTH](api_ref.md#min_sender_feature_length)
- [MIN\_TAG\_FEATURE\_LENGTH](api_ref.md#min_tag_feature_length)
- [TAIL\_HASH\_LENGTH](api_ref.md#tail_hash_length)
- [MIN\_MIGRATED\_FUNDS\_LENGTH](api_ref.md#min_migrated_funds_length)
- [MAX\_FUNDS\_COUNT](api_ref.md#max_funds_count)
- [MIN\_INPUT\_LENGTH](api_ref.md#min_input_length)
- [MIN\_INPUT\_COUNT](api_ref.md#min_input_count)
- [MAX\_INPUT\_COUNT](api_ref.md#max_input_count)
- [MIN\_TREASURY\_INPUT\_LENGTH](api_ref.md#min_treasury_input_length)
- [MIN\_UTXO\_INPUT\_LENGTH](api_ref.md#min_utxo_input_length)
- [MIN\_MILESTONE\_OPTION\_LENGTH](api_ref.md#min_milestone_option_length)
- [MIN\_PROTOCOL\_PARAMS\_MILESTONE\_OPTION\_LENGTH](api_ref.md#min_protocol_params_milestone_option_length)
- [MIN\_RECEIPT\_MILESTONE\_OPTION\_LENGTH](api_ref.md#min_receipt_milestone_option_length)
- [MIN\_ALIAS\_OUTPUT\_LENGTH](api_ref.md#min_alias_output_length)
- [MIN\_BASIC\_OUTPUT\_LENGTH](api_ref.md#min_basic_output_length)
- [MIN\_FOUNDRY\_OUTPUT\_LENGTH](api_ref.md#min_foundry_output_length)
- [MIN\_NFT\_OUTPUT\_LENGTH](api_ref.md#min_nft_output_length)
- [MIN\_OUTPUT\_LENGTH](api_ref.md#min_output_length)
- [MIN\_OUTPUT\_COUNT](api_ref.md#min_output_count)
- [MAX\_OUTPUT\_COUNT](api_ref.md#max_output_count)
- [MIN\_TREASURY\_OUTPUT\_LENGTH](api_ref.md#min_treasury_output_length)
- [MIN\_MILESTONE\_PAYLOAD\_LENGTH](api_ref.md#min_milestone_payload_length)
- [MIN\_PAYLOAD\_LENGTH](api_ref.md#min_payload_length)
- [MIN\_TAGGED\_DATA\_PAYLOAD\_LENGTH](api_ref.md#min_tagged_data_payload_length)
- [MAX\_TAG\_LENGTH](api_ref.md#max_tag_length)
- [MIN\_TRANSACTION\_PAYLOAD\_LENGTH](api_ref.md#min_transaction_payload_length)
- [MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH](api_ref.md#min_treasury_transaction_payload_length)
- [MIN\_ED25519\_SIGNATURE\_LENGTH](api_ref.md#min_ed25519_signature_length)
- [MIN\_SIGNATURE\_LENGTH](api_ref.md#min_signature_length)
- [MIN\_SIMPLE\_TOKEN\_SCHEME\_LENGTH](api_ref.md#min_simple_token_scheme_length)
- [MIN\_TOKEN\_SCHEME\_LENGTH](api_ref.md#min_token_scheme_length)
- [MIN\_TRANSACTION\_ESSENCE\_LENGTH](api_ref.md#min_transaction_essence_length)
- [MIN\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_address_unlock_condition_length)
- [MIN\_EXPIRATION\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_expiration_unlock_condition_length)
- [MIN\_GOVERNOR\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_governor_address_unlock_condition_length)
- [MIN\_IMMUTABLE\_ALIAS\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_immutable_alias_unlock_condition_length)
- [MIN\_STATE\_CONTROLLER\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_state_controller_address_unlock_condition_length)
- [MIN\_STORAGE\_DEPOSIT\_RETURN\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_storage_deposit_return_unlock_condition_length)
- [MIN\_TIMELOCK\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_timelock_unlock_condition_length)
- [MIN\_UNLOCK\_CONDITIONS\_LENGTH](api_ref.md#min_unlock_conditions_length)
- [MIN\_UNLOCK\_CONDITION\_LENGTH](api_ref.md#min_unlock_condition_length)
- [MIN\_ALIAS\_UNLOCK\_LENGTH](api_ref.md#min_alias_unlock_length)
- [MIN\_NFT\_UNLOCK\_LENGTH](api_ref.md#min_nft_unlock_length)
- [MIN\_REFERENCE\_UNLOCK\_LENGTH](api_ref.md#min_reference_unlock_length)
- [MIN\_SIGNATURE\_UNLOCK\_LENGTH](api_ref.md#min_signature_unlock_length)
- [MIN\_UNLOCK\_LENGTH](api_ref.md#min_unlock_length)
- [DEFAULT\_PROTOCOL\_VERSION](api_ref.md#default_protocol_version)
- [TRANSACTION\_ESSENCE\_TYPE](api_ref.md#transaction_essence_type)
- [INPUTS\_COMMITMENT\_SIZE](api_ref.md#inputs_commitment_size)
- [ALIAS\_ADDRESS\_TYPE](api_ref.md#alias_address_type)
- [ED25519\_ADDRESS\_TYPE](api_ref.md#ed25519_address_type)
- [NFT\_ADDRESS\_TYPE](api_ref.md#nft_address_type)
- [ISSUER\_FEATURE\_TYPE](api_ref.md#issuer_feature_type)
- [METADATA\_FEATURE\_TYPE](api_ref.md#metadata_feature_type)
- [SENDER\_FEATURE\_TYPE](api_ref.md#sender_feature_type)
- [TAG\_FEATURE\_TYPE](api_ref.md#tag_feature_type)
- [TREASURY\_INPUT\_TYPE](api_ref.md#treasury_input_type)
- [UTXO\_INPUT\_TYPE](api_ref.md#utxo_input_type)
- [PROTOCOL\_PARAMETERS\_MILESTONE\_OPTION\_TYPE](api_ref.md#protocol_parameters_milestone_option_type)
- [RECEIPT\_MILESTONE\_OPTION\_TYPE](api_ref.md#receipt_milestone_option_type)
- [ALIAS\_OUTPUT\_TYPE](api_ref.md#alias_output_type)
- [BASIC\_OUTPUT\_TYPE](api_ref.md#basic_output_type)
- [FOUNDRY\_OUTPUT\_TYPE](api_ref.md#foundry_output_type)
- [NFT\_OUTPUT\_TYPE](api_ref.md#nft_output_type)
- [TREASURY\_OUTPUT\_TYPE](api_ref.md#treasury_output_type)
- [MILESTONE\_PAYLOAD\_TYPE](api_ref.md#milestone_payload_type)
- [TAGGED\_DATA\_PAYLOAD\_TYPE](api_ref.md#tagged_data_payload_type)
- [TRANSACTION\_PAYLOAD\_TYPE](api_ref.md#transaction_payload_type)
- [TREASURY\_TRANSACTION\_PAYLOAD\_TYPE](api_ref.md#treasury_transaction_payload_type)
- [ED25519\_SIGNATURE\_TYPE](api_ref.md#ed25519_signature_type)
- [SIMPLE\_TOKEN\_SCHEME\_TYPE](api_ref.md#simple_token_scheme_type)
- [ADDRESS\_UNLOCK\_CONDITION\_TYPE](api_ref.md#address_unlock_condition_type)
- [EXPIRATION\_UNLOCK\_CONDITION\_TYPE](api_ref.md#expiration_unlock_condition_type)
- [GOVERNOR\_ADDRESS\_UNLOCK\_CONDITION\_TYPE](api_ref.md#governor_address_unlock_condition_type)
- [IMMUTABLE\_ALIAS\_UNLOCK\_CONDITION\_TYPE](api_ref.md#immutable_alias_unlock_condition_type)
- [STATE\_CONTROLLER\_ADDRESS\_UNLOCK\_CONDITION\_TYPE](api_ref.md#state_controller_address_unlock_condition_type)
- [STORAGE\_DEPOSIT\_RETURN\_UNLOCK\_CONDITION\_TYPE](api_ref.md#storage_deposit_return_unlock_condition_type)
- [TIMELOCK\_UNLOCK\_CONDITION\_TYPE](api_ref.md#timelock_unlock_condition_type)
- [ALIAS\_UNLOCK\_TYPE](api_ref.md#alias_unlock_type)
- [NFT\_UNLOCK\_TYPE](api_ref.md#nft_unlock_type)
- [REFERENCE\_UNLOCK\_TYPE](api_ref.md#reference_unlock_type)
- [SIGNATURE\_UNLOCK\_TYPE](api_ref.md#signature_unlock_type)
- [CONFLICT\_REASON\_STRINGS](api_ref.md#conflict_reason_strings)
- [ED25519\_SEED\_TYPE](api_ref.md#ed25519_seed_type)

### Functions

- [deserializeAddress](api_ref.md#deserializeaddress)
- [serializeAddress](api_ref.md#serializeaddress)
- [deserializeAliasAddress](api_ref.md#deserializealiasaddress)
- [serializeAliasAddress](api_ref.md#serializealiasaddress)
- [deserializeEd25519Address](api_ref.md#deserializeed25519address)
- [serializeEd25519Address](api_ref.md#serializeed25519address)
- [deserializeNftAddress](api_ref.md#deserializenftaddress)
- [serializeNftAddress](api_ref.md#serializenftaddress)
- [deserializeBlock](api_ref.md#deserializeblock)
- [serializeBlock](api_ref.md#serializeblock)
- [deserializeFeatures](api_ref.md#deserializefeatures)
- [serializeFeatures](api_ref.md#serializefeatures)
- [deserializeFeature](api_ref.md#deserializefeature)
- [serializeFeature](api_ref.md#serializefeature)
- [deserializeIssuerFeature](api_ref.md#deserializeissuerfeature)
- [serializeIssuerFeature](api_ref.md#serializeissuerfeature)
- [deserializeMetadataFeature](api_ref.md#deserializemetadatafeature)
- [serializeMetadataFeature](api_ref.md#serializemetadatafeature)
- [deserializeSenderFeature](api_ref.md#deserializesenderfeature)
- [serializeSenderFeature](api_ref.md#serializesenderfeature)
- [deserializeTagFeature](api_ref.md#deserializetagfeature)
- [serializeTagFeature](api_ref.md#serializetagfeature)
- [deserializeFunds](api_ref.md#deserializefunds)
- [serializeFunds](api_ref.md#serializefunds)
- [deserializeMigratedFunds](api_ref.md#deserializemigratedfunds)
- [serializeMigratedFunds](api_ref.md#serializemigratedfunds)
- [deserializeInputs](api_ref.md#deserializeinputs)
- [serializeInputs](api_ref.md#serializeinputs)
- [deserializeInput](api_ref.md#deserializeinput)
- [serializeInput](api_ref.md#serializeinput)
- [deserializeTreasuryInput](api_ref.md#deserializetreasuryinput)
- [serializeTreasuryInput](api_ref.md#serializetreasuryinput)
- [deserializeUTXOInput](api_ref.md#deserializeutxoinput)
- [serializeUTXOInput](api_ref.md#serializeutxoinput)
- [deserializeMilestoneOptions](api_ref.md#deserializemilestoneoptions)
- [serializeMilestoneOptions](api_ref.md#serializemilestoneoptions)
- [deserializeMilestoneOption](api_ref.md#deserializemilestoneoption)
- [serializeMilestoneOption](api_ref.md#serializemilestoneoption)
- [deserializeProtocolParamsMilestoneOption](api_ref.md#deserializeprotocolparamsmilestoneoption)
- [serializeProtocolParamsMilestoneOption](api_ref.md#serializeprotocolparamsmilestoneoption)
- [deserializeReceiptMilestoneOption](api_ref.md#deserializereceiptmilestoneoption)
- [serializeReceiptMilestoneOption](api_ref.md#serializereceiptmilestoneoption)
- [deserializeAliasOutput](api_ref.md#deserializealiasoutput)
- [serializeAliasOutput](api_ref.md#serializealiasoutput)
- [deserializeBasicOutput](api_ref.md#deserializebasicoutput)
- [serializeBasicOutput](api_ref.md#serializebasicoutput)
- [deserializeFoundryOutput](api_ref.md#deserializefoundryoutput)
- [serializeFoundryOutput](api_ref.md#serializefoundryoutput)
- [deserializeNftOutput](api_ref.md#deserializenftoutput)
- [serializeNftOutput](api_ref.md#serializenftoutput)
- [deserializeOutputs](api_ref.md#deserializeoutputs)
- [serializeOutputs](api_ref.md#serializeoutputs)
- [deserializeOutput](api_ref.md#deserializeoutput)
- [serializeOutput](api_ref.md#serializeoutput)
- [deserializeTreasuryOutput](api_ref.md#deserializetreasuryoutput)
- [serializeTreasuryOutput](api_ref.md#serializetreasuryoutput)
- [deserializeMilestonePayload](api_ref.md#deserializemilestonepayload)
- [serializeMilestonePayload](api_ref.md#serializemilestonepayload)
- [serializeMilestoneEssence](api_ref.md#serializemilestoneessence)
- [deserializePayload](api_ref.md#deserializepayload)
- [serializePayload](api_ref.md#serializepayload)
- [deserializeTaggedDataPayload](api_ref.md#deserializetaggeddatapayload)
- [serializeTaggedDataPayload](api_ref.md#serializetaggeddatapayload)
- [deserializeTransactionPayload](api_ref.md#deserializetransactionpayload)
- [serializeTransactionPayload](api_ref.md#serializetransactionpayload)
- [deserializeTreasuryTransactionPayload](api_ref.md#deserializetreasurytransactionpayload)
- [serializeTreasuryTransactionPayload](api_ref.md#serializetreasurytransactionpayload)
- [deserializeEd25519Signature](api_ref.md#deserializeed25519signature)
- [serializeEd25519Signature](api_ref.md#serializeed25519signature)
- [deserializeSignature](api_ref.md#deserializesignature)
- [serializeSignature](api_ref.md#serializesignature)
- [deserializeSimpleTokenScheme](api_ref.md#deserializesimpletokenscheme)
- [serializeSimpleTokenScheme](api_ref.md#serializesimpletokenscheme)
- [deserializeTokenScheme](api_ref.md#deserializetokenscheme)
- [serializeTokenScheme](api_ref.md#serializetokenscheme)
- [deserializeTransactionEssence](api_ref.md#deserializetransactionessence)
- [serializeTransactionEssence](api_ref.md#serializetransactionessence)
- [deserializeAddressUnlockCondition](api_ref.md#deserializeaddressunlockcondition)
- [serializeAddressUnlockCondition](api_ref.md#serializeaddressunlockcondition)
- [deserializeExpirationUnlockCondition](api_ref.md#deserializeexpirationunlockcondition)
- [serializeExpirationUnlockCondition](api_ref.md#serializeexpirationunlockcondition)
- [deserializeGovernorAddressUnlockCondition](api_ref.md#deserializegovernoraddressunlockcondition)
- [serializeGovernorAddressUnlockCondition](api_ref.md#serializegovernoraddressunlockcondition)
- [deserializeImmutableAliasUnlockCondition](api_ref.md#deserializeimmutablealiasunlockcondition)
- [serializeImmutableAliasUnlockCondition](api_ref.md#serializeimmutablealiasunlockcondition)
- [deserializeStateControllerAddressUnlockCondition](api_ref.md#deserializestatecontrolleraddressunlockcondition)
- [serializeStateControllerAddressUnlockCondition](api_ref.md#serializestatecontrolleraddressunlockcondition)
- [deserializeStorageDepositReturnUnlockCondition](api_ref.md#deserializestoragedepositreturnunlockcondition)
- [serializeStorageDepositReturnUnlockCondition](api_ref.md#serializestoragedepositreturnunlockcondition)
- [deserializeTimelockUnlockCondition](api_ref.md#deserializetimelockunlockcondition)
- [serializeTimelockUnlockCondition](api_ref.md#serializetimelockunlockcondition)
- [deserializeUnlockConditions](api_ref.md#deserializeunlockconditions)
- [serializeUnlockConditions](api_ref.md#serializeunlockconditions)
- [deserializeUnlockCondition](api_ref.md#deserializeunlockcondition)
- [serializeUnlockCondition](api_ref.md#serializeunlockcondition)
- [deserializeAliasUnlock](api_ref.md#deserializealiasunlock)
- [serializeAliasUnlock](api_ref.md#serializealiasunlock)
- [deserializeNftUnlock](api_ref.md#deserializenftunlock)
- [serializeNftUnlock](api_ref.md#serializenftunlock)
- [deserializeReferenceUnlock](api_ref.md#deserializereferenceunlock)
- [serializeReferenceUnlock](api_ref.md#serializereferenceunlock)
- [deserializeSignatureUnlock](api_ref.md#deserializesignatureunlock)
- [serializeSignatureUnlock](api_ref.md#serializesignatureunlock)
- [deserializeUnlocks](api_ref.md#deserializeunlocks)
- [serializeUnlocks](api_ref.md#serializeunlocks)
- [deserializeUnlock](api_ref.md#deserializeunlock)
- [serializeUnlock](api_ref.md#serializeunlock)
- [addressBalance](api_ref.md#addressbalance)
- [generateBip44Path](api_ref.md#generatebip44path)
- [generateBip44Address](api_ref.md#generatebip44address)
- [getBalance](api_ref.md#getbalance)
- [getUnspentAddress](api_ref.md#getunspentaddress)
- [getUnspentAddresses](api_ref.md#getunspentaddresses)
- [getUnspentAddressesWithAddressGenerator](api_ref.md#getunspentaddresseswithaddressgenerator)
- [promote](api_ref.md#promote)
- [reattach](api_ref.md#reattach)
- [retrieveData](api_ref.md#retrievedata)
- [retry](api_ref.md#retry)
- [send](api_ref.md#send)
- [sendEd25519](api_ref.md#sended25519)
- [sendMultiple](api_ref.md#sendmultiple)
- [sendMultipleEd25519](api_ref.md#sendmultipleed25519)
- [sendWithAddressGenerator](api_ref.md#sendwithaddressgenerator)
- [calculateInputs](api_ref.md#calculateinputs)
- [sendAdvanced](api_ref.md#sendadvanced)
- [buildTransactionPayload](api_ref.md#buildtransactionpayload)
- [sendData](api_ref.md#senddata)
- [setLogger](api_ref.md#setlogger)
- [logRoutes](api_ref.md#logroutes)
- [logInfo](api_ref.md#loginfo)
- [logTips](api_ref.md#logtips)
- [logBlock](api_ref.md#logblock)
- [logBlockMetadata](api_ref.md#logblockmetadata)
- [logPayload](api_ref.md#logpayload)
- [logTransactionPayload](api_ref.md#logtransactionpayload)
- [logTaggedDataPayload](api_ref.md#logtaggeddatapayload)
- [logMilestonePayload](api_ref.md#logmilestonepayload)
- [logMilestoneOptions](api_ref.md#logmilestoneoptions)
- [logMilestoneOption](api_ref.md#logmilestoneoption)
- [logReceiptMilestoneOption](api_ref.md#logreceiptmilestoneoption)
- [logProtocolParamsMilestoneOption](api_ref.md#logprotocolparamsmilestoneoption)
- [logTreasuryTransactionPayload](api_ref.md#logtreasurytransactionpayload)
- [logAddress](api_ref.md#logaddress)
- [logSignature](api_ref.md#logsignature)
- [logInput](api_ref.md#loginput)
- [logOutput](api_ref.md#logoutput)
- [logUnlock](api_ref.md#logunlock)
- [logFunds](api_ref.md#logfunds)
- [logNativeTokens](api_ref.md#lognativetokens)
- [logTokenScheme](api_ref.md#logtokenscheme)
- [logFeatures](api_ref.md#logfeatures)
- [logImmutableFeatures](api_ref.md#logimmutablefeatures)
- [logFeature](api_ref.md#logfeature)
- [logUnlockConditions](api_ref.md#logunlockconditions)
- [logUnlockCondition](api_ref.md#logunlockcondition)
- [milestoneIdFromMilestonePayload](api_ref.md#milestoneidfrommilestonepayload)
- [blockIdFromMilestonePayload](api_ref.md#blockidfrommilestonepayload)

### Interfaces

- [SingleNodeClientOptions](interfaces/SingleNodeClientOptions.md)
- [IAddress](interfaces/IAddress.md)
- [IBip44GeneratorState](interfaces/IBip44GeneratorState.md)
- [IBlock](interfaces/IBlock.md)
- [IBlockMetadata](interfaces/IBlockMetadata.md)
- [IClient](interfaces/IClient.md)
- [IGossipHeartbeat](interfaces/IGossipHeartbeat.md)
- [IGossipMetrics](interfaces/IGossipMetrics.md)
- [IKeyPair](interfaces/IKeyPair.md)
- [IMigratedFunds](interfaces/IMigratedFunds.md)
- [INativeToken](interfaces/INativeToken.md)
- [IPeer](interfaces/IPeer.md)
- [IPowProvider](interfaces/IPowProvider.md)
- [IRent](interfaces/IRent.md)
- [ISeed](interfaces/ISeed.md)
- [ITransactionEssence](interfaces/ITransactionEssence.md)
- [ITreasury](interfaces/ITreasury.md)
- [ITypeBase](interfaces/ITypeBase.md)
- [IAliasAddress](interfaces/IAliasAddress.md)
- [IEd25519Address](interfaces/IEd25519Address.md)
- [INftAddress](interfaces/INftAddress.md)
- [IBlockIdResponse](interfaces/IBlockIdResponse.md)
- [IMilestoneUtxoChangesResponse](interfaces/IMilestoneUtxoChangesResponse.md)
- [IOutputMetadataResponse](interfaces/IOutputMetadataResponse.md)
- [IOutputResponse](interfaces/IOutputResponse.md)
- [IReceiptsResponse](interfaces/IReceiptsResponse.md)
- [IResponse](interfaces/IResponse.md)
- [ITipsResponse](interfaces/ITipsResponse.md)
- [IOutputsResponse](interfaces/IOutputsResponse.md)
- [IIssuerFeature](interfaces/IIssuerFeature.md)
- [IMetadataFeature](interfaces/IMetadataFeature.md)
- [ISenderFeature](interfaces/ISenderFeature.md)
- [ITagFeature](interfaces/ITagFeature.md)
- [INodeInfo](interfaces/INodeInfo.md)
- [INodeInfoBaseToken](interfaces/INodeInfoBaseToken.md)
- [INodeInfoMetrics](interfaces/INodeInfoMetrics.md)
- [INodeInfoMilestone](interfaces/INodeInfoMilestone.md)
- [INodeInfoProtocol](interfaces/INodeInfoProtocol.md)
- [INodeInfoProtocolParamsMilestoneOpt](interfaces/INodeInfoProtocolParamsMilestoneOpt.md)
- [INodeInfoStatus](interfaces/INodeInfoStatus.md)
- [IRoutesResponse](interfaces/IRoutesResponse.md)
- [ITreasuryInput](interfaces/ITreasuryInput.md)
- [IUTXOInput](interfaces/IUTXOInput.md)
- [IProtocolParamsMilestoneOption](interfaces/IProtocolParamsMilestoneOption.md)
- [IReceiptMilestoneOption](interfaces/IReceiptMilestoneOption.md)
- [IAliasOutput](interfaces/IAliasOutput.md)
- [IBasicOutput](interfaces/IBasicOutput.md)
- [ICommonOutput](interfaces/ICommonOutput.md)
- [IFoundryOutput](interfaces/IFoundryOutput.md)
- [INftOutput](interfaces/INftOutput.md)
- [ITreasuryOutput](interfaces/ITreasuryOutput.md)
- [IMilestonePayload](interfaces/IMilestonePayload.md)
- [ITaggedDataPayload](interfaces/ITaggedDataPayload.md)
- [ITransactionPayload](interfaces/ITransactionPayload.md)
- [ITreasuryTransactionPayload](interfaces/ITreasuryTransactionPayload.md)
- [IEd25519Signature](interfaces/IEd25519Signature.md)
- [ISimpleTokenScheme](interfaces/ISimpleTokenScheme.md)
- [IAddressUnlockCondition](interfaces/IAddressUnlockCondition.md)
- [IExpirationUnlockCondition](interfaces/IExpirationUnlockCondition.md)
- [IGovernorAddressUnlockCondition](interfaces/IGovernorAddressUnlockCondition.md)
- [IImmutableAliasUnlockCondition](interfaces/IImmutableAliasUnlockCondition.md)
- [IStateControllerAddressUnlockCondition](interfaces/IStateControllerAddressUnlockCondition.md)
- [IStorageDepositReturnUnlockCondition](interfaces/IStorageDepositReturnUnlockCondition.md)
- [ITimelockUnlockCondition](interfaces/ITimelockUnlockCondition.md)
- [IAliasUnlock](interfaces/IAliasUnlock.md)
- [INftUnlock](interfaces/INftUnlock.md)
- [IReferenceUnlock](interfaces/IReferenceUnlock.md)
- [ISignatureUnlock](interfaces/ISignatureUnlock.md)

### Type Aliases

- [AddressTypes](api_ref.md#addresstypes)
- [FeatureTypes](api_ref.md#featuretypes)
- [InputTypes](api_ref.md#inputtypes)
- [LedgerInclusionState](api_ref.md#ledgerinclusionstate)
- [Magnitudes](api_ref.md#magnitudes)
- [MilestoneOptionTypes](api_ref.md#milestoneoptiontypes)
- [OutputTypes](api_ref.md#outputtypes)
- [PayloadTypes](api_ref.md#payloadtypes)
- [SignatureTypes](api_ref.md#signaturetypes)
- [TokenSchemeTypes](api_ref.md#tokenschemetypes)
- [UnlockConditionTypes](api_ref.md#unlockconditiontypes)
- [UnlockTypes](api_ref.md#unlocktypes)

### Enumerations

- [ConflictReason](enums/ConflictReason.md)

## Variables

### MIN\_ADDRESS\_LENGTH

• `Const` **MIN\_ADDRESS\_LENGTH**: `number`

The minimum length of an address binary representation.

___

### ALIAS\_ID\_LENGTH

• `Const` **ALIAS\_ID\_LENGTH**: `number` = `32`

The length of an alias id.

___

### MIN\_ALIAS\_ADDRESS\_LENGTH

• `Const` **MIN\_ALIAS\_ADDRESS\_LENGTH**: `number`

The minimum length of an alias address binary representation.

___

### MIN\_ED25519\_ADDRESS\_LENGTH

• `Const` **MIN\_ED25519\_ADDRESS\_LENGTH**: `number`

The minimum length of an ed25519 address binary representation.

___

### NFT\_ID\_LENGTH

• `Const` **NFT\_ID\_LENGTH**: `number` = `32`

The length of an NFT Id.

___

### MIN\_NFT\_ADDRESS\_LENGTH

• `Const` **MIN\_NFT\_ADDRESS\_LENGTH**: `number`

The minimum length of an nft address binary representation.

___

### MAX\_BLOCK\_LENGTH

• `Const` **MAX\_BLOCK\_LENGTH**: `number` = `32768`

The maximum length of a block.

___

### MAX\_NUMBER\_PARENTS

• `Const` **MAX\_NUMBER\_PARENTS**: `number` = `8`

The maximum number of parents.

___

### MIN\_NUMBER\_PARENTS

• `Const` **MIN\_NUMBER\_PARENTS**: `number` = `1`

The minimum number of parents.

___

### UINT8\_SIZE

• `Const` **UINT8\_SIZE**: `number` = `1`

Byte length for a uint8 field.

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

### UINT256\_SIZE

• `Const` **UINT256\_SIZE**: `number` = `32`

Byte length for a uint256 field.

___

### BLOCK\_ID\_LENGTH

• `Const` **BLOCK\_ID\_LENGTH**: `number` = `Blake2b.SIZE_256`

Byte length for a block id.

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

• `Const` **SMALL\_TYPE\_LENGTH**: `number` = `UINT8_SIZE`

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

### MIN\_FEATURES\_LENGTH

• `Const` **MIN\_FEATURES\_LENGTH**: `number` = `UINT8_SIZE`

The minimum length of a featurs tokens list.

___

### MIN\_FEATURE\_LENGTH

• `Const` **MIN\_FEATURE\_LENGTH**: `number`

The minimum length of a feature binary representation.

___

### MIN\_ISSUER\_FEATURE\_LENGTH

• `Const` **MIN\_ISSUER\_FEATURE\_LENGTH**: `number`

The minimum length of a issuer feature binary representation.

___

### MIN\_METADATA\_FEATURE\_LENGTH

• `Const` **MIN\_METADATA\_FEATURE\_LENGTH**: `number`

The minimum length of a metadata feature block binary representation.

___

### MIN\_SENDER\_FEATURE\_LENGTH

• `Const` **MIN\_SENDER\_FEATURE\_LENGTH**: `number`

The minimum length of a sender feature binary representation.

___

### MIN\_TAG\_FEATURE\_LENGTH

• `Const` **MIN\_TAG\_FEATURE\_LENGTH**: `number`

The minimum length of a tag feature binary representation.

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

• `Const` **MIN\_INPUT\_LENGTH**: `number`

The minimum length of an input binary representation.

___

### MIN\_INPUT\_COUNT

• `Const` **MIN\_INPUT\_COUNT**: `number` = `1`

The minimum number of inputs.

___

### MAX\_INPUT\_COUNT

• `Const` **MAX\_INPUT\_COUNT**: `number` = `128`

The maximum number of inputs.

___

### MIN\_TREASURY\_INPUT\_LENGTH

• `Const` **MIN\_TREASURY\_INPUT\_LENGTH**: `number`

The minimum length of a treasury input binary representation.

___

### MIN\_UTXO\_INPUT\_LENGTH

• `Const` **MIN\_UTXO\_INPUT\_LENGTH**: `number`

The minimum length of a utxo input binary representation.

___

### MIN\_MILESTONE\_OPTION\_LENGTH

• `Const` **MIN\_MILESTONE\_OPTION\_LENGTH**: `number`

The minimum length of a milestone option binary representation.

___

### MIN\_PROTOCOL\_PARAMS\_MILESTONE\_OPTION\_LENGTH

• `Const` **MIN\_PROTOCOL\_PARAMS\_MILESTONE\_OPTION\_LENGTH**: `number`

The minimum length of a protocol params milestone option binary representation.

___

### MIN\_RECEIPT\_MILESTONE\_OPTION\_LENGTH

• `Const` **MIN\_RECEIPT\_MILESTONE\_OPTION\_LENGTH**: `number`

The minimum length of a receipt milestone option binary representation.

___

### MIN\_ALIAS\_OUTPUT\_LENGTH

• `Const` **MIN\_ALIAS\_OUTPUT\_LENGTH**: `number`

The minimum length of a alias output binary representation.

___

### MIN\_BASIC\_OUTPUT\_LENGTH

• `Const` **MIN\_BASIC\_OUTPUT\_LENGTH**: `number`

The minimum length of a basic output binary representation.

___

### MIN\_FOUNDRY\_OUTPUT\_LENGTH

• `Const` **MIN\_FOUNDRY\_OUTPUT\_LENGTH**: `number`

The minimum length of a foundry output binary representation.

___

### MIN\_NFT\_OUTPUT\_LENGTH

• `Const` **MIN\_NFT\_OUTPUT\_LENGTH**: `number`

The minimum length of a nft output binary representation.

___

### MIN\_OUTPUT\_LENGTH

• `Const` **MIN\_OUTPUT\_LENGTH**: `number`

The minimum length of an output binary representation.

___

### MIN\_OUTPUT\_COUNT

• `Const` **MIN\_OUTPUT\_COUNT**: `number` = `1`

The minimum number of outputs.

___

### MAX\_OUTPUT\_COUNT

• `Const` **MAX\_OUTPUT\_COUNT**: `number` = `128`

The maximum number of outputs.

___

### MIN\_TREASURY\_OUTPUT\_LENGTH

• `Const` **MIN\_TREASURY\_OUTPUT\_LENGTH**: `number`

The minimum length of a treasury output binary representation.

___

### MIN\_MILESTONE\_PAYLOAD\_LENGTH

• `Const` **MIN\_MILESTONE\_PAYLOAD\_LENGTH**: `number`

The minimum length of a milestone payload binary representation.

___

### MIN\_PAYLOAD\_LENGTH

• `Const` **MIN\_PAYLOAD\_LENGTH**: `number`

The minimum length of a payload binary representation.

___

### MIN\_TAGGED\_DATA\_PAYLOAD\_LENGTH

• `Const` **MIN\_TAGGED\_DATA\_PAYLOAD\_LENGTH**: `number`

The minimum length of a tagged data payload binary representation.

___

### MAX\_TAG\_LENGTH

• `Const` **MAX\_TAG\_LENGTH**: `number` = `64`

The maximum length of a tag.

___

### MIN\_TRANSACTION\_PAYLOAD\_LENGTH

• `Const` **MIN\_TRANSACTION\_PAYLOAD\_LENGTH**: `number`

The minimum length of a transaction payload binary representation.

___

### MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH

• `Const` **MIN\_TREASURY\_TRANSACTION\_PAYLOAD\_LENGTH**: `number`

The minimum length of a treasury transaction payload binary representation.

___

### MIN\_ED25519\_SIGNATURE\_LENGTH

• `Const` **MIN\_ED25519\_SIGNATURE\_LENGTH**: `number`

The minimum length of an ed25519 signature binary representation.

___

### MIN\_SIGNATURE\_LENGTH

• `Const` **MIN\_SIGNATURE\_LENGTH**: `number` = `MIN_ED25519_SIGNATURE_LENGTH`

The minimum length of a signature binary representation.

___

### MIN\_SIMPLE\_TOKEN\_SCHEME\_LENGTH

• `Const` **MIN\_SIMPLE\_TOKEN\_SCHEME\_LENGTH**: `number`

The minimum length of an simple token scheme binary representation.

___

### MIN\_TOKEN\_SCHEME\_LENGTH

• `Const` **MIN\_TOKEN\_SCHEME\_LENGTH**: `number` = `MIN_SIMPLE_TOKEN_SCHEME_LENGTH`

The minimum length of a simple token scheme binary representation.

___

### MIN\_TRANSACTION\_ESSENCE\_LENGTH

• `Const` **MIN\_TRANSACTION\_ESSENCE\_LENGTH**: `number`

The minimum length of a transaction essence binary representation.

___

### MIN\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of an address unlock condition binary representation.

___

### MIN\_EXPIRATION\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_EXPIRATION\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of an expiration unlock condition binary representation.

___

### MIN\_GOVERNOR\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_GOVERNOR\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of an governor unlock condition binary representation.

___

### MIN\_IMMUTABLE\_ALIAS\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_IMMUTABLE\_ALIAS\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of an immutable alias unlock condition binary representation.

___

### MIN\_STATE\_CONTROLLER\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_STATE\_CONTROLLER\_ADDRESS\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of an state controller address unlock condition binary representation.

___

### MIN\_STORAGE\_DEPOSIT\_RETURN\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_STORAGE\_DEPOSIT\_RETURN\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of an storage deposit return unlock condition binary representation.

___

### MIN\_TIMELOCK\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_TIMELOCK\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of an timelock unlock condition binary representation.

___

### MIN\_UNLOCK\_CONDITIONS\_LENGTH

• `Const` **MIN\_UNLOCK\_CONDITIONS\_LENGTH**: `number` = `UINT8_SIZE`

The minimum length of a unlock conditions list.

___

### MIN\_UNLOCK\_CONDITION\_LENGTH

• `Const` **MIN\_UNLOCK\_CONDITION\_LENGTH**: `number`

The minimum length of a unlock conditions binary representation.

___

### MIN\_ALIAS\_UNLOCK\_LENGTH

• `Const` **MIN\_ALIAS\_UNLOCK\_LENGTH**: `number`

The minimum length of a alias unlock binary representation.

___

### MIN\_NFT\_UNLOCK\_LENGTH

• `Const` **MIN\_NFT\_UNLOCK\_LENGTH**: `number`

The minimum length of a nft unlock binary representation.

___

### MIN\_REFERENCE\_UNLOCK\_LENGTH

• `Const` **MIN\_REFERENCE\_UNLOCK\_LENGTH**: `number`

The minimum length of a reference unlock binary representation.

___

### MIN\_SIGNATURE\_UNLOCK\_LENGTH

• `Const` **MIN\_SIGNATURE\_UNLOCK\_LENGTH**: `number`

The minimum length of a signature unlock binary representation.

___

### MIN\_UNLOCK\_LENGTH

• `Const` **MIN\_UNLOCK\_LENGTH**: `number`

The minimum length of an unlock binary representation.

___

### DEFAULT\_PROTOCOL\_VERSION

• `Const` **DEFAULT\_PROTOCOL\_VERSION**: `number` = `2`

The default protocol version.

___

### TRANSACTION\_ESSENCE\_TYPE

• `Const` **TRANSACTION\_ESSENCE\_TYPE**: ``1``

The global type for the transaction essence.

___

### INPUTS\_COMMITMENT\_SIZE

• `Const` **INPUTS\_COMMITMENT\_SIZE**: `number` = `Blake2b.SIZE_256`

Inputs commitment size.

___

### ALIAS\_ADDRESS\_TYPE

• `Const` **ALIAS\_ADDRESS\_TYPE**: ``8``

The global type for the alias address type.

___

### ED25519\_ADDRESS\_TYPE

• `Const` **ED25519\_ADDRESS\_TYPE**: ``0``

The global type for the ed25519 address type.

___

### NFT\_ADDRESS\_TYPE

• `Const` **NFT\_ADDRESS\_TYPE**: ``16``

The global type for the NFT address type.

___

### ISSUER\_FEATURE\_TYPE

• `Const` **ISSUER\_FEATURE\_TYPE**: ``1``

The global type for the issuer feature.

___

### METADATA\_FEATURE\_TYPE

• `Const` **METADATA\_FEATURE\_TYPE**: ``2``

The global type for the metadata feature.

___

### SENDER\_FEATURE\_TYPE

• `Const` **SENDER\_FEATURE\_TYPE**: ``0``

The global type for the sender feature.

___

### TAG\_FEATURE\_TYPE

• `Const` **TAG\_FEATURE\_TYPE**: ``3``

The global type for the tag feature.

___

### TREASURY\_INPUT\_TYPE

• `Const` **TREASURY\_INPUT\_TYPE**: ``1``

The global type for the treasury input.

___

### UTXO\_INPUT\_TYPE

• `Const` **UTXO\_INPUT\_TYPE**: ``0``

The global type for the input.

___

### PROTOCOL\_PARAMETERS\_MILESTONE\_OPTION\_TYPE

• `Const` **PROTOCOL\_PARAMETERS\_MILESTONE\_OPTION\_TYPE**: ``1``

The global type for the option.

___

### RECEIPT\_MILESTONE\_OPTION\_TYPE

• `Const` **RECEIPT\_MILESTONE\_OPTION\_TYPE**: ``0``

The global type for the option.

___

### ALIAS\_OUTPUT\_TYPE

• `Const` **ALIAS\_OUTPUT\_TYPE**: ``4``

The global type for the alias output.

___

### BASIC\_OUTPUT\_TYPE

• `Const` **BASIC\_OUTPUT\_TYPE**: ``3``

The global type for the basic output.

___

### FOUNDRY\_OUTPUT\_TYPE

• `Const` **FOUNDRY\_OUTPUT\_TYPE**: ``5``

The global type for the foundry output.

___

### NFT\_OUTPUT\_TYPE

• `Const` **NFT\_OUTPUT\_TYPE**: ``6``

The global type for the NFT output.

___

### TREASURY\_OUTPUT\_TYPE

• `Const` **TREASURY\_OUTPUT\_TYPE**: ``2``

The global type for the treasury output.

___

### MILESTONE\_PAYLOAD\_TYPE

• `Const` **MILESTONE\_PAYLOAD\_TYPE**: ``7``

The global type for the payload.

___

### TAGGED\_DATA\_PAYLOAD\_TYPE

• `Const` **TAGGED\_DATA\_PAYLOAD\_TYPE**: ``5``

The global type for the payload.

___

### TRANSACTION\_PAYLOAD\_TYPE

• `Const` **TRANSACTION\_PAYLOAD\_TYPE**: ``6``

The global type for the payload.

___

### TREASURY\_TRANSACTION\_PAYLOAD\_TYPE

• `Const` **TREASURY\_TRANSACTION\_PAYLOAD\_TYPE**: ``4``

The global type for the payload.

___

### ED25519\_SIGNATURE\_TYPE

• `Const` **ED25519\_SIGNATURE\_TYPE**: ``0``

The global type for the signature type.

___

### SIMPLE\_TOKEN\_SCHEME\_TYPE

• `Const` **SIMPLE\_TOKEN\_SCHEME\_TYPE**: ``0``

The global type for the simple token scheme.

___

### ADDRESS\_UNLOCK\_CONDITION\_TYPE

• `Const` **ADDRESS\_UNLOCK\_CONDITION\_TYPE**: ``0``

The global type for the address unlock condition.

___

### EXPIRATION\_UNLOCK\_CONDITION\_TYPE

• `Const` **EXPIRATION\_UNLOCK\_CONDITION\_TYPE**: ``3``

The global type for the expiration unlock condition.

___

### GOVERNOR\_ADDRESS\_UNLOCK\_CONDITION\_TYPE

• `Const` **GOVERNOR\_ADDRESS\_UNLOCK\_CONDITION\_TYPE**: ``5``

The global type for the governor address unlock condition.

___

### IMMUTABLE\_ALIAS\_UNLOCK\_CONDITION\_TYPE

• `Const` **IMMUTABLE\_ALIAS\_UNLOCK\_CONDITION\_TYPE**: ``6``

The global type for the immutable alias unlock condition.

___

### STATE\_CONTROLLER\_ADDRESS\_UNLOCK\_CONDITION\_TYPE

• `Const` **STATE\_CONTROLLER\_ADDRESS\_UNLOCK\_CONDITION\_TYPE**: ``4``

The global type for the state controller unlock condition.

___

### STORAGE\_DEPOSIT\_RETURN\_UNLOCK\_CONDITION\_TYPE

• `Const` **STORAGE\_DEPOSIT\_RETURN\_UNLOCK\_CONDITION\_TYPE**: ``1``

The global type for the storage deposit return unlock condition.

___

### TIMELOCK\_UNLOCK\_CONDITION\_TYPE

• `Const` **TIMELOCK\_UNLOCK\_CONDITION\_TYPE**: ``2``

The global type for the timelock unlock condition.

___

### ALIAS\_UNLOCK\_TYPE

• `Const` **ALIAS\_UNLOCK\_TYPE**: ``2``

The global type for the alias unlock.

___

### NFT\_UNLOCK\_TYPE

• `Const` **NFT\_UNLOCK\_TYPE**: ``3``

The global type for the NFT unlock.

___

### REFERENCE\_UNLOCK\_TYPE

• `Const` **REFERENCE\_UNLOCK\_TYPE**: ``1``

The global type for the reference unlock.

___

### SIGNATURE\_UNLOCK\_TYPE

• `Const` **SIGNATURE\_UNLOCK\_TYPE**: ``0``

The global type for the unlock.

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

▸ **deserializeAddress**(`readStream`): [`AddressTypes`](api_ref.md#addresstypes)

Deserialize the address from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`AddressTypes`](api_ref.md#addresstypes)

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

### deserializeBlock

▸ **deserializeBlock**(`readStream`): [`IBlock`](interfaces/IBlock.md)

Deserialize the block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The block to deserialize. |

#### Returns

[`IBlock`](interfaces/IBlock.md)

The deserialized block.

___

### serializeBlock

▸ **serializeBlock**(`writeStream`, `object`): `void`

Serialize the block essence to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IBlock`](interfaces/IBlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeFeatures

▸ **deserializeFeatures**(`readStream`): [`FeatureTypes`](api_ref.md#featuretypes)[] \| `undefined`

Deserialize the feature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`FeatureTypes`](api_ref.md#featuretypes)[] \| `undefined`

The deserialized object.

___

### serializeFeatures

▸ **serializeFeatures**(`writeStream`, `objects`): `void`

Serialize the feature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | `undefined` \| [`FeatureTypes`](api_ref.md#featuretypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeFeature

▸ **deserializeFeature**(`readStream`): [`FeatureTypes`](api_ref.md#featuretypes)

Deserialize the feature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`FeatureTypes`](api_ref.md#featuretypes)

The deserialized object.

___

### serializeFeature

▸ **serializeFeature**(`writeStream`, `object`): `void`

Serialize the feature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITypeBase`](interfaces/ITypeBase.md)<`number`\> | The object to serialize. |

#### Returns

`void`

___

### deserializeIssuerFeature

▸ **deserializeIssuerFeature**(`readStream`): [`IIssuerFeature`](interfaces/IIssuerFeature.md)

Deserialize the issuer feature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IIssuerFeature`](interfaces/IIssuerFeature.md)

The deserialized object.

___

### serializeIssuerFeature

▸ **serializeIssuerFeature**(`writeStream`, `object`): `void`

Serialize the issuer feature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IIssuerFeature`](interfaces/IIssuerFeature.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeMetadataFeature

▸ **deserializeMetadataFeature**(`readStream`): [`IMetadataFeature`](interfaces/IMetadataFeature.md)

Deserialize the metadata feature block from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IMetadataFeature`](interfaces/IMetadataFeature.md)

The deserialized object.

___

### serializeMetadataFeature

▸ **serializeMetadataFeature**(`writeStream`, `object`): `void`

Serialize the metadata feature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IMetadataFeature`](interfaces/IMetadataFeature.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeSenderFeature

▸ **deserializeSenderFeature**(`readStream`): [`ISenderFeature`](interfaces/ISenderFeature.md)

Deserialize the sender feature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISenderFeature`](interfaces/ISenderFeature.md)

The deserialized object.

___

### serializeSenderFeature

▸ **serializeSenderFeature**(`writeStream`, `object`): `void`

Serialize the sender feature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISenderFeature`](interfaces/ISenderFeature.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTagFeature

▸ **deserializeTagFeature**(`readStream`): [`ITagFeature`](interfaces/ITagFeature.md)

Deserialize the tag feature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITagFeature`](interfaces/ITagFeature.md)

The deserialized object.

___

### serializeTagFeature

▸ **serializeTagFeature**(`writeStream`, `object`): `void`

Serialize the tag feature to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITagFeature`](interfaces/ITagFeature.md) | The object to serialize. |

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

▸ **deserializeInputs**(`readStream`): [`InputTypes`](api_ref.md#inputtypes)[]

Deserialize the inputs from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`InputTypes`](api_ref.md#inputtypes)[]

The deserialized object.

___

### serializeInputs

▸ **serializeInputs**(`writeStream`, `objects`): `void`

Serialize the inputs to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`InputTypes`](api_ref.md#inputtypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeInput

▸ **deserializeInput**(`readStream`): [`InputTypes`](api_ref.md#inputtypes)

Deserialize the input from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`InputTypes`](api_ref.md#inputtypes)

The deserialized object.

___

### serializeInput

▸ **serializeInput**(`writeStream`, `object`): `void`

Serialize the input to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`InputTypes`](api_ref.md#inputtypes) | The object to serialize. |

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

### deserializeMilestoneOptions

▸ **deserializeMilestoneOptions**(`readStream`): [`MilestoneOptionTypes`](api_ref.md#milestoneoptiontypes)[]

Deserialize the milestone options from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`MilestoneOptionTypes`](api_ref.md#milestoneoptiontypes)[]

The deserialized object.

___

### serializeMilestoneOptions

▸ **serializeMilestoneOptions**(`writeStream`, `objects`): `void`

Serialize the milestone options to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`MilestoneOptionTypes`](api_ref.md#milestoneoptiontypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeMilestoneOption

▸ **deserializeMilestoneOption**(`readStream`): [`MilestoneOptionTypes`](api_ref.md#milestoneoptiontypes)

Deserialize the milestone options from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`MilestoneOptionTypes`](api_ref.md#milestoneoptiontypes)

The deserialized object.

___

### serializeMilestoneOption

▸ **serializeMilestoneOption**(`writeStream`, `object`): `void`

Serialize the milestone option to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITypeBase`](interfaces/ITypeBase.md)<`number`\> | The object to serialize. |

#### Returns

`void`

___

### deserializeProtocolParamsMilestoneOption

▸ **deserializeProtocolParamsMilestoneOption**(`readStream`): [`IProtocolParamsMilestoneOption`](interfaces/IProtocolParamsMilestoneOption.md)

Deserialize the protocol params milestone option from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IProtocolParamsMilestoneOption`](interfaces/IProtocolParamsMilestoneOption.md)

The deserialized object.

___

### serializeProtocolParamsMilestoneOption

▸ **serializeProtocolParamsMilestoneOption**(`writeStream`, `object`): `void`

Serialize the protocol params milestone option to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IProtocolParamsMilestoneOption`](interfaces/IProtocolParamsMilestoneOption.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeReceiptMilestoneOption

▸ **deserializeReceiptMilestoneOption**(`readStream`): [`IReceiptMilestoneOption`](interfaces/IReceiptMilestoneOption.md)

Deserialize the receipt milestone option from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IReceiptMilestoneOption`](interfaces/IReceiptMilestoneOption.md)

The deserialized object.

___

### serializeReceiptMilestoneOption

▸ **serializeReceiptMilestoneOption**(`writeStream`, `object`): `void`

Serialize the receipt milestone option to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IReceiptMilestoneOption`](interfaces/IReceiptMilestoneOption.md) | The object to serialize. |

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

### deserializeBasicOutput

▸ **deserializeBasicOutput**(`readStream`): [`IBasicOutput`](interfaces/IBasicOutput.md)

Deserialize the basic output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IBasicOutput`](interfaces/IBasicOutput.md)

The deserialized object.

___

### serializeBasicOutput

▸ **serializeBasicOutput**(`writeStream`, `object`): `void`

Serialize the basic output to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IBasicOutput`](interfaces/IBasicOutput.md) | The object to serialize. |

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

▸ **deserializeOutputs**(`readStream`): [`OutputTypes`](api_ref.md#outputtypes)[]

Deserialize the outputs from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`OutputTypes`](api_ref.md#outputtypes)[]

The deserialized object.

___

### serializeOutputs

▸ **serializeOutputs**(`writeStream`, `objects`): `void`

Serialize the outputs to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`OutputTypes`](api_ref.md#outputtypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeOutput

▸ **deserializeOutput**(`readStream`): [`OutputTypes`](api_ref.md#outputtypes)

Deserialize the output from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`OutputTypes`](api_ref.md#outputtypes)

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

### serializeMilestoneEssence

▸ **serializeMilestoneEssence**(`writeStream`, `object`): `void`

Serialize the milestone payload to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IMilestonePayload`](interfaces/IMilestonePayload.md) | The object to serialize. |

#### Returns

`void`

___

### deserializePayload

▸ **deserializePayload**(`readStream`): [`PayloadTypes`](api_ref.md#payloadtypes) \| `undefined`

Deserialize the payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`PayloadTypes`](api_ref.md#payloadtypes) \| `undefined`

The deserialized object.

___

### serializePayload

▸ **serializePayload**(`writeStream`, `object`): `void`

Serialize the payload essence to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | `undefined` \| [`PayloadTypes`](api_ref.md#payloadtypes) | The object to serialize. |

#### Returns

`void`

___

### deserializeTaggedDataPayload

▸ **deserializeTaggedDataPayload**(`readStream`): [`ITaggedDataPayload`](interfaces/ITaggedDataPayload.md)

Deserialize the tagged data payload from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITaggedDataPayload`](interfaces/ITaggedDataPayload.md)

The deserialized object.

___

### serializeTaggedDataPayload

▸ **serializeTaggedDataPayload**(`writeStream`, `object`): `void`

Serialize the tagged data payload to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITaggedDataPayload`](interfaces/ITaggedDataPayload.md) | The object to serialize. |

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

▸ **deserializeSignature**(`readStream`): [`SignatureTypes`](api_ref.md#signaturetypes)

Deserialize the signature from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`SignatureTypes`](api_ref.md#signaturetypes)

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

▸ **deserializeTokenScheme**(`readStream`): [`TokenSchemeTypes`](api_ref.md#tokenschemetypes)

Deserialize the token scheme from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`TokenSchemeTypes`](api_ref.md#tokenschemetypes)

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

### deserializeAddressUnlockCondition

▸ **deserializeAddressUnlockCondition**(`readStream`): [`IAddressUnlockCondition`](interfaces/IAddressUnlockCondition.md)

Deserialize the address unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IAddressUnlockCondition`](interfaces/IAddressUnlockCondition.md)

The deserialized object.

___

### serializeAddressUnlockCondition

▸ **serializeAddressUnlockCondition**(`writeStream`, `object`): `void`

Serialize the address unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IAddressUnlockCondition`](interfaces/IAddressUnlockCondition.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeExpirationUnlockCondition

▸ **deserializeExpirationUnlockCondition**(`readStream`): [`IExpirationUnlockCondition`](interfaces/IExpirationUnlockCondition.md)

Deserialize the expiration unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IExpirationUnlockCondition`](interfaces/IExpirationUnlockCondition.md)

The deserialized object.

___

### serializeExpirationUnlockCondition

▸ **serializeExpirationUnlockCondition**(`writeStream`, `object`): `void`

Serialize the expiration unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IExpirationUnlockCondition`](interfaces/IExpirationUnlockCondition.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeGovernorAddressUnlockCondition

▸ **deserializeGovernorAddressUnlockCondition**(`readStream`): [`IGovernorAddressUnlockCondition`](interfaces/IGovernorAddressUnlockCondition.md)

Deserialize the governor address unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IGovernorAddressUnlockCondition`](interfaces/IGovernorAddressUnlockCondition.md)

The deserialized object.

___

### serializeGovernorAddressUnlockCondition

▸ **serializeGovernorAddressUnlockCondition**(`writeStream`, `object`): `void`

Serialize the governor address unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IGovernorAddressUnlockCondition`](interfaces/IGovernorAddressUnlockCondition.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeImmutableAliasUnlockCondition

▸ **deserializeImmutableAliasUnlockCondition**(`readStream`): [`IImmutableAliasUnlockCondition`](interfaces/IImmutableAliasUnlockCondition.md)

Deserialize the immutable alias unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IImmutableAliasUnlockCondition`](interfaces/IImmutableAliasUnlockCondition.md)

The deserialized object.

___

### serializeImmutableAliasUnlockCondition

▸ **serializeImmutableAliasUnlockCondition**(`writeStream`, `object`): `void`

Serialize the immutable alias unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IImmutableAliasUnlockCondition`](interfaces/IImmutableAliasUnlockCondition.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeStateControllerAddressUnlockCondition

▸ **deserializeStateControllerAddressUnlockCondition**(`readStream`): [`IStateControllerAddressUnlockCondition`](interfaces/IStateControllerAddressUnlockCondition.md)

Deserialize the state controller address unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IStateControllerAddressUnlockCondition`](interfaces/IStateControllerAddressUnlockCondition.md)

The deserialized object.

___

### serializeStateControllerAddressUnlockCondition

▸ **serializeStateControllerAddressUnlockCondition**(`writeStream`, `object`): `void`

Serialize the state controller address unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IStateControllerAddressUnlockCondition`](interfaces/IStateControllerAddressUnlockCondition.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeStorageDepositReturnUnlockCondition

▸ **deserializeStorageDepositReturnUnlockCondition**(`readStream`): [`IStorageDepositReturnUnlockCondition`](interfaces/IStorageDepositReturnUnlockCondition.md)

Deserialize the storage deposit return unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IStorageDepositReturnUnlockCondition`](interfaces/IStorageDepositReturnUnlockCondition.md)

The deserialized object.

___

### serializeStorageDepositReturnUnlockCondition

▸ **serializeStorageDepositReturnUnlockCondition**(`writeStream`, `object`): `void`

Serialize the storage deposit return unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IStorageDepositReturnUnlockCondition`](interfaces/IStorageDepositReturnUnlockCondition.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeTimelockUnlockCondition

▸ **deserializeTimelockUnlockCondition**(`readStream`): [`ITimelockUnlockCondition`](interfaces/ITimelockUnlockCondition.md)

Deserialize the timelock unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ITimelockUnlockCondition`](interfaces/ITimelockUnlockCondition.md)

The deserialized object.

___

### serializeTimelockUnlockCondition

▸ **serializeTimelockUnlockCondition**(`writeStream`, `object`): `void`

Serialize the timelock unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITimelockUnlockCondition`](interfaces/ITimelockUnlockCondition.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeUnlockConditions

▸ **deserializeUnlockConditions**(`readStream`): [`UnlockConditionTypes`](api_ref.md#unlockconditiontypes)[]

Deserialize the unlock conditions from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`UnlockConditionTypes`](api_ref.md#unlockconditiontypes)[]

The deserialized object.

___

### serializeUnlockConditions

▸ **serializeUnlockConditions**(`writeStream`, `objects`): `void`

Serialize the unlock conditions to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`UnlockConditionTypes`](api_ref.md#unlockconditiontypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeUnlockCondition

▸ **deserializeUnlockCondition**(`readStream`): [`UnlockConditionTypes`](api_ref.md#unlockconditiontypes)

Deserialize the unlock condition from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`UnlockConditionTypes`](api_ref.md#unlockconditiontypes)

The deserialized object.

___

### serializeUnlockCondition

▸ **serializeUnlockCondition**(`writeStream`, `object`): `void`

Serialize the unlock condition to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ITypeBase`](interfaces/ITypeBase.md)<`number`\> | The object to serialize. |

#### Returns

`void`

___

### deserializeAliasUnlock

▸ **deserializeAliasUnlock**(`readStream`): [`IAliasUnlock`](interfaces/IAliasUnlock.md)

Deserialize the alias unlock from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IAliasUnlock`](interfaces/IAliasUnlock.md)

The deserialized object.

___

### serializeAliasUnlock

▸ **serializeAliasUnlock**(`writeStream`, `object`): `void`

Serialize the alias unlock to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IAliasUnlock`](interfaces/IAliasUnlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeNftUnlock

▸ **deserializeNftUnlock**(`readStream`): [`INftUnlock`](interfaces/INftUnlock.md)

Deserialize the nft unlock from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`INftUnlock`](interfaces/INftUnlock.md)

The deserialized object.

___

### serializeNftUnlock

▸ **serializeNftUnlock**(`writeStream`, `object`): `void`

Serialize the nft unlock to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`INftUnlock`](interfaces/INftUnlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeReferenceUnlock

▸ **deserializeReferenceUnlock**(`readStream`): [`IReferenceUnlock`](interfaces/IReferenceUnlock.md)

Deserialize the reference unlock from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`IReferenceUnlock`](interfaces/IReferenceUnlock.md)

The deserialized object.

___

### serializeReferenceUnlock

▸ **serializeReferenceUnlock**(`writeStream`, `object`): `void`

Serialize the reference unlock to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`IReferenceUnlock`](interfaces/IReferenceUnlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeSignatureUnlock

▸ **deserializeSignatureUnlock**(`readStream`): [`ISignatureUnlock`](interfaces/ISignatureUnlock.md)

Deserialize the signature unlock from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`ISignatureUnlock`](interfaces/ISignatureUnlock.md)

The deserialized object.

___

### serializeSignatureUnlock

▸ **serializeSignatureUnlock**(`writeStream`, `object`): `void`

Serialize the signature unlock to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`ISignatureUnlock`](interfaces/ISignatureUnlock.md) | The object to serialize. |

#### Returns

`void`

___

### deserializeUnlocks

▸ **deserializeUnlocks**(`readStream`): [`UnlockTypes`](api_ref.md#unlocktypes)[]

Deserialize the unlocks from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`UnlockTypes`](api_ref.md#unlocktypes)[]

The deserialized object.

___

### serializeUnlocks

▸ **serializeUnlocks**(`writeStream`, `objects`): `void`

Serialize the unlocks to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `objects` | [`UnlockTypes`](api_ref.md#unlocktypes)[] | The objects to serialize. |

#### Returns

`void`

___

### deserializeUnlock

▸ **deserializeUnlock**(`readStream`): [`UnlockTypes`](api_ref.md#unlocktypes)

Deserialize the unlock from binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadStream` | The stream to read the data from. |

#### Returns

[`UnlockTypes`](api_ref.md#unlocktypes)

The deserialized object.

___

### serializeUnlock

▸ **serializeUnlock**(`writeStream`, `object`): `void`

Serialize the unlock to binary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `writeStream` | `WriteStream` | The stream to write the data to. |
| `object` | [`UnlockTypes`](api_ref.md#unlocktypes) | The object to serialize. |

#### Returns

`void`

___

### addressBalance

▸ **addressBalance**(`client`, `addressBech32`): `Promise`<{}\>

Get the balance for an address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to get the information from. |
| `addressBech32` | `string` | The address to get the balances for. |

#### Returns

`Promise`<{}\>

The balance.

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

▸ **getBalance**(`client`, `seed`, `accountIndex`, `addressOptions?`): `Promise`<`BigInteger`\>

Get the balance for a list of addresses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<`BigInteger`\>

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

▸ **promote**(`client`, `blockId`): `Promise`<{}\>

Promote an existing block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The clientor node endpoint to perform the promote with. |
| `blockId` | `string` | The block to promote. |

#### Returns

`Promise`<{}\>

The id and block that were promoted.

___

### reattach

▸ **reattach**(`client`, `blockId`): `Promise`<{}\>

Reattach an existing block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to perform the reattach with. |
| `blockId` | `string` | The block to reattach. |

#### Returns

`Promise`<{}\>

The id and block that were reattached.

___

### retrieveData

▸ **retrieveData**(`client`, `blockId`): `Promise`<{} \| `undefined`\>

Retrieve a data block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to retrieve the data with. |
| `blockId` | `string` | The block id of the data to get. |

#### Returns

`Promise`<{} \| `undefined`\>

The block tag and data.

___

### retry

▸ **retry**(`client`, `blockId`): `Promise`<{}\>

Retry an existing block either by promoting or reattaching.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to perform the retry with. |
| `blockId` | `string` | The block to retry. |

#### Returns

`Promise`<{}\>

The id and block that were retried.

___

### send

▸ **send**(`client`, `seed`, `accountIndex`, `addressBech32`, `amount`, `taggedData?`, `addressOptions?`): `Promise`<{}\>

Send a transfer from the balance on the seed to a single output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressBech32` | `string` | The address to send the funds to in bech32 format. |
| `amount` | `BigInteger` | The amount to send. |
| `taggedData?` | `Object` | Optional tagged data to associate with the transaction. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the block created and the contructed block.

___

### sendEd25519

▸ **sendEd25519**(`client`, `seed`, `accountIndex`, `addressEd25519`, `amount`, `taggedData?`, `addressOptions?`): `Promise`<{}\>

Send a transfer from the balance on the seed to a single output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `addressEd25519` | `string` | The address to send the funds to in ed25519 format. |
| `amount` | `BigInteger` | The amount to send. |
| `taggedData?` | `Object` | Optional tagged data to associate with the transaction. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the block created and the contructed block.

___

### sendMultiple

▸ **sendMultiple**(`client`, `seed`, `accountIndex`, `outputs`, `taggedData?`, `addressOptions?`): `Promise`<{}\>

Send a transfer from the balance on the seed to multiple outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `outputs` | {}[] | The address to send the funds to in bech32 format and amounts. |
| `taggedData?` | `Object` | Optional tagged data to associate with the transaction. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the block created and the contructed block.

___

### sendMultipleEd25519

▸ **sendMultipleEd25519**(`client`, `seed`, `accountIndex`, `outputs`, `taggedData?`, `addressOptions?`): `Promise`<{}\>

Send a transfer from the balance on the seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `seed` | [`ISeed`](interfaces/ISeed.md) | The seed to use for address generation. |
| `accountIndex` | `number` | The account index in the wallet. |
| `outputs` | {}[] | The outputs including address to send the funds to in ed25519 format and amount. |
| `taggedData?` | `Object` | Optional tagged data to associate with the transaction. |
| `addressOptions?` | `Object` | Optional address configuration for balance address lookups. |

#### Returns

`Promise`<{}\>

The id of the block created and the contructed block.

___

### sendWithAddressGenerator

▸ **sendWithAddressGenerator**<`T`\>(`client`, `seed`, `initialAddressState`, `nextAddressPath`, `outputs`, `taggedData?`, `zeroCount?`): `Promise`<{}\>

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
| `taggedData?` | `Object` | Optional tagged data to associate with the transaction. |
| `zeroCount?` | `number` | The number of addresses with 0 balance during lookup before aborting. |

#### Returns

`Promise`<{}\>

The id of the block created and the contructed block.

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

The id of the block created and the contructed block.

___

### sendAdvanced

▸ **sendAdvanced**(`client`, `inputsAndSignatureKeyPairs`, `outputs`, `taggedData?`): `Promise`<{}\>

Send a transfer from the balance on the seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the transfer with. |
| `inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | {}[] | The outputs to send. |
| `taggedData?` | `Object` | Optional tagged data to associate with the transaction. |

#### Returns

`Promise`<{}\>

The id of the block created and the remainder address if one was needed.

___

### buildTransactionPayload

▸ **buildTransactionPayload**(`networkId`, `inputsAndSignatureKeyPairs`, `outputs`, `taggedData?`): [`ITransactionPayload`](interfaces/ITransactionPayload.md)

Build a transaction payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The network id we are sending the payload on. |
| `inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | {}[] | The outputs to send. |
| `taggedData?` | `Object` | Optional tagged data to associate with the transaction. |

#### Returns

[`ITransactionPayload`](interfaces/ITransactionPayload.md)

The transaction payload.

___

### sendData

▸ **sendData**(`client`, `tag?`, `data?`): `Promise`<{}\>

Send a data block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| [`IClient`](interfaces/IClient.md) | The client or node endpoint to send the data with. |
| `tag?` | `string` \| `Uint8Array` | The tag for the data. |
| `data?` | `string` \| `Uint8Array` | The data as either UTF8 text or Uint8Array bytes. |

#### Returns

`Promise`<{}\>

The id of the block created and the block.

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

### logRoutes

▸ **logRoutes**(`prefix`, `routes`): `void`

Log the routes of the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `routes` | [`IRoutesResponse`](interfaces/IRoutesResponse.md) | The available routes. |

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

### logBlock

▸ **logBlock**(`prefix`, `block`): `void`

Log a block to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `block` | [`IBlock`](interfaces/IBlock.md) | The block to log. |

#### Returns

`void`

___

### logBlockMetadata

▸ **logBlockMetadata**(`prefix`, `blockMetadata`): `void`

Log the block metadata to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `blockMetadata` | [`IBlockMetadata`](interfaces/IBlockMetadata.md) | The blockMetadata to log. |

#### Returns

`void`

___

### logPayload

▸ **logPayload**(`prefix`, `payload?`): `void`

Log a block to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`PayloadTypes`](api_ref.md#payloadtypes) | The payload. |

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

### logTaggedDataPayload

▸ **logTaggedDataPayload**(`prefix`, `payload?`): `void`

Log a tagged data payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`ITaggedDataPayload`](interfaces/ITaggedDataPayload.md) | The payload. |

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

### logMilestoneOptions

▸ **logMilestoneOptions**(`prefix`, `milestoneOptions?`): `void`

Log milestone options to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `milestoneOptions?` | [`MilestoneOptionTypes`](api_ref.md#milestoneoptiontypes)[] | The milestone options. |

#### Returns

`void`

___

### logMilestoneOption

▸ **logMilestoneOption**(`prefix`, `milestoneOption`): `void`

Log milestone option to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `milestoneOption` | [`MilestoneOptionTypes`](api_ref.md#milestoneoptiontypes) | The milestone option. |

#### Returns

`void`

___

### logReceiptMilestoneOption

▸ **logReceiptMilestoneOption**(`prefix`, `option?`): `void`

Log a receipt milestone option to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `option?` | [`IReceiptMilestoneOption`](interfaces/IReceiptMilestoneOption.md) | The option. |

#### Returns

`void`

___

### logProtocolParamsMilestoneOption

▸ **logProtocolParamsMilestoneOption**(`prefix`, `option?`): `void`

Log a protocol params milestone option to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `option?` | [`IProtocolParamsMilestoneOption`](interfaces/IProtocolParamsMilestoneOption.md) | The option. |

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
| `address?` | [`AddressTypes`](api_ref.md#addresstypes) | The address to log. |

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
| `input?` | [`InputTypes`](api_ref.md#inputtypes) | The input to log. |

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
| `output?` | [`OutputTypes`](api_ref.md#outputtypes) | The output to log. |

#### Returns

`void`

___

### logUnlock

▸ **logUnlock**(`prefix`, `unlock?`): `void`

Log unlock to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unlock?` | [`UnlockTypes`](api_ref.md#unlocktypes) | The unlock to log. |

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
| `nativeTokens` | `undefined` \| [`INativeToken`](interfaces/INativeToken.md)[] | The native tokens. |

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
| `tokenScheme` | [`ISimpleTokenScheme`](interfaces/ISimpleTokenScheme.md) | The token scheme. |

#### Returns

`void`

___

### logFeatures

▸ **logFeatures**(`prefix`, `features`): `void`

Log featurew to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `features` | `undefined` \| [`FeatureTypes`](api_ref.md#featuretypes)[] | The features. |

#### Returns

`void`

___

### logImmutableFeatures

▸ **logImmutableFeatures**(`prefix`, `immutableFeatures`): `void`

Log immutable featuress to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `immutableFeatures` | `undefined` \| [`FeatureTypes`](api_ref.md#featuretypes)[] | The features. |

#### Returns

`void`

___

### logFeature

▸ **logFeature**(`prefix`, `feature`): `void`

Log feature to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `feature` | [`FeatureTypes`](api_ref.md#featuretypes) | The feature. |

#### Returns

`void`

___

### logUnlockConditions

▸ **logUnlockConditions**(`prefix`, `unlockConditions`): `void`

Log unlock conditions to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unlockConditions` | [`UnlockConditionTypes`](api_ref.md#unlockconditiontypes)[] | The unlock conditions. |

#### Returns

`void`

___

### logUnlockCondition

▸ **logUnlockCondition**(`prefix`, `unlockCondition`): `void`

Log feature block to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unlockCondition` | [`UnlockConditionTypes`](api_ref.md#unlockconditiontypes) | The unlock condition. |

#### Returns

`void`

___

### milestoneIdFromMilestonePayload

▸ **milestoneIdFromMilestonePayload**(`payload`): `string`

Compute a milestoneId from a milestone payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`IMilestonePayload`](interfaces/IMilestonePayload.md) | The milestone payload. |

#### Returns

`string`

The milestone id hex prefixed string.

___

### blockIdFromMilestonePayload

▸ **blockIdFromMilestonePayload**(`protocolVersion`, `payload`): `string`

Compute a blockId from a milestone payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `protocolVersion` | `number` | The protocol version to use. |
| `payload` | [`IMilestonePayload`](interfaces/IMilestonePayload.md) | The milestone payload. |

#### Returns

`string`

The blockId of the block with the milestone payload.

## Type Aliases

### AddressTypes

Ƭ **AddressTypes**: [`IEd25519Address`](interfaces/IEd25519Address.md) \| [`IAliasAddress`](interfaces/IAliasAddress.md) \| [`INftAddress`](interfaces/INftAddress.md)

All of the address types.

___

### FeatureTypes

Ƭ **FeatureTypes**: [`ISenderFeature`](interfaces/ISenderFeature.md) \| [`IIssuerFeature`](interfaces/IIssuerFeature.md) \| [`IMetadataFeature`](interfaces/IMetadataFeature.md) \| [`ITagFeature`](interfaces/ITagFeature.md)

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

### Magnitudes

Ƭ **Magnitudes**: ``"P"`` \| ``"T"`` \| ``"G"`` \| ``"M"`` \| ``"K"`` \| ``""``

Magnitudes for the numbers.

___

### MilestoneOptionTypes

Ƭ **MilestoneOptionTypes**: [`IReceiptMilestoneOption`](interfaces/IReceiptMilestoneOption.md) \| [`IProtocolParamsMilestoneOption`](interfaces/IProtocolParamsMilestoneOption.md)

All of the milestone option types.

___

### OutputTypes

Ƭ **OutputTypes**: [`ITreasuryOutput`](interfaces/ITreasuryOutput.md) \| [`IBasicOutput`](interfaces/IBasicOutput.md) \| [`IAliasOutput`](interfaces/IAliasOutput.md) \| [`IFoundryOutput`](interfaces/IFoundryOutput.md) \| [`INftOutput`](interfaces/INftOutput.md)

All of the output types.

___

### PayloadTypes

Ƭ **PayloadTypes**: [`ITransactionPayload`](interfaces/ITransactionPayload.md) \| [`IMilestonePayload`](interfaces/IMilestonePayload.md) \| [`ITreasuryTransactionPayload`](interfaces/ITreasuryTransactionPayload.md) \| [`ITaggedDataPayload`](interfaces/ITaggedDataPayload.md)

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

### UnlockConditionTypes

Ƭ **UnlockConditionTypes**: [`IAddressUnlockCondition`](interfaces/IAddressUnlockCondition.md) \| [`IStorageDepositReturnUnlockCondition`](interfaces/IStorageDepositReturnUnlockCondition.md) \| [`ITimelockUnlockCondition`](interfaces/ITimelockUnlockCondition.md) \| [`IExpirationUnlockCondition`](interfaces/IExpirationUnlockCondition.md) \| [`IStateControllerAddressUnlockCondition`](interfaces/IStateControllerAddressUnlockCondition.md) \| [`IGovernorAddressUnlockCondition`](interfaces/IGovernorAddressUnlockCondition.md) \| [`IImmutableAliasUnlockCondition`](interfaces/IImmutableAliasUnlockCondition.md)

All of the unlock condition types.

___

### UnlockTypes

Ƭ **UnlockTypes**: [`ISignatureUnlock`](interfaces/ISignatureUnlock.md) \| [`IReferenceUnlock`](interfaces/IReferenceUnlock.md) \| [`IAliasUnlock`](interfaces/IAliasUnlock.md) \| [`INftUnlock`](interfaces/INftUnlock.md)

All of the unlock types.
