"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMseUVBQXFHO0FBQ3JHLHlFQUFxRztBQUlyRyxtQ0FBMEQ7QUFDMUQseUNBQTZGO0FBRWhGLFFBQUEsdUJBQXVCLEdBQVcsMEJBQWlCLENBQUM7QUFDcEQsUUFBQSxpQ0FBaUMsR0FDMUMsK0JBQXVCLEdBQUcsZ0NBQW9CLENBQUM7QUFDdEMsUUFBQSxpQ0FBaUMsR0FBVywrQkFBdUIsR0FBRyxvQkFBVyxDQUFDO0FBRS9GOzs7O0dBSUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDcEYsSUFBTSxZQUFZLEdBQXNELEVBQUUsQ0FBQztJQUMzRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFQRCwwREFPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxXQUF3QixFQUMxRCxPQUEwRDtJQUMxRCxXQUFXLENBQUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FD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