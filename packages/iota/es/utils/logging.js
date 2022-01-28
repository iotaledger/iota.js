// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { ALIAS_ADDRESS_TYPE } from "../models/addresses/IAliasAddress";
import { BLS_ADDRESS_TYPE } from "../models/addresses/IBlsAddress";
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
import { EXTENDED_OUTPUT_TYPE } from "../models/outputs/IExtendedOutput";
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
import { GOVERNOR_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IGovernorUnlockCondition";
import { STATE_CONTROLLER_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IStateControllerUnlockCondition";
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
    logger(`${prefix}\tNetwork Id:`, info.networkId);
    logger(`${prefix}\tIs Healthy:`, info.isHealthy);
    logger(`${prefix}\tMin PoW Score:`, info.minPoWScore);
    logger(`${prefix}\tBech32 HRP:`, info.bech32HRP);
    logger(`${prefix}\tLatest Milestone Index:`, info.latestMilestoneIndex);
    logger(`${prefix}\tLatest Milestone Timestamp:`, info.latestMilestoneTimestamp);
    logger(`${prefix}\tConfirmed Milestone Index:`, info.confirmedMilestoneIndex);
    logger(`${prefix}\tMessages Per Second:`, info.messagesPerSecond);
    logger(`${prefix}\tReferenced Messages Per Second:`, info.referencedMessagesPerSecond);
    logger(`${prefix}\tReferenced Rate:`, info.referencedRate);
    logger(`${prefix}\tPruning Index:`, info.pruningIndex);
    logger(`${prefix}\tFeatures:`, info.features);
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
    logger(`${prefix}\tNetwork Id:`, message.networkId);
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
            if (payload.essence.inputs) {
                logger(`${prefix}\tInputs:`, payload.essence.inputs.length);
                for (const input of payload.essence.inputs) {
                    logInput(`${prefix}\t\t`, input);
                }
            }
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
        logger(`${prefix}\tAddress:`, address.address);
    }
    else if ((address === null || address === void 0 ? void 0 : address.type) === BLS_ADDRESS_TYPE) {
        logger(`${prefix}BLS Address`);
        logger(`${prefix}\tAddress:`, address.address);
    }
    else if ((address === null || address === void 0 ? void 0 : address.type) === ALIAS_ADDRESS_TYPE) {
        logger(`${prefix}Alias Address`);
        logger(`${prefix}\tAddress:`, address.address);
    }
    else if ((address === null || address === void 0 ? void 0 : address.type) === NFT_ADDRESS_TYPE) {
        logger(`${prefix}NFT Address`);
        logger(`${prefix}\tAddress:`, address.address);
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
        else if (output.type === EXTENDED_OUTPUT_TYPE) {
            logger(`${prefix}Extended Output`);
            logAddress(`${prefix}\t\tS`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
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
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
        }
        else if (output.type === FOUNDRY_OUTPUT_TYPE) {
            logger(`${prefix}Foundry Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logAddress(`${prefix}\t\tS`, output.address);
            logger(`${prefix}\t\tSerial Number:`, output.serialNumber);
            logger(`${prefix}\t\tToken Tag:`, output.tokenTag);
            logger(`${prefix}\t\tCirculating Supply:`, output.circulatingSupply);
            logger(`${prefix}\t\tMaximum Supply:`, output.maximumSupply);
            logTokenScheme(`${prefix}\t\t`, output.tokenScheme);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
        }
        else if (output.type === NFT_OUTPUT_TYPE) {
            logger(`${prefix}NFT Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tNFT Id:`, output.nftId);
            logger(`${prefix}\t\tImmutable Data:`, output.immutableData);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
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
    logger(`${prefix}Native Tokens`);
    for (const featureBlock of featureBlocks) {
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
    logger(`${prefix}Native Tokens`);
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
        logger(`${prefix}\tDust Deposity Return Unlock Condition`);
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
    else if (unlockCondition.type === STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tState Controller Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
    else if (unlockCondition.type === GOVERNOR_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tGovernor Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUduRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQU9sRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXpF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