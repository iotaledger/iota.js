import bigInt from "big-integer";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { SMALL_TYPE_LENGTH, UINT256_SIZE, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, NATIVE_TOKEN_TAG_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeTokenScheme, MIN_TOKEN_SCHEME_LENGTH, serializeTokenScheme } from "../tokenSchemes/tokenSchemes";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";
/**
 * The minimum length of a foundry output binary representation.
 */
export const MIN_FOUNDRY_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native tokens
    UINT32_SIZE + // Serial Number
    NATIVE_TOKEN_TAG_LENGTH + // Token Tag
    UINT256_SIZE + // Circulating Supply
    UINT256_SIZE + // Maximum Supply
    MIN_TOKEN_SCHEME_LENGTH + // Token scheme length
    MIN_UNLOCK_CONDITIONS_LENGTH + // Unlock conditions
    MIN_FEATURE_BLOCKS_LENGTH + // Feature Blocks
    MIN_FEATURE_BLOCKS_LENGTH; // Immutable blocks
/**
 * Deserialize the foundry output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFoundryOutput(readStream) {
    if (!readStream.hasRemaining(MIN_FOUNDRY_OUTPUT_LENGTH)) {
        throw new Error(`Foundry Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FOUNDRY_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("foundryOutput.type");
    if (type !== FOUNDRY_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in foundryOutput ${type}`);
    }
    const amount = readStream.readUInt64("foundryOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const serialNumber = readStream.readUInt32("foundryOutput.serialNumber");
    const tokenTag = readStream.readFixedHex("foundryOutput.tokenTag", NATIVE_TOKEN_TAG_LENGTH);
    const circulatingSupply = readStream.readUInt256("foundryOutput.circulatingSupply");
    const maximumSupply = readStream.readUInt256("foundryOutput.maximumSupply");
    const tokenScheme = deserializeTokenScheme(readStream);
    const unlockConditions = deserializeUnlockConditions(readStream);
    const featureBlocks = deserializeFeatureBlocks(readStream);
    const immutableBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: FOUNDRY_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        serialNumber,
        tokenTag,
        circulatingSupply: circulatingSupply.toString(),
        maximumSupply: maximumSupply.toString(),
        tokenScheme,
        unlockConditions,
        featureBlocks: featureBlocks,
        immutableBlocks
    };
}
/**
 * Serialize the foundry output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeFoundryOutput(writeStream, object) {
    writeStream.writeUInt8("foundryOutput.type", object.type);
    writeStream.writeUInt64("foundryOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    writeStream.writeUInt32("foundryOutput.serialNumber", object.serialNumber);
    writeStream.writeFixedHex("foundryOutput.tokenTag", NATIVE_TOKEN_TAG_LENGTH, object.tokenTag);
    writeStream.writeUInt256("foundryOutput.circulatingSupply", bigInt(object.circulatingSupply));
    writeStream.writeUInt256("foundryOutput.maximumSupply", bigInt(object.maximumSupply));
    serializeTokenScheme(writeStream, object.tokenScheme);
    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatureBlocks(writeStream, object.featureBlocks);
    serializeFeatureBlocks(writeStream, object.immutableBlocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm91bmRyeU91dHB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvb3V0cHV0cy9mb3VuZHJ5T3V0cHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUVqQyxPQUFPLEVBQUUsbUJBQW1CLEVBQWtCLE1BQU0scUNBQXFDLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0YsT0FBTyxFQUNILHdCQUF3QixFQUN4Qix5QkFBeUIsRUFDekIsc0JBQXNCLEVBQ3pCLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUNILHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUN4QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSw0QkFBNEIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTVJOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQ2xDLGlCQUFpQixHQUFHLE9BQU87SUFDM0IsV0FBVyxHQUFHLFNBQVM7SUFDdkIsd0JBQXdCLEdBQUcsZ0JBQWdCO0lBQzNDLFdBQVcsR0FBRyxnQkFBZ0I7SUFDOUIsdUJBQXVCLEdBQUcsWUFBWTtJQUN0QyxZQUFZLEdBQUcscUJBQXFCO0lBQ3BDLFlBQVksR0FBRyxpQkFBaUI7SUFDaEMsdUJBQXVCLEdBQUcsc0JBQXNCO0lBQ2hELDRCQUE0QixHQUFHLG9CQUFvQjtJQUNuRCx5QkFBeUIsR0FBRyxpQkFBaUI7SUFDN0MseUJBQXlCLENBQUMsQ0FBQyxtQkFBbUI7QUFFbEQ7Ozs7R0FJ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