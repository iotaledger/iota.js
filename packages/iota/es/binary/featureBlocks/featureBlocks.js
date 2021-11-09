import { EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationMilestoneIndexFeatureBlock";
import { EXPIRATION_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IExpirationUnixFeatureBlock";
import { INDEXATION_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIndexationFeatureBlock";
import { ISSUER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIssuerFeatureBlock";
import { METADATA_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IMetadataFeatureBlock";
import { RETURN_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IReturnFeatureBlock";
import { SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock";
import { TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITimelockMilestoneIndexFeatureBlock";
import { TIMELOCK_UNIX_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITimelockUnixFeatureBlock";
import { UINT16_SIZE } from "../commonDataTypes";
import { deserializeExpirationMilestoneIndexFeatureBlock, MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, serializeExpirationMilestoneIndexFeatureBlock } from "./expirationMilestoneIndexFeatureBlock";
import { deserializeExpirationUnixFeatureBlock, MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH, serializeExpirationUnixFeatureBlock } from "./expirationUnixFeatureBlock";
import { deserializeIndexationFeatureBlock, MIN_INDEXATION_FEATURE_BLOCK_LENGTH, serializeIndexationFeatureBlock } from "./indexationFeatureBlock";
import { deserializeIssuerFeatureBlock, MIN_ISSUER_FEATURE_BLOCK_LENGTH, serializeIssuerFeatureBlock } from "./issuerFeatureBlock";
import { deserializeMetadataFeatureBlock, MIN_METADATA_FEATURE_BLOCK_LENGTH, serializeMetadataFeatureBlock } from "./metadataFeatureBlock";
import { deserializeReturnFeatureBlock, MIN_RETURN_FEATURE_BLOCK_LENGTH, serializeReturnFeatureBlock } from "./returnFeatureBlock";
import { deserializeSenderFeatureBlock, MIN_SENDER_FEATURE_BLOCK_LENGTH, serializeSenderFeatureBlock } from "./senderFeatureBlock";
import { deserializeTimelockMilestoneIndexFeatureBlock, MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, serializeTimelockMilestoneIndexFeatureBlock } from "./timelockMilestoneIndexFeatureBlock";
import { deserializeTimelockUnixFeatureBlock, MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH, serializeTimelockUnixFeatureBlock } from "./timelockUnixFeatureBlock";
/**
 * The minimum length of a feature blocks tokens list.
 */
export const MIN_FEATURE_BLOCKS_LENGTH = UINT16_SIZE;
/**
 * The minimum length of a feature block binary representation.
 */
export const MIN_FEATURE_BLOCK_LENGTH = Math.min(MIN_SENDER_FEATURE_BLOCK_LENGTH, MIN_ISSUER_FEATURE_BLOCK_LENGTH, MIN_RETURN_FEATURE_BLOCK_LENGTH, MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH, MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH, MIN_METADATA_FEATURE_BLOCK_LENGTH, MIN_INDEXATION_FEATURE_BLOCK_LENGTH);
/**
 * Deserialize the feature blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFeatureBlocks(readStream) {
    const numFeatureBlocks = readStream.readUInt16("featureBlocks.numFeatureBlocks");
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
export function deserializeFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Feature block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("featureBlock.type", false);
    let input;
    if (type === SENDER_FEATURE_BLOCK_TYPE) {
        input = deserializeSenderFeatureBlock(readStream);
    }
    else if (type === ISSUER_FEATURE_BLOCK_TYPE) {
        input = deserializeIssuerFeatureBlock(readStream);
    }
    else if (type === RETURN_FEATURE_BLOCK_TYPE) {
        input = deserializeReturnFeatureBlock(readStream);
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
    else if (object.type === RETURN_FEATURE_BLOCK_TYPE) {
        serializeReturnFeatureBlock(writeStream, object);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZUJsb2Nrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvZmVhdHVyZUJsb2Nrcy9mZWF0dXJlQmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFDSCw2Q0FBNkMsRUFFaEQsTUFBTSxrRUFBa0UsQ0FBQztBQUMxRSxPQUFPLEVBQ0gsa0NBQWtDLEVBRXJDLE1BQU0sd0RBQXdELENBQUM7QUFDaEUsT0FBTyxFQUVILDZCQUE2QixFQUNoQyxNQUFNLG9EQUFvRCxDQUFDO0FBQzVELE9BQU8sRUFBdUIseUJBQXlCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNoSCxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEgsT0FBTyxFQUF1Qix5QkFBeUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ2hILE9BQU8sRUFBdUIseUJBQXlCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNoSCxPQUFPLEVBRUgsMkNBQTJDLEVBQzlDLE1BQU0sZ0VBQWdFLENBQUM7QUFDeEUsT0FBTyxFQUVILGdDQUFnQyxFQUNuQyxNQUFNLHNEQUFzRCxDQUFDO0FBRTlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsK0NBQStDLEVBQy9DLG1EQUFtRCxFQUNuRCw2Q0FBNkMsRUFDaEQsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRCxPQUFPLEVBQ0gscUNBQXFDLEVBQ3JDLHdDQUF3QyxFQUN4QyxtQ0FBbUMsRUFDdEMsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQ0gsaUNBQWlDLEVBQ2pDLG1DQUFtQyxFQUNuQywrQkFBK0IsRUFDbEMsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQ0gsNkJBQTZCLEVBQzdCLCtCQUErQixFQUMvQiwyQkFBMkIsRUFDOUIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVB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