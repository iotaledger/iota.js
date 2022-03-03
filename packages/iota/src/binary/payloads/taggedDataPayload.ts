// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../../models/payloads/ITaggedDataPayload";
import { UINT8_SIZE, TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a tagged data payload binary representation.
 */
export const MIN_TAGGED_DATA_PAYLOAD_LENGTH: number =
    TYPE_LENGTH + // min payload
    UINT8_SIZE + // tag length
    UINT32_SIZE; // data length

/**
 * The maximum length of a tag.
 */
export const MAX_TAG_LENGTH: number = 64;

/**
 * Deserialize the tagged data payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTaggedDataPayload(readStream: ReadStream): ITaggedDataPayload {
    if (!readStream.hasRemaining(MIN_TAGGED_DATA_PAYLOAD_LENGTH)) {
        throw new Error(
            `Tagged Data Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TAGGED_DATA_PAYLOAD_LENGTH}`
        );
    }

    const type = readStream.readUInt32("payloadTaggedData.type");
    if (type !== TAGGED_DATA_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTaggedData ${type}`);
    }
    const tagLength = readStream.readUInt8("payloadTaggedData.tagLength");
    let tag;
    if (tagLength > 0) {
        tag = readStream.readFixedHex("payloadTaggedData.tag", tagLength);
    }
    const dataLength = readStream.readUInt32("payloadTaggedData.dataLength");
    let data;
    if (dataLength > 0) {
        data = readStream.readFixedHex("payloadTaggedData.data", dataLength);
    }

    return {
        type: TAGGED_DATA_PAYLOAD_TYPE,
        tag: tag ? HexHelper.addPrefix(tag) : undefined,
        data: data ? HexHelper.addPrefix(data) : undefined
    };
}

/**
 * Serialize the tagged data payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTaggedDataPayload(writeStream: WriteStream, object: ITaggedDataPayload): void {
    if (object.tag && object.tag.length / 2 > MAX_TAG_LENGTH) {
        throw new Error(
            `The tag length is ${
                object.tag.length / 2
            }, which exceeds the maximum size of ${MAX_TAG_LENGTH}`
        );
    }


    writeStream.writeUInt32("payloadTaggedData.type", object.type);
    if (object.tag) {
        const tag = HexHelper.stripPrefix(object.tag);
        writeStream.writeUInt8("payloadTaggedData.tagLength", tag.length / 2);
        writeStream.writeFixedHex("payloadTaggedData.tag", tag.length / 2, tag);
    } else {
        writeStream.writeUInt32("payloadTaggedData.tagLength", 0);
    }
    if (object.data) {
        const data = HexHelper.stripPrefix(object.data);
        writeStream.writeUInt32("payloadTaggedData.dataLength", data.length / 2);
        writeStream.writeFixedHex("payloadTaggedData.data", data.length / 2, data);
    } else {
        writeStream.writeUInt32("payloadTaggedData.dataLength", 0);
    }
}
