import bigInt from "big-integer";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import { deserializeFeatureBlocks, serializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH } from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, serializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH } from "../nativeTokens";
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
    MIN_ADDRESS_LENGTH + // State Controller
    MIN_ADDRESS_LENGTH + // Governance Controller
    UINT32_SIZE + // State Index
    UINT32_SIZE + // State Metatata Length
    UINT32_SIZE + // Foundry counter
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
    const stateController = deserializeAddress(readStream);
    const governanceController = deserializeAddress(readStream);
    const stateIndex = readStream.readUInt32("aliasOutput.stateIndex");
    const stateMetadataLength = readStream.readUInt32("aliasOutput.stateMetadataLength");
    const stateMetadata = readStream.readFixedHex("aliasOutput.stateMetadata", stateMetadataLength);
    const foundryCounter = readStream.readUInt32("aliasOutput.foundryCounter");
    const featureBlocks = deserializeFeatureBlocks(readStream);
    return {
        type: ALIAS_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        aliasId,
        stateController,
        governanceController,
        stateIndex,
        stateMetadata,
        foundryCounter,
        blocks: featureBlocks
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
    serializeAddress(writeStream, object.stateController);
    serializeAddress(writeStream, object.governanceController);
    writeStream.writeUInt32("aliasOutput.stateIndex", object.stateIndex);
    writeStream.writeUInt32("aliasOutput.stateMetadataLength", object.stateMetadata.length / 2);
    writeStream.writeFixedHex("aliasOutput.stateMetadata", object.stateMetadata.length / 2, object.stateMetadata);
    writeStream.writeUInt32("aliasOutput.foundryCounter", object.foundryCounter);
    serializeFeatureBlocks(writeStream, object.blocks);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNPdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L291dHB1dHMvYWxpYXNPdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pGLE9BQU8sRUFDSCx3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUM1QixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFXLEVBQUUsQ0FBQztBQUUxQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUNoQyxpQkFBaUIsR0FBRyxPQUFPO0lBQzNCLFdBQVcsR0FBRyxTQUFTO0lBQ3ZCLHdCQUF3QixHQUFHLGdCQUFnQjtJQUMzQyxlQUFlLEdBQUcsV0FBVztJQUM3QixrQkFBa0IsR0FBRyxtQkFBbUI7SUFDeEMsa0JBQWtCLEdBQUcsd0JBQXdCO0lBQzdDLFdBQVcsR0FBRyxjQUFjO0lBQzVCLFdBQVcsR0FBRyx3QkFBd0I7SUFDdEMsV0FBVyxHQUFHLGtCQUFrQjtJQUNoQyx5QkFBeUIsQ0FBQyxDQUFDLGlCQUFpQjtBQUVoRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQXNCO0lBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHVCQUF1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