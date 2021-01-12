// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ITipsResponse } from "../models/api/ITipsResponse";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../models/IEd25519Address";
import { ED25519_SIGNATURE_TYPE, IEd25519Signature } from "../models/IEd25519Signature";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { IMessage } from "../models/IMessage";
import { IMessageMetadata } from "../models/IMessageMetadata";
import { IMilestonePayload, MILESTONE_PAYLOAD_TYPE } from "../models/IMilestonePayload";
import { INodeInfo } from "../models/INodeInfo";
import { IReferenceUnlockBlock, REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/IReferenceUnlockBlock";
import { ISigLockedDustAllowanceOutput, SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/ISigLockedDustAllowanceOutput";
import { ISigLockedSingleOutput, SIG_LOCKED_SINGLE_OUTPUT_TYPE } from "../models/ISigLockedSingleOutput";
import { ISignatureUnlockBlock, SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/ISignatureUnlockBlock";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../models/ITransactionPayload";
import { ITypeBase } from "../models/ITypeBase";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../models/IUTXOInput";
import { Converter } from "./converter";

/**
 * The logger used by the log methods.
 * @param message The message to output.
 * @param data The data to output.
 * @returns Nothing.
 */
let logger: (message: string, data?: unknown) => void = (message: string, data: unknown) =>
    (data !== undefined ? console.log(message, data) : console.log(message));

/**
 * Set the logger for output.
 * @param log The logger.
 */
export function setLogger(log: (message: string, data?: unknown) => void): void {
    logger = log;
}

/**
 * Log the node information.
 * @param prefix The prefix for the output.
 * @param info The info to log.
 */
export function logInfo(prefix: string, info: INodeInfo): void {
    logger(`${prefix}\tName:`, info.name);
    logger(`${prefix}\tVersion:`, info.version);
    logger(`${prefix}\tNetwork Id:`, info.networkId);
    logger(`${prefix}\tMin PoW Score:`, info.minPowScore);
    logger(`${prefix}\tIs Healthy:`, info.isHealthy);
    logger(`${prefix}\tLatest Milestone Index:`, info.latestMilestoneIndex);
    logger(`${prefix}\tSolid Milestone Index:`, info.solidMilestoneIndex);
    logger(`${prefix}\tPruning Index:`, info.pruningIndex);
    logger(`${prefix}\tFeatures:`, info.features);
}

/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tips The tips to log.
 */
export function logTips(prefix: string, tips: ITipsResponse): void {
    logger(`${prefix}\tTip 1 Message Id:`, tips.tip1MessageId);
    logger(`${prefix}\tTip 2 Message Id:`, tips.tip2MessageId);
}

/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
export function logMessage(prefix: string, message: IMessage): void {
    logger(`${prefix}\tNetwork Id:`, message.networkId);
    logger(`${prefix}\tParent 1 Message Id:`, message.parent1MessageId);
    logger(`${prefix}\tParent 2 Message Id:`, message.parent2MessageId);
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
export function logMessageMetadata(prefix: string, messageMetadata: IMessageMetadata): void {
    logger(`${prefix}\tMessage Id:`, messageMetadata.messageId);
    logger(`${prefix}\tParent 1 Message Id:`, messageMetadata.parent1MessageId);
    logger(`${prefix}\tParent 2 Message Id:`, messageMetadata.parent2MessageId);
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
export function logPayload(prefix: string, unknownPayload?: ITypeBase<unknown>): void {
    if (unknownPayload) {
        if (unknownPayload.type === TRANSACTION_PAYLOAD_TYPE) {
            const payload = unknownPayload as ITransactionPayload;
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
                logPayload(`${prefix}\t`, payload.essence.payload);
            }
            if (payload.unlockBlocks) {
                logger(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
                for (const unlockBlock of payload.unlockBlocks) {
                    logUnlockBlock(`${prefix}\t\t`, unlockBlock);
                }
            }
        } else if (unknownPayload.type === MILESTONE_PAYLOAD_TYPE) {
            const payload = unknownPayload as IMilestonePayload;
            logger(`${prefix}Milestone Payload`);
            logger(`${prefix}\tIndex:`, payload.index);
            logger(`${prefix}\tTimestamp:`, payload.timestamp);
            logger(`${prefix}\tParent 1:`, payload.parent1MessageId);
            logger(`${prefix}\tParent 2:`, payload.parent2MessageId);
            logger(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
            logger(`${prefix}\tPublic Keys:`, payload.publicKeys);
            logger(`${prefix}\tSignatures:`, payload.signatures);
        } else if (unknownPayload.type === INDEXATION_PAYLOAD_TYPE) {
            const payload = unknownPayload as IIndexationPayload;
            logger(`${prefix}Indexation Payload`);
            logger(`${prefix}\tIndex:`, payload.index);
            logger(`${prefix}\tData:`, payload.data ? Converter.hexToAscii(payload.data) : "None");
        }
    }
}

/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param unknownAddress The address to log.
 */
export function logAddress(prefix: string, unknownAddress?: ITypeBase<unknown>): void {
    if (unknownAddress) {
        if (unknownAddress.type === ED25519_ADDRESS_TYPE) {
            const address = unknownAddress as IEd25519Address;
            logger(`${prefix}Ed25519 Address`);
            logger(`${prefix}\tAddress:`, address.address);
        }
    }
}

/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
export function logSignature(prefix: string, unknownSignature?: ITypeBase<unknown>): void {
    if (unknownSignature) {
        if (unknownSignature.type === ED25519_SIGNATURE_TYPE) {
            const signature = unknownSignature as IEd25519Signature;
            logger(`${prefix}Ed25519 Signature`);
            logger(`${prefix}\tPublic Key:`, signature.publicKey);
            logger(`${prefix}\tSignature:`, signature.signature);
        }
    }
}

/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
export function logInput(prefix: string, unknownInput?: ITypeBase<unknown>): void {
    if (unknownInput) {
        if (unknownInput.type === UTXO_INPUT_TYPE) {
            const input = unknownInput as IUTXOInput;
            logger(`${prefix}UTXO Input`);
            logger(`${prefix}\tTransaction Id:`, input.transactionId);
            logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
        }
    }
}

/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
export function logOutput(prefix: string, unknownOutput?: ITypeBase<unknown>): void {
    if (unknownOutput) {
        if (unknownOutput.type === SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
            const output = unknownOutput as ISigLockedSingleOutput;
            logger(`${prefix}Signature Locked Single Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        } else if (unknownOutput.type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            const output = unknownOutput as ISigLockedDustAllowanceOutput;
            logger(`${prefix}Signature Locked Dust Allowance Output`);
            logAddress(`${prefix}\t\t`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
        }
    }
}

/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
export function logUnlockBlock(prefix: string, unknownUnlockBlock?: ITypeBase<unknown>): void {
    if (unknownUnlockBlock) {
        if (unknownUnlockBlock.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
            const unlockBlock = unknownUnlockBlock as ISignatureUnlockBlock;
            logger(`${prefix}\tSignature Unlock Block`);
            logSignature(`${prefix}\t\t\t`, unlockBlock.signature);
        } else if (unknownUnlockBlock.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
            const unlockBlock = unknownUnlockBlock as IReferenceUnlockBlock;
            logger(`${prefix}\tReference Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
    }
}
