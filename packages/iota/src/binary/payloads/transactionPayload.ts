// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import type { ReadStream, WriteStream } from "@iota/util.js";
import { TRANSACTION_ESSENCE_TYPE } from "../../models/ITransactionEssence";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITransactionPayload";
import { TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
import { deserializeTransactionEssence, serializeTransactionEssence } from "../transactionEssence";
import { deserializeUnlocks, serializeUnlocks } from "../unlocks/unlocks";

/**
 * The minimum length of a transaction payload binary representation.
 */
export const MIN_TRANSACTION_PAYLOAD_LENGTH: number =
    TYPE_LENGTH + // min payload
    UINT32_SIZE; // essence type

/**
 * Deserialize the transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionPayload(readStream: ReadStream): ITransactionPayload {
    if (!readStream.hasRemaining(MIN_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(
            `Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_PAYLOAD_LENGTH}`
        );
    }

    const type = readStream.readUInt32("payloadTransaction.type");
    if (type !== TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTransaction ${type}`);
    }

    const essenceType = readStream.readUInt8("payloadTransaction.essenceType", false);
    let essence;
    let unlocks;

    if (essenceType === TRANSACTION_ESSENCE_TYPE) {
        essence = deserializeTransactionEssence(readStream);
        unlocks = deserializeUnlocks(readStream);
    } else {
        throw new Error(`Unrecognized transaction essence type ${type}`);
    }

    return {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence,
        unlocks
    };
}

/**
 * Serialize the transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionPayload(writeStream: WriteStream, object: ITransactionPayload): void {
    writeStream.writeUInt32("payloadTransaction.type", object.type);

    if (object.type === TRANSACTION_PAYLOAD_TYPE) {
        serializeTransactionEssence(writeStream, object.essence);
        serializeUnlocks(writeStream, object.unlocks);
    } else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
}
