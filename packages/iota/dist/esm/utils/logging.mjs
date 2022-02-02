// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { ALIAS_ADDRESS_TYPE } from "../models/addresses/IAliasAddress.mjs";
import { BLS_ADDRESS_TYPE } from "../models/addresses/IBlsAddress.mjs";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address.mjs";
import { NFT_ADDRESS_TYPE } from "../models/addresses/INftAddress.mjs";
import { ISSUER_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/IIssuerFeatureBlock.mjs";
import { METADATA_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/IMetadataFeatureBlock.mjs";
import { SENDER_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/ISenderFeatureBlock.mjs";
import { TAG_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/ITagFeatureBlock.mjs";
import { TREASURY_INPUT_TYPE } from "../models/inputs/ITreasuryInput.mjs";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput.mjs";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence.mjs";
import { ALIAS_OUTPUT_TYPE } from "../models/outputs/IAliasOutput.mjs";
import { EXTENDED_OUTPUT_TYPE } from "../models/outputs/IExtendedOutput.mjs";
import { FOUNDRY_OUTPUT_TYPE } from "../models/outputs/IFoundryOutput.mjs";
import { NFT_OUTPUT_TYPE } from "../models/outputs/INftOutput.mjs";
import { TREASURY_OUTPUT_TYPE } from "../models/outputs/ITreasuryOutput.mjs";
import { MILESTONE_PAYLOAD_TYPE } from "../models/payloads/IMilestonePayload.mjs";
import { RECEIPT_PAYLOAD_TYPE } from "../models/payloads/IReceiptPayload.mjs";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload.mjs";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload.mjs";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITreasuryTransactionPayload.mjs";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature.mjs";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../models/tokenSchemes/ISimpleTokenScheme.mjs";
import { ALIAS_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IAliasUnlockBlock.mjs";
import { NFT_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/INftUnlockBlock.mjs";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock.mjs";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock.mjs";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition.mjs";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IDustDepositReturnUnlockCondition.mjs";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IExpirationUnlockCondition.mjs";
import { GOVERNOR_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IGovernorUnlockCondition.mjs";
import { STATE_CONTROLLER_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IStateControllerUnlockCondition.mjs";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/ITimelockUnlockCondition.mjs";
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
        }
        else if (output.type === NFT_OUTPUT_TYPE) {
            logger(`${prefix}NFT Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tNFT Id:`, output.nftId);
            logger(`${prefix}\t\tImmutable Data:`, output.immutableData);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.featureBlocks);
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
    else if (unlockCondition.type === STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tState Controller Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
    else if (unlockCondition.type === GOVERNOR_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tGovernor Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
}
