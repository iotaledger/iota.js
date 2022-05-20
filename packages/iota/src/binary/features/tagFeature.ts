// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import {
    ITagFeature,
    TAG_FEATURE_TYPE
} from "../../models/features/ITagFeature";
import { SMALL_TYPE_LENGTH, UINT8_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a tag feature binary representation.
 */
export const MIN_TAG_FEATURE_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT8_SIZE; // Length

/**
 * Deserialize the tag feature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTagFeature(readStream: ReadStream): ITagFeature {
    if (!readStream.hasRemaining(MIN_TAG_FEATURE_LENGTH)) {
        throw new Error(
            `Tag Feature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TAG_FEATURE_LENGTH}`
        );
    }

    const type = readStream.readUInt8("tagFeature.type");
    if (type !== TAG_FEATURE_TYPE) {
        throw new Error(`Type mismatch in tagFeature ${type}`);
    }

    const tagLength = readStream.readUInt8("tagFeature.tagLength");
    const tag = readStream.readFixedHex("tagFeature.tag", tagLength);

    return {
        type: TAG_FEATURE_TYPE,
        tag
    };
}

/**
 * Serialize the tag feature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTagFeature(writeStream: WriteStream, object: ITagFeature): void {
    writeStream.writeUInt8("tagFeature.type", object.type);
    const tag = HexHelper.stripPrefix(object.tag);
    writeStream.writeUInt8("tagFeature.tagLength", tag.length / 2);
    writeStream.writeFixedHex("tagFeature.tag", tag.length / 2, tag);
}
