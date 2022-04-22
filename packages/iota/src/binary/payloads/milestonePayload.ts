// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import type { ReadStream, WriteStream } from "@iota/util.js";
import { HexHelper } from "@iota/util.js";
import { IMilestonePayload, MILESTONE_PAYLOAD_TYPE } from "../../models/payloads/IMilestonePayload";
import {
    MERKLE_PROOF_LENGTH,
    MESSAGE_ID_LENGTH,
    TYPE_LENGTH,
    UINT8_SIZE,
    UINT16_SIZE,
    UINT32_SIZE
} from "../commonDataTypes";
import { MAX_NUMBER_PARENTS, MIN_NUMBER_PARENTS } from "../message";
import { MIN_ED25519_SIGNATURE_LENGTH } from "../signatures/ed25519Signature";
import { deserializeSignature, serializeSignature } from "../signatures/signatures";
import { deserializeMilestoneOptions, serializeMilestoneOptions } from "../milestoneOptions/milestoneOptions";

/**
 * The minimum length of a milestone payload binary representation.
 */
export const MIN_MILESTONE_PAYLOAD_LENGTH: number =
    TYPE_LENGTH + // min payload
    UINT32_SIZE + // index
    UINT32_SIZE + // timestamp
    MESSAGE_ID_LENGTH + // last milestone id
    MESSAGE_ID_LENGTH + // parent 1
    MESSAGE_ID_LENGTH + // parent 2
    2 * MERKLE_PROOF_LENGTH + // merkle proof
    UINT8_SIZE + // optionsCount
    UINT16_SIZE + // metadata
    UINT8_SIZE + // signatureCount
    MIN_ED25519_SIGNATURE_LENGTH; // 1 signature

/**
 * Deserialize the milestone payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMilestonePayload(readStream: ReadStream): IMilestonePayload {
    if (!readStream.hasRemaining(MIN_MILESTONE_PAYLOAD_LENGTH)) {
        throw new Error(
            `Milestone Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MILESTONE_PAYLOAD_LENGTH}`
        );
    }

    const type = readStream.readUInt32("payloadMilestone.type");
    if (type !== MILESTONE_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadMilestone ${type}`);
    }
    const index = readStream.readUInt32("payloadMilestone.index");
    const timestamp = readStream.readUInt32("payloadMilestone.timestamp");
    const lastMilestoneId = readStream.readFixedHex("payloadMilestone.lastMilestoneId", MESSAGE_ID_LENGTH);
    const numParents = readStream.readUInt8("payloadMilestone.numParents");
    const parentMessageIds: string[] = [];

    for (let i = 0; i < numParents; i++) {
        const parentMessageId = readStream.readFixedHex(`payloadMilestone.parentMessageId${i + 1}`, MESSAGE_ID_LENGTH);
        parentMessageIds.push(parentMessageId);
    }

    const confirmedMerkleRoot = readStream.readFixedHex("payloadMilestone.confirmedMerkleRoot", MERKLE_PROOF_LENGTH);
    const appliedMerkleRoot = readStream.readFixedHex("payloadMilestone.appliedMerkleRoot", MERKLE_PROOF_LENGTH);

    const metadataLength = readStream.readUInt16("payloadMilestone.metadataLength");
    const metadata = readStream.readFixedHex("payloadMilestone.metadata", metadataLength);

    const options = deserializeMilestoneOptions(readStream);

    const signaturesCount = readStream.readUInt8("payloadMilestone.signaturesCount");
    const signatures = [];
    for (let i = 0; i < signaturesCount; i++) {
        signatures.push(deserializeSignature(readStream));
    }

    return {
        type: MILESTONE_PAYLOAD_TYPE,
        index,
        timestamp: Number(timestamp),
        lastMilestoneId,
        parentMessageIds,
        confirmedMerkleRoot,
        appliedMerkleRoot,
        metadata,
        options,
        signatures
    };
}

/**
 * Serialize the milestone payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMilestonePayload(writeStream: WriteStream, object: IMilestonePayload): void {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    writeStream.writeUInt32("payloadMilestone.index", object.index);
    writeStream.writeUInt32("payloadMilestone.timestamp", object.timestamp);

    writeStream.writeFixedHex(
        "payloadMilestone.lastMilestoneId",
        MESSAGE_ID_LENGTH,
        object.lastMilestoneId
    );

    if (object.parentMessageIds.length < MIN_NUMBER_PARENTS) {
        throw new Error(
            `A minimum of ${MIN_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`
        );
    }
    if (object.parentMessageIds.length > MAX_NUMBER_PARENTS) {
        throw new Error(
            `A maximum of ${MAX_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`
        );
    }
    if (new Set(object.parentMessageIds).size !== object.parentMessageIds.length) {
        throw new Error("The milestone parents must be unique");
    }
    const sorted = object.parentMessageIds.slice().sort();

    writeStream.writeUInt8("payloadMilestone.numParents", object.parentMessageIds.length);
    for (let i = 0; i < object.parentMessageIds.length; i++) {
        if (sorted[i] !== object.parentMessageIds[i]) {
            throw new Error("The milestone parents must be lexographically sorted");
        }

        writeStream.writeFixedHex(
            `payloadMilestone.parentMessageId${i + 1}`,
            MESSAGE_ID_LENGTH,
            object.parentMessageIds[i]
        );
    }

    writeStream.writeFixedHex(
        "payloadMilestone.confirmedMerkleRoot",
        MERKLE_PROOF_LENGTH,
        object.confirmedMerkleRoot
    );
    
    writeStream.writeFixedHex(
        "payloadMilestone.appliedMerkleRoot",
        MERKLE_PROOF_LENGTH,
        object.appliedMerkleRoot
    );

    if (object.metadata) {
        const metadata = HexHelper.stripPrefix(object.metadata);
        writeStream.writeUInt16("payloadMilestone.metadataLength", metadata.length / 2);
        if (metadata.length > 0) {
            writeStream.writeFixedHex("payloadMilestone.metadata", metadata.length / 2, metadata);
        }
    } else {
        writeStream.writeUInt16("payloadMilestone.metadataLength", 0);
    }

    serializeMilestoneOptions(writeStream, object.options);
    
    writeStream.writeUInt8("payloadMilestone.signaturesCount", object.signatures.length);
    for (let i = 0; i < object.signatures.length; i++) {
        serializeSignature(writeStream, object.signatures[i]);
    }
}
