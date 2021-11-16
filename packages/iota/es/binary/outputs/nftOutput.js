import bigInt from "big-integer";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
/**
 * The length of an NFT Id.
 */
export const NFT_ID_LENGTH = 20;
/**
 * The minimum length of a nft output binary representation.
 */
export const MIN_NFT_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    MIN_ADDRESS_LENGTH + // Address
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native tokens
    NFT_ID_LENGTH + // Nft Id
    UINT32_SIZE + // Immutable data length
    MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks
/**
 * Deserialize the nft output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNftOutput(readStream) {
    if (!readStream.hasRemaining(MIN_NFT_OUTPUT_LENGTH)) {
        throw new Error(`NFT Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("nftOutput.type");
    if (type !== NFT_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in nftOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("nftOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const nftId = readStream.readFixedHex("nftOutput.nftId", NFT_ID_LENGTH);
    const immutableMetadataLength = readStream.readUInt32("nftOutput.immutableMetadataLength");
    const immutableData = readStream.readFixedHex("nftOutput.immutableMetadata", immutableMetadataLength);
    const featureBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: NFT_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        address,
        nftId,
        immutableData,
        blocks: featureBlocks
    };
}
/**
 * Serialize the nft output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftOutput(writeStream, object) {
    writeStream.writeUInt8("nftOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("nftOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    writeStream.writeFixedHex("nftOutput.nftId", NFT_ID_LENGTH, object.nftId);
    writeStream.writeUInt32("nftOutput.immutableMetadataLength", object.immutableData.length / 2);
    writeStream.writeFixedHex("nftOutput.immutableMetadata", object.immutableData.length / 2, object.immutableData);
    serializeFeatureBlocks(writeStream, object.blocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0T3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXRzL25mdE91dHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakYsT0FBTyxFQUNILHdCQUF3QixFQUN4Qix5QkFBeUIsRUFDekIsc0JBQXNCLEVBQ3pCLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0c7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQVcsRUFBRSxDQUFDO0FBRXhDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQzlCLGlCQUFpQixHQUFHLE9BQU87SUFDM0Isa0JBQWtCLEdBQUcsVUFBVTtJQUMvQixXQUFXLEdBQUcsU0FBUztJQUN2Qix3QkFBd0IsR0FBRyxnQkFBZ0I7SUFDM0MsYUFBYSxHQUFHLFNBQVM7SUFDekIsV0FBVyxHQUFHLHdCQUF3QjtJQUN0Qyx5QkFBeUIsQ0FBQyxDQUFDLGlCQUFpQjtBQUVoRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFVBQXNCO0lBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FDWCxzQkFBc0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UscUJBQXFCLEVBQUUsQ0FDbkksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELElBQUksSUFBSSxLQUFLLGVBQWUsRUFBRTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFeEUsTUFBTSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDM0YsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBRXRHLE1BQU0sYUFBYSxHQUFHLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTNELE9BQU87UUFDSCxJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN0QixZQUFZO1FBQ1osT0FBTztRQUNQLEtBQUs7UUFDTCxhQUFhO1FBQ2IsTUFBTSxFQUFFLGFBQWE7S0FDeEIsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFdBQXdCLEVBQUUsTUFBa0I7SUFDM0UsV0FBVyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEQsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRSxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hELFdBQVcsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRSxXQUFXLENBQUMsV0FBVyxDQUFDLG1DQUFtQyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlGLFdBQVcsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVoSCxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELENBQUMifQ==