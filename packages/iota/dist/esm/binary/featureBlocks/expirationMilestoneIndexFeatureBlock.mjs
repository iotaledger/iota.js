import { EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationMilestoneIndexFeatureBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a expiration milestone index feature block binary representation.
 */
export const MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
/**
 * Deserialize the expiration milestone index feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeExpirationMilestoneIndexFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`ExpirationMilestoneIndex Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("expirationMilestoneIndexFeatureBlock.type");
    if (type !== EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in expirationMilestoneIndexFeatureBlock ${type}`);
    }
    const milestoneIndex = readStream.readUInt32("expirationMilestoneIndexFeatureBlock.milestoneIndex");
    return {
        type: EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
        milestoneIndex
    };
}
/**
 * Serialize the expiration milestone index feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeExpirationMilestoneIndexFeatureBlock(writeStream, object) {
    writeStream.writeByte("expirationMilestoneIndexFeatureBlock.type", object.type);
    writeStream.writeUInt32("expirationMilestoneIndexFeatureBlock.milestoneIndex", object.milestoneIndex);
}
