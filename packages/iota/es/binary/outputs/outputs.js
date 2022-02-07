import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import { MAX_NATIVE_TOKEN_COUNT } from "../nativeTokens";
import { deserializeAliasOutput, MIN_ALIAS_OUTPUT_LENGTH, serializeAliasOutput } from "./aliasOutput";
import { deserializeBasicOutput, MIN_BASIC_OUTPUT_LENGTH, serializeBasicOutput } from "./basicOutput";
import { deserializeFoundryOutput, MIN_FOUNDRY_OUTPUT_LENGTH, serializeFoundryOutput } from "./foundryOutput";
import { deserializeNftOutput, MIN_NFT_OUTPUT_LENGTH, serializeNftOutput } from "./nftOutput";
import { deserializeTreasuryOutput, MIN_TREASURY_OUTPUT_LENGTH, serializeTreasuryOutput } from "./treasuryOutput";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvb3V0cHV0cy9vdXRwdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsaUJBQWlCLEVBQWdCLE1BQU0sbUNBQW1DLENBQUM7QUFFcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFrQixNQUFNLHFDQUFxQyxDQUFDO0FBQzFGLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQW1CLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFN0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLDBCQUEwQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbEg7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUM3QywwQkFBMEIsRUFDMUIseUJBQXlCLEVBQ3pCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsdUJBQXVCLENBQzFCLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFN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