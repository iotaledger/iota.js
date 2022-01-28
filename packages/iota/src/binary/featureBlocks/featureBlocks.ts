// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { FeatureBlockTypes } from "../../models/featureBlocks/featureBlockTypes";
import { IIssuerFeatureBlock, ISSUER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIssuerFeatureBlock";
import { IMetadataFeatureBlock, METADATA_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IMetadataFeatureBlock";
import { ISenderFeatureBlock, SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock";
import {
    ITagFeatureBlock,
    TAG_FEATURE_BLOCK_TYPE
} from "../../models/featureBlocks/ITagFeatureBlock";
import type { ITypeBase } from "../../models/ITypeBase";
import { UINT8_SIZE } from "../commonDataTypes";
import {
    deserializeIssuerFeatureBlock,
    MIN_ISSUER_FEATURE_BLOCK_LENGTH,
    serializeIssuerFeatureBlock
} from "./issuerFeatureBlock";
import {
    deserializeMetadataFeatureBlock,
    MIN_METADATA_FEATURE_BLOCK_LENGTH,
    serializeMetadataFeatureBlock
} from "./metadataFeatureBlock";
import {
    deserializeSenderFeatureBlock,
    MIN_SENDER_FEATURE_BLOCK_LENGTH,
    serializeSenderFeatureBlock
} from "./senderFeatureBlock";
import {
    deserializeTagFeatureBlock,
    MIN_TAG_FEATURE_BLOCK_LENGTH,
    serializeTagFeatureBlock
} from "./tagFeatureBlock";

/**
 * The minimum length of a feature blocks tokens list.
 */
export const MIN_FEATURE_BLOCKS_LENGTH: number = UINT8_SIZE;

/**
 * The minimum length of a feature block binary representation.
 */
export const MIN_FEATURE_BLOCK_LENGTH: number = Math.min(
    MIN_SENDER_FEATURE_BLOCK_LENGTH,
    MIN_ISSUER_FEATURE_BLOCK_LENGTH,
    MIN_METADATA_FEATURE_BLOCK_LENGTH,
    MIN_TAG_FEATURE_BLOCK_LENGTH
);

/**
 * Deserialize the feature blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFeatureBlocks(readStream: ReadStream): FeatureBlockTypes[] {
    const numFeatureBlocks = readStream.readUInt8("featureBlocks.numFeatureBlocks");

    const featureBlocks: FeatureBlockTypes[] = [];
    for (let i = 0; i < numFeatureBlocks; i++) {
        featureBlocks.push(deserializeFeatureBlock(readStream));
    }

    return featureBlocks;
}

/**
 * Serialize the feature blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeFeatureBlocks(writeStream: WriteStream, objects: FeatureBlockTypes[]): void {
    writeStream.writeUInt8("featureBlocks.numFeatureBlocks", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeFeatureBlock(writeStream, objects[i]);
    }
}

/**
 * Deserialize the feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFeatureBlock(readStream: ReadStream): FeatureBlockTypes {
    if (!readStream.hasRemaining(MIN_FEATURE_BLOCK_LENGTH)) {
        throw new Error(
            `Feature block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FEATURE_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("featureBlock.type", false);
    let input;

    if (type === SENDER_FEATURE_BLOCK_TYPE) {
        input = deserializeSenderFeatureBlock(readStream);
    } else if (type === ISSUER_FEATURE_BLOCK_TYPE) {
        input = deserializeIssuerFeatureBlock(readStream);
    } else if (type === METADATA_FEATURE_BLOCK_TYPE) {
        input = deserializeMetadataFeatureBlock(readStream);
    } else if (type === TAG_FEATURE_BLOCK_TYPE) {
        input = deserializeTagFeatureBlock(readStream);
    } else {
        throw new Error(`Unrecognized feature block type ${type}`);
    }

    return input;
}

/**
 * Serialize the feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeFeatureBlock(writeStream: WriteStream, object: ITypeBase<number>): void {
    if (object.type === SENDER_FEATURE_BLOCK_TYPE) {
        serializeSenderFeatureBlock(writeStream, object as ISenderFeatureBlock);
    } else if (object.type === ISSUER_FEATURE_BLOCK_TYPE) {
        serializeIssuerFeatureBlock(writeStream, object as IIssuerFeatureBlock);
    } else if (object.type === METADATA_FEATURE_BLOCK_TYPE) {
        serializeMetadataFeatureBlock(writeStream, object as IMetadataFeatureBlock);
    } else if (object.type === TAG_FEATURE_BLOCK_TYPE) {
        serializeTagFeatureBlock(writeStream, object as ITagFeatureBlock);
    } else {
        throw new Error(`Unrecognized feature block type ${object.type}`);
    }
}
