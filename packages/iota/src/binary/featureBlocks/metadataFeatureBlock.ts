// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import { IMetadataFeatureBlock, METADATA_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IMetadataFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a metadata feature block binary representation.
 */
export const MIN_METADATA_FEATURE_BLOCK_LENGTH: number = SMALL_TYPE_LENGTH + UINT16_SIZE;

/**
 * Deserialize the metadata feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMetadataFeatureBlock(readStream: ReadStream): IMetadataFeatureBlock {
    if (!readStream.hasRemaining(MIN_METADATA_FEATURE_BLOCK_LENGTH)) {
        throw new Error(
            `Metadata Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_METADATA_FEATURE_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("metadataFeatureBlock.type");
    if (type !== METADATA_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in metadataFeatureBlock ${type}`);
    }

    const dataLength = readStream.readUInt16("metadataFeatureBlock.dataLength");
    const data = readStream.readFixedHex("metadataFeatureBlock.data", dataLength);

    return {
        type: METADATA_FEATURE_BLOCK_TYPE,
        data
    };
}

/**
 * Serialize the metadata feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMetadataFeatureBlock(writeStream: WriteStream, object: IMetadataFeatureBlock): void {
    writeStream.writeUInt8("metadataFeatureBlock.type", object.type);
    const data = HexHelper.stripPrefix(object.data);
    writeStream.writeUInt16("metadataFeatureBlock.dataLength", data.length / 2);
    writeStream.writeFixedHex("metadataFeatureBlock.data", data.length / 2, data);
}
