"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;
var IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
var ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
var common_1 = require("./common");
var signature_1 = require("./signature");
exports.MIN_UNLOCK_BLOCK_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + signature_1.MIN_SIGNATURE_LENGTH;
exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + common_1.UINT16_SIZE;
/**
 * Deserialize the unlock blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeUnlockBlocks(readStream) {
    var numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
    var unlockBlocks = [];
    for (var i = 0; i < numUnlockBlocks; i++) {
        unlockBlocks.push(deserializeUnlockBlock(readStream));
    }
    return unlockBlocks;
}
exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
/**
 * Serialize the unlock blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
function serializeUnlockBlocks(writeStream, objects) {
    writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
    for (var i = 0; i < objects.length; i++) {
        serializeUnlockBlock(writeStream, objects[i]);
    }
}
exports.serializeUnlockBlocks = serializeUnlockBlocks;
/**
 * Deserialize the unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeUnlockBlock(readStream) {
    if (!readStream.hasRemaining(exports.MIN_UNLOCK_BLOCK_LENGTH)) {
        throw new Error("Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_UNLOCK_BLOCK_LENGTH);
    }
    var type = readStream.readByte("unlockBlock.type", false);
    var unlockBlock;
    if (type === ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeSignatureUnlockBlock(readStream);
    }
    else if (type === IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeReferenceUnlockBlock(readStream);
    }
    else {
        throw new Error("Unrecognized unlock block type " + type);
    }
    return unlockBlock;
}
exports.deserializeUnlockBlock = deserializeUnlockBlock;
/**
 * Serialize the unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeUnlockBlock(writeStream, object) {
    if (object.type === ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
        serializeSignatureUnlockBlock(writeStream, object);
    }
    else if (object.type === IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
        serializeReferenceUnlockBlock(writeStream, object);
    }
    else {
        throw new Error("Unrecognized unlock block type " + object.type);
    }
}
exports.serializeUnlockBlock = serializeUnlockBlock;
/**
 * Deserialize the signature unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeSignatureUnlockBlock(readStream) {
    if (!readStream.hasRemaining(exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error("Signature Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH);
    }
    var type = readStream.readByte("signatureUnlockBlock.type");
    if (type !== ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
        throw new Error("Type mismatch in signatureUnlockBlock " + type);
    }
    var signature = signature_1.deserializeSignature(readStream);
    return {
        type: 0,
        signature: signature
    };
}
exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
/**
 * Serialize the signature unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeSignatureUnlockBlock(writeStream, object) {
    writeStream.writeByte("signatureUnlockBlock.type", object.type);
    signature_1.serializeSignature(writeStream, object.signature);
}
exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
/**
 * Deserialize the reference unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeReferenceUnlockBlock(readStream) {
    if (!readStream.hasRemaining(exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error("Reference Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH);
    }
    var type = readStream.readByte("referenceUnlockBlock.type");
    if (type !== IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
        throw new Error("Type mismatch in referenceUnlockBlock " + type);
    }
    var reference = readStream.readUInt16("referenceUnlockBlock.reference");
    return {
        type: 1,
        reference: reference
    };
}
exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
/**
 * Serialize the reference unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeReferenceUnlockBlock(writeStream, object) {
    writeStream.writeByte("referenceUnlockBlock.type", object.type);
    writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
}
exports.serializeReferenceUnlockBlock = serializeReferenceUnlockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFxRztBQUNyRyx5RUFBcUc7QUFJckcsbUNBQTBEO0FBQzFELHlDQUE2RjtBQUVoRixRQUFBLHVCQUF1QixHQUFXLDBCQUFpQixDQUFDO0FBQ3BELFFBQUEsaUNBQWlDLEdBQzFDLCtCQUF1QixHQUFHLGdDQUFvQixDQUFDO0FBQ3RDLFFBQUEsaUNBQWlDLEdBQVcsK0JBQXVCLEdBQUcsb0JBQVcsQ0FBQztBQUUvRjs7OztHQUlHO0FBQ0gsU0FBZ0IsdUJBQXVCLENBQUMsVUFBc0I7SUFDMUQsSUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3BGLElBQU0sWUFBWSxHQUFzRCxFQUFFLENBQUM7SUFDM0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBUEQsMERBT0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IscUJBQXFCLENBQUMsV0FBd0IsRUFDMUQsT0FBMEQ7SUFDMUQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxvQ0FBb0MsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO0FBQ0wsQ0FBQztBQVBELHNEQU9DO0FB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