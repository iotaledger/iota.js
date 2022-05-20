// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import { IMetadataFeature, METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a metadata feature block binary representation.
 */
export const MIN_METADATA_FEATURE_LENGTH: number = SMALL_TYPE_LENGTH + UINT16_SIZE;

/**
 * Deserialize the metadata feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMetadataFeature(readStream: ReadStream): IMetadataFeature {
    if (!readStream.hasRemaining(MIN_METADATA_FEATURE_LENGTH)) {
        throw new Error(
            `Metadata Feature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_METADATA_FEATURE_LENGTH}`
        );
    }

    const type = readStream.readUInt8("metadataFeature.type");
    if (type !== METADATA_FEATURE_TYPE) {
        throw new Error(`Type mismatch in metadataFeature ${type}`);
    }

    const dataLength = readStream.readUInt16("metadataFeature.dataLength");
    const data = readStream.readFixedHex("metadataFeature.data", dataLength);

    return {
        type: METADATA_FEATURE_TYPE,
        data
    };
}

/**
 * Serialize the metadata feature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMetadataFeature(writeStream: WriteStream, object: IMetadataFeature): void {
    writeStream.writeUInt8("metadataFeature.type", object.type);
    const data = HexHelper.stripPrefix(object.data);
    writeStream.writeUInt16("metadataFeature.dataLength", data.length / 2);
    writeStream.writeFixedHex("metadataFeature.data", data.length / 2, data);
}
