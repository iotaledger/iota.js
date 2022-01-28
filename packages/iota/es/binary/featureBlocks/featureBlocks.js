import { ISSUER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIssuerFeatureBlock";
import { METADATA_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IMetadataFeatureBlock";
import { SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock";
import { TAG_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ITagFeatureBlock";
import { UINT8_SIZE } from "../commonDataTypes";
import { deserializeIssuerFeatureBlock, MIN_ISSUER_FEATURE_BLOCK_LENGTH, serializeIssuerFeatureBlock } from "./issuerFeatureBlock";
import { deserializeMetadataFeatureBlock, MIN_METADATA_FEATURE_BLOCK_LENGTH, serializeMetadataFeatureBlock } from "./metadataFeatureBlock";
import { deserializeSenderFeatureBlock, MIN_SENDER_FEATURE_BLOCK_LENGTH, serializeSenderFeatureBlock } from "./senderFeatureBlock";
import { deserializeTagFeatureBlock, MIN_TAG_FEATURE_BLOCK_LENGTH, serializeTagFeatureBlock } from "./tagFeatureBlock";
/**
 * The minimum length of a feature blocks tokens list.
 */
export const MIN_FEATURE_BLOCKS_LENGTH = UINT8_SIZE;
/**
 * The minimum length of a feature block binary representation.
 */
export const MIN_FEATURE_BLOCK_LENGTH = Math.min(MIN_SENDER_FEATURE_BLOCK_LENGTH, MIN_ISSUER_FEATURE_BLOCK_LENGTH, MIN_METADATA_FEATURE_BLOCK_LENGTH, MIN_TAG_FEATURE_BLOCK_LENGTH);
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
    else if (type === METADATA_FEATURE_BLOCK_TYPE) {
        input = deserializeMetadataFeatureBlock(readStream);
    }
    else if (type === TAG_FEATURE_BLOCK_TYPE) {
        input = deserializeTagFeatureBlock(readStream);
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
    else if (object.type === METADATA_FEATURE_BLOCK_TYPE) {
        serializeMetadataFeatureBlock(writeStream, object);
    }
    else if (object.type === TAG_FEATURE_BLOCK_TYPE) {
        serializeTagFeatureBlock(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized feature block type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZUJsb2Nrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvZmVhdHVyZUJsb2Nrcy9mZWF0dXJlQmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBdUIseUJBQXlCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNoSCxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEgsT0FBTyxFQUF1Qix5QkFBeUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ2hILE9BQU8sRUFFSCxzQkFBc0IsRUFDekIsTUFBTSw2Q0FBNkMsQ0FBQztBQUVyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUNILDZCQUE2QixFQUM3QiwrQkFBK0IsRUFDL0IsMkJBQTJCLEVBQzlCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNILCtCQUErQixFQUMvQixpQ0FBaUMsRUFDakMsNkJBQTZCLEVBQ2hDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNILDZCQUE2QixFQUM3QiwrQkFBK0IsRUFDL0IsMkJBQTJCLEVBQzlCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNILDBCQUEwQixFQUMxQiw0QkFBNEIsRUFDNUIsd0JBQXdCLEVBQzNCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0I7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBVyxVQUFVLENBQUM7QUFFNUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUNwRCwrQkFBK0IsRUFDL0IsK0JBQStCLEVBQy9CLGlDQUFpQyxFQUNqQyw0QkFBNEIsQ0FDL0IsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsVUFBc0I7SUFDM0QsTUFBTSxnQkFBZ0IsR0FB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