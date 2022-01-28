import { TAG_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITagFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT8_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a tag feature block binary representation.
 */
export const MIN_TAG_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT8_SIZE; // Length
/**
 * Deserialize the tag feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTagFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_TAG_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Tag Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TAG_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("tagFeatureBlock.type");
    if (type !== TAG_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in tagFeatureBlock ${type}`);
    }
    const tagLength = readStream.readUInt8("tagFeatureBlock.tagLength");
    const tag = readStream.readFixedHex("tagFeatureBlock.tag", tagLength);
    return {
        type: TAG_FEATURE_BLOCK_TYPE,
        tag
    };
}
/**
 * Serialize the tag feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTagFeatureBlock(writeStream, object) {
    writeStream.writeUInt8("tagFeatureBlock.type", object.type);
    writeStream.writeUInt8("tagFeatureBlock.tagLength", object.tag.length / 2);
    writeStream.writeFixedHex("tagFeatureBlock.tag", object.tag.length / 2, object.tag);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnRmVhdHVyZUJsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9mZWF0dXJlQmxvY2tzL3RhZ0ZlYXR1cmVCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBRUgsc0JBQXNCLEVBQ3pCLE1BQU0sNkNBQTZDLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5FOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQ3JDLGlCQUFpQixHQUFHLE9BQU87SUFDM0IsVUFBVSxDQUFDLENBQUMsU0FBUztBQUV6Qjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFDLFVBQXNCO0lBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLEVBQUU7UUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FDWCw2QkFBNkIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsNEJBQTRCLEVBQUUsQ0FDakosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzFELElBQUksSUFBSSxLQUFLLHNCQUFzQixFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLElBQUksRUFBRSxDQUFDLENBQUM7S0FDL0Q7SUFFRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDcEUsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUV0RSxPQUFPO1FBQ0gsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixHQUFHO0tBQ04sQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFdBQXdCLEVBQUUsTUFBd0I7SUFDdkYsV0FBVyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsV0FBVyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRSxXQUFXLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEYsQ0FBQyJ9