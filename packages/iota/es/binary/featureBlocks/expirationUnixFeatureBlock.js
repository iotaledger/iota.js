import { EXPIRATION_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationUnixFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
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
    const type = readStream.readUInt8("expirationUnixFeatureBlock.type");
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
    writeStream.writeUInt8("expirationUnixFeatureBlock.type", object.type);
    writeStream.writeUInt32("expirationUnixFeatureBlock.unixTime", object.unixTime);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJhdGlvblVuaXhGZWF0dXJlQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L2ZlYXR1cmVCbG9ja3MvZXhwaXJhdGlvblVuaXhGZWF0dXJlQmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUVILGtDQUFrQyxFQUNyQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHdDQUF3QyxHQUFXLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztBQUVoRzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFDQUFxQyxDQUFDLFVBQXNCO0lBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHdDQUF3QyxDQUFDLEVBQUU7UUFDcEUsTUFBTSxJQUFJLEtBQUssQ0FDWCx3Q0FBd0MsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usd0NBQXdDLEVBQUUsQ0FDeEssQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ3JFLElBQUksSUFBSSxLQUFLLGtDQUFrQyxFQUFFO1FBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDMUU7SUFFRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFFOUUsT0FBTztRQUNILElBQUksRUFBRSxrQ0FBa0M7UUFDeEMsUUFBUTtLQUNYLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxtQ0FBbUMsQ0FDL0MsV0FBd0IsRUFDeEIsTUFBbUM7SUFFbkMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxxQ0FBcUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEYsQ0FBQyJ9