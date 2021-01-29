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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMseUVBQXFHO0FBQ3JHLHlFQUFxRztBQUlyRyxtQ0FBMEQ7QUFDMUQseUNBQTZGO0FBRTdGOztHQUVHO0FBQ1UsUUFBQSx1QkFBdUIsR0FBVywwQkFBaUIsQ0FBQztBQUVqRTs7R0FFRztBQUNVLFFBQUEsaUNBQWlDLEdBQzFDLCtCQUF1QixHQUFHLGdDQUFvQixDQUFDO0FBRW5EOztHQUVHO0FBQ1UsUUFBQSxpQ0FBaUMsR0FBVywrQkFBdUIsR0FBRyxvQkFBVyxDQUFDO0FBRS9GOzs7O0dBSUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDcEYsSUFBTSxZQUFZLEdBQXdCLEVBQUUsQ0FBQztJQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFQRCwwREFPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxXQUF3QixFQUFFLE9BQTRCO0lBQ3hGLFdBQVcsQ0FBQyxXQUFXLENBQUMsb0NBQW9DLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxP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