import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { EXTENDED_OUTPUT_TYPE } from "../../models/outputs/IExtendedOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../../models/outputs/ISimpleOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import { deserializeAliasOutput, MIN_ALIAS_OUTPUT_LENGTH, serializeAliasOutput } from "./aliasOutput";
import { deserializeExtendedOutput, MIN_EXTENDED_OUTPUT_LENGTH, serializeExtendedOutput } from "./extendedOutput";
import { deserializeFoundryOutput, MIN_FOUNDRY_OUTPUT_LENGTH, serializeFoundryOutput } from "./foundryOutput";
import { deserializeNftOutput, MIN_NFT_OUTPUT_LENGTH, serializeNftOutput } from "./nftOutput";
import { deserializeSigLockedDustAllowanceOutput, MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH, serializeSigLockedDustAllowanceOutput } from "./sigLockedDustAllowanceOutput";
import { deserializeSimpleOutput, MIN_SIMPLE_OUTPUT_LENGTH, serializeSimpleOutput } from "./simpleOutput";
import { deserializeTreasuryOutput, MIN_TREASURY_OUTPUT_LENGTH, serializeTreasuryOutput } from "./treasuryOutput";
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
    const type = readStream.readUInt8("output.type", false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvb3V0cHV0cy9vdXRwdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsb0JBQW9CLEVBQW1CLE1BQU0sc0NBQXNDLENBQUM7QUFDN0YsT0FBTyxFQUFFLG1CQUFtQixFQUFrQixNQUFNLHFDQUFxQyxDQUFDO0FBQzFGLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBRUgscUNBQXFDLEVBQ3hDLE1BQU0sb0RBQW9ELENBQUM7QUFDNUQsT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBbUIsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU3RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLDBCQUEwQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEgsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlGLE9BQU8sRUFDSCx1Q0FBdUMsRUFDdkMsMkNBQTJDLEVBQzNDLHFDQUFxQyxFQUN4QyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSx1QkFB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