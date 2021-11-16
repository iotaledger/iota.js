import bigInt from "big-integer";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes.mjs";
import { deserializeFeatureBlocks, serializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH } from "../featureBlocks/featureBlocks.mjs";
import { deserializeNativeTokens, serializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH } from "../nativeTokens.mjs";
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
