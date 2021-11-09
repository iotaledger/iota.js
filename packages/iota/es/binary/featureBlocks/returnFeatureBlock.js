import bigInt from "big-integer";
import { RETURN_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IReturnFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a return feature block binary representation.
 */
export const MIN_RETURN_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT64_SIZE;
/**
 * Deserialize the return feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReturnFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_RETURN_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Return Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_RETURN_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("returnFeatureBlock.type");
    if (type !== RETURN_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in returnFeatureBlock ${type}`);
    }
    const amount = readStream.readUInt64("returnFeatureBlock.amount");
    return {
        type: RETURN_FEATURE_BLOCK_TYPE,
        amount: Number(amount)
    };
}
/**
 * Serialize the return feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReturnFeatureBlock(writeStream, object) {
    writeStream.writeByte("returnFeatureBlock.type", object.type);
    writeStream.writeUInt64("returnFeatureBlock.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuRmVhdHVyZUJsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9mZWF0dXJlQmxvY2tzL3JldHVybkZlYXR1cmVCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUF1Qix5QkFBeUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ2hILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFXLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztBQUV2Rjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFVBQXNCO0lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLCtCQUErQixDQUFDLEVBQUU7UUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxnQ0FBZ0MsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsK0JBQStCLEVBQUUsQ0FDdkosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxLQUFLLHlCQUF5QixFQUFFO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEU7SUFFRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFFbEUsT0FBTztRQUNILElBQUksRUFBRSx5QkFBeUI7UUFDL0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDekIsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFdBQXdCLEVBQUUsTUFBMkI7SUFDN0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsV0FBVyxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEYsQ0FBQyJ9