// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import {
    deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks
} from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * The length of an alias id.
 */
export const ALIAS_ID_LENGTH: number = 20;

/**
 * The minimum length of a alias output binary representation.
 */
export const MIN_ALIAS_OUTPUT_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
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
export function deserializeAliasOutput(readStream: ReadStream): IAliasOutput {
    if (!readStream.hasRemaining(MIN_ALIAS_OUTPUT_LENGTH)) {
        throw new Error(
            `Alias Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_OUTPUT_LENGTH}`
        );
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
        amount: amount.toString(),
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
export function serializeAliasOutput(writeStream: WriteStream, object: IAliasOutput): void {
    writeStream.writeUInt8("aliasOutput.type", object.type);
    writeStream.writeUInt64("aliasOutput.amount", bigInt(object.amount));

    serializeNativeTokens(writeStream, object.nativeTokens);

    writeStream.writeFixedHex("aliasOutput.aliasId", ALIAS_ID_LENGTH, object.aliasId);

    writeStream.writeUInt32("aliasOutput.stateIndex", object.stateIndex);

    const stateMetadata = HexHelper.stripPrefix(object.stateMetadata);
    writeStream.writeUInt32("aliasOutput.stateMetadataLength", stateMetadata.length / 2);
    if (stateMetadata.length > 0) {
        writeStream.writeFixedHex("aliasOutput.stateMetadata", stateMetadata.length / 2, stateMetadata);
    }

    writeStream.writeUInt32("aliasOutput.foundryCounter", object.foundryCounter);

    serializeUnlockConditions(writeStream, object.unlockConditions);

    serializeFeatureBlocks(writeStream, object.featureBlocks);
    serializeFeatureBlocks(writeStream, object.immutableBlocks);
}
