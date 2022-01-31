// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import type { IMetadataFeatureBlock } from "../../models/featureBlocks/IMetadataFeatureBlock";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../models/outputs/IFoundryOutput";
import { SMALL_TYPE_LENGTH, UINT256_SIZE, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import {
    deserializeFeatureBlocks,
    MIN_FEATURE_BLOCKS_LENGTH,
    serializeFeatureBlocks
} from "../featureBlocks/featureBlocks";
import {
    deserializeNativeTokens,
    MIN_NATIVE_TOKENS_LENGTH,
    NATIVE_TOKEN_TAG_LENGTH,
    serializeNativeTokens
} from "../nativeTokens";
import { deserializeTokenScheme, MIN_TOKEN_SCHEME_LENGTH, serializeTokenScheme } from "../tokenSchemes/tokenSchemes";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * The minimum length of a foundry output binary representation.
 */
export const MIN_FOUNDRY_OUTPUT_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native tokens
    UINT32_SIZE + // Serial Number
    NATIVE_TOKEN_TAG_LENGTH + // Token Tag
    UINT256_SIZE + // Circulating Supply
    UINT256_SIZE + // Maximum Supply
    MIN_TOKEN_SCHEME_LENGTH + // Token scheme length
    MIN_UNLOCK_CONDITIONS_LENGTH +
    MIN_FEATURE_BLOCKS_LENGTH;

/**
 * Deserialize the foundry output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFoundryOutput(readStream: ReadStream): IFoundryOutput {
    if (!readStream.hasRemaining(MIN_FOUNDRY_OUTPUT_LENGTH)) {
        throw new Error(
            `Foundry Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FOUNDRY_OUTPUT_LENGTH}`
        );
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
    const blocks = deserializeFeatureBlocks(readStream);

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
        blocks: blocks as IMetadataFeatureBlock[]
    };
}

/**
 * Serialize the foundry output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeFoundryOutput(writeStream: WriteStream, object: IFoundryOutput): void {
    writeStream.writeUInt8("foundryOutput.type", object.type);

    writeStream.writeUInt64("foundryOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    writeStream.writeUInt32("foundryOutput.serialNumber", object.serialNumber);
    writeStream.writeFixedHex("foundryOutput.tokenTag", NATIVE_TOKEN_TAG_LENGTH, object.tokenTag);
    writeStream.writeUInt256("foundryOutput.circulatingSupply", bigInt(object.circulatingSupply));
    writeStream.writeUInt256("foundryOutput.maximumSupply", bigInt(object.maximumSupply));
    serializeTokenScheme(writeStream, object.tokenScheme);
    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatureBlocks(writeStream, object.blocks);
}
