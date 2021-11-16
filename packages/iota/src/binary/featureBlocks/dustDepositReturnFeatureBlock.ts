// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import {
    IDustDepositReturnFeatureBlock,
    DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE
} from "../../models/featureBlocks/IDustDepositReturnFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a return feature block binary representation.
 */
export const MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE; // Amount

/**
 * Deserialize the dust deposit return feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeDustDepositReturnFeatureBlock(readStream: ReadStream): IDustDepositReturnFeatureBlock {
    if (!readStream.hasRemaining(MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH)) {
        throw new Error(
            `Dust Deposit Return Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("dustDepositReturnFeatureBlock.type");
    if (type !== DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in dustDepositReturnFeatureBlock ${type}`);
    }

    const amount = readStream.readUInt64("dustDepositReturnFeatureBlock.amount");

    return {
        type: DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE,
        amount: Number(amount)
    };
}

/**
 * Serialize the dust deposit return feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeDustDepositReturnFeatureBlock(
    writeStream: WriteStream,
    object: IDustDepositReturnFeatureBlock
): void {
    writeStream.writeUInt8("dustDepositReturnFeatureBlock.type", object.type);
    writeStream.writeUInt64("dustDepositReturnFeatureBlock.amount", bigInt(object.amount));
}
