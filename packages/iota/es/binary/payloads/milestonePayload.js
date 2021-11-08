// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import { Ed25519 } from "@iota/crypto.js";
import bigInt from "big-integer";
import { MILESTONE_PAYLOAD_TYPE } from "../../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../../models/payloads/IReceiptPayload";
import { MERKLE_PROOF_LENGTH, MESSAGE_ID_LENGTH, TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE, UINT8_SIZE } from "../commonDataTypes";
import { MAX_NUMBER_PARENTS, MIN_NUMBER_PARENTS } from "../message";
import { deserializePayload, serializePayload } from "./payloads";
/**
 * The minimum length of a milestone payload binary representation.
 */
export const MIN_MILESTONE_PAYLOAD_LENGTH = TYPE_LENGTH + // min payload
    UINT32_SIZE + // index
    UINT64_SIZE + // timestamp
    MESSAGE_ID_LENGTH + // parent 1
    MESSAGE_ID_LENGTH + // parent 2
    MERKLE_PROOF_LENGTH + // merkle proof
    2 * UINT32_SIZE + // Next pow score and pow score milestone index
    UINT8_SIZE + // publicKeysCount
    Ed25519.PUBLIC_KEY_SIZE + // 1 public key
    UINT8_SIZE + // signatureCount
    Ed25519.SIGNATURE_SIZE; // 1 signature
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlsZXN0b25lUGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZHMvbWlsZXN0b25lUGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBcUIsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRyxPQUFPLEVBQW1CLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDOUYsT0FBTyxFQUNILG1CQUFtQixFQUNuQixpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUMzQyxXQUFXLEVBQUUsVUFBVSxFQUMxQixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNwRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FDckMsV0FBVyxHQUFHLGNBQWM7SUFDNUIsV0FBVyxHQUFHLFFBQVE7SUFDdEIsV0FBVyxHQUFHLFlBQVk7SUFDMUIsaUJBQWlCLEdBQUcsV0FBVztJQUMvQixpQkFBaUIsR0FBRyxXQUFXO0lBQy9CLG1CQUFtQixHQUFHLGVBQWU7SUFDckMsQ0FBQyxHQUFHLFdBQVcsR0FBRywrQ0FBK0M7SUFDakUsVUFBVSxHQUFHLGtCQUFrQjtJQUMvQixPQUFPLENBQUMsZUFBZSxHQUFHLGVBQWU7SUFDekMsVUFBVSxHQUFHLGlCQUFpQjtJQUM5QixPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsY0FBYztBQUUxQzs7OztHQUlHO0FBQ0gsTUFBTSxV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