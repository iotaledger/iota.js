import { TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITimelockMilestoneIndexFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a timelock milestone index feature block binary representation.
 */
export const MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
/**
 * Deserialize the timelock milestone index feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTimelockMilestoneIndexFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`TimelockMilestoneIndex Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("timelockMilestoneIndexFeatureBlock.type");
    if (type !== TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in timelockMilestoneIndexFeatureBlock ${type}`);
    }
    const milestoneIndex = readStream.readUInt32("timelockMilestoneIndexFeatureBlock.milestoneIndex");
    return {
        type: TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
        milestoneIndex
    };
}
/**
 * Serialize the timelock milestone index feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTimelockMilestoneIndexFeatureBlock(writeStream, object) {
    writeStream.writeByte("timelockMilestoneIndexFeatureBlock.type", object.type);
    writeStream.writeUInt32("timelockMilestoneIndexFeatureBlock.milestoneIndex", object.milestoneIndex);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxvY2tNaWxlc3RvbmVJbmRleEZlYXR1cmVCbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvZmVhdHVyZUJsb2Nrcy90aW1lbG9ja01pbGVzdG9uZUluZGV4RmVhdHVyZUJsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFFSCwyQ0FBMkMsRUFDOUMsTUFBTSxnRUFBZ0UsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxpREFBaUQsR0FBVyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7QUFFekc7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw2Q0FBNkMsQ0FDekQsVUFBc0I7SUFFdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsaURBQWlELENBQUMsRUFBRTtRQUM3RSxNQUFNLElBQUksS0FBSyxDQUNYLGdEQUFnRCxVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxpREFBaUQsRUFBRSxDQUN6TCxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDNUUsSUFBSSxJQUFJLEtBQUssMkNBQTJDLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNsRjtJQUVELE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUVsRyxPQUFPO1FBQ0gsSUFBSSxFQUFFLDJDQUEyQztRQUNqRCxjQUFjO0tBQ2pCLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwyQ0FBMkMsQ0FDdkQsV0FBd0IsRUFDeEIsTUFBMkM7SUFFM0MsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxtREFBbUQsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDeEcsQ0FBQyJ9