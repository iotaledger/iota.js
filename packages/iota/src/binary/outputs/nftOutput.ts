// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { NFT_ID_LENGTH } from "../addresses/nftAddress";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
import {
    deserializeFeatures,
    MIN_FEATURE_LENGTH,
    serializeFeatures
} from "../features/features";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";
import { deserializeUnlockConditions, MIN_UNLOCK_CONDITIONS_LENGTH, serializeUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * The minimum length of a nft output binary representation.
 */
export const MIN_NFT_OUTPUT_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native tokens
    NFT_ID_LENGTH + // Nft Id
    MIN_UNLOCK_CONDITIONS_LENGTH + // Unlock conditions
    MIN_FEATURE_LENGTH + // Features
    MIN_FEATURE_LENGTH; // Immutable features

/**
 * Deserialize the nft output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNftOutput(readStream: ReadStream): INftOutput {
    if (!readStream.hasRemaining(MIN_NFT_OUTPUT_LENGTH)) {
        throw new Error(
            `NFT Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_OUTPUT_LENGTH}`
        );
    }

    const type = readStream.readUInt8("nftOutput.type");
    if (type !== NFT_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in nftOutput ${type}`);
    }

    const amount = readStream.readUInt64("nftOutput.amount");
    const nativeTokens = deserializeNativeTokens(readStream);
    const nftId = readStream.readFixedHex("nftOutput.nftId", NFT_ID_LENGTH);

    const unlockConditions = deserializeUnlockConditions(readStream);
    const features = deserializeFeatures(readStream);
    const immutableFeatures = deserializeFeatures(readStream);

    return {
        type: NFT_OUTPUT_TYPE,
        amount: amount.toString(),
        nativeTokens,
        nftId,
        unlockConditions,
        features,
        immutableFeatures
    };
}

/**
 * Serialize the nft output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftOutput(writeStream: WriteStream, object: INftOutput): void {
    writeStream.writeUInt8("nftOutput.type", object.type);

    writeStream.writeUInt64("nftOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    writeStream.writeFixedHex("nftOutput.nftId", NFT_ID_LENGTH, object.nftId);

    serializeUnlockConditions(writeStream, object.unlockConditions);
    serializeFeatures(writeStream, object.features);
    serializeFeatures(writeStream, object.immutableFeatures);
}
