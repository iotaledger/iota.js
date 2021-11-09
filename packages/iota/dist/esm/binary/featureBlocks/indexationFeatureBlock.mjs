import { INDEXATION_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIndexationFeatureBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a indexation feature block binary representation.
 */
export const MIN_INDEXATION_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
/**
 * Deserialize the indexation feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIndexationFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_INDEXATION_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Indexation Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INDEXATION_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("indexationFeatureBlock.type");
    if (type !== INDEXATION_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in indexationFeatureBlock ${type}`);
    }
    const tagLength = readStream.readUInt32("indexationFeatureBlock.tagLength");
    const tag = readStream.readFixedHex("indexationFeatureBlock.tag", tagLength);
    return {
        type: INDEXATION_FEATURE_BLOCK_TYPE,
        tag
    };
}
/**
 * Serialize the indexation feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeIndexationFeatureBlock(writeStream, object) {
    writeStream.writeByte("indexationFeatureBlock.type", object.type);
    writeStream.writeUInt32("indexationFeatureBlock.tagLength", object.tag.length / 2);
    writeStream.writeFixedHex("indexationFeatureBlock.tag", object.tag.length / 2, object.tag);
}
