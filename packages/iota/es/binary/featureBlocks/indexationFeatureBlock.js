import { INDEXATION_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIndexationFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhhdGlvbkZlYXR1cmVCbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvZmVhdHVyZUJsb2Nrcy9pbmRleGF0aW9uRmVhdHVyZUJsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFFSCw2QkFBNkIsRUFDaEMsTUFBTSxvREFBb0QsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FBVyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7QUFFM0Y7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxpQ0FBaUMsQ0FBQyxVQUFzQjtJQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFO1FBQy9ELE1BQU0sSUFBSSxLQUFLLENBQ1gsb0NBQW9DLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLG1DQUFtQyxFQUFFLENBQy9KLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNoRSxJQUFJLElBQUksS0FBSyw2QkFBNkIsRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3RFO0lBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQzVFLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFN0UsT0FBTztRQUNILElBQUksRUFBRSw2QkFBNkI7UUFDbkMsR0FBRztLQUNOLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwrQkFBK0IsQ0FBQyxXQUF3QixFQUFFLE1BQStCO0lBQ3JHLFdBQVcsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLFdBQVcsQ0FBQyxXQUFXLENBQUMsa0NBQWtDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkYsV0FBVyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9GLENBQUMifQ==