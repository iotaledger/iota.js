// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { HexHelper } from "@iota/util.js";
import { ISimpleTokenScheme, SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { SMALL_TYPE_LENGTH, UINT256_SIZE } from "../commonDataTypes";

/**
 * The minimum length of an simple token scheme binary representation.
 */
export const MIN_SIMPLE_TOKEN_SCHEME_LENGTH: number =
    SMALL_TYPE_LENGTH + // type
    UINT256_SIZE + // Minted
    UINT256_SIZE + // Melted
    UINT256_SIZE; // Maximum Supply;

/**
 * Deserialize the simple token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleTokenScheme(readStream: ReadStream): ISimpleTokenScheme {
    if (!readStream.hasRemaining(MIN_SIMPLE_TOKEN_SCHEME_LENGTH)) {
        throw new Error(
            `Simple Token Scheme data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_TOKEN_SCHEME_LENGTH}`
        );
    }

    const type = readStream.readUInt8("simpleTokenScheme.type");
    if (type !== SIMPLE_TOKEN_SCHEME_TYPE) {
        throw new Error(`Type mismatch in simpleTokenScheme ${type}`);
    }

    const mintedTokens = readStream.readUInt256("foundryOutput.mintedTokens");
    const meltedTokens = readStream.readUInt256("foundryOutput.meltedTokens");
    const maximumSupply = readStream.readUInt256("foundryOutput.maximumSupply");

    return {
        mintedTokens: HexHelper.fromBigInt256(mintedTokens),
        meltedTokens: HexHelper.fromBigInt256(meltedTokens),
        maximumSupply: HexHelper.fromBigInt256(maximumSupply),
        type: SIMPLE_TOKEN_SCHEME_TYPE
    };
}

/**
 * Serialize the simple token scheme to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSimpleTokenScheme(writeStream: WriteStream, object: ISimpleTokenScheme): void {
    writeStream.writeUInt8("simpleTokenScheme.type", object.type);

    writeStream.writeUInt256("foundryOutput.mintedTokens", HexHelper.toBigInt256(object.mintedTokens));
    writeStream.writeUInt256("foundryOutput.meltedTokens", HexHelper.toBigInt256(object.meltedTokens));
    writeStream.writeUInt256("foundryOutput.maximumSupply", HexHelper.toBigInt256(object.maximumSupply));
}
