import { DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IDustDepositReturnFeatureBlock.mjs";
import { EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationMilestoneIndexFeatureBlock.mjs";
import { EXPIRATION_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationUnixFeatureBlock.mjs";
import { INDEXATION_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIndexationFeatureBlock.mjs";
import { ISSUER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIssuerFeatureBlock.mjs";
import { METADATA_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IMetadataFeatureBlock.mjs";
import { SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock.mjs";
import { TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITimelockMilestoneIndexFeatureBlock.mjs";
import { TIMELOCK_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITimelockUnixFeatureBlock.mjs";
import { UINT8_SIZE } from "../commonDataTypes.mjs";
import { deserializeDustDepositReturnFeatureBlock, MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH, serializeDustDepositReturnFeatureBlock } from "./dustDepositReturnFeatureBlock.mjs";
import { deserializeExpirationMilestoneIndexFeatureBlock, MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, serializeExpirationMilestoneIndexFeatureBlock } from "./expirationMilestoneIndexFeatureBlock.mjs";
import { deserializeExpirationUnixFeatureBlock, MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH, serializeExpirationUnixFeatureBlock } from "./expirationUnixFeatureBlock.mjs";
import { deserializeIndexationFeatureBlock, MIN_INDEXATION_FEATURE_BLOCK_LENGTH, serializeIndexationFeatureBlock } from "./indexationFeatureBlock.mjs";
import { deserializeIssuerFeatureBlock, MIN_ISSUER_FEATURE_BLOCK_LENGTH, serializeIssuerFeatureBlock } from "./issuerFeatureBlock.mjs";
import { deserializeMetadataFeatureBlock, MIN_METADATA_FEATURE_BLOCK_LENGTH, serializeMetadataFeatureBlock } from "./metadataFeatureBlock.mjs";
import { deserializeSenderFeatureBlock, MIN_SENDER_FEATURE_BLOCK_LENGTH, serializeSenderFeatureBlock } from "./senderFeatureBlock.mjs";
import { deserializeTimelockMilestoneIndexFeatureBlock, MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, serializeTimelockMilestoneIndexFeatureBlock } from "./timelockMilestoneIndexFeatureBlock.mjs";
import { deserializeTimelockUnixFeatureBlock, MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH, serializeTimelockUnixFeatureBlock } from "./timelockUnixFeatureBlock.mjs";
/**
 * The minimum length of a feature blocks tokens list.
 */
export const MIN_FEATURE_BLOCKS_LENGTH = UINT8_SIZE;
/**
 * The minimum length of a feature block binary representation.
 */
export const MIN_FEATURE_BLOCK_LENGTH = Math.min(MIN_SENDER_FEATURE_BLOCK_LENGTH, MIN_ISSUER_FEATURE_BLOCK_LENGTH, MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH, MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH, MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH, MIN_METADATA_FEATURE_BLOCK_LENGTH, MIN_INDEXATION_FEATURE_BLOCK_LENGTH);
/**
 * Deserialize the feature blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFeatureBlocks(readStream) {
    const numFeatureBlocks = readStream.readUInt8("featureBlocks.numFeatureBlocks");
    const featureBlocks = [];
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
export function serializeFeatureBlocks(writeStream, objects) {
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
export function deserializeFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Feature block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("featureBlock.type", false);
    let input;
    if (type === SENDER_FEATURE_BLOCK_TYPE) {
        input = deserializeSenderFeatureBlock(readStream);
    }
    else if (type === ISSUER_FEATURE_BLOCK_TYPE) {
        input = deserializeIssuerFeatureBlock(readStream);
    }
    else if (type === DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
        input = deserializeDustDepositReturnFeatureBlock(readStream);
    }
    else if (type === TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        input = deserializeTimelockMilestoneIndexFeatureBlock(readStream);
    }
    else if (type === TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
        input = deserializeTimelockUnixFeatureBlock(readStream);
    }
    else if (type === EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        input = deserializeExpirationMilestoneIndexFeatureBlock(readStream);
    }
    else if (type === EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
        input = deserializeExpirationUnixFeatureBlock(readStream);
    }
    else if (type === METADATA_FEATURE_BLOCK_TYPE) {
        input = deserializeMetadataFeatureBlock(readStream);
    }
    else if (type === INDEXATION_FEATURE_BLOCK_TYPE) {
        input = deserializeIndexationFeatureBlock(readStream);
    }
    else {
        throw new Error(`Unrecognized feature block type ${type}`);
    }
    return input;
}
/**
 * Serialize the feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeFeatureBlock(writeStream, object) {
    if (object.type === SENDER_FEATURE_BLOCK_TYPE) {
        serializeSenderFeatureBlock(writeStream, object);
    }
    else if (object.type === ISSUER_FEATURE_BLOCK_TYPE) {
        serializeIssuerFeatureBlock(writeStream, object);
    }
    else if (object.type === DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
        serializeDustDepositReturnFeatureBlock(writeStream, object);
    }
    else if (object.type === TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        serializeTimelockMilestoneIndexFeatureBlock(writeStream, object);
    }
    else if (object.type === TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
        serializeTimelockUnixFeatureBlock(writeStream, object);
    }
    else if (object.type === EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        serializeExpirationMilestoneIndexFeatureBlock(writeStream, object);
    }
    else if (object.type === EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
        serializeExpirationUnixFeatureBlock(writeStream, object);
    }
    else if (object.type === METADATA_FEATURE_BLOCK_TYPE) {
        serializeMetadataFeatureBlock(writeStream, object);
    }
    else if (object.type === INDEXATION_FEATURE_BLOCK_TYPE) {
        serializeIndexationFeatureBlock(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized feature block type ${object.type}`);
    }
}
