// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import { Ed25519 } from "@iota/crypto.js";
import bigInt from "big-integer";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { INDEXATION_PAYLOAD_TYPE } from "../models/payloads/IIndexationPayload";
import { MILESTONE_PAYLOAD_TYPE } from "../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../models/payloads/IReceiptPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITreasuryTransactionPayload";
import { BYTE_SIZE, MERKLE_PROOF_LENGTH, MESSAGE_ID_LENGTH, STRING_LENGTH, TYPE_LENGTH, UINT16_SIZE, UINT32_SIZE, UINT64_SIZE } from "./common";
import { deserializeFunds, MIN_MIGRATED_FUNDS_LENGTH, serializeFunds } from "./funds";
import { deserializeTreasuryInput, MIN_TREASURY_INPUT_LENGTH, serializeTreasuryInput } from "./input";
import { MAX_NUMBER_PARENTS, MIN_NUMBER_PARENTS } from "./message";
import { deserializeTreasuryOutput, MIN_TREASURY_OUTPUT_LENGTH, serializeTreasuryOutput } from "./output";
import { deserializeTransactionEssence, serializeTransactionEssence } from "./transaction";
import { deserializeUnlockBlocks, serializeUnlockBlocks } from "./unlockBlock";
/**
 * The minimum length of a payload binary representation.
 */
export const MIN_PAYLOAD_LENGTH = TYPE_LENGTH;
/**
 * The minimum length of a milestone payload binary representation.
 */
export const MIN_MILESTONE_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH + // min payload
    UINT32_SIZE + // index
    UINT64_SIZE + // timestamp
    MESSAGE_ID_LENGTH + // parent 1
    MESSAGE_ID_LENGTH + // parent 2
    MERKLE_PROOF_LENGTH + // merkle proof
    2 * UINT32_SIZE + // Next pow score and pow score milestone index
    BYTE_SIZE + // publicKeysCount
    Ed25519.PUBLIC_KEY_SIZE + // 1 public key
    BYTE_SIZE + // signatureCount
    Ed25519.SIGNATURE_SIZE; // 1 signature
/**
 * The minimum length of an indexation payload binary representation.
 */
export const MIN_INDEXATION_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH + // min payload
    STRING_LENGTH + // index length
    1 + // index min 1 byte
    STRING_LENGTH; // data length
/**
 * The minimum length of a transaction payload binary representation.
 */
export const MIN_TRANSACTION_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH + // min payload
    UINT32_SIZE; // essence type
/**
 * The minimum length of a receipt payload binary representation.
 */
export const MIN_RECEIPT_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH +
    UINT32_SIZE + // migratedAt
    UINT16_SIZE + // numFunds
    MIN_MIGRATED_FUNDS_LENGTH; // 1 Fund
/**
 * The minimum length of a treasure transaction payload binary representation.
 */
export const MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH + MIN_TREASURY_INPUT_LENGTH + MIN_TREASURY_OUTPUT_LENGTH;
/**
 * The minimum length of a indexation key.
 */
export const MIN_INDEXATION_KEY_LENGTH = 1;
/**
 * The maximum length of a indexation key.
 */
export const MAX_INDEXATION_KEY_LENGTH = 64;
/**
 * Deserialize the payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializePayload(readStream) {
    const payloadLength = readStream.readUInt32("payload.length");
    if (!readStream.hasRemaining(payloadLength)) {
        throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readStream.unused()}`);
    }
    let payload;
    if (payloadLength > 0) {
        const payloadType = readStream.readUInt32("payload.type", false);
        if (payloadType === TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTransactionPayload(readStream);
        }
        else if (payloadType === MILESTONE_PAYLOAD_TYPE) {
            payload = deserializeMilestonePayload(readStream);
        }
        else if (payloadType === INDEXATION_PAYLOAD_TYPE) {
            payload = deserializeIndexationPayload(readStream);
        }
        else if (payloadType === RECEIPT_PAYLOAD_TYPE) {
            payload = deserializeReceiptPayload(readStream);
        }
        else if (payloadType === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTreasuryTransactionPayload(readStream);
        }
        else {
            throw new Error(`Unrecognized payload type ${payloadType}`);
        }
    }
    return payload;
}
/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializePayload(writeStream, object) {
    // Store the location for the payload length and write 0
    // we will rewind and fill in once the size of the payload is known
    const payloadLengthWriteIndex = writeStream.getWriteIndex();
    writeStream.writeUInt32("payload.length", 0);
    if (!object) {
        // No other data to write
    }
    else if (object.type === TRANSACTION_PAYLOAD_TYPE) {
        serializeTransactionPayload(writeStream, object);
    }
    else if (object.type === MILESTONE_PAYLOAD_TYPE) {
        serializeMilestonePayload(writeStream, object);
    }
    else if (object.type === INDEXATION_PAYLOAD_TYPE) {
        serializeIndexationPayload(writeStream, object);
    }
    else if (object.type === RECEIPT_PAYLOAD_TYPE) {
        serializeReceiptPayload(writeStream, object);
    }
    else if (object.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        serializeTreasuryTransactionPayload(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
    const endOfPayloadWriteIndex = writeStream.getWriteIndex();
    writeStream.setWriteIndex(payloadLengthWriteIndex);
    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
    writeStream.setWriteIndex(endOfPayloadWriteIndex);
}
/**
 * Deserialize the transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionPayload(readStream) {
    if (!readStream.hasRemaining(MIN_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadTransaction.type");
    if (type !== TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTransaction ${type}`);
    }
    const essenceType = readStream.readByte("payloadTransaction.essenceType", false);
    let essence;
    let unlockBlocks;
    if (essenceType === TRANSACTION_ESSENCE_TYPE) {
        essence = deserializeTransactionEssence(readStream);
        unlockBlocks = deserializeUnlockBlocks(readStream);
    }
    else {
        throw new Error(`Unrecognized transaction essence type ${type}`);
    }
    return {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence,
        unlockBlocks
    };
}
/**
 * Serialize the transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionPayload(writeStream, object) {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    if (object.type === TRANSACTION_PAYLOAD_TYPE) {
        serializeTransactionEssence(writeStream, object.essence);
        serializeUnlockBlocks(writeStream, object.unlockBlocks);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
}
/**
 * Deserialize the milestone payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMilestonePayload(readStream) {
    if (!readStream.hasRemaining(MIN_MILESTONE_PAYLOAD_LENGTH)) {
        throw new Error(`Milestone Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MILESTONE_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadMilestone.type");
    if (type !== MILESTONE_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadMilestone ${type}`);
    }
    const index = readStream.readUInt32("payloadMilestone.index");
    const timestamp = readStream.readUInt64("payloadMilestone.timestamp");
    const numParents = readStream.readByte("payloadMilestone.numParents");
    const parentMessageIds = [];
    for (let i = 0; i < numParents; i++) {
        const parentMessageId = readStream.readFixedHex(`payloadMilestone.parentMessageId${i + 1}`, MESSAGE_ID_LENGTH);
        parentMessageIds.push(parentMessageId);
    }
    const inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", MERKLE_PROOF_LENGTH);
    const nextPoWScore = readStream.readUInt32("payloadMilestone.nextPoWScore");
    const nextPoWScoreMilestoneIndex = readStream.readUInt32("payloadMilestone.nextPoWScoreMilestoneIndex");
    const publicKeysCount = readStream.readByte("payloadMilestone.publicKeysCount");
    const publicKeys = [];
    for (let i = 0; i < publicKeysCount; i++) {
        publicKeys.push(readStream.readFixedHex("payloadMilestone.publicKey", Ed25519.PUBLIC_KEY_SIZE));
    }
    const receipt = deserializePayload(readStream);
    if (receipt && receipt.type !== RECEIPT_PAYLOAD_TYPE) {
        throw new Error("Milestones only support embedded receipt payload type");
    }
    const signaturesCount = readStream.readByte("payloadMilestone.signaturesCount");
    const signatures = [];
    for (let i = 0; i < signaturesCount; i++) {
        signatures.push(readStream.readFixedHex("payloadMilestone.signature", Ed25519.SIGNATURE_SIZE));
    }
    return {
        type: MILESTONE_PAYLOAD_TYPE,
        index,
        timestamp: Number(timestamp),
        parentMessageIds,
        inclusionMerkleProof,
        nextPoWScore,
        nextPoWScoreMilestoneIndex,
        publicKeys,
        receipt,
        signatures
    };
}
/**
 * Serialize the milestone payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMilestonePayload(writeStream, object) {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    writeStream.writeUInt32("payloadMilestone.index", object.index);
    writeStream.writeUInt64("payloadMilestone.timestamp", bigInt(object.timestamp));
    if (object.parentMessageIds.length < MIN_NUMBER_PARENTS) {
        throw new Error(`A minimum of ${MIN_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`);
    }
    if (object.parentMessageIds.length > MAX_NUMBER_PARENTS) {
        throw new Error(`A maximum of ${MAX_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`);
    }
    if (new Set(object.parentMessageIds).size !== object.parentMessageIds.length) {
        throw new Error("The milestone parents must be unique");
    }
    const sorted = object.parentMessageIds.slice().sort();
    writeStream.writeByte("payloadMilestone.numParents", object.parentMessageIds.length);
    for (let i = 0; i < object.parentMessageIds.length; i++) {
        if (sorted[i] !== object.parentMessageIds[i]) {
            throw new Error("The milestone parents must be lexographically sorted");
        }
        writeStream.writeFixedHex(`payloadMilestone.parentMessageId${i + 1}`, MESSAGE_ID_LENGTH, object.parentMessageIds[i]);
    }
    writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", MERKLE_PROOF_LENGTH, object.inclusionMerkleProof);
    writeStream.writeUInt32("payloadMilestone.nextPoWScore", object.nextPoWScore);
    writeStream.writeUInt32("payloadMilestone.nextPoWScoreMilestoneIndex", object.nextPoWScoreMilestoneIndex);
    writeStream.writeByte("payloadMilestone.publicKeysCount", object.publicKeys.length);
    for (let i = 0; i < object.publicKeys.length; i++) {
        writeStream.writeFixedHex("payloadMilestone.publicKey", Ed25519.PUBLIC_KEY_SIZE, object.publicKeys[i]);
    }
    serializePayload(writeStream, object.receipt);
    writeStream.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
    for (let i = 0; i < object.signatures.length; i++) {
        writeStream.writeFixedHex("payloadMilestone.signature", Ed25519.SIGNATURE_SIZE, object.signatures[i]);
    }
}
/**
 * Deserialize the indexation payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIndexationPayload(readStream) {
    if (!readStream.hasRemaining(MIN_INDEXATION_PAYLOAD_LENGTH)) {
        throw new Error(`Indexation Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INDEXATION_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadIndexation.type");
    if (type !== INDEXATION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadIndexation ${type}`);
    }
    const indexLength = readStream.readUInt16("payloadIndexation.indexLength");
    const index = readStream.readFixedHex("payloadIndexation.index", indexLength);
    const dataLength = readStream.readUInt32("payloadIndexation.dataLength");
    const data = readStream.readFixedHex("payloadIndexation.data", dataLength);
    return {
        type: INDEXATION_PAYLOAD_TYPE,
        index,
        data
    };
}
/**
 * Serialize the indexation payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeIndexationPayload(writeStream, object) {
    if (object.index.length < MIN_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${object.index.length}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
    }
    if (object.index.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${object.index.length / 2}, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
    }
    writeStream.writeUInt32("payloadIndexation.type", object.type);
    writeStream.writeUInt16("payloadIndexation.indexLength", object.index.length / 2);
    writeStream.writeFixedHex("payloadIndexation.index", object.index.length / 2, object.index);
    if (object.data) {
        writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
        writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
    }
    else {
        writeStream.writeUInt32("payloadIndexation.dataLength", 0);
    }
}
/**
 * Deserialize the receipt payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReceiptPayload(readStream) {
    if (!readStream.hasRemaining(MIN_RECEIPT_PAYLOAD_LENGTH)) {
        throw new Error(`Receipt Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_RECEIPT_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadReceipt.type");
    if (type !== RECEIPT_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadReceipt ${type}`);
    }
    const migratedAt = readStream.readUInt32("payloadReceipt.migratedAt");
    const final = readStream.readBoolean("payloadReceipt.final");
    const funds = deserializeFunds(readStream);
    const treasuryTransactionPayload = deserializePayload(readStream);
    if (!treasuryTransactionPayload || treasuryTransactionPayload.type !== TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`payloadReceipts can only contain treasury payloads ${type}`);
    }
    return {
        type: RECEIPT_PAYLOAD_TYPE,
        migratedAt,
        final,
        funds,
        transaction: treasuryTransactionPayload
    };
}
/**
 * Serialize the receipt payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReceiptPayload(writeStream, object) {
    writeStream.writeUInt32("payloadReceipt.type", object.type);
    writeStream.writeUInt32("payloadReceipt.migratedAt", object.migratedAt);
    writeStream.writeBoolean("payloadReceipt.final", object.final);
    serializeFunds(writeStream, object.funds);
    serializePayload(writeStream, object.transaction);
}
/**
 * Deserialize the treasury transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTreasuryTransactionPayload(readStream) {
    if (!readStream.hasRemaining(MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Treasure Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadTreasuryTransaction.type");
    if (type !== TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTreasuryTransaction ${type}`);
    }
    const input = deserializeTreasuryInput(readStream);
    const output = deserializeTreasuryOutput(readStream);
    return {
        type: TREASURY_TRANSACTION_PAYLOAD_TYPE,
        input,
        output
    };
}
/**
 * Serialize the treasury transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTreasuryTransactionPayload(writeStream, object) {
    writeStream.writeUInt32("payloadTreasuryTransaction.type", object.type);
    serializeTreasuryInput(writeStream, object.input);
    serializeTreasuryOutput(writeStream, object.output);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFLE9BQU8sRUFBc0IsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRyxPQUFPLEVBQXFCLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDakcsT0FBTyxFQUFtQixvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNGLE9BQU8sRUFBdUIsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN2RyxPQUFPLEVBQStCLGlDQUFpQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFaEksT0FBTyxFQUNILFNBQVMsRUFDVCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixXQUFXLEVBQ1gsV0FBVyxFQUNYLFdBQVcsRUFDWCxXQUFXLEVBQ2QsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHlCQUF5QixFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDdEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25FLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUs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