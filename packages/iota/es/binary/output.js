import bigInt from "big-integer";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
import { TREASURY_OUTPUT_TYPE } from "../models/outputs/ITreasuryOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, MIN_ED25519_ADDRESS_LENGTH, serializeAddress } from "./address";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "./common";
/**
 * The minimum length of an output binary representation.
 */
export const MIN_OUTPUT_LENGTH = SMALL_TYPE_LENGTH;
/**
 * The minimum length of a sig locked single output binary representation.
 */
export const MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH = MIN_OUTPUT_LENGTH + MIN_ADDRESS_LENGTH + MIN_ED25519_ADDRESS_LENGTH;
/**
 * The minimum length of a sig locked dust allowance output binary representation.
 */
export const MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = MIN_OUTPUT_LENGTH + MIN_ADDRESS_LENGTH + MIN_ED25519_ADDRESS_LENGTH;
/**
 * The minimum length of a treasury output binary representation.
 */
export const MIN_TREASURY_OUTPUT_LENGTH = MIN_OUTPUT_LENGTH + UINT64_SIZE;
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
/**
 * Deserialize the signature locked single output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleOutput(readStream) {
    if (!readStream.hasRemaining(MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Single Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("simpleOutput.type");
    if (type !== SIMPLE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in simpleOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("simpleOutput.amount");
    return {
        type: SIMPLE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
/**
 * Serialize the signature locked single output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSimpleOutput(writeStream, object) {
    writeStream.writeByte("simpleOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("simpleOutput.amount", bigInt(object.amount));
}
/**
 * Deserialize the signature locked dust allowance output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSigLockedDustAllowanceOutput(readStream) {
    if (!readStream.hasRemaining(MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Dust Allowance Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("sigLockedDustAllowanceOutput.type");
    if (type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in sigLockedDustAllowanceOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("sigLockedDustAllowanceOutput.amount");
    return {
        type: SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
/**
 * Serialize the signature locked dust allowance output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSigLockedDustAllowanceOutput(writeStream, object) {
    writeStream.writeByte("sigLockedDustAllowanceOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("sigLockedDustAllowanceOutput.amount", bigInt(object.amount));
}
/**
 * Deserialize the treasury output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTreasuryOutput(readStream) {
    if (!readStream.hasRemaining(MIN_TREASURY_OUTPUT_LENGTH)) {
        throw new Error(`Treasury Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("treasuryOutput.type");
    if (type !== TREASURY_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in treasuryOutput ${type}`);
    }
    const amount = readStream.readUInt64("treasuryOutput.amount");
    return {
        type: TREASURY_OUTPUT_TYPE,
        amount: Number(amount)
    };
}
/**
 * Serialize the treasury output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTreasuryOutput(writeStream, object) {
    writeStream.writeByte("treasuryOutput.type", object.type);
    writeStream.writeUInt64("treasuryOutput.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE9BQU8sRUFFSCxxQ0FBcUMsRUFDeEMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RCxPQUFPLEVBQWlCLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEYsT0FBTyxFQUFtQixvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTFGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSwwQkFBMEIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQVcsaUJBQWlCLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FDNUMsaUJBQWlCLEdBQUcsa0JBQWtCLEdBQUcsMEJBQTBCLENBQUM7QUFFeEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSwyQ0FBMkMsR0FDcEQsaUJBQWlCLEdBQUcsa0JBQWtCLEdBQUcsMEJBQTBCLENBQUM7QUFFeEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBVyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7QUFFbEY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBVyxDQUFDLENBQUM7QUFFMUM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBVyxHQUFHLENBQUM7QUFFNUM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FDOUIsVUFBc0I7SUFFdEIsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0Is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