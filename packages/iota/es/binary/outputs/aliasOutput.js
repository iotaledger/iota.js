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
    MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks
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
    const blocks = deserializeFeatureBlocks(readStream);
    return {
        type: ALIAS_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        aliasId,
        stateIndex,
        stateMetadata,
        foundryCounter,
        unlockConditions,
        blocks
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
    serializeFeatureBlocks(writeStream, object.blocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNPdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L291dHB1dHMvYWxpYXNPdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pGLE9BQU8sRUFDSCx3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSxzQkFBc0IsRUFDOUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsNEJBQTRCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU1STs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBVyxFQUFFLENBQUM7QUFFMUM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FDaEMsaUJBQWlCLEdBQUcsT0FBTztJQUMzQixXQUFXLEdBQUcsU0FBUztJQUN2Qix3QkFBd0IsR0FBRyxnQkFBZ0I7SUFDM0MsZUFBZSxHQUFHLFdBQVc7SUFDN0IsV0FBVyxHQUFHLGNBQWM7SUFDNUIsV0FBVyxHQUFHLHdCQUF3QjtJQUN0QyxXQUFXLEdBQUcsa0JBQWtCO0lBQ2hDLDRCQUE0QixHQUFHLG9CQUFvQjtJQUNuRCx5QkFBeUIsQ0FBQyxDQUFDLGlCQUFpQjtBQUVoRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQXNCO0lBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7UUFDbkQsTUFBTSxJQUFJ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