// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { FeatureTypes } from "../../models/features/featureTypes";
import { IIssuerFeature, ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { IMetadataFeature, METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { ISenderFeature, SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import {
    ITagFeature,
    TAG_FEATURE_TYPE
} from "../../models/features/ITagFeature";
import type { ITypeBase } from "../../models/ITypeBase";
import { UINT8_SIZE } from "../commonDataTypes";
import {
    deserializeIssuerFeature,
    MIN_ISSUER_FEATURE_LENGTH,
    serializeIssuerFeature
} from "./issuerFeature";
import {
    deserializeMetadataFeature,
    MIN_METADATA_FEATURE_LENGTH,
    serializeMetadataFeature
} from "./metadataFeature";
import {
    deserializeSenderFeature,
    MIN_SENDER_FEATURE_LENGTH,
    serializeSenderFeature
} from "./senderFeature";
import {
    deserializeTagFeature,
    MIN_TAG_FEATURE_LENGTH,
    serializeTagFeature
} from "./tagFeature";

/**
 * The minimum length of a featurs tokens list.
 */
export const MIN_FEATURES_LENGTH: number = UINT8_SIZE;

/**
 * The minimum length of a feature binary representation.
 */
export const MIN_FEATURE_LENGTH: number = Math.min(
    MIN_SENDER_FEATURE_LENGTH,
    MIN_ISSUER_FEATURE_LENGTH,
    MIN_METADATA_FEATURE_LENGTH,
    MIN_TAG_FEATURE_LENGTH
);

/**
 * Deserialize the feature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFeatures(readStream: ReadStream): FeatureTypes[] | undefined {
    const numFeatures = readStream.readUInt8("features.numFeatures");

    const features: FeatureTypes[] = [];
    for (let i = 0; i < numFeatures; i++) {
        features.push(deserializeFeature(readStream));
    }

    return numFeatures > 0 ? features : undefined;
}

/**
 * Serialize the feature to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeFeatures(writeStream: WriteStream, objects: FeatureTypes[] | undefined): void {
    writeStream.writeUInt8("features.numFeatures", objects?.length ?? 0);

    if (!objects) {
        return;
    }

    for (let i = 0; i < objects.length; i++) {
        serializeFeature(writeStream, objects[i]);
    }
}

/**
 * Deserialize the feature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFeature(readStream: ReadStream): FeatureTypes {
    if (!readStream.hasRemaining(MIN_FEATURE_LENGTH)) {
        throw new Error(
            `Feature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FEATURE_LENGTH}`
        );
    }

    const type = readStream.readUInt8("feature.type", false);
    let input;

    if (type === SENDER_FEATURE_TYPE) {
        input = deserializeSenderFeature(readStream);
    } else if (type === ISSUER_FEATURE_TYPE) {
        input = deserializeIssuerFeature(readStream);
    } else if (type === METADATA_FEATURE_TYPE) {
        input = deserializeMetadataFeature(readStream);
    } else if (type === TAG_FEATURE_TYPE) {
        input = deserializeTagFeature(readStream);
    } else {
        throw new Error(`Unrecognized feature type ${type}`);
    }

    return input;
}

/**
 * Serialize the feature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeFeature(writeStream: WriteStream, object: ITypeBase<number>): void {
    if (object.type === SENDER_FEATURE_TYPE) {
        serializeSenderFeature(writeStream, object as ISenderFeature);
    } else if (object.type === ISSUER_FEATURE_TYPE) {
        serializeIssuerFeature(writeStream, object as IIssuerFeature);
    } else if (object.type === METADATA_FEATURE_TYPE) {
        serializeMetadataFeature(writeStream, object as IMetadataFeature);
    } else if (object.type === TAG_FEATURE_TYPE) {
        serializeTagFeature(writeStream, object as ITagFeature);
    } else {
        throw new Error(`Unrecognized feature type ${object.type}`);
    }
}
