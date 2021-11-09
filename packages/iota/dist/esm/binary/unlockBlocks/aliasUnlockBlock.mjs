import { ALIAS_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/IAliasUnlockBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a alias unlock block binary representation.
 */
export const MIN_ALIAS_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
/**
 * Deserialize the alias unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAliasUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_ALIAS_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Alias Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("aliasUnlockBlock.type");
    if (type !== ALIAS_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in aliasUnlockBlock ${type}`);
    }
    const reference = readStream.readUInt16("aliasUnlockBlock.reference");
    return {
        type: ALIAS_UNLOCK_BLOCK_TYPE,
        reference
    };
}
/**
 * Serialize the alias unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAliasUnlockBlock(writeStream, object) {
    writeStream.writeByte("aliasUnlockBlock.type", object.type);
    writeStream.writeUInt16("aliasUnlockBlock.reference", object.reference);
}
