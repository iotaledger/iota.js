import { INDEXATION_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIndexationFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT8_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a indexation feature block binary representation.
 */
export const MIN_INDEXATION_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT8_SIZE; // Length
/**
 * Deserialize the indexation feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIndexationFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_INDEXATION_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Indexation Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INDEXATION_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("indexationFeatureBlock.type");
    if (type !== INDEXATION_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in indexationFeatureBlock ${type}`);
    }
    const tagLength = readStream.readUInt8("indexationFeatureBlock.tagLength");
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
    writeStream.writeUInt8("indexationFeatureBlock.type", object.type);
    writeStream.writeUInt8("indexationFeatureBlock.tagLength", object.tag.length / 2);
    writeStream.writeFixedHex("indexationFeatureBlock.tag", object.tag.length / 2, object.tag);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhhdGlvbkZlYXR1cmVCbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvZmVhdHVyZUJsb2Nrcy9pbmRleGF0aW9uRmVhdHVyZUJsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFFSCw2QkFBNkIsRUFDaEMsTUFBTSxvREFBb0QsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbkU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FDNUMsaUJBQWlCLEdBQUcsT0FBTztJQUMzQixVQUFVLENBQUMsQ0FBQyxTQUFTO0FBRXpCOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUNBQWlDLENBQUMsVUFBc0I7SUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsbUNBQW1DLENBQUMsRUFBRTtRQUMvRCxNQUFNLElBQUksS0FBSyxDQUNYLG9DQUFvQyxVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxtQ0FBbUMsRUFBRSxDQUMvSixDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDakUsSUFBSSxJQUFJLEtBQUssNkJBQTZCLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RTtJQUVELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUMzRSxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLDRCQUE0QixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRTdFLE9BQU87UUFDSCxJQUFJLEVBQUUsNkJBQTZCO1FBQ25DLEdBQUc7S0FDTixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsK0JBQStCLENBQUMsV0FBd0IsRUFBRSxNQUErQjtJQUNyRyxXQUFXLENBQUMsVUFBVSxDQUFDLDZCQUE2QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxXQUFXLENBQUMsVUFBVSxDQUFDLGtDQUFrQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLFdBQVcsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvRixDQUFDIn0=