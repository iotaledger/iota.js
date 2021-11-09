// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "../commonDataTypes";
import {
    deserializeFeatureBlocks,
    MIN_FEATURE_BLOCKS_LENGTH,
    serializeFeatureBlocks
} from "../featureBlocks/featureBlocks";
import { deserializeNativeTokens, MIN_NATIVE_TOKENS_LENGTH, serializeNativeTokens } from "../nativeTokens";

/**
 * The length of an NFT Id.
 */
export const NFT_ID_LENGTH: number = 20;

/**
 * The minimum length of a nft output binary representation.
 */
export const MIN_NFT_OUTPUT_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE + // Amount
    MIN_NATIVE_TOKENS_LENGTH + // Native tokens
    MIN_ADDRESS_LENGTH + // Address
    NFT_ID_LENGTH + // Nft Id
    UINT32_SIZE + // Immutable data length
    MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks

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

    const type = readStream.readByte("nftOutput.type");
    if (type !== NFT_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in nftOutput ${type}`);
    }

    const amount = readStream.readUInt64("nftOutput.amount");

    const nativeTokens = deserializeNativeTokens(readStream);

    const address = deserializeAddress(readStream);

    const nftId = readStream.readFixedHex("nftOutput.nftId", NFT_ID_LENGTH);

    const immutableMetadataLength = readStream.readUInt32("nftOutput.immutableMetadataLength");
    const immutableData = readStream.readFixedHex("nftOutput.immutableMetadata", immutableMetadataLength);

    const featureBlocks = deserializeFeatureBlocks(readStream);

    return {
        type: NFT_OUTPUT_TYPE,
        amount: Number(amount),
        nativeTokens,
        address,
        nftId,
        immutableData,
        blocks: featureBlocks
    };
}

/**
 * Serialize the nft output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftOutput(writeStream: WriteStream, object: INftOutput): void {
    writeStream.writeByte("nftOutput.type", object.type);
    writeStream.writeUInt64("nftOutput.amount", bigInt(object.amount));
    serializeNativeTokens(writeStream, object.nativeTokens);
    serializeAddress(writeStream, object.address);

    writeStream.writeFixedHex("nftOutput.nftId", NFT_ID_LENGTH, object.nftId);

    writeStream.writeUInt32("nftOutput.immutableMetadataLength", object.immutableData.length / 2);
    writeStream.writeFixedHex("nftOutput.immutableMetadata", object.immutableData.length / 2, object.immutableData);

    serializeFeatureBlocks(writeStream, object.blocks);
}
