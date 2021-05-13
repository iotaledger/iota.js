"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFunds = exports.logUnlockBlock = exports.logOutput = exports.logInput = exports.logSignature = exports.logAddress = exports.logTreasuryTransactionPayload = exports.logReceiptPayload = exports.logMilestonePayload = exports.logIndexationPayload = exports.logTransactionPayload = exports.logPayload = exports.logMessageMetadata = exports.logMessage = exports.logTips = exports.logInfo = exports.setLogger = void 0;
const IEd25519Address_1 = require("../models/IEd25519Address");
const IEd25519Signature_1 = require("../models/IEd25519Signature");
const IIndexationPayload_1 = require("../models/IIndexationPayload");
const IMilestonePayload_1 = require("../models/IMilestonePayload");
const IReceiptPayload_1 = require("../models/IReceiptPayload");
const IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
const ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
const ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
const ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
const ITransactionEssence_1 = require("../models/ITransactionEssence");
const ITransactionPayload_1 = require("../models/ITransactionPayload");
const ITreasuryInput_1 = require("../models/ITreasuryInput");
const ITreasuryOutput_1 = require("../models/ITreasuryOutput");
const ITreasuryTransactionPayload_1 = require("../models/ITreasuryTransactionPayload");
const IUTXOInput_1 = require("../models/IUTXOInput");
const converter_1 = require("./converter");
/**
 * The logger used by the log methods.
 * @param message The message to output.
 * @param data The data to output.
 * @returns Nothing.
 */
let logger = (message, data) => (data !== undefined ? console.log(message, data) : console.log(message));
/**
 * Set the logger for output.
 * @param log The logger.
 */
function setLogger(log) {
    logger = log;
}
exports.setLogger = setLogger;
/**
 * Log the node information.
 * @param prefix The prefix for the output.
 * @param info The info to log.
 */
function logInfo(prefix, info) {
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
exports.logInfo = logInfo;
/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tipsResponse The tips to log.
 */
function logTips(prefix, tipsResponse) {
    if (tipsResponse.tipMessageIds) {
        for (let i = 0; i < tipsResponse.tipMessageIds.length; i++) {
            logger(`${prefix}\tTip ${i + 1} Message Id:`, tipsResponse.tipMessageIds[i]);
        }
    }
}
exports.logTips = logTips;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
function logMessage(prefix, message) {
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
exports.logMessage = logMessage;
/**
 * Log the message metadata to the console.
 * @param prefix The prefix for the output.
 * @param messageMetadata The messageMetadata to log.
 */
function logMessageMetadata(prefix, messageMetadata) {
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
exports.logMessageMetadata = logMessageMetadata;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param unknownPayload The payload.
 */
function logPayload(prefix, unknownPayload) {
    if (unknownPayload) {
        if (unknownPayload.type === ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
            logTransactionPayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
            logMilestonePayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
            logIndexationPayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
            logReceiptPayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            logTreasuryTransactionPayload(prefix, unknownPayload);
        }
    }
}
exports.logPayload = logPayload;
/**
 * Log a transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
function logTransactionPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Transaction Payload`);
        if (payload.essence.type === ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE) {
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
exports.logTransactionPayload = logTransactionPayload;
/**
 * Log a indexation payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
function logIndexationPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Indexation Payload`);
        logger(`${prefix}\tIndex:`, converter_1.Converter.hexToUtf8(payload.index));
        logger(`${prefix}\tData:`, payload.data ? converter_1.Converter.hexToUtf8(payload.data) : "None");
    }
}
exports.logIndexationPayload = logIndexationPayload;
/**
 * Log a milestone payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
function logMilestonePayload(prefix, payload) {
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
exports.logMilestonePayload = logMilestonePayload;
/**
 * Log a receipt payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
function logReceiptPayload(prefix, payload) {
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
exports.logReceiptPayload = logReceiptPayload;
/**
 * Log a treasury transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
function logTreasuryTransactionPayload(prefix, payload) {
    if (payload) {
        logger(`${prefix}Treasury Transaction Payload`);
        logInput(prefix, payload.input);
        logOutput(prefix, payload.output);
    }
}
exports.logTreasuryTransactionPayload = logTreasuryTransactionPayload;
/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param unknownAddress The address to log.
 */
function logAddress(prefix, unknownAddress) {
    if ((unknownAddress === null || unknownAddress === void 0 ? void 0 : unknownAddress.type) === IEd25519Address_1.ED25519_ADDRESS_TYPE) {
        const address = unknownAddress;
        logger(`${prefix}Ed25519 Address`);
        logger(`${prefix}\tAddress:`, address.address);
    }
}
exports.logAddress = logAddress;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
function logSignature(prefix, unknownSignature) {
    if ((unknownSignature === null || unknownSignature === void 0 ? void 0 : unknownSignature.type) === IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        const signature = unknownSignature;
        logger(`${prefix}Ed25519 Signature`);
        logger(`${prefix}\tPublic Key:`, signature.publicKey);
        logger(`${prefix}\tSignature:`, signature.signature);
    }
}
exports.logSignature = logSignature;
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
function logInput(prefix, unknownInput) {
    if (unknownInput) {
        if (unknownInput.type === IUTXOInput_1.UTXO_INPUT_TYPE) {
            const input = unknownInput;
            logger(`${prefix}UTXO Input`);
            logger(`${prefix}\tTransaction Id:`, input.transactionId);
            logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
        }
        else if (unknownInput.type === ITreasuryInput_1.TREASURY_INPUT_TYPE) {
            const input = unknownInput;
            logger(`${prefix}Treasury Input`);
            logger(`${prefix}\tMilestone Hash:`, input.milestoneId);
        }
    }
}
exports.logInput = logInput;
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
function logOutput(prefix, unknownOutput) {
    if (unknownOutput) {
        if (unknownOutput.type === ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
            const output = unknownOutput;
            logger(`${prefix}Signature Locked Single Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
        else if (unknownOutput.type === ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            const output = unknownOutput;
            logger(`${prefix}Signature Locked Dust Allowance Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
        else if (unknownOutput.type === ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
            const output = unknownOutput;
            logger(`${prefix}Treasury Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
    }
}
exports.logOutput = logOutput;
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
function logUnlockBlock(prefix, unknownUnlockBlock) {
    if (unknownUnlockBlock) {
        if (unknownUnlockBlock.type === ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
            const unlockBlock = unknownUnlockBlock;
            logger(`${prefix}\tSignature Unlock Block`);
            logSignature(`${prefix}\t\t`, unlockBlock.signature);
        }
        else if (unknownUnlockBlock.type === IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
            const unlockBlock = unknownUnlockBlock;
            logger(`${prefix}\tReference Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
    }
}
exports.logUnlockBlock = logUnlockBlock;
/**
 * Log fund to the console.
 * @param prefix The prefix for the output.
 * @param fund The fund to log.
 */
function logFunds(prefix, fund) {
    if (fund) {
        logger(`${prefix}\tFund`);
        logger(`${prefix}\t\tTail Transaction Hash:`, fund.tailTransactionHash);
        logAddress(`${prefix}\t\t`, fund.address);
        logger(`${prefix}\t\tDeposit:`, fund.deposit);
    }
}
exports.logFunds = logFunds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLCtEQUFrRjtBQUNsRixtRUFBd0Y7QUFDeEYscUVBQTJGO0FBSTNGLG1FQUF3RjtBQUV4RiwrREFBa0Y7QUFDbEYsMkVBQXFHO0FBQ3JHLDJGQUErSDtBQUMvSCw2RUFBeUc7QUFDekcsMkVBQXFHO0FBQ3JHLHVFQUF5RTtBQUN6RSx1RUFBOEY7QUFDOUYsNkRBQStFO0FBQy9FLCtEQUFrRjtBQUNsRix1RkFBdUg7QUFDdkgscURBQW1FO0FBQ25FLDJDQUF3QztBQUV4Qzs7Ozs7R0FLRztBQUNILElBQUksTUFBTSxHQUE4QyxDQUFDLE9BQWUsRUFBRSxJQUFhLEVBQUUsRUFBRSxDQUN2RixDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFFN0U7OztHQUdHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLEdBQThDO0lBQ3BFLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDakIsQ0FBQztBQUZELDhCQUVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxNQUFjLEVBQUUsSUFBZTtJQUNuRCxNQUFNLENBQUMsR0FBRyxNQUFNLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLEdBQUcsTUFBTSxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsR0FBRyxNQUFNLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFD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