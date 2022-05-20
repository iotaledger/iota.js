// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
import {
    deserializeFeatures, MIN_FEATURE_LENGTH, serializeFeatures
} from "../features/features";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * The minimum length of a basic output binary representation.
 */
export const MIN_BASIC_OUTPUT_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native Tokens
    MIN_UNLOCK_CONDITIONS_LENGTH + // Unlock conditions
    MIN_FEATURE_LENGTH; // Features

/**
 * Deserialize the basic output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeBasicOutput(readStream: ReadStream): IBasicOutput {
    if (!readStream.hasRemaining(MIN_BASIC_OUTPUT_LENGTH)) {
        throw new Error(
            `Basic Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_BASIC_OUTPUT_LENGTH}`
        );
    }

    const type = readStream.readUInt8("basicOutput.type");
    if (type !== BASIC_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in basicOutput ${type}`);
    }

    const amount = readStream.readUInt64("basicOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const unlockConditions = deserializeUnlockConditions(readStream);
    const features = deserializeFeatures(readStream);

    return {
        type: BASIC_OUTPUT_TYPE,
        amount: amount.toString(),
        nativeTokens,
        unlockConditions,
        features
    };
}

/**
 * Serialize the basic output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeBasicOutput(writeStream: WriteStream, object: IBasicOutput): void {
    writeStream.writeUInt8("basicOutput.type", object.type);

    writeStream.writeUInt64("basicOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatures(writeStream, object.features);
}
