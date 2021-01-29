"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTreasuryTransactionPayload = exports.deserializeTreasuryTransactionPayload = exports.serializeReceiptPayload = exports.deserializeReceiptPayload = exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MAX_INDEXATION_KEY_LENGTH = exports.MIN_INDEXATION_KEY_LENGTH = exports.MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_RECEIPT_PAYLOAD_LENGTH = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519_1 = require("../crypto/ed25519");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IMilestonePayload_1 = require("../models/IMilestonePayload");
var IReceiptPayload_1 = require("../models/IReceiptPayload");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var ITransactionPayload_1 = require("../models/ITransactionPayload");
var ITreasuryTransactionPayload_1 = require("../models/ITreasuryTransactionPayload");
var common_1 = require("./common");
var funds_1 = require("./funds");
var input_1 = require("./input");
var message_1 = require("./message");
var output_1 = require("./output");
var transaction_1 = require("./transaction");
var unlockBlock_1 = require("./unlockBlock");
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
    common_1.BYTE_SIZE + // publicKeysCount
    ed25519_1.Ed25519.PUBLIC_KEY_SIZE + // 1 public key
    common_1.BYTE_SIZE + // signatireCount
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
        else if (payloadType === IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
            payload = deserializeReceiptPayload(readStream);
        }
        else if (payloadType === ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTreasuryTransactionPayload(readStream);
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
    else if (object.type === IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
        serializeReceiptPayload(writeStream, object);
    }
    else if (object.type === ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        serializeTreasuryTransactionPayload(writeStream, object);
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
    var numParents = readStream.readByte("payloadMilestone.numParents");
    var parents = [];
    for (var i = 0; i < numParents; i++) {
        var parentMessageId = readStream.readFixedHex("payloadMilestone.parentMessageId" + (i + 1), common_1.MESSAGE_ID_LENGTH);
        parents.push(parentMessageId);
    }
    var inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", common_1.MERKLE_PROOF_LENGTH);
    var publicKeysCount = readStream.readByte("payloadMilestone.publicKeysCount");
    var publicKeys = [];
    for (var i = 0; i < publicKeysCount; i++) {
        publicKeys.push(readStream.readFixedHex("payloadMilestone.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE));
    }
    var receipt = deserializePayload(readStream);
    if (receipt && receipt.type !== IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
        throw new Error("Milestones only support embedded receipt payload type");
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
        parents: parents,
        inclusionMerkleProof: inclusionMerkleProof,
        publicKeys: publicKeys,
        receipt: receipt,
        signatures: signatures
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
    if (object.parents.length < message_1.MIN_NUMBER_PARENTS) {
        throw new Error("A minimum of " + message_1.MIN_NUMBER_PARENTS + " parents is allowed, you provided " + object.parents.length);
    }
    if (object.parents.length > message_1.MAX_NUMBER_PARENTS) {
        throw new Error("A maximum of " + message_1.MAX_NUMBER_PARENTS + " parents is allowed, you provided " + object.parents.length);
    }
    if ((new Set(object.parents)).size !== object.parents.length) {
        throw new Error("The milestone parents must be unique");
    }
    var sorted = object.parents.slice().sort();
    writeStream.writeByte("payloadMilestone.numParents", object.parents.length);
    for (var i = 0; i < object.parents.length; i++) {
        if (sorted[i] !== object.parents[i]) {
            throw new Error("The milestone parents must be lexographically sorted");
        }
        writeStream.writeFixedHex("payloadMilestone.parentMessageId" + (i + 1), common_1.MESSAGE_ID_LENGTH, object.parents[i]);
    }
    writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", common_1.MERKLE_PROOF_LENGTH, object.inclusionMerkleProof);
    writeStream.writeByte("payloadMilestone.publicKeysCount", object.publicKeys.length);
    for (var i = 0; i < object.publicKeys.length; i++) {
        writeStream.writeFixedHex("payloadMilestone.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE, object.publicKeys[i]);
    }
    serializePayload(writeStream, object.receipt);
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
 * Serialize the indexation payload to binary.
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
/**
 * Deserialize the receipt payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeReceiptPayload(readStream) {
    if (!readStream.hasRemaining(exports.MIN_RECEIPT_PAYLOAD_LENGTH)) {
        throw new Error("Receipt Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_RECEIPT_PAYLOAD_LENGTH);
    }
    var type = readStream.readUInt32("payloadReceipt.type");
    if (type !== IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE) {
        throw new Error("Type mismatch in payloadReceipt " + type);
    }
    var migratedAt = readStream.readUInt32("payloadReceipt.migratedAt");
    var final = readStream.readBoolean("payloadReceipt.final");
    var funds = funds_1.deserializeFunds(readStream);
    var treasuryTransactionPayload = deserializePayload(readStream);
    if (!treasuryTransactionPayload || treasuryTransactionPayload.type !== ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error("payloadReceipts can only contain treasury payloads " + type);
    }
    return {
        type: IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE,
        migratedAt: migratedAt,
        final: final,
        funds: funds,
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
        throw new Error("Treasure Transaction Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH);
    }
    var type = readStream.readUInt32("payloadTreasuryTransaction.type");
    if (type !== ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error("Type mismatch in payloadTreasuryTransaction " + type);
    }
    var input = input_1.deserializeTreasuryInput(readStream);
    var output = output_1.deserializeTreasuryOutput(readStream);
    return {
        type: ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE,
        input: input,
        output: output
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLDZDQUE0QztBQUM1QyxtRUFBMkY7QUFDM0YsaUVBQXdGO0FBQ3hGLDZEQUFrRjtBQUNsRixxRUFBeUU7QUFDekUscUVBQThGO0FBQzlGLHFGQUF1SDtBQUl2SCxtQ0FBZ0o7QUFDaEosaUNBQXNGO0FBQ3RGLGlDQUFzRztBQUN0RyxxQ0FBbUU7QUFDbkUsbUNBQTBHO0FBQzFHLDZDQUEyRjtBQUMzRiw2Q0FBK0U7QUFFL0U7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFXLG9CQUFXLENBQUM7QUFFdEQ7O0dBRUc7QUFDVSxRQUFBLDRCQUE0QixHQUNyQywwQkFBa0IsR0FBRyxjQUFjO0lBQ25DLG9CQUFXLEdBQUcsUUFBUTtJQUN0QixvQkFBVyxHQUFHLFlBQVk7SUFDMUIsMEJBQWlCLEdBQUcsV0FBVztJQUMvQiwwQkFBaUIsR0FBRyxXQUFXO0lBQy9CLDRCQUFtQixHQUFHLGVBQWU7SUFDckMsa0JBQVMsR0FBRyxrQkFBa0I7SUFDOUIsaUJBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZTtJQUN6QyxrQkFBUyxHQUFHLGlCQUFpQjtJQUM3QixpQkFBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGNBQWM7QUFFMUM7O0dBRUc7QUFDVSxRQUFBLDZCQUE2QixHQUN0QywwQkFBa0IsR0FBRyxjQUFjO0lBQ25DLHNCQUFhLEdBQUcsZUFBZTtJQUMvQixDQUFDLEdBQUcsbUJBQW1CO0lBQ3ZCLHNCQUFhLENBQUMsQ0FBQyxjQUFjO0FBRWpDOztHQUVHO0FBQ1UsUUFBQSw4QkFBOEIsR0FDdkMsMEJBQWtCLEdBQUcsY0FBYztJQUNuQyxvQkFBVyxDQUFDLENBQUMsZUFBZTtBQUVoQzs7R0FFRztBQUNVLFFBQUEsMEJBQTBCLEdBQ25DLDBCQUFrQjtJQUNs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