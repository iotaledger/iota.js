import bigInt from "big-integer";
import { BASIC_OUTPUT_TYPE } from "../../models/outputs/IBasicOutput";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";
/**
 * The minimum length of a basic output binary representation.
 */
export const MIN_BASIC_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native Tokens
    MIN_UNLOCK_CONDITIONS_LENGTH + // Unlock conditions
    MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks
/**
 * Deserialize the basic output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeBasicOutput(readStream) {
    if (!readStream.hasRemaining(MIN_BASIC_OUTPUT_LENGTH)) {
        throw new Error(`Basic Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_BASIC_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("basicOutput.type");
    if (type !== BASIC_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in basicOutput ${type}`);
    }
    const amount = readStream.readUInt64("basicOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const unlockConditions = deserializeUnlockConditions(readStream);
    const featureBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: BASIC_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        unlockConditions,
        featureBlocks
    };
}
/**
 * Serialize the basic output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeBasicOutput(writeStream, object) {
    writeStream.writeUInt8("basicOutput.type", object.type);
    writeStream.writeUInt64("basicOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatureBlocks(writeStream, object.featureBlocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNPdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L291dHB1dHMvYmFzaWNPdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEUsT0FBTyxFQUNILHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLHNCQUFzQixFQUM5RSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSw0QkFBNEIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTVJOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQ2hDLGlCQUFpQixHQUFHLE9BQU87SUFDM0IsV0FBVyxHQUFHLFNBQVM7SUFDdkIsd0JBQXdCLEdBQUcsZ0JBQWdCO0lBQzNDLDRCQUE0QixHQUFHLG9CQUFvQjtJQUNuRCx5QkFBeUIsQ0FBQyxDQUFDLGlCQUFpQjtBQUVoRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQXNCO0lBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7UUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FDWCx3QkFBd0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsdUJBQXVCLEVBQUUsQ0FDdkksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELElBQUksSUFBSSxLQUFLLGlCQUFpQixFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDM0Q7SUFFRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDM0QsTUFBTSxZQUFZLEdBQUcsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsTUFBTSxnQkFBZ0IsR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxNQUFNLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUzRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN0QixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGFBQWE7S0FDaEIsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFdBQXdCLEVBQUUsTUFBb0I7SUFDL0UsV0FBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckUscUJBQXFCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RCx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEUsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM5RCxDQUFDIn0=