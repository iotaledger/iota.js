"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
const ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
const common_1 = require("./common");
const signature_1 = require("./signature");
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
    const numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
    const unlockBlocks = [];
    for (let i = 0; i < numUnlockBlocks; i++) {
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
    for (let i = 0; i < objects.length; i++) {
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
        throw new Error(`Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("unlockBlock.type", false);
    let unlockBlock;
    if (type === ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeSignatureUnlockBlock(readStream);
    }
    else if (type === IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeReferenceUnlockBlock(readStream);
    }
    else {
        throw new Error(`Unrecognized unlock block type ${type}`);
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
        throw new Error(`Unrecognized unlock block type ${object.type}`);
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
        throw new Error(`Signature Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("signatureUnlockBlock.type");
    if (type !== ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
    }
    const signature = signature_1.deserializeSignature(readStream);
    return {
        type: ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE,
        signature
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
        throw new Error(`Reference Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("referenceUnlockBlock.type");
    if (type !== IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
    }
    const reference = readStream.readUInt16("referenceUnlockBlock.reference");
    return {
        type: IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE,
        reference
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsMkVBQXFHO0FBQ3JHLDJFQUFxRztBQUlyRyxxQ0FBMEQ7QUFDMUQsMkNBQTZGO0FBRTdGOztHQUVHO0FBQ1UsUUFBQSx1QkFBdUIsR0FBVywwQkFBaUIsQ0FBQztBQUVqRTs7R0FFRztBQUNVLFFBQUEsaUNBQWlDLEdBQzFDLCtCQUF1QixHQUFHLGdDQUFvQixDQUFDO0FBRW5EOztHQUVHO0FBQ1UsUUFBQSxpQ0FBaUMsR0FBVywrQkFBdUIsR0FBRyxvQkFBVyxDQUFDO0FBRS9GOzs7O0dBSUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDcEYsTUFBTSxZQUFZLEdBQXNELEVBQUUsQ0FBQztJQUMzRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFQRCwwREFPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxXQUF3QixFQUFFLE9BQ1g7SUFDakQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxvQ0FBb0MsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLE9B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