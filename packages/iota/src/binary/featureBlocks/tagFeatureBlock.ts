// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import {
    ITagFeatureBlock,
    TAG_FEATURE_BLOCK_TYPE
} from "../../models/featureBlocks/ITagFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT8_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a tag feature block binary representation.
 */
export const MIN_TAG_FEATURE_BLOCK_LENGTH: number =
    SMALL_TYPE_LENGTH + // Type
    UINT8_SIZE; // Length

/**
 * Deserialize the tag feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTagFeatureBlock(readStream: ReadStream): ITagFeatureBlock {
    if (!readStream.hasRemaining(MIN_TAG_FEATURE_BLOCK_LENGTH)) {
        throw new Error(
            `Tag Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TAG_FEATURE_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("tagFeatureBlock.type");
    if (type !== TAG_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in tagFeatureBlock ${type}`);
    }

    const tagLength = readStream.readUInt8("tagFeatureBlock.tagLength");
    const tag = readStream.readFixedHex("tagFeatureBlock.tag", tagLength);

    return {
        type: TAG_FEATURE_BLOCK_TYPE,
        tag
    };
}

/**
 * Serialize the tag feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTagFeatureBlock(writeStream: WriteStream, object: ITagFeatureBlock): void {
    writeStream.writeUInt8("tagFeatureBlock.type", object.type);
    const tag = HexHelper.stripPrefix(object.tag);
    writeStream.writeUInt8("tagFeatureBlock.tagLength", tag.length / 2);
    writeStream.writeFixedHex("tagFeatureBlock.tag", tag.length / 2, tag);
}
