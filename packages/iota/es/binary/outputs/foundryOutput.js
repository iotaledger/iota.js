import bigInt from "big-integer";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT256_SIZE, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, NATIVE_TOKEN_TAG_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeTokenScheme, MIN_TOKEN_SCHEME_LENGTH, serializeTokenScheme } from "../tokenSchemes/tokenSchemes";
/**
 * The minimum length of a foundry output binary representation.
 */
export const MIN_FOUNDRY_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    MIN_ADDRESS_LENGTH + // Address
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native tokens
    UINT32_SIZE + // Serial Number
    NATIVE_TOKEN_TAG_LENGTH + // Token Tag
    UINT256_SIZE + // Circulating Supply
    UINT256_SIZE + // Maximum Supply
    MIN_TOKEN_SCHEME_LENGTH + // Token scheme length
    MIN_FEATURE_BLOCKS_LENGTH;
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
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("foundryOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const serialNumber = readStream.readUInt32("foundryOutput.serialNumber");
    const tokenTag = readStream.readFixedHex("foundryOutput.tokenTag", NATIVE_TOKEN_TAG_LENGTH);
    const circulatingSupply = readStream.readUInt256("foundryOutput.circulatingSupply");
    const maximumSupply = readStream.readUInt256("foundryOutput.maximumSupply");
    const tokenScheme = deserializeTokenScheme(readStream);
    const featureBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: FOUNDRY_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        address,
        serialNumber,
        tokenTag,
        circulatingSupply: circulatingSupply.toString(),
        maximumSupply: maximumSupply.toString(),
        tokenScheme,
        blocks: featureBlocks
    };
}
/**
 * Serialize the foundry output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeFoundryOutput(writeStream, object) {
    writeStream.writeUInt8("foundryOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("foundryOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    writeStream.writeUInt32("foundryOutput.serialNumber", object.serialNumber);
    writeStream.writeFixedHex("foundryOutput.tokenTag", NATIVE_TOKEN_TAG_LENGTH, object.tokenTag);
    writeStream.writeUInt256("foundryOutput.circulatingSupply", bigInt(object.circulatingSupply));
    writeStream.writeUInt256("foundryOutput.maximumSupply", bigInt(object.maximumSupply));
    serializeTokenScheme(writeStream, object.tokenScheme);
    serializeFeatureBlocks(writeStream, object.blocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm91bmRyeU91dHB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvb3V0cHV0cy9mb3VuZHJ5T3V0cHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUdqQyxPQUFPLEVBQUUsbUJBQW1CLEVBQWtCLE1BQU0scUNBQXFDLENBQUM7QUFDMUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0YsT0FBTyxFQUNILHdCQUF3QixFQUN4Qix5QkFBeUIsRUFDekIsc0JBQXNCLEVBQ3pCLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUNILHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUN4QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJIOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQ2xDLGlCQUFpQixHQUFHLE9BQU87SUFDM0Isa0JBQWtCLEdBQUcsVUFBVTtJQUMvQixXQUFXLEdBQUcsU0FBUztJQUN2Qix3QkFBd0IsR0FBRyxnQkFBZ0I7SUFDM0MsV0FBVyxHQUFHLGdCQUFnQjtJQUM5Qix1QkFBdUIsR0FBRyxZQUFZO0lBQ3RDLFlBQVksR0FBRyxxQkFBcUI7SUFDcEMsWUFBWSxHQUFHLGlCQUFpQjtJQUNoQyx1QkFBdUIsR0FBRyxzQkFBc0I7SUFDaEQseUJBQXlCLENBQUM7QUFFOUI7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxVQUFzQjtJQUMz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