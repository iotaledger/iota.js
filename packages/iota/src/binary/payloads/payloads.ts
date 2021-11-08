// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import { INDEXATION_PAYLOAD_TYPE } from "../../models/payloads/IIndexationPayload";
import { MILESTONE_PAYLOAD_TYPE } from "../../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../../models/payloads/IReceiptPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITreasuryTransactionPayload";
import type { PayloadTypes } from "../../models/payloads/payloadTypes";
import {
    UINT32_SIZE
} from "../commonDataTypes";
import { deserializeIndexationPayload, MIN_INDEXATION_PAYLOAD_LENGTH, serializeIndexationPayload } from "./indexationPayload";
import { deserializeMilestonePayload, MIN_MILESTONE_PAYLOAD_LENGTH, serializeMilestonePayload } from "./milestonePayload";
import { deserializeReceiptPayload, MIN_RECEIPT_PAYLOAD_LENGTH, serializeReceiptPayload } from "./receiptPayload";
import { deserializeTransactionPayload, MIN_TRANSACTION_PAYLOAD_LENGTH, serializeTransactionPayload } from "./transactionPayload";
import { deserializeTreasuryTransactionPayload, MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH, serializeTreasuryTransactionPayload } from "./treasuryTransactionPayload";

/**
 * The minimum length of a payload binary representation.
 */
export const MIN_PAYLOAD_LENGTH: number =
    Math.min(
        MIN_TRANSACTION_PAYLOAD_LENGTH,
        MIN_MILESTONE_PAYLOAD_LENGTH,
        MIN_INDEXATION_PAYLOAD_LENGTH,
        MIN_RECEIPT_PAYLOAD_LENGTH,
        MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH
    );

/**
 * Deserialize the payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializePayload(
    readStream: ReadStream
): PayloadTypes | undefined {
    const payloadLength = readStream.readUInt32("payload.length");

    if (!readStream.hasRemaining(payloadLength)) {
        throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readStream.unused()}`);
    }

    let payload: PayloadTypes | undefined;

    if (payloadLength > 0) {
        const payloadType = readStream.readUInt32("payload.type", false);

        if (payloadType === TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTransactionPayload(readStream);
        } else if (payloadType === MILESTONE_PAYLOAD_TYPE) {
            payload = deserializeMilestonePayload(readStream);
        } else if (payloadType === INDEXATION_PAYLOAD_TYPE) {
            payload = deserializeIndexationPayload(readStream);
        } else if (payloadType === RECEIPT_PAYLOAD_TYPE) {
            payload = deserializeReceiptPayload(readStream);
        } else if (payloadType === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTreasuryTransactionPayload(readStream);
        } else {
            throw new Error(`Unrecognized payload type ${payloadType}`);
        }
    }

    return payload;
}

/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializePayload(
    writeStream: WriteStream,
    object: PayloadTypes | undefined
): void {
    // Store the location for the payload length and write 0
    // we will rewind and fill in once the size of the payload is known
    const payloadLengthWriteIndex = writeStream.getWriteIndex();
    writeStream.writeUInt32("payload.length", 0);

    if (!object) {
        // No other data to write
    } else if (object.type === TRANSACTION_PAYLOAD_TYPE) {
        serializeTransactionPayload(writeStream, object);
    } else if (object.type === MILESTONE_PAYLOAD_TYPE) {
        serializeMilestonePayload(writeStream, object);
    } else if (object.type === INDEXATION_PAYLOAD_TYPE) {
        serializeIndexationPayload(writeStream, object);
    } else if (object.type === RECEIPT_PAYLOAD_TYPE) {
        serializeReceiptPayload(writeStream, object);
    } else if (object.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        serializeTreasuryTransactionPayload(writeStream, object);
    } else {
        throw new Error(`Unrecognized transaction type ${(object as ITypeBase<number>).type}`);
    }

    const endOfPayloadWriteIndex = writeStream.getWriteIndex();
    writeStream.setWriteIndex(payloadLengthWriteIndex);
    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
    writeStream.setWriteIndex(endOfPayloadWriteIndex);
}
