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
    logger(prefix + "\tMin PoW Score:", info.minPowScore);
    logger(prefix + "\tIs Healthy:", info.isHealthy);
    logger(prefix + "\tLatest Milestone Index:", info.latestMilestoneIndex);
    logger(prefix + "\tSolid Milestone Index:", info.solidMilestoneIndex);
    logger(prefix + "\tPruning Index:", info.pruningIndex);
    logger(prefix + "\tFeatures:", info.features);
}
exports.logInfo = logInfo;
/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tips The tips to log.
 */
function logTips(prefix, tips) {
    logger(prefix + "\tTip 1 Message Id:", tips.tip1MessageId);
    logger(prefix + "\tTip 2 Message Id:", tips.tip2MessageId);
}
exports.logTips = logTips;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
function logMessage(prefix, message) {
    logger(prefix + "\tNetwork Id:", message.networkId);
    logger(prefix + "\tParent 1 Message Id:", message.parent1MessageId);
    logger(prefix + "\tParent 2 Message Id:", message.parent2MessageId);
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
    logger(prefix + "\tParent 1 Message Id:", messageMetadata.parent1MessageId);
    logger(prefix + "\tParent 2 Message Id:", messageMetadata.parent2MessageId);
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
            logger(prefix + "\tParent 1:", payload.parent1MessageId);
            logger(prefix + "\tParent 2:", payload.parent2MessageId);
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
    if (unknownAddress) {
        if (unknownAddress.type === IEd25519Address_1.ED25519_ADDRESS_TYPE) {
            var address = unknownAddress;
            logger(prefix + "Ed25519 Address");
            logger(prefix + "\tAddress:", address.address);
        }
    }
}
exports.logAddress = logAddress;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
function logSignature(prefix, unknownSignature) {
    if (unknownSignature) {
        if (unknownSignature.type === IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
            var signature = unknownSignature;
            logger(prefix + "Ed25519 Signature");
            logger(prefix + "\tPublic Key:", signature.publicKey);
            logger(prefix + "\tSignature:", signature.signature);
        }
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
    if (unknownUnlockBlock) {
        if (unknownUnlockBlock.type === ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
            var unlockBlock = unknownUnlockBlock;
            logger(prefix + "\tSignature Unlock Block");
            logSignature(prefix + "\t\t\t", unlockBlock.signature);
        }
        else if (unknownUnlockBlock.type === IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
            var unlockBlock = unknownUnlockBlock;
            logger(prefix + "\tReference Unlock Block");
            logger(prefix + "\t\tReference:", unlockBlock.reference);
        }
    }
}
exports.logUnlockBlock = logUnlockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDZEQUFrRjtBQUNsRixpRUFBd0Y7QUFDeEYsbUVBQTJGO0FBRzNGLGlFQUF3RjtBQUV4Rix5RUFBcUc7QUFDckcseUZBQStIO0FBQy9ILDJFQUF5RztBQUN6Ryx5RUFBcUc7QUFDckcscUVBQXlFO0FBQ3pFLHFFQUE4RjtBQUU5RixtREFBbUU7QUFDbkUseUNBQXdDO0FBRXhDOzs7OztHQUtHO0FBQ0gsSUFBSSxNQUFNLEdBQThDLFVBQUMsT0FBZSxFQUFFLElBQWE7SUFDbkYsT0FBQSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQXhFLENBQXdFLENBQUM7QUFFN0U7OztHQUdHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLEdBQThDO0lBQ3BFLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDakIsQ0FBQztBQUZELDhCQUVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxNQUFjLEVBQUUsSUFBZTtJQUNuRCxNQUFNLENBQUksTUFBTSxZQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBSSxNQUFNLGVBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFJLE1BQU0sa0JBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFJLE1BQU0scUJBQWtCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBSSxNQUFNLGtCQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFD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