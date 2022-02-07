import bigInt from "big-integer";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";
/**
 * The length of an alias id.
 */
export const ALIAS_ID_LENGTH = 20;
/**
 * The minimum length of a alias output binary representation.
 */
export const MIN_ALIAS_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native Tokens
    ALIAS_ID_LENGTH + // Alias Id
    UINT32_SIZE + // State Index
    UINT32_SIZE + // State Metatata Length
    UINT32_SIZE + // Foundry counter
    MIN_UNLOCK_CONDITIONS_LENGTH + // Unlock conditions
    MIN_FEATURE_BLOCKS_LENGTH + // Feature Blocks
    MIN_FEATURE_BLOCKS_LENGTH; // Immutable blocks
/**
 * Deserialize the alias output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAliasOutput(readStream) {
    if (!readStream.hasRemaining(MIN_ALIAS_OUTPUT_LENGTH)) {
        throw new Error(`Alias Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("aliasOutput.type");
    if (type !== ALIAS_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in aliasOutput ${type}`);
    }
    const amount = readStream.readUInt64("aliasOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const aliasId = readStream.readFixedHex("aliasOutput.aliasId", ALIAS_ID_LENGTH);
    const stateIndex = readStream.readUInt32("aliasOutput.stateIndex");
    const stateMetadataLength = readStream.readUInt32("aliasOutput.stateMetadataLength");
    const stateMetadata = readStream.readFixedHex("aliasOutput.stateMetadata", stateMetadataLength);
    const foundryCounter = readStream.readUInt32("aliasOutput.foundryCounter");
    const unlockConditions = deserializeUnlockConditions(readStream);
    const featureBlocks = deserializeFeatureBlocks(readStream);
    const immutableBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: ALIAS_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        aliasId,
        stateIndex,
        stateMetadata,
        foundryCounter,
        unlockConditions,
        featureBlocks,
        immutableBlocks
    };
}
/**
 * Serialize the alias output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAliasOutput(writeStream, object) {
    writeStream.writeUInt8("aliasOutput.type", object.type);
    writeStream.writeUInt64("aliasOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    writeStream.writeFixedHex("aliasOutput.aliasId", ALIAS_ID_LENGTH, object.aliasId);
    writeStream.writeUInt32("aliasOutput.stateIndex", object.stateIndex);
    writeStream.writeUInt32("aliasOutput.stateMetadataLength", object.stateMetadata.length / 2);
    if (object.stateMetadata.length > 0) {
        writeStream.writeFixedHex("aliasOutput.stateMetadata", object.stateMetadata.length / 2, object.stateMetadata);
    }
    writeStream.writeUInt32("aliasOutput.foundryCounter", object.foundryCounter);
    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatureBlocks(writeStream, object.featureBlocks);
    serializeFeatureBlocks(writeStream, object.immutableBlocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNPdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L291dHB1dHMvYWxpYXNPdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pGLE9BQU8sRUFDSCx3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSxzQkFBc0IsRUFDOUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsNEJBQTRCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU1STs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBVyxFQUFFLENBQUM7QUFFMUM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FDaEMsaUJBQWlCLEdBQUcsT0FBTztJQUMzQixXQUFXLEdBQUcsU0FBUztJQUN2Qix3QkFBd0IsR0FBRyxnQkFBZ0I7SUFDM0MsZUFBZSxHQUFHLFdBQVc7SUFDN0IsV0FBVyxHQUFHLGNBQWM7SUFDNUIsV0FBVyxHQUFHLHdCQUF3QjtJQUN0QyxXQUFXLEdBQUcsa0JBQWtCO0lBQ2hDLDRCQUE0QixHQUFHLG9CQUFvQjtJQUNuRCx5QkFBeUIsR0FBRyxpQkFBaUI7SUFDN0MseUJBQXlCLENBQUMsQ0FBQyxtQkFBbUI7QUFFbEQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxVQUFzQjtJQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1FBQ25ELE1BQU0sSUFBSSxLQUFLLENBQ1gsd0JBQXdCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLHVCQUF1QixFQUFFLENBQ3ZJLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN0RCxJQUFJLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTNELE1BQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXpELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFFaEYsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBRW5FLE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsMkJBQTJCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUVoRyxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFFM0UsTUFBTSxnQkFBZ0IsR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVqRSxNQUFNLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUzRCxNQUFNLGVBQWUsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU3RCxPQUFPO1FBQ0gsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN0QixZQUFZO1FBQ1osT0FBTztRQUNQLFVBQVU7UUFDVixhQUFhO1FBQ2IsY0FBYztRQUNkLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsZUFBZTtLQUNsQixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsV0FBd0IsRUFBRSxNQUFvQjtJQUMvRSxXQUFXLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxXQUFXLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUVyRSxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXhELFdBQVcsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsRixXQUFXLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVyRSxXQUFXLENBQUMsV0FBVyxDQUFDLGlDQUFpQyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVGLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2pDLFdBQVcsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNqSDtJQUVELFdBQVcsQ0FBQyxXQUFXLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTdFLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUVoRSxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFELHNCQUFzQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEUsQ0FBQyJ9