// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { ALIAS_ADDRESS_TYPE } from "../models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE } from "../models/addresses/INftAddress";
import { ISSUER_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/IIssuerFeatureBlock";
import { METADATA_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/IMetadataFeatureBlock";
import { SENDER_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/ISenderFeatureBlock";
import { TAG_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/ITagFeatureBlock";
import { TREASURY_INPUT_TYPE } from "../models/inputs/ITreasuryInput";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { ALIAS_OUTPUT_TYPE } from "../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE } from "../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../models/outputs/ITreasuryOutput";
import { MILESTONE_PAYLOAD_TYPE } from "../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../models/payloads/IReceiptPayload";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITreasuryTransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../models/tokenSchemes/ISimpleTokenScheme";
import { ALIAS_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IAliasUnlockBlock";
import { NFT_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/INftUnlockBlock";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IDustDepositReturnUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/ITimelockUnlockCondition";
/**
 * The logger used by the log methods.
 * @param message The message to output.
 * @param data The data to output.
 * @returns Nothing.
 */
// eslint-disable-next-line no-confusing-arrow
let logger = (message, data) => data !== undefined ? console.log(message, data) : console.log(message);
/**
 * Set the logger for output.
 * @param log The logger.
 */
export function setLogger(log) {
    logger = log;
}
/**
 * Log the node information.
 * @param prefix The prefix for the output.
 * @param info The info to log.
 */
export function logInfo(prefix, info) {
    logger(`${prefix}\tName:`, info.name);
    logger(`${prefix}\tVersion:`, info.version);
    logger(`${prefix}\t\tStatus`);
    logger(`${prefix}\t\t\tIs Healthy:`, info.status.isHealthy);
    logger(`${prefix}\t\t\tLatest Milestone Index:`, info.status.latestMilestoneIndex);
    logger(`${prefix}\t\t\tLatest Milestone Timestamp:`, info.status.latestMilestoneTimestamp);
    logger(`${prefix}\t\t\tConfirmed Milestone Index:`, info.status.confirmedMilestoneIndex);
    logger(`${prefix}\t\t\tPruning Index:`, info.status.pruningIndex);
    logger(`${prefix}\t\tProtocol`);
    logger(`${prefix}\t\t\tNetwork Name:`, info.protocol.networkName);
    logger(`${prefix}\t\t\tBech32 HRP:`, info.protocol.bech32HRP);
    logger(`${prefix}\t\t\tMin PoW Score:`, info.protocol.minPoWScore);
    logger(`${prefix}\t\t\tRent`);
    logger(`${prefix}\t\t\t\tVByte Cost:`, info.protocol.rentStructure.vByteCost);
    logger(`${prefix}\t\t\t\tVByte Factor Data:`, info.protocol.rentStructure.vByteFactorData);
    logger(`${prefix}\t\t\t\tVByte Factor Key:`, info.protocol.rentStructure.vByteFactorKey);
    logger(`${prefix}\t\tMetrics`);
    logger(`${prefix}\t\t\tMessages Per Second:`, info.metrics.messagesPerSecond);
    logger(`${prefix}\t\t\tReferenced Messages Per Second:`, info.metrics.referencedMessagesPerSecond);
    logger(`${prefix}\t\t\tReferenced Rate:`, info.metrics.referencedRate);
    logger(`${prefix}\tFeatures:`, info.features);
    logger(`${prefix}\tPlugins:`, info.plugins);
}
/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tipsResponse The tips to log.
 */
export function logTips(prefix, tipsResponse) {
    if (tipsResponse.tipMessageIds) {
        for (let i = 0; i < tipsResponse.tipMessageIds.length; i++) {
            logger(`${prefix}\tTip ${i + 1} Message Id:`, tipsResponse.tipMessageIds[i]);
        }
    }
}
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
export function logMessage(prefix, message) {
    logger(`${prefix}\tProtocol Version:`, message.protocolVersion);
    if (message.parentMessageIds) {
        for (let i = 0; i < message.parentMessageIds.length; i++) {
            logger(`${prefix}\tParent ${i + 1} Message Id:`, message.parentMessageIds[i]);
        }
    }
    logPayload(`${prefix}\t`, message.payload);
    if (message.nonce !== undefined) {
        logger(`${prefix}\tNonce:`, message.nonce);
    }
}
/**
 * Log the message metadata to the console.
 * @param prefix The prefix for the output.
 * @param messageMetadata The messageMetadata to log.
 */
export function logMessageMetadata(prefix, messageMetadata) {
    logger(`${prefix}\tMessage Id:`, messageMetadata.messageId);
    if (messageMetadata.parentMessageIds) {
        for (let i = 0; i < messageMetadata.parentMessageIds.length; i++) {
            logger(`${prefix}\tParent ${i + 1} Message Id:`, messageMetadata.parentMessageIds[i]);
        }
    }
    if (messageMetadata.isSolid !== undefined) {
        logger(`${prefix}\tIs Solid:`, messageMetadata.isSolid);
    }
    if (messageMetadata.milestoneIndex !== undefined) {
        logger(`${prefix}\tMilestone Index:`, messageMetadata.milestoneIndex);
    }
    if (messageMetadata.referencedByMilestoneIndex !== undefined) {
        logger(`${prefix}\tReferenced By Milestone Index:`, messageMetadata.referencedByMilestoneIndex);
    }
    logger(`${prefix}\tLedger Inclusion State:`, messageMetadata.ledgerInclusionState);
    if (messageMetadata.conflictReason !== undefined) {
        logger(`${prefix}\tConflict Reason:`, messageMetadata.conflictReason);
    }
    if (messageMetadata.shouldPromote !== undefined) {
        logger(`${prefix}\tShould Promote:`, messageMetadata.shouldPromote);
    }
    if (messageMetadata.shouldReattach !== undefined) {
        logger(`${prefix}\tShould Reattach:`, messageMetadata.shouldReattach);
    }
}
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logPayload(prefix, payload) {
    if (payload) {
        if (payload.type === TRANSACTION_PAYLOAD_TYPE) {
            logTransactionPayload(prefix, payload);
        }
        else if (payload.type === MILESTONE_PAYLOAD_TYPE) {
            logMilestonePayload(prefix, payload);
        }
        else if (payload.type === RECEIPT_PAYLOAD_TYPE) {
            logReceiptPayload(prefix, payload);
        }
        else if (payload.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            logTreasuryTransactionPayload(prefix, payload);
        }
        else if (payload.type === TAGGED_DATA_PAYLOAD_TYPE) {
            logTaggedDataPayload(prefix, payload);
        }
    }
}
/**
 * Log a transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logTransactionPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Transaction Payload`);
        if (payload.essence.type === TRANSACTION_ESSENCE_TYPE) {
            logger(`${prefix}\tNetwork Id:`, payload.essence.networkId);
            if (payload.essence.inputs) {
                logger(`${prefix}\tInputs:`, payload.essence.inputs.length);
                for (const input of payload.essence.inputs) {
                    logInput(`${prefix}\t\t`, input);
                }
            }
            logger(`${prefix}\tInputs Commitment:`, payload.essence.inputsCommitment);
            if (payload.essence.outputs) {
                logger(`${prefix}\tOutputs:`, payload.essence.outputs.length);
                for (const output of payload.essence.outputs) {
                    logOutput(`${prefix}\t\t`, output);
                }
            }
        }
        if (payload.unlockBlocks) {
            logger(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
            for (const unlockBlock of payload.unlockBlocks) {
                logUnlockBlock(`${prefix}\t\t`, unlockBlock);
            }
        }
    }
}
/**
 * Log a tagged data payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logTaggedDataPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Tagged Data Payload`);
        logger(`${prefix}\tTag:`, payload.tag ? Converter.hexToUtf8(payload.tag) : "None");
        logger(`${prefix}\tData:`, payload.data ? Converter.hexToUtf8(payload.data) : "None");
    }
}
/**
 * Log a milestone payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logMilestonePayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Milestone Payload`);
        logger(`${prefix}\tIndex:`, payload.index);
        logger(`${prefix}\tTimestamp:`, payload.timestamp);
        for (let i = 0; i < payload.parentMessageIds.length; i++) {
            logger(`${prefix}\tParent ${i + 1}:`, payload.parentMessageIds[i]);
        }
        logger(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
        if (payload.nextPoWScore) {
            logger(`${prefix}\tNext PoW Score:`, payload.nextPoWScore);
        }
        if (payload.nextPoWScoreMilestoneIndex) {
            logger(`${prefix}\tNext PoW Score Milestone Index:`, payload.nextPoWScoreMilestoneIndex);
        }
        logger(`${prefix}\tPublic Keys:`, payload.publicKeys);
        logger(`${prefix}\tSignatures:`, payload.signatures);
        logReceiptPayload(`${prefix}\t`, payload.receipt);
    }
}
/**
 * Log a receipt payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logReceiptPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Receipt Payload`);
        logger(`${prefix}\tMigrated At:`, payload.migratedAt);
        logger(`${prefix}\tFinal:`, payload.final);
        logger(`${prefix}\tFunds:`, payload.funds.length);
        for (const funds of payload.funds) {
            logFunds(`${prefix}\t\t`, funds);
        }
        logTreasuryTransactionPayload(`${prefix}\t\t`, payload.transaction);
    }
}
/**
 * Log a treasury transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logTreasuryTransactionPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Treasury Transaction Payload`);
        logInput(prefix, payload.input);
        logOutput(prefix, payload.output);
    }
}
/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param address The address to log.
 */
export function logAddress(prefix, address) {
    if ((address === null || address === void 0 ? void 0 : address.type) === ED25519_ADDRESS_TYPE) {
        logger(`${prefix}Ed25519 Address`);
        logger(`${prefix}\tPublic Key Hash:`, address.pubKeyHash);
    }
    else if ((address === null || address === void 0 ? void 0 : address.type) === ALIAS_ADDRESS_TYPE) {
        logger(`${prefix}Alias Address`);
        logger(`${prefix}\tAlias Id:`, address.aliasId);
    }
    else if ((address === null || address === void 0 ? void 0 : address.type) === NFT_ADDRESS_TYPE) {
        logger(`${prefix}NFT Address`);
        logger(`${prefix}\tNFT Id:`, address.nftId);
    }
}
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param signature The signature to log.
 */
export function logSignature(prefix, signature) {
    if ((signature === null || signature === void 0 ? void 0 : signature.type) === ED25519_SIGNATURE_TYPE) {
        logger(`${prefix}Ed25519 Signature`);
        logger(`${prefix}\tPublic Key:`, signature.publicKey);
        logger(`${prefix}\tSignature:`, signature.signature);
    }
}
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param input The input to log.
 */
export function logInput(prefix, input) {
    if (input) {
        if (input.type === UTXO_INPUT_TYPE) {
            logger(`${prefix}UTXO Input`);
            logger(`${prefix}\tTransaction Id:`, input.transactionId);
            logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
        }
        else if (input.type === TREASURY_INPUT_TYPE) {
            logger(`${prefix}Treasury Input`);
            logger(`${prefix}\tMilestone Hash:`, input.milestoneId);
        }
    }
}
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param output The output to log.
 */
export function logOutput(prefix, output) {
    if (output) {
        if (output.type === TREASURY_OUTPUT_TYPE) {
            logger(`${prefix}Treasury Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
        else if (output.type === BASIC_OUTPUT_TYPE) {
            logger(`${prefix}Basic Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.featureBlocks);
        }
        else if (output.type === ALIAS_OUTPUT_TYPE) {
            logger(`${prefix}Alias Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tAlias Id:`, output.aliasId);
            logger(`${prefix}\t\tState Index:`, output.stateIndex);
            logger(`${prefix}\t\tState Metadata:`, output.stateMetadata);
            logger(`${prefix}\t\tFoundry Counter:`, output.foundryCounter);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.featureBlocks);
            logImmutableFeatureBlocks(`${prefix}\t\t`, output.immutableBlocks);
        }
        else if (output.type === FOUNDRY_OUTPUT_TYPE) {
            logger(`${prefix}Foundry Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tSerial Number:`, output.serialNumber);
            logger(`${prefix}\t\tToken Tag:`, output.tokenTag);
            logger(`${prefix}\t\tCirculating Supply:`, output.circulatingSupply);
            logger(`${prefix}\t\tMaximum Supply:`, output.maximumSupply);
            logTokenScheme(`${prefix}\t\t`, output.tokenScheme);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.featureBlocks);
            logImmutableFeatureBlocks(`${prefix}\t\t`, output.immutableBlocks);
        }
        else if (output.type === NFT_OUTPUT_TYPE) {
            logger(`${prefix}NFT Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tNFT Id:`, output.nftId);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.featureBlocks);
            logImmutableFeatureBlocks(`${prefix}\t\t`, output.immutableBlocks);
        }
    }
}
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unlockBlock The unlock block to log.
 */
export function logUnlockBlock(prefix, unlockBlock) {
    if (unlockBlock) {
        if (unlockBlock.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tSignature Unlock Block`);
            logSignature(`${prefix}\t\t`, unlockBlock.signature);
        }
        else if (unlockBlock.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tReference Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
        else if (unlockBlock.type === ALIAS_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tAlias Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
        else if (unlockBlock.type === NFT_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tNFT Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
    }
}
/**
 * Log fund to the console.
 * @param prefix The prefix for the output.
 * @param fund The fund to log.
 */
export function logFunds(prefix, fund) {
    if (fund) {
        logger(`${prefix}\tFund`);
        logger(`${prefix}\t\tTail Transaction Hash:`, fund.tailTransactionHash);
        logAddress(`${prefix}\t\t`, fund.address);
        logger(`${prefix}\t\tDeposit:`, fund.deposit);
    }
}
/**
 * Log native tokens to the console.
 * @param prefix The prefix for the output.
 * @param nativeTokens The native tokens.
 */
export function logNativeTokens(prefix, nativeTokens) {
    logger(`${prefix}Native Tokens`);
    for (const nativeToken of nativeTokens) {
        logger(`${prefix}\t\tId:`, nativeToken.id);
        logger(`${prefix}\t\tAmount:`, nativeToken.amount);
    }
}
/**
 * Log token scheme to the console.
 * @param prefix The prefix for the output.
 * @param tokenScheme The token scheme.
 */
export function logTokenScheme(prefix, tokenScheme) {
    if (tokenScheme.type === SIMPLE_TOKEN_SCHEME_TYPE) {
        logger(`${prefix}\tSimple Token Scheme`);
    }
}
/**
 * Log feature blocks to the console.
 * @param prefix The prefix for the output.
 * @param featureBlocks The deature blocks.
 */
export function logFeatureBlocks(prefix, featureBlocks) {
    logger(`${prefix}Feature Blocks`);
    for (const featureBlock of featureBlocks) {
        logFeatureBlock(`${prefix}\t\t`, featureBlock);
    }
}
/**
 * Log immutable blocks to the console.
 * @param prefix The prefix for the output.
 * @param immutableFeatureBlocks The deature blocks.
 */
export function logImmutableFeatureBlocks(prefix, immutableFeatureBlocks) {
    logger(`${prefix}Immutable Feature Blocks`);
    for (const featureBlock of immutableFeatureBlocks) {
        logFeatureBlock(`${prefix}\t\t`, featureBlock);
    }
}
/**
 * Log feature block to the console.
 * @param prefix The prefix for the output.
 * @param featureBlock The feature block.
 */
export function logFeatureBlock(prefix, featureBlock) {
    if (featureBlock.type === SENDER_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tSender Feature Block`);
        logAddress(`${prefix}\t\t`, featureBlock.address);
    }
    else if (featureBlock.type === ISSUER_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tIssuer Feature Block`);
        logAddress(`${prefix}\t\t`, featureBlock.address);
    }
    else if (featureBlock.type === METADATA_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tMetadata Feature Block`);
        logger(`${prefix}\t\tData:`, featureBlock.data);
    }
    else if (featureBlock.type === TAG_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tTag Feature Block`);
        logger(`${prefix}\t\tTag:`, featureBlock.tag);
    }
}
/**
 * Log unlock conditions to the console.
 * @param prefix The prefix for the output.
 * @param unlockConditions The unlock conditions.
 */
export function logUnlockConditions(prefix, unlockConditions) {
    logger(`${prefix}Unlock Conditions`);
    for (const unlockCondition of unlockConditions) {
        logUnlockCondition(`${prefix}\t\t`, unlockCondition);
    }
}
/**
 * Log feature block to the console.
 * @param prefix The prefix for the output.
 * @param unlockCondition The unlock condition.
 */
export function logUnlockCondition(prefix, unlockCondition) {
    if (unlockCondition.type === ADDRESS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tAddress Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
    else if (unlockCondition.type === DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tDust Deposit Return Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.returnAddress);
        logger(`${prefix}\t\tAmount:`, unlockCondition.amount);
    }
    else if (unlockCondition.type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tTimelock Unlock Condition`);
        logger(`${prefix}\t\tMilestone Index:`, unlockCondition.milestoneIndex);
        logger(`${prefix}\t\tUnixTime:`, unlockCondition.unixTime);
    }
    else if (unlockCondition.type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tExpiration Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.returnAddress);
        logger(`${prefix}\t\tMilestone Index:`, unlockCondition.milestoneIndex);
        logger(`${prefix}\t\tUnixTime:`, unlockCondition.unixTime);
    }
    else if (unlockCondition.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tState Controller Address Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
    else if (unlockCondition.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tGovernor Address Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
    else if (unlockCondition.type === IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tImmutable Alias Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUduRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQU9sRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXpFLE9BQU8sRUFBcUIsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNq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