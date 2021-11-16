import bigInt from "big-integer";
import { EXTENDED_OUTPUT_TYPE } from "../../models/outputs/IExtendedOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, serializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, serializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH } from "../nativeTokens";
/**
 * The minimum length of a extended output binary representation.
 */
export const MIN_EXTENDED_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    MIN_ADDRESS_LENGTH + // Address
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native Tokens
    MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks
/**
 * Deserialize the extended output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeExtendedOutput(readStream) {
    if (!readStream.hasRemaining(MIN_EXTENDED_OUTPUT_LENGTH)) {
        throw new Error(`Extended Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXTENDED_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("extendedOutput.type");
    if (type !== EXTENDED_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in extendedOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("extendedOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const featureBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: EXTENDED_OUTPUT_TYPE,
        amount: Number(amount),
        address,
        nativeTokens,
        blocks: featureBlocks
    };
}
/**
 * Serialize the extended output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeExtendedOutput(writeStream, object) {
    writeStream.writeUInt8("extendedOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("extendedOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    serializeFeatureBlocks(writeStream, object.blocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWRPdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L291dHB1dHMvZXh0ZW5kZWRPdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBbUIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEUsT0FBTyxFQUNILHdCQUF3QixFQUN4QixzQkFBc0IsRUFDdEIseUJBQXlCLEVBQzVCLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0c7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FDbkMsaUJBQWlCLEdBQUcsT0FBTztJQUMzQixrQkFBa0IsR0FBRyxVQUFVO0lBQy9CLFdBQVcsR0FBRyxTQUFTO0lBQ3ZCLHdCQUF3QixHQUFHLGdCQUFnQjtJQUMzQyx5QkFBeUIsQ0FBQyxDQUFDLGlCQUFpQjtBQUVoRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUFDLFVBQXNCO0lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwyQkFBMkIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsMEJBQTBCLEVBQUUsQ0FDN0ksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pELElBQUksSUFBSSxLQUFLLG9CQUFvQixFQUFFO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDOUQsTUFBTSxZQUFZLEdBQUcsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsTUFBTSxhQUFhLEdBQUcsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFM0QsT0FBTztRQUNILElBQUksRUFBRSxvQkFBb0I7UUFDMUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdEIsT0FBTztRQUNQLFlBQVk7UUFDWixNQUFNLEVBQUUsYUFBYTtLQUN4QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsV0FBd0IsRUFBRSxNQUF1QjtJQUNyRixXQUFXLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUzRCxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLFdBQVcsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEQsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2RCxDQUFDIn0=