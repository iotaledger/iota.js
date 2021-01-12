"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
var ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
var common_1 = require("./common");
var signature_1 = require("./signature");
/**
 * The minimum length of an unlock block binary representation.
 */
exports.MIN_UNLOCK_BLOCK_LENGTH = common_1.SMALL_TYPE_LENGTH;
/**
 * The minimum length of a signature unlock block binary representation.
 */
exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + signature_1.MIN_SIGNATURE_LENGTH;
/**
 * The minimum length of a reference unlock block binary representation.
 */
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
        type: ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE,
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
        type: IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMseUVBQXFHO0FBQ3JHLHlFQUFxRztBQUlyRyxtQ0FBMEQ7QUFDMUQseUNBQTZGO0FBRTdGOztHQUVHO0FBQ1UsUUFBQSx1QkFBdUIsR0FBVywwQkFBaUIsQ0FBQztBQUVqRTs7R0FFRztBQUNVLFFBQUEsaUNBQWlDLEdBQzFDLCtCQUF1QixHQUFHLGdDQUFvQixDQUFDO0FBRW5EOztHQUVHO0FBQ1UsUUFBQSxpQ0FBaUMsR0FBVywrQkFBdUIsR0FBRyxvQkFBVyxDQUFDO0FBRS9GOzs7O0dBSUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDcEYsSUFBTSxZQUFZLEdBQXNELEVBQUUsQ0FBQztJQUMzRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFQRCwwREFPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxXQUF3QixFQUMxRCxPQUEwRDtJQUMxRCxXQUFXLENBQUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUs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