"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUnlockBlock = exports.logOutput = exports.logInput = exports.logSignature = exports.logAddress = exports.logPayload = exports.logMessageMetadata = exports.logMessage = exports.logTips = exports.logInfo = exports.setLogger = void 0;
var IEd25519Address_1 = require("../models/IEd25519Address");
var IEd25519Signature_1 = require("../models/IEd25519Signature");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IMilestonePayload_1 = require("../models/IMilestonePayload");
var IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
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
            logger(prefix + "\tData:", converter_1.Converter.hexToAscii(payload.data));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDZEQUFrRjtBQUNsRixpRUFBd0Y7QUFDeEYsbUVBQTJGO0FBRzNGLGlFQUF3RjtBQUV4Rix5RUFBcUc7QUFDckcsMkVBQXlHO0FBQ3pHLHlFQUFxRztBQUNyRyxxRUFBeUU7QUFDekUscUVBQThGO0FBRTlGLG1EQUFtRTtBQUNuRSx5Q0FBd0M7QUFFeEM7Ozs7O0dBS0c7QUFDSCxJQUFJLE1BQU0sR0FBOEMsVUFBQyxPQUFlLEVBQUUsSUFBYTtJQUNuRixPQUFBLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFBeEUsQ0FBd0UsQ0FBQztBQUU3RTs7O0dBR0c7QUFDSCxTQUFnQixTQUFTLENBQUMsR0FBOEM7SUFDcEUsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNqQixDQUFDO0FBRkQsOEJBRUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLE1BQWMsRUFBRSxJQUFlO0lBQ25ELE1BQU0sQ0FBSSxNQUFNLFlBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFJLE1BQU0sZUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUksTUFBTSxrQkFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUksTUFBTSxrQkFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUksTUFBTSw4QkFBMkIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4RSxNQUFN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