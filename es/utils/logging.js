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
    logger(prefix + "\tSolid Milestone Index:", info.solidMilestoneIndex);
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
        logger(prefix + "\tIndex:", payload.index);
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
            logger(prefix + "\tMilestone Hash:", input.milestoneHash);
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