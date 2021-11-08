import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../../models/outputs/ISimpleOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import { deserializeSigLockedDustAllowanceOutput, MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH, serializeSigLockedDustAllowanceOutput } from "./sigLockedDustAllowanceOutput";
import { deserializeSimpleOutput, MIN_SIMPLE_OUTPUT_LENGTH, serializeSimpleOutput } from "./simpleOutput";
import { deserializeTreasuryOutput, serializeTreasuryOutput } from "./treasuryOutput";
/**
 * The minimum length of an output binary representation.
 */
export const MIN_OUTPUT_LENGTH = Math.min(MIN_SIMPLE_OUTPUT_LENGTH, MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH);
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
    const inputs = [];
    for (let i = 0; i < numOutputs; i++) {
        inputs.push(deserializeOutput(readStream));
    }
    return inputs;
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
    let input;
    if (type === SIMPLE_OUTPUT_TYPE) {
        input = deserializeSimpleOutput(readStream);
    }
    else if (type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        input = deserializeSigLockedDustAllowanceOutput(readStream);
    }
    else if (type === TREASURY_OUTPUT_TYPE) {
        input = deserializeTreasuryOutput(readStream);
    }
    else {
        throw new Error(`Unrecognized output type ${type}`);
    }
    return input;
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
    else {
        throw new Error(`Unrecognized output type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvb3V0cHV0cy9vdXRwdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFFSCxxQ0FBcUMsRUFDeEMsTUFBTSxvREFBb0QsQ0FBQztBQUM1RCxPQUFPLEVBQWlCLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFtQixvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTdGLE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSwyQ0FBMkMsRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdLLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXRGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQzFCLElBQUksQ0FBQyxHQUFHLENBQ0osd0JBQXdCLEVBQ3hCLDJDQUEyQyxDQUM5QyxDQUFDO0FBRU47O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBVyxDQUFDLENBQUM7QUFFMUM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBVyxHQUFHLENBQUM7QUFFNUM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FDOUIsVUFBc0I7SUFFdEIsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRS9ELE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFp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