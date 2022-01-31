// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { EXTENDED_OUTPUT_TYPE, IExtendedOutput } from "../../models/outputs/IExtendedOutput";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
import {
    deserializeFeatureBlocks, MIN_FEATURE_BLOCKS_LENGTH, serializeFeatureBlocks
} from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * The minimum length of a extended output binary representation.
 */
export const MIN_EXTENDED_OUTPUT_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native Tokens
    MIN_UNLOCK_CONDITIONS_LENGTH + // Unlock conditions
    MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks

/**
 * Deserialize the extended output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeExtendedOutput(readStream: ReadStream): IExtendedOutput {
    if (!readStream.hasRemaining(MIN_EXTENDED_OUTPUT_LENGTH)) {
        throw new Error(
            `Extended Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXTENDED_OUTPUT_LENGTH}`
        );
    }

    const type = readStream.readUInt8("extendedOutput.type");
    if (type !== EXTENDED_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in extendedOutput ${type}`);
    }

    const amount = readStream.readUInt64("extendedOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const unlockConditions = deserializeUnlockConditions(readStream);
    const featureBlocks = deserializeFeatureBlocks(readStream);

    return {
        type: EXTENDED_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        unlockConditions,
        blocks: featureBlocks
    };
}

/**
 * Serialize the extended output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeExtendedOutput(writeStream: WriteStream, object: IExtendedOutput): void {
    writeStream.writeUInt8("extendedOutput.type", object.type);

    writeStream.writeUInt64("extendedOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatureBlocks(writeStream, object.blocks);
}
