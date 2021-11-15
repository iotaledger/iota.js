// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { ISimpleOutput, SIMPLE_OUTPUT_TYPE } from "../../models/outputs/ISimpleOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a simple output binary representation.
 */
export const MIN_SIMPLE_OUTPUT_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    MIN_ADDRESS_LENGTH + // Address
    UINT64_SIZE; // Amount

/**
 * Deserialize the simple output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleOutput(readStream: ReadStream): ISimpleOutput {
    if (!readStream.hasRemaining(MIN_SIMPLE_OUTPUT_LENGTH)) {
        throw new Error(
            `Simple Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_OUTPUT_LENGTH}`
        );
    }

    const type = readStream.readUInt8("simpleOutput.type");
    if (type !== SIMPLE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in simpleOutput ${type}`);
    }

    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("simpleOutput.amount");

    return {
        type: SIMPLE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}

/**
 * Serialize the simple output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSimpleOutput(writeStream: WriteStream, object: ISimpleOutput): void {
    writeStream.writeUInt8("simpleOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("simpleOutput.amount", bigInt(object.amount));
}
