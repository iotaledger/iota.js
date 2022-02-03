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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUduRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQU9sRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXpF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