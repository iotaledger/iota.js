import { SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of a sender feature block binary representation.
 */
export const MIN_SENDER_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the sender feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSenderFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_SENDER_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Sender Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SENDER_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("senderFeatureBlock.type");
    if (type !== SENDER_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in senderFeatureBlock ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: SENDER_FEATURE_BLOCK_TYPE,
        address
    };
}
/**
 * Serialize the sender feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSenderFeatureBlock(writeStream, object) {
    writeStream.writeByte("senderFeatureBlock.type", object.type);
    serializeAddress(writeStream, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZGVyRmVhdHVyZUJsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9mZWF0dXJlQmxvY2tzL3NlbmRlckZlYXR1cmVCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQXVCLHlCQUF5QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBVyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztBQUU5Rjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFVBQXNCO0lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLCtCQUErQixDQUFDLEVBQUU7UUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxnQ0FBZ0MsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsK0JBQStCLEVBQUUsQ0FDdkosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxLQUFLLHlCQUF5QixFQUFFO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEU7SUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFdBQXdCLEVBQUUsTUFBMkI7SUFDN0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDIn0=