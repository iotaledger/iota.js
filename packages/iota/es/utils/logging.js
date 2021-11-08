// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { TREASURY_INPUT_TYPE } from "../models/inputs/ITreasuryInput";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
import { TREASURY_OUTPUT_TYPE } from "../models/outputs/ITreasuryOutput";
import { INDEXATION_PAYLOAD_TYPE } from "../models/payloads/IIndexationPayload";
import { MILESTONE_PAYLOAD_TYPE } from "../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../models/payloads/IReceiptPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITreasuryTransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
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
        else if (payload.type === INDEXATION_PAYLOAD_TYPE) {
            logIndexationPayload(prefix, payload);
        }
        else if (payload.type === RECEIPT_PAYLOAD_TYPE) {
            logReceiptPayload(prefix, payload);
        }
        else if (payload.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            logTreasuryTransactionPayload(prefix, payload);
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
 * Log a indexation payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logIndexationPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Indexation Payload`);
        logger(`${prefix}\tIndex:`, Converter.hexToUtf8(payload.index));
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
        if (output.type === SIMPLE_OUTPUT_TYPE) {
            logger(`${prefix}Signature Locked Single Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
        else if (output.type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            logger(`${prefix}Signature Locked Dust Allowance Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
        else if (output.type === TREASURY_OUTPUT_TYPE) {
            logger(`${prefix}Treasury Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQU8zRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUNILHFDQUFxQyxFQUN4QyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBR3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBcUIsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRyxPQUFPLEVBQW1CLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0YsT0FBTyxFQUF1Qix3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZHLE9BQU8sRUFBK0IsaUNBQWlDLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUVoSSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVoRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUczRjs7Ozs7R0FLRztBQUNILDhDQUE4QztBQUM5QyxJQUFJLE1BQU0s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