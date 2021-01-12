"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MAX_INDEXATION_KEY_LENGTH = exports.MIN_INDEXATION_KEY_LENGTH = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519_1 = require("../crypto/ed25519");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IMilestonePayload_1 = require("../models/IMilestonePayload");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var ITransactionPayload_1 = require("../models/ITransactionPayload");
var textHelper_1 = require("../utils/textHelper");
var common_1 = require("./common");
var transaction_1 = require("./transaction");
var unlockBlock_1 = require("./unlockBlock");
exports.MIN_PAYLOAD_LENGTH = common_1.TYPE_LENGTH;
exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common_1.UINT32_SIZE + common_1.UINT64_SIZE +
    common_1.MESSAGE_ID_LENGTH + common_1.MESSAGE_ID_LENGTH + common_1.MERKLE_PROOF_LENGTH +
    common_1.BYTE_SIZE + ed25519_1.Ed25519.PUBLIC_KEY_SIZE +
    common_1.BYTE_SIZE + ed25519_1.Ed25519.SIGNATURE_SIZE;
exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common_1.STRING_LENGTH + common_1.STRING_LENGTH;
exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common_1.UINT32_SIZE;
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
    if (!readStream.hasRemaining(exports.MIN_PAYLOAD_LENGTH)) {
        throw new Error("Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_PAYLOAD_LENGTH);
    }
    var payloadLength = readStream.readUInt32("payload.length");
    if (!readStream.hasRemaining(payloadLength)) {
        throw new Error("Payload length " + payloadLength + " exceeds the remaining data " + readStream.unused());
    }
    var payload;
    if (payloadLength > 0) {
        var payloadType = readStream.readUInt32("payload.type", false);
        if (payloadType === ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTransactionPayload(readStream);
        }
        else if (payloadType === IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
            payload = deserializeMilestonePayload(readStream);
        }
        else if (payloadType === IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
            payload = deserializeIndexationPayload(readStream);
        }
        else {
            throw new Error("Unrecognized payload type " + payloadType);
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
    var payloadLengthWriteIndex = writeStream.getWriteIndex();
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
    else {
        throw new Error("Unrecognized transaction type " + object.type);
    }
    var endOfPayloadWriteIndex = writeStream.getWriteIndex();
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
        throw new Error("Transaction Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TRANSACTION_PAYLOAD_LENGTH);
    }
    var type = readStream.readUInt32("payloadTransaction.type");
    if (type !== ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
        throw new Error("Type mismatch in payloadTransaction " + type);
    }
    var essenceType = readStream.readByte("payloadTransaction.essenceType", false);
    var essence;
    var unlockBlocks;
    if (essenceType === ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE) {
        essence = transaction_1.deserializeTransactionEssence(readStream);
        unlockBlocks = unlockBlock_1.deserializeUnlockBlocks(readStream);
    }
    else {
        throw new Error("Unrecognized transaction essence type " + type);
    }
    return {
        type: ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlockBlocks: unlockBlocks
    };
}
exports.deserializeTransactionPayload = deserializeTransactionPayload;
/**
 * Serialize the transaction payload essence to binary.
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
        throw new Error("Unrecognized transaction type " + object.type);
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
        throw new Error("Milestone Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_MILESTONE_PAYLOAD_LENGTH);
    }
    var type = readStream.readUInt32("payloadMilestone.type");
    if (type !== IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
        throw new Error("Type mismatch in payloadMilestone " + type);
    }
    var index = readStream.readUInt32("payloadMilestone.index");
    var timestamp = readStream.readUInt64("payloadMilestone.timestamp");
    var parent1MessageId = readStream.readFixedHex("payloadMilestone.parent1MessageId", common_1.MESSAGE_ID_LENGTH);
    var parent2MessageId = readStream.readFixedHex("payloadMilestone.parent2MessageId", common_1.MESSAGE_ID_LENGTH);
    var inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", common_1.MERKLE_PROOF_LENGTH);
    var publicKeysCount = readStream.readByte("payloadMilestone.publicKeysCount");
    var publicKeys = [];
    for (var i = 0; i < publicKeysCount; i++) {
        publicKeys.push(readStream.readFixedHex("payloadMilestone.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE));
    }
    var signaturesCount = readStream.readByte("payloadMilestone.signaturesCount");
    var signatures = [];
    for (var i = 0; i < signaturesCount; i++) {
        signatures.push(readStream.readFixedHex("payloadMilestone.signature", ed25519_1.Ed25519.SIGNATURE_SIZE));
    }
    return {
        type: IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE,
        index: index,
        timestamp: Number(timestamp),
        parent1MessageId: parent1MessageId,
        parent2MessageId: parent2MessageId,
        inclusionMerkleProof: inclusionMerkleProof,
        publicKeys: publicKeys,
        signatures: signatures
    };
}
exports.deserializeMilestonePayload = deserializeMilestonePayload;
/**
 * Serialize the milestone payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeMilestonePayload(writeStream, object) {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    writeStream.writeUInt32("payloadMilestone.index", object.index);
    writeStream.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
    writeStream.writeFixedHex("payloadMilestone.parent1MessageId", common_1.MESSAGE_ID_LENGTH, object.parent1MessageId);
    writeStream.writeFixedHex("payloadMilestone.parent2MessageId", common_1.MESSAGE_ID_LENGTH, object.parent2MessageId);
    writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", common_1.MERKLE_PROOF_LENGTH, object.inclusionMerkleProof);
    writeStream.writeByte("payloadMilestone.publicKeysCount", object.publicKeys.length);
    for (var i = 0; i < object.publicKeys.length; i++) {
        writeStream.writeFixedHex("payloadMilestone.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE, object.publicKeys[i]);
    }
    writeStream.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
    for (var i = 0; i < object.signatures.length; i++) {
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
        throw new Error("Indexation Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_INDEXATION_PAYLOAD_LENGTH);
    }
    var type = readStream.readUInt32("payloadIndexation.type");
    if (type !== IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
        throw new Error("Type mismatch in payloadIndexation " + type);
    }
    var index = readStream.readString("payloadIndexation.index");
    var dataLength = readStream.readUInt32("payloadIndexation.dataLength");
    var data = readStream.readFixedHex("payloadIndexation.data", dataLength);
    return {
        type: IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE,
        index: index,
        data: data
    };
}
exports.deserializeIndexationPayload = deserializeIndexationPayload;
/**
 * Serialize the indexation payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeIndexationPayload(writeStream, object) {
    if (object.index.length < exports.MIN_INDEXATION_KEY_LENGTH) {
        throw new Error("The indexation key length is " + object.index.length + ", which is below the minimum size of " + exports.MIN_INDEXATION_KEY_LENGTH);
    }
    if (object.index.length > exports.MAX_INDEXATION_KEY_LENGTH) {
        throw new Error("The indexation key length is " + object.index.length + ", which exceeds the maximum size of " + exports.MAX_INDEXATION_KEY_LENGTH);
    }
    if (!textHelper_1.TextHelper.isUTF8(object.index)) {
        throw new Error("The index can only contain UTF8 characters");
    }
    writeStream.writeUInt32("payloadIndexation.type", object.type);
    writeStream.writeString("payloadIndexation.index", object.index);
    if (object.data) {
        writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
        writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
    }
    else {
        writeStream.writeUInt32("payloadIndexation.dataLength", 0);
    }
}
exports.serializeIndexationPayload = serializeIndexationPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLDZDQUE0QztBQUM1QyxtRUFBMkY7QUFDM0YsaUVBQXdGO0FBQ3hGLHFFQUF5RTtBQUN6RSxxRUFBOEY7QUFHOUYsa0RBQWlEO0FBRWpELG1DQUFtSTtBQUNuSSw2Q0FBMkY7QUFDM0YsNkNBQStFO0FBRWxFLFFBQUEsa0JBQWtCLEdBQVcsb0JBQVcsQ0FBQztBQUN6QyxRQUFBLDRCQUE0QixHQUFXLDBCQUFrQixHQUFHLG9CQUFXLEdBQUcsb0JBQVc7SUFDOUYsMEJBQWlCLEdBQUcsMEJBQWlCLEdBQUcsNEJBQW1CO0lBQzNELGtCQUFTLEdBQUcsaUJBQU8sQ0FBQyxlQUFlO0lBQ25DLGtCQUFTLEdBQUcsaUJBQU8sQ0FBQyxjQUFjLENBQUM7QUFDMUIsUUFBQSw2QkFBNkIsR0FBVywwQkFBa0IsR0FBRyxzQkFBYSxHQUFHLHNCQUFhLENBQUM7QUFDM0YsUUFBQSw4QkFBOEIsR0FBVywwQkFBa0IsR0FBRyxvQkFBVyxDQUFDO0FBRXZGOztHQUVHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBVyxDQUFDLENBQUM7QUFFbkQ7O0dBRUc7QUFDVSxRQUFBLHlCQUF5QixHQUFXLEVBQUUsQ0FBQztBQUVwRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBc0I7SUFFckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsMEJBQWtCLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFtQixVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNjLDBCQUFvQixDQUFDLENBQUM7S0FDN0Y7SUFFRCxJQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFOUQsSUFBSSxDQUFDLFVBQVUs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