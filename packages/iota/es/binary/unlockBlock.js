import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "./common";
import { deserializeSignature, MIN_SIGNATURE_LENGTH, serializeSignature } from "./signature";
/**
 * The minimum length of an unlock block binary representation.
 */
export const MIN_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH;
/**
 * The minimum length of a signature unlock block binary representation.
 */
export const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = MIN_UNLOCK_BLOCK_LENGTH + MIN_SIGNATURE_LENGTH;
/**
 * The minimum length of a reference unlock block binary representation.
 */
export const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = MIN_UNLOCK_BLOCK_LENGTH + UINT16_SIZE;
/**
 * Deserialize the unlock blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlocks(readStream) {
    const numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
    const unlockBlocks = [];
    for (let i = 0; i < numUnlockBlocks; i++) {
        unlockBlocks.push(deserializeUnlockBlock(readStream));
    }
    return unlockBlocks;
}
/**
 * Serialize the unlock blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeUnlockBlocks(writeStream, objects) {
    writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeUnlockBlock(writeStream, objects[i]);
    }
}
/**
 * Deserialize the unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("unlockBlock.type", false);
    let unlockBlock;
    if (type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeSignatureUnlockBlock(readStream);
    }
    else if (type === REFERENCE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeReferenceUnlockBlock(readStream);
    }
    else {
        throw new Error(`Unrecognized unlock block type ${type}`);
    }
    return unlockBlock;
}
/**
 * Serialize the unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlockBlock(writeStream, object) {
    if (object.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
        serializeSignatureUnlockBlock(writeStream, object);
    }
    else if (object.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
        serializeReferenceUnlockBlock(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized unlock block type ${object.type}`);
    }
}
/**
 * Deserialize the signature unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignatureUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Signature Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("signatureUnlockBlock.type");
    if (type !== SIGNATURE_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
    }
    const signature = deserializeSignature(readStream);
    return {
        type: SIGNATURE_UNLOCK_BLOCK_TYPE,
        signature
    };
}
/**
 * Serialize the signature unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignatureUnlockBlock(writeStream, object) {
    writeStream.writeByte("signatureUnlockBlock.type", object.type);
    serializeSignature(writeStream, object.signature);
}
/**
 * Deserialize the reference unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReferenceUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Reference Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("referenceUnlockBlock.type");
    if (type !== REFERENCE_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
    }
    const reference = readStream.readUInt16("referenceUnlockBlock.reference");
    return {
        type: REFERENCE_UNLOCK_BLOCK_TYPE,
        reference
    };
}
/**
 * Serialize the reference unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReferenceUnlockBlock(writeStream, object) {
    writeStream.writeByte("referenceUnlockBlock.type", object.type);
    writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBeUIsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsSCxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFbEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFN0Y7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBVyxpQkFBaUIsQ0FBQztBQUVqRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFXLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDO0FBRXhHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQVcsdUJBQXVCLEdBQUcsV0FBVyxDQUFDO0FBRS9GOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsVUFBc0I7SUFDMUQsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3BGLE1BQU0sWUFBWSxHQUF1QixFQUFFLENBQUM7SUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FDakMsV0FBd0IsRUFDeEIsT0FBMkI7SUFFM0IsV0FBVyxDQUFD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