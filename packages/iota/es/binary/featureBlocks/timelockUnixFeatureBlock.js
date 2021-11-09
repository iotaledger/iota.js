import { TIMELOCK_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITimelockUnixFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxvY2tVbml4RmVhdHVyZUJsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9mZWF0dXJlQmxvY2tzL3RpbWVsb2NrVW5peEZlYXR1cmVCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBRUgsZ0NBQWdDLEVBQ25DLE1BQU0sc0RBQXNELENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0NBQXNDLEdBQVcsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO0FBRTlGOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsbUNBQW1DLENBQUMsVUFBc0I7SUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsc0NBQXNDLENBQUMsRUFBRTtRQUNsRSxNQUFNLElBQUksS0FBSyxDQUNYLHNDQUFzQyxVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxzQ0FBc0MsRUFBRSxDQUNwSyxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDbEUsSUFBSSxJQUFJLEtBQUssZ0NBQWdDLEVBQUU7UUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN4RTtJQUVELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUU1RSxPQUFPO1FBQ0gsSUFBSSxFQUFFLGdDQUFnQztRQUN0QyxRQUFRO0tBQ1gsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlDQUFpQyxDQUFDLFdBQXdCLEVBQUUsTUFBaUM7SUFDekcsV0FBVyxDQUFDLFNBQVMsQ0FBQywrQkFBK0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxtQ0FBbUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEYsQ0FBQyJ9