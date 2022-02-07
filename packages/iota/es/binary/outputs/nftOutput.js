import bigInt from "big-integer";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";
/**
 * The length of an NFT Id.
 */
export const NFT_ID_LENGTH = 20;
/**
 * The minimum length of a nft output binary representation.
 */
export const MIN_NFT_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native tokens
    NFT_ID_LENGTH + // Nft Id
    MIN_UNLOCK_CONDITIONS_LENGTH + // Unlock conditions
    MIN_FEATURE_BLOCKS_LENGTH + // Feature Blocks
    MIN_FEATURE_BLOCKS_LENGTH; // Immutable blocks
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
    const amount = readStream.readUInt64("nftOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const nftId = readStream.readFixedHex("nftOutput.nftId", NFT_ID_LENGTH);
    const unlockConditions = deserializeUnlockConditions(readStream);
    const featureBlocks = deserializeFeatureBlocks(readStream);
    const immutableBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: NFT_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        nftId,
        unlockConditions,
        featureBlocks,
        immutableBlocks
    };
}
/**
 * Serialize the nft output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftOutput(writeStream, object) {
    writeStream.writeUInt8("nftOutput.type", object.type);
    writeStream.writeUInt64("nftOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    writeStream.writeFixedHex("nftOutput.nftId", NFT_ID_LENGTH, object.nftId);
    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatureBlocks(writeStream, object.featureBlocks);
    serializeFeatureBlocks(writeStream, object.immutableBlocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0T3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXRzL25mdE91dHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRSxPQUFPLEVBQ0gsd0JBQXdCLEVBQ3hCLHlCQUF5QixFQUN6QixzQkFBc0IsRUFDekIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsNEJBQTRCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU1STs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBVyxFQUFFLENBQUM7QUFFeEM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FDOUIsaUJBQWlCLEdBQUcsT0FBTztJQUMzQixXQUFXLEdBQUcsU0FBUztJQUN2Qix3QkFBd0IsR0FBRyxnQkFBZ0I7SUFDM0MsYUFBYSxHQUFHLFNBQVM7SUFDekIsNEJBQTRCLEdBQUcsb0JBQW9CO0lBQ25ELHlCQUF5QixHQUFHLGlCQUFpQjtJQUM3Qyx5QkFBeUIsQ0FBQyxDQUFDLG1CQUFtQjtBQUVsRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFVBQXNCO0lBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FDWCxzQkFBc0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UscUJBQXFCLEVBQUUsQ0FDbkksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELElBQUksSUFBSSxLQUFLLGVBQWUsRUFBRTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFeEUsTUFBTSxnQkFBZ0IsR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxNQUFNLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzRCxNQUFNLGVBQWUsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU3RCxPQUFPO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdEIsWUFBWTtRQUNaLEtBQUs7UUFDTCxnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLGVBQWU7S0FDbEIsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFdBQXdCLEVBQUUsTUFBa0I7SUFDM0UsV0FBVyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkUscUJBQXFCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RCxXQUFXLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFMUUseUJBQXlCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hFLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUQsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNoRSxDQUFDIn0=