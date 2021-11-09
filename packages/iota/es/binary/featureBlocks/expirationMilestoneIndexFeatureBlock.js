import { EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationMilestoneIndexFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJhdGlvbk1pbGVzdG9uZUluZGV4RmVhdHVyZUJsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9mZWF0dXJlQmxvY2tzL2V4cGlyYXRpb25NaWxlc3RvbmVJbmRleEZlYXR1cmVCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBRUgsNkNBQTZDLEVBQ2hELE1BQU0sa0VBQWtFLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sbURBQW1ELEdBQVcsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO0FBRTNHOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsK0NBQStDLENBQzNELFVBQXNCO0lBRXRCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG1EQUFtRCxDQUFDLEVBQUU7UUFDL0UsTUFBTSxJQUFJLEtBQUssQ0FDWCxrREFBa0QsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsbURBQW1ELEVBQUUsQ0FDN0wsQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0lBQzlFLElBQUksSUFBSSxLQUFLLDZDQUE2QyxFQUFFO1FBQ3hELE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELElBQUksRUFBRSxDQUFDLENBQUM7S0FDcEY7SUFFRCxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7SUFFcEcsT0FBTztRQUNILElBQUksRUFBRSw2Q0FBNkM7UUFDbkQsY0FBYztLQUNqQixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsNkNBQTZDLENBQ3pELFdBQXdCLEVBQ3hCLE1BQTZDO0lBRTdDLFdBQVcsQ0FBQyxTQUFTLENBQUMsMkNBQTJDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLFdBQVcsQ0FBQyxXQUFXLENBQUMscURBQXFELEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzFHLENBQUMifQ==