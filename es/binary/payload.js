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