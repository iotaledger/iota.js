// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITreasuryInput, TREASURY_INPUT_TYPE } from "../../models/inputs/ITreasuryInput";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of a treasury input binary representation.
 */
export const MIN_TREASURY_INPUT_LENGTH: number = SMALL_TYPE_LENGTH + TRANSACTION_ID_LENGTH;

/**
 * Deserialize the treasury input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTreasuryInput(readStream: ReadStream): ITreasuryInput {
    if (!readStream.hasRemaining(MIN_TREASURY_INPUT_LENGTH)) {
        throw new Error(
            `Treasury Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_INPUT_LENGTH}`
        );
    }

    const type = readStream.readUInt8("treasuryInput.type");
    if (type !== TREASURY_INPUT_TYPE) {
        throw new Error(`Type mismatch in treasuryInput ${type}`);
    }

    const milestoneId = readStream.readFixedHex("treasuryInput.milestoneId", TRANSACTION_ID_LENGTH);

    return {
        type: TREASURY_INPUT_TYPE,
        milestoneId
    };
}

/**
 * Serialize the treasury input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTreasuryInput(writeStream: WriteStream, object: ITreasuryInput): void {
    writeStream.writeUInt8("treasuryInput.type", object.type);
    writeStream.writeFixedHex("treasuryInput.milestoneId", TRANSACTION_ID_LENGTH, object.milestoneId);
}
