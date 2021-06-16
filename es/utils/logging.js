import { ED25519_ADDRESS_TYPE } from "../models/IEd25519Address";
import { ED25519_SIGNATURE_TYPE } from "../models/IEd25519Signature";
import { INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { MILESTONE_PAYLOAD_TYPE } from "../models/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../models/IReceiptPayload";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/IReferenceUnlockBlock";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/ISigLockedDustAllowanceOutput";
import { SIG_LOCKED_SINGLE_OUTPUT_TYPE } from "../models/ISigLockedSingleOutput";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/ISignatureUnlockBlock";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/ITransactionPayload";
import { TREASURY_INPUT_TYPE } from "../models/ITreasuryInput";
import { TREASURY_OUTPUT_TYPE } from "../models/ITreasuryOutput";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../models/ITreasuryTransactionPayload";
import { UTXO_INPUT_TYPE } from "../models/IUTXOInput";
import { Converter } from "./converter";
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
 * @param unknownPayload The payload.
 */
export function logPayload(prefix, unknownPayload) {
    if (unknownPayload) {
        if (unknownPayload.type === TRANSACTION_PAYLOAD_TYPE) {
            logTransactionPayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === MILESTONE_PAYLOAD_TYPE) {
            logMilestonePayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === INDEXATION_PAYLOAD_TYPE) {
            logIndexationPayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === RECEIPT_PAYLOAD_TYPE) {
            logReceiptPayload(prefix, unknownPayload);
        }
        else if (unknownPayload.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            logTreasuryTransactionPayload(prefix, unknownPayload);
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
 * @param unknownAddress The address to log.
 */
export function logAddress(prefix, unknownAddress) {
    if ((unknownAddress === null || unknownAddress === void 0 ? void 0 : unknownAddress.type) === ED25519_ADDRESS_TYPE) {
        const address = unknownAddress;
        logger(`${prefix}Ed25519 Address`);
        logger(`${prefix}\tAddress:`, address.address);
    }
}
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
export function logSignature(prefix, unknownSignature) {
    if ((unknownSignature === null || unknownSignature === void 0 ? void 0 : unknownSignature.type) === ED25519_SIGNATURE_TYPE) {
        const signature = unknownSignature;
        logger(`${prefix}Ed25519 Signature`);
        logger(`${prefix}\tPublic Key:`, signature.publicKey);
        logger(`${prefix}\tSignature:`, signature.signature);
    }
}
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
export function logInput(prefix, unknownInput) {
    if (unknownInput) {
        if (unknownInput.type === UTXO_INPUT_TYPE) {
            const input = unknownInput;
            logger(`${prefix}UTXO Input`);
            logger(`${prefix}\tTransaction Id:`, input.transactionId);
            logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
        }
        else if (unknownInput.type === TREASURY_INPUT_TYPE) {
            const input = unknownInput;
            logger(`${prefix}Treasury Input`);
            logger(`${prefix}\tMilestone Hash:`, input.milestoneId);
        }
    }
}
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
export function logOutput(prefix, unknownOutput) {
    if (unknownOutput) {
        if (unknownOutput.type === SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
            const output = unknownOutput;
            logger(`${prefix}Signature Locked Single Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
        else if (unknownOutput.type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            const output = unknownOutput;
            logger(`${prefix}Signature Locked Dust Allowance Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
        else if (unknownOutput.type === TREASURY_OUTPUT_TYPE) {
            const output = unknownOutput;
            logger(`${prefix}Treasury Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
    }
}
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
export function logUnlockBlock(prefix, unknownUnlockBlock) {
    if (unknownUnlockBlock) {
        if (unknownUnlockBlock.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
            const unlockBlock = unknownUnlockBlock;
            logger(`${prefix}\tSignature Unlock Block`);
            logSignature(`${prefix}\t\t`, unlockBlock.signature);
        }
        else if (unknownUnlockBlock.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
            const unlockBlock = unknownUnlockBlock;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxvQkFBb0IsRUFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUUsc0JBQXNCLEVBQXFCLE1BQU0sNkJBQTZCLENBQUM7QUFDeEYsT0FBTyxFQUFzQix1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBSTNGLE9BQU8sRUFBcUIsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV4RixPQUFPLEVBQW1CLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEYsT0FBTyxFQUF5QiwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JHLE9BQU8sRUFBaUMscUNBQXFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvSCxPQUFPLEVBQTBCLDZCQUE2QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekcsT0FBTyxFQUF5QiwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBdUIsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RixPQUFPLEVBQWtCLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0UsT0FBTyxFQUFtQixvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sRUFBK0IsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2SCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4Qzs7Ozs7R0FLRztBQUNILElBQUksTUFBTSxHQUE4QyxDQUFDLE9BQWUsRUFBRSxJQUFhLEVBQUUs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