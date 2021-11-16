import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/IReferenceUnlockBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a reference unlock block binary representation.
 */
export const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
/**
 * Deserialize the reference unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReferenceUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Reference Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("referenceUnlockBlock.type");
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
    writeStream.writeUInt8("referenceUnlockBlock.type", object.type);
    writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
}
