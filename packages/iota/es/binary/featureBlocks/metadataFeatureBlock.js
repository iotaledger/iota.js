import { METADATA_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IMetadataFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a metadata feature block binary representation.
 */
export const MIN_METADATA_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
/**
 * Deserialize the metadata feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMetadataFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_METADATA_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Metadata Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_METADATA_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("metadataFeatureBlock.type");
    if (type !== METADATA_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in metadataFeatureBlock ${type}`);
    }
    const dataLength = readStream.readUInt32("metadataFeatureBlock.dataLength");
    const data = readStream.readFixedHex("metadataFeatureBlock.data", dataLength);
    return {
        type: METADATA_FEATURE_BLOCK_TYPE,
        data
    };
}
/**
 * Serialize the metadata feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMetadataFeatureBlock(writeStream, object) {
    writeStream.writeByte("metadataFeatureBlock.type", object.type);
    writeStream.writeUInt32("metadataFeatureBlock.dataLength", object.data.length / 2);
    writeStream.writeFixedHex("metadataFeatureBlock.data", object.data.length / 2, object.data);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGFGZWF0dXJlQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L2ZlYXR1cmVCbG9ja3MvbWV0YWRhdGFGZWF0dXJlQmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUF5QiwyQkFBMkIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFXLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztBQUV6Rjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLCtCQUErQixDQUFDLFVBQXNCO0lBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGlDQUFpQyxDQUFDLEVBQUU7UUFDN0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxrQ0FBa0MsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsaUNBQWlDLEVBQUUsQ0FDM0osQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzlELElBQUksSUFBSSxLQUFLLDJCQUEyQixFQUFFO1FBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDcEU7SUFFRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDNUUsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUU5RSxPQUFPO1FBQ0gsSUFBSSxFQUFFLDJCQUEyQjtRQUNqQyxJQUFJO0tBQ1AsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFdBQXdCLEVBQUUsTUFBNkI7SUFDakcsV0FBVyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRixXQUFXLENBQUMsYUFBYSxDQUFDLDJCQUEyQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEcsQ0FBQyJ9