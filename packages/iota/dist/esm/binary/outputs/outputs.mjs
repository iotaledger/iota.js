import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput.mjs";
import { EXTENDED_OUTPUT_TYPE } from "../../models/outputs/IExtendedOutput.mjs";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput.mjs";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput.mjs";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../../models/outputs/ISigLockedDustAllowanceOutput.mjs";
import { SIMPLE_OUTPUT_TYPE } from "../../models/outputs/ISimpleOutput.mjs";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput.mjs";
import { deserializeAliasOutput, MIN_ALIAS_OUTPUT_LENGTH, serializeAliasOutput } from "./aliasOutput.mjs";
import { deserializeExtendedOutput, MIN_EXTENDED_OUTPUT_LENGTH, serializeExtendedOutput } from "./extendedOutput.mjs";
import { deserializeFoundryOutput, MIN_FOUNDRY_OUTPUT_LENGTH, serializeFoundryOutput } from "./foundryOutput.mjs";
import { deserializeNftOutput, MIN_NFT_OUTPUT_LENGTH, serializeNftOutput } from "./nftOutput.mjs";
import { deserializeSigLockedDustAllowanceOutput, MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH, serializeSigLockedDustAllowanceOutput } from "./sigLockedDustAllowanceOutput.mjs";
import { deserializeSimpleOutput, MIN_SIMPLE_OUTPUT_LENGTH, serializeSimpleOutput } from "./simpleOutput.mjs";
import { deserializeTreasuryOutput, MIN_TREASURY_OUTPUT_LENGTH, serializeTreasuryOutput } from "./treasuryOutput.mjs";
/**
 * The minimum length of an output binary representation.
 */
export const MIN_OUTPUT_LENGTH = Math.min(MIN_SIMPLE_OUTPUT_LENGTH, MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH, MIN_TREASURY_OUTPUT_LENGTH, MIN_FOUNDRY_OUTPUT_LENGTH, MIN_EXTENDED_OUTPUT_LENGTH, MIN_NFT_OUTPUT_LENGTH, MIN_ALIAS_OUTPUT_LENGTH);
/**
 * The minimum number of outputs.
 */
export const MIN_OUTPUT_COUNT = 1;
/**
 * The maximum number of outputs.
 */
export const MAX_OUTPUT_COUNT = 127;
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
    for (let i = 0; i < objects.length; i++) {
        serializeOutput(writeStream, objects[i]);
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
    const type = readStream.readByte("output.type", false);
    let output;
    if (type === SIMPLE_OUTPUT_TYPE) {
        output = deserializeSimpleOutput(readStream);
    }
    else if (type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        output = deserializeSigLockedDustAllowanceOutput(readStream);
    }
    else if (type === TREASURY_OUTPUT_TYPE) {
        output = deserializeTreasuryOutput(readStream);
    }
    else if (type === EXTENDED_OUTPUT_TYPE) {
        output = deserializeExtendedOutput(readStream);
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
    if (object.type === SIMPLE_OUTPUT_TYPE) {
        serializeSimpleOutput(writeStream, object);
    }
    else if (object.type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        serializeSigLockedDustAllowanceOutput(writeStream, object);
    }
    else if (object.type === TREASURY_OUTPUT_TYPE) {
        serializeTreasuryOutput(writeStream, object);
    }
    else if (object.type === EXTENDED_OUTPUT_TYPE) {
        serializeExtendedOutput(writeStream, object);
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
