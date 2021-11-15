// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { FeatureBlockTypes } from "../../models/featureBlocks/featureBlockTypes";
import {
    EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
    IExpirationMilestoneIndexFeatureBlock
} from "../../models/featureBlocks/IExpirationMilestoneIndexFeatureBlock";
import {
    EXPIRATION_UNIX_FEATURE_BLOCK_TYPE,
    IExpirationUnixFeatureBlock
} from "../../models/featureBlocks/IExpirationUnixFeatureBlock";
import {
    IIndexationFeatureBlock,
    INDEXATION_FEATURE_BLOCK_TYPE
} from "../../models/featureBlocks/IIndexationFeatureBlock";
import { IIssuerFeatureBlock, ISSUER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIssuerFeatureBlock";
import { IMetadataFeatureBlock, METADATA_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IMetadataFeatureBlock";
import { IReturnFeatureBlock, RETURN_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IReturnFeatureBlock";
import { ISenderFeatureBlock, SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock";
import {
    ITimelockMilestoneIndexFeatureBlock,
    TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE
} from "../../models/featureBlocks/ITimelockMilestoneIndexFeatureBlock";
import {
    ITimelockUnixFeatureBlock,
    TIMELOCK_UNIX_FEATURE_BLOCK_TYPE
} from "../../models/featureBlocks/ITimelockUnixFeatureBlock";
import type { ITypeBase } from "../../models/ITypeBase";
import { UINT16_SIZE } from "../commonDataTypes";
import {
    deserializeExpirationMilestoneIndexFeatureBlock,
    MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH,
    serializeExpirationMilestoneIndexFeatureBlock
} from "./expirationMilestoneIndexFeatureBlock";
import {
    deserializeExpirationUnixFeatureBlock,
    MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH,
    serializeExpirationUnixFeatureBlock
} from "./expirationUnixFeatureBlock";
import {
    deserializeIndexationFeatureBlock,
    MIN_INDEXATION_FEATURE_BLOCK_LENGTH,
    serializeIndexationFeatureBlock
} from "./indexationFeatureBlock";
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
    deserializeReturnFeatureBlock,
    MIN_RETURN_FEATURE_BLOCK_LENGTH,
    serializeReturnFeatureBlock
} from "./returnFeatureBlock";
import {
    deserializeSenderFeatureBlock,
    MIN_SENDER_FEATURE_BLOCK_LENGTH,
    serializeSenderFeatureBlock
} from "./senderFeatureBlock";
import {
    deserializeTimelockMilestoneIndexFeatureBlock,
    MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH,
    serializeTimelockMilestoneIndexFeatureBlock
} from "./timelockMilestoneIndexFeatureBlock";
import {
    deserializeTimelockUnixFeatureBlock,
    MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH,
    serializeTimelockUnixFeatureBlock
} from "./timelockUnixFeatureBlock";

/**
 * The minimum length of a feature blocks tokens list.
 */
export const MIN_FEATURE_BLOCKS_LENGTH: number = UINT16_SIZE;

/**
 * The minimum length of a feature block binary representation.
 */
export const MIN_FEATURE_BLOCK_LENGTH: number = Math.min(
    MIN_SENDER_FEATURE_BLOCK_LENGTH,
    MIN_ISSUER_FEATURE_BLOCK_LENGTH,
    MIN_RETURN_FEATURE_BLOCK_LENGTH,
    MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH,
    MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH,
    MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH,
    MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH,
    MIN_METADATA_FEATURE_BLOCK_LENGTH,
    MIN_INDEXATION_FEATURE_BLOCK_LENGTH
);

/**
 * Deserialize the feature blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFeatureBlocks(readStream: ReadStream): FeatureBlockTypes[] {
    const numFeatureBlocks = readStream.readUInt16("featureBlocks.numFeatureBlocks");

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
    writeStream.writeUInt16("featureBlocks.numFeatureBlocks", objects.length);

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
    } else if (type === RETURN_FEATURE_BLOCK_TYPE) {
        input = deserializeReturnFeatureBlock(readStream);
    } else if (type === TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        input = deserializeTimelockMilestoneIndexFeatureBlock(readStream);
    } else if (type === TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
        input = deserializeTimelockUnixFeatureBlock(readStream);
    } else if (type === EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        input = deserializeExpirationMilestoneIndexFeatureBlock(readStream);
    } else if (type === EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
        input = deserializeExpirationUnixFeatureBlock(readStream);
    } else if (type === METADATA_FEATURE_BLOCK_TYPE) {
        input = deserializeMetadataFeatureBlock(readStream);
    } else if (type === INDEXATION_FEATURE_BLOCK_TYPE) {
        input = deserializeIndexationFeatureBlock(readStream);
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
    } else if (object.type === RETURN_FEATURE_BLOCK_TYPE) {
        serializeReturnFeatureBlock(writeStream, object as IReturnFeatureBlock);
    } else if (object.type === TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        serializeTimelockMilestoneIndexFeatureBlock(writeStream, object as ITimelockMilestoneIndexFeatureBlock);
    } else if (object.type === TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
        serializeTimelockUnixFeatureBlock(writeStream, object as ITimelockUnixFeatureBlock);
    } else if (object.type === EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        serializeExpirationMilestoneIndexFeatureBlock(writeStream, object as IExpirationMilestoneIndexFeatureBlock);
    } else if (object.type === EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
        serializeExpirationUnixFeatureBlock(writeStream, object as IExpirationUnixFeatureBlock);
    } else if (object.type === METADATA_FEATURE_BLOCK_TYPE) {
        serializeMetadataFeatureBlock(writeStream, object as IMetadataFeatureBlock);
    } else if (object.type === INDEXATION_FEATURE_BLOCK_TYPE) {
        serializeIndexationFeatureBlock(writeStream, object as IIndexationFeatureBlock);
    } else {
        throw new Error(`Unrecognized feature block type ${object.type}`);
    }
}
