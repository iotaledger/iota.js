import { TIMELOCK_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITimelockUnixFeatureBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a timelock unix feature block binary representation.
 */
export const MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
/**
 * Deserialize the timelock unix feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTimelockUnixFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`TimelockUnix Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("timelockUnixFeatureBlock.type");
    if (type !== TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in timelockUnixFeatureBlock ${type}`);
    }
    const unixTime = readStream.readUInt32("timelockUnixFeatureBlock.unixTime");
    return {
        type: TIMELOCK_UNIX_FEATURE_BLOCK_TYPE,
        unixTime
    };
}
/**
 * Serialize the timelock unix feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTimelockUnixFeatureBlock(writeStream, object) {
    writeStream.writeByte("timelockUnixFeatureBlock.type", object.type);
    writeStream.writeUInt32("timelockUnixFeatureBlock.unixTime", object.unixTime);
}
