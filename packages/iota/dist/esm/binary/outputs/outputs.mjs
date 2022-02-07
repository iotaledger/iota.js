import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput.mjs";
import { BASIC_OUTPUT_TYPE } from "../../models/outputs/IBasicOutput.mjs";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput.mjs";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput.mjs";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput.mjs";
import { MAX_NATIVE_TOKEN_COUNT } from "../nativeTokens.mjs";
import { deserializeAliasOutput, MIN_ALIAS_OUTPUT_LENGTH, serializeAliasOutput } from "./aliasOutput.mjs";
import { deserializeBasicOutput, MIN_BASIC_OUTPUT_LENGTH, serializeBasicOutput } from "./basicOutput.mjs";
import { deserializeFoundryOutput, MIN_FOUNDRY_OUTPUT_LENGTH, serializeFoundryOutput } from "./foundryOutput.mjs";
import { deserializeNftOutput, MIN_NFT_OUTPUT_LENGTH, serializeNftOutput } from "./nftOutput.mjs";
import { deserializeTreasuryOutput, MIN_TREASURY_OUTPUT_LENGTH, serializeTreasuryOutput } from "./treasuryOutput.mjs";
/**
 * The minimum length of an output binary representation.
 */
export const MIN_OUTPUT_LENGTH = Math.min(MIN_TREASURY_OUTPUT_LENGTH, MIN_FOUNDRY_OUTPUT_LENGTH, MIN_BASIC_OUTPUT_LENGTH, MIN_NFT_OUTPUT_LENGTH, MIN_ALIAS_OUTPUT_LENGTH);
/**
 * The minimum number of outputs.
 */
export const MIN_OUTPUT_COUNT = 1;
/**
 * The maximum number of outputs.
 */
export const MAX_OUTPUT_COUNT = 128;
/**
 * Deserialize the outputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeOutputs(readStream) {
    const numOutputs = readStream.readUInt16("outputs.numOutputs");
    const outputs = [];
    for (let i = 0; i < numOutputs; i++) {
        outputs.push(deserializeOutput(readStream));
    }
    return outputs;
}
/**
 * Serialize the outputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeOutputs(writeStream, objects) {
    if (objects.length < MIN_OUTPUT_COUNT) {
        throw new Error(`The minimum number of outputs is ${MIN_OUTPUT_COUNT}, you have provided ${objects.length}`);
    }
    if (objects.length > MAX_OUTPUT_COUNT) {
        throw new Error(`The maximum number of outputs is ${MAX_OUTPUT_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("outputs.numOutputs", objects.length);
    let nativeTokenCount = 0;
    for (let i = 0; i < objects.length; i++) {
        serializeOutput(writeStream, objects[i]);
        if (objects[i].type === BASIC_OUTPUT_TYPE ||
            objects[i].type === ALIAS_OUTPUT_TYPE ||
            objects[i].type === FOUNDRY_OUTPUT_TYPE ||
            objects[i].type === NFT_OUTPUT_TYPE) {
            const common = objects[i];
            nativeTokenCount += common.nativeTokens.length;
        }
    }
    if (nativeTokenCount > MAX_NATIVE_TOKEN_COUNT) {
        throw new Error(`The maximum number of native tokens is ${MAX_NATIVE_TOKEN_COUNT}, you have provided ${nativeTokenCount}`);
    }
}
/**
 * Deserialize the output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeOutput(readStream) {
    if (!readStream.hasRemaining(MIN_OUTPUT_LENGTH)) {
        throw new Error(`Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("output.type", false);
    let output;
    if (type === TREASURY_OUTPUT_TYPE) {
        output = deserializeTreasuryOutput(readStream);
    }
    else if (type === BASIC_OUTPUT_TYPE) {
        output = deserializeBasicOutput(readStream);
    }
    else if (type === FOUNDRY_OUTPUT_TYPE) {
        output = deserializeFoundryOutput(readStream);
    }
    else if (type === NFT_OUTPUT_TYPE) {
        output = deserializeNftOutput(readStream);
    }
    else if (type === ALIAS_OUTPUT_TYPE) {
        output = deserializeAliasOutput(readStream);
    }
    else {
        throw new Error(`Unrecognized output type ${type}`);
    }
    return output;
}
/**
 * Serialize the output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeOutput(writeStream, object) {
    if (object.type === TREASURY_OUTPUT_TYPE) {
        serializeTreasuryOutput(writeStream, object);
    }
    else if (object.type === BASIC_OUTPUT_TYPE) {
        serializeBasicOutput(writeStream, object);
    }
    else if (object.type === FOUNDRY_OUTPUT_TYPE) {
        serializeFoundryOutput(writeStream, object);
    }
    else if (object.type === NFT_OUTPUT_TYPE) {
        serializeNftOutput(writeStream, object);
    }
    else if (object.type === ALIAS_OUTPUT_TYPE) {
        serializeAliasOutput(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized output type ${object.type}`);
    }
}
