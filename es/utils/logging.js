"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFunds = exports.logUnlockBlock = exports.logOutput = exports.logInput = exports.logSignature = exports.logAddress = exports.logTreasuryTransactionPayload = exports.logReceiptPayload = exports.logMilestonePayload = exports.logIndexationPayload = exports.logTransactionPayload = exports.logPayload = exports.logMessageMetadata = exports.logMessage = exports.logTips = exports.logInfo = exports.setLogger = void 0;
var IEd25519Address_1 = require("../models/IEd25519Address");
var IEd25519Signature_1 = require("../models/IEd25519Signature");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IMilestonePayload_1 = require("../models/IMilestonePayload");
var IReceiptPayload_1 = require("../models/IReceiptPayload");
var IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
var ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var ITransactionPayload_1 = require("../models/ITransactionPayload");
var ITreasuryInput_1 = require("../models/ITreasuryInput");
var ITreasuryOutput_1 = require("../models/ITreasuryOutput");
var ITreasuryTransactionPayload_1 = require("../models/ITreasuryTransactionPayload");
var IUTXOInput_1 = require("../models/IUTXOInput");
var converter_1 = require("./converter");
/**
 * The logger used by the log methods.
 * @param message The message to output.
 * @param data The data to output.
 * @returns Nothing.
 */
var logger = function (message, data) {
    return (data !== undefined ? console.log(message, data) : console.log(message));
};
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
    logger(prefix + "\tName:", info.name);
    logger(prefix + "\tVersion:", info.version);
    logger(prefix + "\tNetwork Id:", info.networkId);
    logger(prefix + "\tIs Healthy:", info.isHealthy);
    logger(prefix + "\tMin PoW Score:", info.minPowScore);
    logger(prefix + "\tBech32 HRP:", info.bech32HRP);
    logger(prefix + "\tLatest Milestone Index:", info.latestMilestoneIndex);
    logger(prefix + "\tLatest Milestone Timestamp:", info.latestMilestoneTimestamp);
    logger(prefix + "\tConfirmed Milestone Index:", info.confirmedMilestoneIndex);
    logger(prefix + "\tMessages Per Second:", info.messagesPerSecond);
    logger(prefix + "\tReferenced Messages Per Second:", info.referencedMessagesPerSecond);
    logger(prefix + "\tReferenced Rate:", info.referencedRate);
    logger(prefix + "\tPruning Index:", info.pruningIndex);
    logger(prefix + "\tFeatures:", info.features);
}
exports.logInfo = logInfo;
/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tipsResponse The tips to log.
 */
function logTips(prefix, tipsResponse) {
    if (tipsResponse.tipMessageIds) {
        for (var i = 0; i < tipsResponse.tipMessageIds.length; i++) {
            logger(prefix + "\tTip " + (i + 1) + " Message Id:", tipsResponse.tipMessageIds[i]);
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
    logger(prefix + "\tNetwork Id:", message.networkId);
    if (message.parentMessageIds) {
        for (var i = 0; i < message.parentMessageIds.length; i++) {
            logger(prefix + "\tParent " + (i + 1) + " Message Id:", message.parentMessageIds[i]);
        }
    }
    logPayload(prefix + "\t", message.payload);
    if (message.nonce !== undefined) {
        logger(prefix + "\tNonce:", message.nonce);
    }
}
exports.logMessage = logMessage;
/**
 * Log the message metadata to the console.
 * @param prefix The prefix for the output.
 * @param messageMetadata The messageMetadata to log.
 */
function logMessageMetadata(prefix, messageMetadata) {
    logger(prefix + "\tMessage Id:", messageMetadata.messageId);
    if (messageMetadata.parentMessageIds) {
        for (var i = 0; i < messageMetadata.parentMessageIds.length; i++) {
            logger(prefix + "\tParent " + (i + 1) + " Message Id:", messageMetadata.parentMessageIds[i]);
        }
    }
    if (messageMetadata.isSolid !== undefined) {
        logger(prefix + "\tIs Solid:", messageMetadata.isSolid);
    }
    if (messageMetadata.milestoneIndex !== undefined) {
        logger(prefix + "\tMilestone Index:", messageMetadata.milestoneIndex);
    }
    if (messageMetadata.referencedByMilestoneIndex !== undefined) {
        logger(prefix + "\tReferenced By Milestone Index:", messageMetadata.referencedByMilestoneIndex);
    }
    logger(prefix + "\tLedger Inclusion State:", messageMetadata.ledgerInclusionState);
    if (messageMetadata.conflictReason !== undefined) {
        logger(prefix + "\tConflict Reason:", messageMetadata.conflictReason);
    }
    if (messageMetadata.shouldPromote !== undefined) {
        logger(prefix + "\tShould Promote:", messageMetadata.shouldPromote);
    }
    if (messageMetadata.shouldReattach !== undefined) {
        logger(prefix + "\tShould Reattach:", messageMetadata.shouldReattach);
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
        logger(prefix + "Transaction Payload");
        if (payload.essence.type === ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE) {
            if (payload.essence.inputs) {
                logger(prefix + "\tInputs:", payload.essence.inputs.length);
                for (var _i = 0, _a = payload.essence.inputs; _i < _a.length; _i++) {
                    var input = _a[_i];
                    logInput(prefix + "\t\t", input);
                }
            }
            if (payload.essence.outputs) {
                logger(prefix + "\tOutputs:", payload.essence.outputs.length);
                for (var _b = 0, _c = payload.essence.outputs; _b < _c.length; _b++) {
                    var output = _c[_b];
                    logOutput(prefix + "\t\t", output);
                }
            }
        }
        if (payload.unlockBlocks) {
            logger(prefix + "\tUnlock Blocks:", payload.unlockBlocks.length);
            for (var _d = 0, _e = payload.unlockBlocks; _d < _e.length; _d++) {
                var unlockBlock = _e[_d];
                logUnlockBlock(prefix + "\t\t", unlockBlock);
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
        logger(prefix + "Indexation Payload");
        logger(prefix + "\tIndex:", converter_1.Converter.hexToUtf8(payload.index));
        logger(prefix + "\tData:", payload.data ? converter_1.Converter.hexToUtf8(payload.data) : "None");
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
        logger(prefix + "Milestone Payload");
        logger(prefix + "\tIndex:", payload.index);
        logger(prefix + "\tTimestamp:", payload.timestamp);
        for (var i = 0; i < payload.parentMessageIds.length; i++) {
            logger(prefix + "\tParent " + (i + 1) + ":", payload.parentMessageIds[i]);
        }
        logger(prefix + "\tInclusion Merkle Proof:", payload.inclusionMerkleProof);
        logger(prefix + "\tPublic Keys:", payload.publicKeys);
        logger(prefix + "\tSignatures:", payload.signatures);
        logReceiptPayload(prefix + "\t", payload.receipt);
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
        logger(prefix + "Receipt Payload");
        logger(prefix + "\tMigrated At:", payload.migratedAt);
        logger(prefix + "\tFinal:", payload.final);
        logger(prefix + "\tFunds:", payload.funds.length);
        for (var _i = 0, _a = payload.funds; _i < _a.length; _i++) {
            var funds = _a[_i];
            logFunds(prefix + "\t\t", funds);
        }
        logTreasuryTransactionPayload(prefix + "\t\t", payload.transaction);
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
        logger(prefix + "Treasury Transaction Payload");
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
        var address = unknownAddress;
        logger(prefix + "Ed25519 Address");
        logger(prefix + "\tAddress:", address.address);
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
        var signature = unknownSignature;
        logger(prefix + "Ed25519 Signature");
        logger(prefix + "\tPublic Key:", signature.publicKey);
        logger(prefix + "\tSignature:", signature.signature);
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
            var input = unknownInput;
            logger(prefix + "UTXO Input");
            logger(prefix + "\tTransaction Id:", input.transactionId);
            logger(prefix + "\tTransaction Output Index:", input.transactionOutputIndex);
        }
        else if (unknownInput.type === ITreasuryInput_1.TREASURY_INPUT_TYPE) {
            var input = unknownInput;
            logger(prefix + "Treasury Input");
            logger(prefix + "\tMilestone Hash:", input.milestoneId);
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
            var output = unknownOutput;
            logger(prefix + "Signature Locked Single Output");
            logAddress(prefix + "\t\t", output.address);
            logger(prefix + "\t\tAmount:", output.amount);
        }
        else if (unknownOutput.type === ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            var output = unknownOutput;
            logger(prefix + "Signature Locked Dust Allowance Output");
            logAddress(prefix + "\t\t", output.address);
            logger(prefix + "\t\tAmount:", output.amount);
        }
        else if (unknownOutput.type === ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
            var output = unknownOutput;
            logger(prefix + "Treasury Output");
            logger(prefix + "\t\tAmount:", output.amount);
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
            var unlockBlock = unknownUnlockBlock;
            logger(prefix + "\tSignature Unlock Block");
            logSignature(prefix + "\t\t", unlockBlock.signature);
        }
        else if (unknownUnlockBlock.type === IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
            var unlockBlock = unknownUnlockBlock;
            logger(prefix + "\tReference Unlock Block");
            logger(prefix + "\t\tReference:", unlockBlock.reference);
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
        logger(prefix + "\tFund");
        logger(prefix + "\t\tTail Transaction Hash:", fund.tailTransactionHash);
        logAddress(prefix + "\t\t", fund.address);
        logger(prefix + "\t\tDeposit:", fund.deposit);
    }
}
exports.logFunds = logFunds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDZEQUFrRjtBQUNsRixpRUFBd0Y7QUFDeEYsbUVBQTJGO0FBSTNGLGlFQUF3RjtBQUV4Riw2REFBa0Y7QUFDbEYseUVBQXFHO0FBQ3JHLHlGQUErSDtBQUMvSCwyRUFBeUc7QUFDekcseUVBQXFHO0FBQ3JHLHFFQUF5RTtBQUN6RSxxRUFBOEY7QUFDOUYsMkRBQStFO0FBQy9FLDZEQUFrRjtBQUNsRixxRkFBdUg7QUFDdkgsbURBQW1FO0FBQ25FLHlDQUF3QztBQUV4Qzs7Ozs7R0FLRztBQUNILElBQUksTUFBTSxHQUE4QyxVQUFDLE9BQWUsRUFBRSxJQUFhO0lBQ25GLE9BQUEsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUF4RSxDQUF3RSxDQUFDO0FBRTdFOzs7R0FHRztBQUNILFNBQWdCLFNBQVMsQ0FBQyxHQUE4QztJQUNwRSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ2pCLENBQUM7QUFGRCw4QkFFQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixPQUFPLENBQUMsTUFBYyxFQUFFLElBQWU7SUFDbkQsTUFBTSxDQUFJLE1BQU0sWUFBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUksTUFBTSxlQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBSSxNQUFNLGtCQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sQ0FBSSxNQUFNLGtCQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pE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