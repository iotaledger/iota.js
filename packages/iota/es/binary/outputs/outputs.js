import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { EXTENDED_OUTPUT_TYPE } from "../../models/outputs/IExtendedOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import { deserializeAliasOutput, MIN_ALIAS_OUTPUT_LENGTH, serializeAliasOutput } from "./aliasOutput";
import { deserializeExtendedOutput, MIN_EXTENDED_OUTPUT_LENGTH, serializeExtendedOutput } from "./extendedOutput";
import { deserializeFoundryOutput, MIN_FOUNDRY_OUTPUT_LENGTH, serializeFoundryOutput } from "./foundryOutput";
import { deserializeNftOutput, MIN_NFT_OUTPUT_LENGTH, serializeNftOutput } from "./nftOutput";
import { deserializeTreasuryOutput, MIN_TREASURY_OUTPUT_LENGTH, serializeTreasuryOutput } from "./treasuryOutput";
/**
 * The minimum length of an output binary representation.
 */
export const MIN_OUTPUT_LENGTH = Math.min(MIN_TREASURY_OUTPUT_LENGTH, MIN_FOUNDRY_OUTPUT_LENGTH, MIN_EXTENDED_OUTPUT_LENGTH, MIN_NFT_OUTPUT_LENGTH, MIN_ALIAS_OUTPUT_LENGTH);
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
    const type = readStream.readUInt8("output.type", false);
    let output;
    if (type === TREASURY_OUTPUT_TYPE) {
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
    if (object.type === TREASURY_OUTPUT_TYPE) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvb3V0cHV0cy9vdXRwdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsb0JBQW9CLEVBQW1CLE1BQU0sc0NBQXNDLENBQUM7QUFDN0YsT0FBTyxFQUFFLG1CQUFtQixFQUFrQixNQUFNLHFDQUFxQyxDQUFDO0FBQzFGLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQW1CLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFN0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM5RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVsSDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFXLElBQUksQ0FBQyxHQUFHLENBQzdDLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsMEJBQTBCLEVBQzFCLHFCQUFxQixFQUNyQix1QkFBdUIsQ0FDMUIsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQVcsQ0FBQyxDQUFDO0FBRTFDOztHQUVHO0FBQ0gsTUFB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