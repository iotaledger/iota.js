"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTreasuryTransactionPayload = exports.deserializeTreasuryTransactionPayload = exports.serializeReceiptPayload = exports.deserializeReceiptPayload = exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MAX_INDEXATION_KEY_LENGTH = exports.MIN_INDEXATION_KEY_LENGTH = exports.MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_RECEIPT_PAYLOAD_LENGTH = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const ed25519_1 = require("../crypto/ed25519");
const IIndexationPayload_1 = require("../models/IIndexationPayload");
const IMilestonePayload_1 = require("../models/IMilestonePayload");
const IReceiptPayload_1 = require("../models/IReceiptPayload");
const ITransactionEssence_1 = require("../models/ITransactionEssence");
const ITransactionPayload_1 = require("../models/ITransactionPayload");
const ITreasuryTransactionPayload_1 = require("../models/ITreasuryTransactionPayload");
const common_1 = require("./common");
const funds_1 = require("./funds");
const input_1 = require("./input");
const message_1 = require("./message");
const output_1 = require("./output");
const transaction_1 = require("./transaction");
const unlockBlock_1 = require("./unlockBlock");
/**
 * The minimum length of a payload binary representation.
 */
exports.MIN_PAYLOAD_LENGTH = common_1.TYPE_LENGTH;
/**
 * The minimum length of a milestone payload binary representation.
 */
exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + // min payload
    common_1.UINT32_SIZE + // index
    common_1.UINT64_SIZE + // timestamp
    common_1.MESSAGE_ID_LENGTH + // parent 1
    common_1.MESSAGE_ID_LENGTH + // parent 2
    common_1.MERKLE_PROOF_LENGTH + // merkle proof
    (2 * common_1.UINT32_SIZE) + // Next pow score and pow score milestone index
    common_1.BYTE_SIZE + // publicKeysCount
    ed25519_1.Ed25519.PUBLIC_KEY_SIZE + // 1 public key
    common_1.BYTE_SIZE + // signatureCount
    ed25519_1.Ed25519.SIGNATURE_SIZE; // 1 signature
/**
 * The minimum length of an indexation payload binary representation.
 */
exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + // min payload
    common_1.STRING_LENGTH + // index length
    1 + // index min 1 byte
    common_1.STRING_LENGTH; // data length
/**
 * The minimum length of a transaction payload binary representation.
 */
exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + // min payload
    common_1.UINT32_SIZE; // essence type
/**
 * The minimum length of a receipt payload binary representation.
 */
exports.MIN_RECEIPT_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH +
    common_1.UINT32_SIZE + // migratedAt
    common_1.UINT16_SIZE + // numFunds
    funds_1.MIN_MIGRATED_FUNDS_LENGTH; // 1 Fund
/**
 * The minimum length of a treasure transaction payload binary representation.
 */
exports.MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH +
    input_1.MIN_TREASURY_INPUT_LENGTH +
    output_1.MIN_TREASURY_OUTPUT_LENGTH;
/**
 * The minimum length of a indexation key.
 */
exports.MIN_INDEXATION_KEY_LENGTH = 1;
/**
 * The maximum length of a indexation key.
 */
exports.MAX_INDEXATION_KEY_LENGTH = 64;
/**
 * Deserialize the payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializePayload(readStream) {
    const payloadLength = readStream.readUInt32("payload.length");
    if (!readStream.hasRemaining(payloadLength)) {
        throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readStream.unused()}`);
    }
    let payload;
    if (payloadLength > 0) {
        const payloadType = readStream.readUInt32("payload.type", false);
        if (payloadType === ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTransactionPayload(readStream);
        }
        else if (payloadType === IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
            payload = deserializeMilestonePayload(readStream);
        }
        else if (payloadType === IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
            payload = deserializeIndexationPayload(readStream);
        }
        else if (payloadType === IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
            payload = deserializeReceiptPayload(readStream);
        }
        else if (payloadType === ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTreasuryTransactionPayload(readStream);
        }
        else {
            throw new Error(`Unrecognized payload type ${payloadType}`);
        }
    }
    return payload;
}
exports.deserializePayload = deserializePayload;
/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializePayload(writeStream, object) {
    // Store the location for the payload length and write 0
    // we will rewind and fill in once the size of the payload is known
    const payloadLengthWriteIndex = writeStream.getWriteIndex();
    writeStream.writeUInt32("payload.length", 0);
    if (!object) {
        // No other data to write
    }
    else if (object.type === ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
        serializeTransactionPayload(writeStream, object);
    }
    else if (object.type === IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
        serializeMilestonePayload(writeStream, object);
    }
    else if (object.type === IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
        serializeIndexationPayload(writeStream, object);
    }
    else if (object.type === IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
        serializeReceiptPayload(writeStream, object);
    }
    else if (object.type === ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        serializeTreasuryTransactionPayload(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
    const endOfPayloadWriteIndex = writeStream.getWriteIndex();
    writeStream.setWriteIndex(payloadLengthWriteIndex);
    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - common_1.UINT32_SIZE);
    writeStream.setWriteIndex(endOfPayloadWriteIndex);
}
exports.serializePayload = serializePayload;
/**
 * Deserialize the transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeTransactionPayload(readStream) {
    if (!readStream.hasRemaining(exports.MIN_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadTransaction.type");
    if (type !== ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTransaction ${type}`);
    }
    const essenceType = readStream.readByte("payloadTransaction.essenceType", false);
    let essence;
    let unlockBlocks;
    if (essenceType === ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE) {
        essence = transaction_1.deserializeTransactionEssence(readStream);
        unlockBlocks = unlockBlock_1.deserializeUnlockBlocks(readStream);
    }
    else {
        throw new Error(`Unrecognized transaction essence type ${type}`);
    }
    return {
        type: ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE,
        essence,
        unlockBlocks
    };
}
exports.deserializeTransactionPayload = deserializeTransactionPayload;
/**
 * Serialize the transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeTransactionPayload(writeStream, object) {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    if (object.type === ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
        transaction_1.serializeTransactionEssence(writeStream, object.essence);
        unlockBlock_1.serializeUnlockBlocks(writeStream, object.unlockBlocks);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
}
exports.serializeTransactionPayload = serializeTransactionPayload;
/**
 * Deserialize the milestone payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeMilestonePayload(readStream) {
    if (!readStream.hasRemaining(exports.MIN_MILESTONE_PAYLOAD_LENGTH)) {
        throw new Error(`Milestone Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_MILESTONE_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadMilestone.type");
    if (type !== IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadMilestone ${type}`);
    }
    const index = readStream.readUInt32("payloadMilestone.index");
    const timestamp = readStream.readUInt64("payloadMilestone.timestamp");
    const numParents = readStream.readByte("payloadMilestone.numParents");
    const parentMessageIds = [];
    for (let i = 0; i < numParents; i++) {
        const parentMessageId = readStream.readFixedHex(`payloadMilestone.parentMessageId${i + 1}`, common_1.MESSAGE_ID_LENGTH);
        parentMessageIds.push(parentMessageId);
    }
    const inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", common_1.MERKLE_PROOF_LENGTH);
    const nextPoWScore = readStream.readUInt32("payloadMilestone.nextPoWScore");
    const nextPoWScoreMilestoneIndex = readStream.readUInt32("payloadMilestone.nextPoWScoreMilestoneIndex");
    const publicKeysCount = readStream.readByte("payloadMilestone.publicKeysCount");
    const publicKeys = [];
    for (let i = 0; i < publicKeysCount; i++) {
        publicKeys.push(readStream.readFixedHex("payloadMilestone.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE));
    }
    const receipt = deserializePayload(readStream);
    if (receipt && receipt.type !== IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
        throw new Error("Milestones only support embedded receipt payload type");
    }
    const signaturesCount = readStream.readByte("payloadMilestone.signaturesCount");
    const signatures = [];
    for (let i = 0; i < signaturesCount; i++) {
        signatures.push(readStream.readFixedHex("payloadMilestone.signature", ed25519_1.Ed25519.SIGNATURE_SIZE));
    }
    return {
        type: IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE,
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
exports.deserializeMilestonePayload = deserializeMilestonePayload;
/**
 * Serialize the milestone payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeMilestonePayload(writeStream, object) {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    writeStream.writeUInt32("payloadMilestone.index", object.index);
    writeStream.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
    if (object.parentMessageIds.length < message_1.MIN_NUMBER_PARENTS) {
        throw new Error(`A minimum of ${message_1.MIN_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`);
    }
    if (object.parentMessageIds.length > message_1.MAX_NUMBER_PARENTS) {
        throw new Error(`A maximum of ${message_1.MAX_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`);
    }
    if ((new Set(object.parentMessageIds)).size !== object.parentMessageIds.length) {
        throw new Error("The milestone parents must be unique");
    }
    const sorted = object.parentMessageIds.slice().sort();
    writeStream.writeByte("payloadMilestone.numParents", object.parentMessageIds.length);
    for (let i = 0; i < object.parentMessageIds.length; i++) {
        if (sorted[i] !== object.parentMessageIds[i]) {
            throw new Error("The milestone parents must be lexographically sorted");
        }
        writeStream.writeFixedHex(`payloadMilestone.parentMessageId${i + 1}`, common_1.MESSAGE_ID_LENGTH, object.parentMessageIds[i]);
    }
    writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", common_1.MERKLE_PROOF_LENGTH, object.inclusionMerkleProof);
    writeStream.writeUInt32("payloadMilestone.nextPoWScore", object.nextPoWScore);
    writeStream.writeUInt32("payloadMilestone.nextPoWScoreMilestoneIndex", object.nextPoWScoreMilestoneIndex);
    writeStream.writeByte("payloadMilestone.publicKeysCount", object.publicKeys.length);
    for (let i = 0; i < object.publicKeys.length; i++) {
        writeStream.writeFixedHex("payloadMilestone.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE, object.publicKeys[i]);
    }
    serializePayload(writeStream, object.receipt);
    writeStream.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
    for (let i = 0; i < object.signatures.length; i++) {
        writeStream.writeFixedHex("payloadMilestone.signature", ed25519_1.Ed25519.SIGNATURE_SIZE, object.signatures[i]);
    }
}
exports.serializeMilestonePayload = serializeMilestonePayload;
/**
 * Deserialize the indexation payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeIndexationPayload(readStream) {
    if (!readStream.hasRemaining(exports.MIN_INDEXATION_PAYLOAD_LENGTH)) {
        throw new Error(`Indexation Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_INDEXATION_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadIndexation.type");
    if (type !== IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadIndexation ${type}`);
    }
    const indexLength = readStream.readUInt16("payloadIndexation.indexLength");
    const index = readStream.readFixedHex("payloadIndexation.index", indexLength);
    const dataLength = readStream.readUInt32("payloadIndexation.dataLength");
    const data = readStream.readFixedHex("payloadIndexation.data", dataLength);
    return {
        type: IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE,
        index,
        data
    };
}
exports.deserializeIndexationPayload = deserializeIndexationPayload;
/**
 * Serialize the indexation payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeIndexationPayload(writeStream, object) {
    if (object.index.length < exports.MIN_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${object.index.length}, which is below the minimum size of ${exports.MIN_INDEXATION_KEY_LENGTH}`);
    }
    if (object.index.length / 2 > exports.MAX_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${object.index.length / 2}, which exceeds the maximum size of ${exports.MAX_INDEXATION_KEY_LENGTH}`);
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
exports.serializeIndexationPayload = serializeIndexationPayload;
/**
 * Deserialize the receipt payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeReceiptPayload(readStream) {
    if (!readStream.hasRemaining(exports.MIN_RECEIPT_PAYLOAD_LENGTH)) {
        throw new Error(`Receipt Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_RECEIPT_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadReceipt.type");
    if (type !== IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadReceipt ${type}`);
    }
    const migratedAt = readStream.readUInt32("payloadReceipt.migratedAt");
    const final = readStream.readBoolean("payloadReceipt.final");
    const funds = funds_1.deserializeFunds(readStream);
    const treasuryTransactionPayload = deserializePayload(readStream);
    if (!treasuryTransactionPayload || treasuryTransactionPayload.type !== ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`payloadReceipts can only contain treasury payloads ${type}`);
    }
    return {
        type: IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE,
        migratedAt,
        final,
        funds,
        transaction: treasuryTransactionPayload
    };
}
exports.deserializeReceiptPayload = deserializeReceiptPayload;
/**
 * Serialize the receipt payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeReceiptPayload(writeStream, object) {
    writeStream.writeUInt32("payloadReceipt.type", object.type);
    writeStream.writeUInt32("payloadReceipt.migratedAt", object.migratedAt);
    writeStream.writeBoolean("payloadReceipt.final", object.final);
    funds_1.serializeFunds(writeStream, object.funds);
    serializePayload(writeStream, object.transaction);
}
exports.serializeReceiptPayload = serializeReceiptPayload;
/**
 * Deserialize the treasury transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeTreasuryTransactionPayload(readStream) {
    if (!readStream.hasRemaining(exports.MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Treasure Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadTreasuryTransaction.type");
    if (type !== ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTreasuryTransaction ${type}`);
    }
    const input = input_1.deserializeTreasuryInput(readStream);
    const output = output_1.deserializeTreasuryOutput(readStream);
    return {
        type: ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE,
        input,
        output
    };
}
exports.deserializeTreasuryTransactionPayload = deserializeTreasuryTransactionPayload;
/**
 * Serialize the treasury transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeTreasuryTransactionPayload(writeStream, object) {
    writeStream.writeUInt32("payloadTreasuryTransaction.type", object.type);
    input_1.serializeTreasuryInput(writeStream, object.input);
    output_1.serializeTreasuryOutput(writeStream, object.output);
}
exports.serializeTreasuryTransactionPayload = serializeTreasuryTransactionPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxxRUFBMkY7QUFDM0YsbUVBQXdGO0FBQ3hGLCtEQUFrRjtBQUNsRix1RUFBeUU7QUFDekUsdUVBQThGO0FBQzlGLHVGQUF1SDtBQUl2SCxxQ0FBZ0o7QUFDaEosbUNBQXNGO0FBQ3RGLG1DQUFzRztBQUN0Ryx1Q0FBbUU7QUFDbkUscUNBQTBHO0FBQzFHLCtDQUEyRjtBQUMzRiwrQ0FBK0U7QUFFL0U7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFXLG9CQUFXLENBQUM7QUFFdEQ7O0dBRUc7QUFDVSxRQUFBLDRCQUE0QixHQUNyQywwQkFBa0IsR0FBRyxjQUFjO0lBQ25DLG9CQUFXLEdBQUcsUUFBUTtJQUN0QixvQkFBVyxHQUFHLFlBQVk7SUFDMUIsMEJBQWlCLEdBQUcsV0FBVztJQUMvQiwwQkFBaUIsR0FBRyxXQUFXO0lBQy9CLDRCQUFtQixHQUFHLGVBQWU7SUFDckMsQ0FBQyxDQUFDLEdBQUcsb0JBQVcsQ0FBQyxHQUFHLCtDQUErQztJQUNuRSxrQkFBUyxHQUFHLGtCQUFrQjtJQUM5QixpQkFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlO0lBQ3pDLGtCQUFTLEdBQUcsaUJBQWlCO0lBQzdCLGlCQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsY0FBYztBQUUxQzs7R0FFRztBQUNVLFFBQUEsNkJBQTZCLEdBQ3RDLDBCQUFrQixHQUFHLGNBQWM7SUFDbkMsc0JBQWEsR0FBRyxlQUFlO0lBQy9CLENBQUMsR0FBRyxtQkFBbUI7SUFDdkIsc0JBQWEsQ0FBQyxDQUFDLGNBQWM7QUFFakM7O0dBRUc7QUFDVSxRQUFBLDhCQUE4QixHQUN2QywwQkFBa0IsR0FBRyxjQUFjO0lBQ25DLG9CQUFXLENBQUMsQ0FBQyxlQUFlO0FB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