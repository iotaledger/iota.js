"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;
var ed25519_1 = require("../crypto/ed25519");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IMilestonePayload_1 = require("../models/IMilestonePayload");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var ITransactionPayload_1 = require("../models/ITransactionPayload");
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
        type: 0,
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
        type: 1,
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
        type: 2,
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
    writeStream.writeUInt32("payloadIndexation.type", object.type);
    writeStream.writeString("payloadIndexation.index", object.index);
    writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
    writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
}
exports.serializeIndexationPayload = serializeIndexationPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEM7QUFDNUMsbUVBQTJGO0FBQzNGLGlFQUF3RjtBQUN4RixxRUFBeUU7QUFDekUscUVBQThGO0FBSTlGLG1DQUFtSTtBQUNuSSw2Q0FBMkY7QUFDM0YsNkNBQStFO0FBRWxFLFFBQUEsa0JBQWtCLEdBQVcsb0JBQVcsQ0FBQztBQUN6QyxRQUFBLDRCQUE0QixHQUFXLDBCQUFrQixHQUFHLG9CQUFXLEdBQUcsb0JBQVc7SUFDOUYsMEJBQWlCLEdBQUcsMEJBQWlCLEdBQUcsNEJBQW1CO0lBQzNELGtCQUFTLEdBQUcsaUJBQU8sQ0FBQyxlQUFlO0lBQ25DLGtCQUFTLEdBQUcsaUJBQU8sQ0FBQyxjQUFjLENBQUM7QUFDMUIsUUFBQSw2QkFBNkIsR0FBVywwQkFBa0IsR0FBRyxzQkFBYSxHQUFHLHNCQUFhLENBQUM7QUFDM0YsUUFBQSw4QkFBOEIsR0FBVywwQkFBa0IsR0FBRyxvQkFBVyxDQUFDO0FBRXZGOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUVyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywwQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ2MsMEJBQW9CLENBQUMsQ0FBQztLQUM3RjtJQUVELElBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUU5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFrQixhQUFhLG9DQUNaLFVBQVUsQ0FBQyxNQUFNLEVBQUksQ0FBQyxDQUFDO0tBQzdEO0lBRUQsSUFBSSxPQUFpRixD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