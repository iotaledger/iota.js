import { EXPIRATION_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationUnixFeatureBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a expiration unix feature block binary representation.
 */
export const MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
/**
 * Deserialize the expiration unix feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeExpirationUnixFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`ExpirationUnix Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("expirationUnixFeatureBlock.type");
    if (type !== EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in expirationUnixFeatureBlock ${type}`);
    }
    const unixTime = readStream.readUInt32("expirationUnixFeatureBlock.unixTime");
    return {
        type: EXPIRATION_UNIX_FEATURE_BLOCK_TYPE,
        unixTime
    };
}
/**
 * Serialize the expiration unix feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeExpirationUnixFeatureBlock(writeStream, object) {
    writeStream.writeByte("expirationUnixFeatureBlock.type", object.type);
    writeStream.writeUInt32("expirationUnixFeatureBlock.unixTime", object.unixTime);
}
