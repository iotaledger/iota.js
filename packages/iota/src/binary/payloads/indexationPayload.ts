// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../../models/payloads/IIndexationPayload";
import { STRING_LENGTH, TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of an indexation payload binary representation.
 */
export const MIN_INDEXATION_PAYLOAD_LENGTH: number =
    TYPE_LENGTH + // min payload
    STRING_LENGTH + // index length
    1 + // index min 1 byte
    STRING_LENGTH; // data length

/**
 * The minimum length of a indexation key.
 */
export const MIN_INDEXATION_KEY_LENGTH: number = 1;

/**
 * The maximum length of a indexation key.
 */
export const MAX_INDEXATION_KEY_LENGTH: number = 64;

/**
 * Deserialize the indexation payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIndexationPayload(readStream: ReadStream): IIndexationPayload {
    if (!readStream.hasRemaining(MIN_INDEXATION_PAYLOAD_LENGTH)) {
        throw new Error(
            `Indexation Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INDEXATION_PAYLOAD_LENGTH}`
        );
    }

    const type = readStream.readUInt32("payloadIndexation.type");
    if (type !== INDEXATION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadIndexation ${type}`);
    }
    const indexLength = readStream.readUInt16("payloadIndexation.indexLength");
    const index = readStream.readFixedHex("payloadIndexation.index", indexLength);
    const dataLength = readStream.readUInt32("payloadIndexation.dataLength");
    const data = readStream.readFixedHex("payloadIndexation.data", dataLength);

    return {
        type: INDEXATION_PAYLOAD_TYPE,
        index,
        data
    };
}

/**
 * Serialize the indexation payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeIndexationPayload(writeStream: WriteStream, object: IIndexationPayload): void {
    if (object.index.length < MIN_INDEXATION_KEY_LENGTH) {
        throw new Error(
            `The indexation key length is ${object.index.length}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`
        );
    }
    if (object.index.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
        throw new Error(
            `The indexation key length is ${
                object.index.length / 2
            }, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`
        );
    }

    writeStream.writeUInt32("payloadIndexation.type", object.type);
    writeStream.writeUInt16("payloadIndexation.indexLength", object.index.length / 2);
    writeStream.writeFixedHex("payloadIndexation.index", object.index.length / 2, object.index);
    if (object.data) {
        writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
        writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
    } else {
        writeStream.writeUInt32("payloadIndexation.dataLength", 0);
    }
}
