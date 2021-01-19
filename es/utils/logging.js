"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUnlockBlock = exports.logOutput = exports.logInput = exports.logSignature = exports.logAddress = exports.logPayload = exports.logMessageMetadata = exports.logMessage = exports.logTips = exports.logInfo = exports.setLogger = void 0;
var IEd25519Address_1 = require("../models/IEd25519Address");
var IEd25519Signature_1 = require("../models/IEd25519Signature");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IMilestonePayload_1 = require("../models/IMilestonePayload");
var IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
var ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var ITransactionPayload_1 = require("../models/ITransactionPayload");
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
    if (tipsResponse.tips) {
        for (var i = 0; i < tipsResponse.tips.length; i++) {
            logger(prefix + "\tTip " + (i + 1) + " Message Id:", tipsResponse.tips[i]);
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
    if (message.parents) {
        for (var i = 0; i < message.parents.length; i++) {
            logger(prefix + "\tParent " + (i + 1) + " Message Id:", message.parents[i]);
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
    if (messageMetadata.parents) {
        for (var i = 0; i < messageMetadata.parents.length; i++) {
            logger(prefix + "\tParent " + (i + 1) + " Message Id:", messageMetadata.parents[i]);
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
            var payload = unknownPayload;
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
                logPayload(prefix + "\t", payload.essence.payload);
            }
            if (payload.unlockBlocks) {
                logger(prefix + "\tUnlock Blocks:", payload.unlockBlocks.length);
                for (var _d = 0, _e = payload.unlockBlocks; _d < _e.length; _d++) {
                    var unlockBlock = _e[_d];
                    logUnlockBlock(prefix + "\t\t", unlockBlock);
                }
            }
        }
        else if (unknownPayload.type === IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
            var payload = unknownPayload;
            logger(prefix + "Milestone Payload");
            logger(prefix + "\tIndex:", payload.index);
            logger(prefix + "\tTimestamp:", payload.timestamp);
            for (var i = 0; i < payload.parents.length; i++) {
                logger(prefix + "\tParent " + (i + 1) + ":", payload.parents[i]);
            }
            logger(prefix + "\tInclusion Merkle Proof:", payload.inclusionMerkleProof);
            logger(prefix + "\tPublic Keys:", payload.publicKeys);
            logger(prefix + "\tSignatures:", payload.signatures);
        }
        else if (unknownPayload.type === IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
            var payload = unknownPayload;
            logger(prefix + "Indexation Payload");
            logger(prefix + "\tIndex:", payload.index);
            logger(prefix + "\tData:", payload.data ? converter_1.Converter.hexToUtf8(payload.data) : "None");
        }
    }
}
exports.logPayload = logPayload;
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
    if ((unknownInput === null || unknownInput === void 0 ? void 0 : unknownInput.type) === IUTXOInput_1.UTXO_INPUT_TYPE) {
        var input = unknownInput;
        logger(prefix + "UTXO Input");
        logger(prefix + "\tTransaction Id:", input.transactionId);
        logger(prefix + "\tTransaction Output Index:", input.transactionOutputIndex);
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
    }
}
exports.logOutput = logOutput;
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
function logUnlockBlock(prefix, unknownUnlockBlock) {
    if ((unknownUnlockBlock === null || unknownUnlockBlock === void 0 ? void 0 : unknownUnlockBlock.type) === ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
        var unlockBlock = unknownUnlockBlock;
        logger(prefix + "\tSignature Unlock Block");
        logSignature(prefix + "\t\t\t", unlockBlock.signature);
    }
    else if ((unknownUnlockBlock === null || unknownUnlockBlock === void 0 ? void 0 : unknownUnlockBlock.type) === IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
        var unlockBlock = unknownUnlockBlock;
        logger(prefix + "\tReference Unlock Block");
        logger(prefix + "\t\tReference:", unlockBlock.reference);
    }
}
exports.logUnlockBlock = logUnlockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDZEQUFrRjtBQUNsRixpRUFBd0Y7QUFDeEYsbUVBQTJGO0FBRzNGLGlFQUF3RjtBQUV4Rix5RUFBcUc7QUFDckcseUZBQStIO0FBQy9ILDJFQUF5RztBQUN6Ryx5RUFBcUc7QUFDckcscUVBQXlFO0FBQ3pFLHFFQUE4RjtBQUU5RixtREFBbUU7QUFDbkUseUNBQXdDO0FBRXhDOzs7OztHQUtHO0FBQ0gsSUFBSSxNQUFNLEdBQThDLFVBQUMsT0FBZSxFQUFFLElBQWE7SUFDbkYsT0FBQSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQXhFLENBQXdFLENBQUM7QUFFN0U7OztHQUdHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLEdBQThDO0lBQ3BFLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDakIsQ0FBQztBQUZELDhCQUVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxNQUFjLEVBQUUsSUFBZTtJQUNuRCxNQUFNLENBQUksTUFBTSxZQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBSSxNQUFNLGVBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFJLE1BQU0sa0JBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFJLE1BQU0sa0JBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFJLE1BQU0scUJBQWtCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFD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