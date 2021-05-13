"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTreasuryOutput = exports.deserializeTreasuryOutput = exports.serializeSigLockedDustAllowanceOutput = exports.deserializeSigLockedDustAllowanceOutput = exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MAX_OUTPUT_COUNT = exports.MIN_OUTPUT_COUNT = exports.MIN_TREASURY_OUTPUT_LENGTH = exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
const ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
const ITreasuryOutput_1 = require("../models/ITreasuryOutput");
const address_1 = require("./address");
const common_1 = require("./common");
/**
 * The minimum length of an output binary representation.
 */
exports.MIN_OUTPUT_LENGTH = common_1.SMALL_TYPE_LENGTH;
/**
 * The minimum length of a sig locked single output binary representation.
 */
exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH + address_1.MIN_ADDRESS_LENGTH + address_1.MIN_ED25519_ADDRESS_LENGTH;
/**
 * The minimum length of a sig locked dust allowance output binary representation.
 */
exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH + address_1.MIN_ADDRESS_LENGTH + address_1.MIN_ED25519_ADDRESS_LENGTH;
/**
 * The minimum length of a treasury output binary representation.
 */
exports.MIN_TREASURY_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH + common_1.UINT64_SIZE;
/**
 * The minimum number of outputs.
 */
exports.MIN_OUTPUT_COUNT = 1;
/**
 * The maximum number of outputs.
 */
exports.MAX_OUTPUT_COUNT = 127;
/**
 * Deserialize the outputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeOutputs(readStream) {
    const numOutputs = readStream.readUInt16("outputs.numOutputs");
    const inputs = [];
    for (let i = 0; i < numOutputs; i++) {
        inputs.push(deserializeOutput(readStream));
    }
    return inputs;
}
exports.deserializeOutputs = deserializeOutputs;
/**
 * Serialize the outputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
function serializeOutputs(writeStream, objects) {
    if (objects.length < exports.MIN_OUTPUT_COUNT) {
        throw new Error(`The minimum number of outputs is ${exports.MIN_OUTPUT_COUNT}, you have provided ${objects.length}`);
    }
    if (objects.length > exports.MAX_OUTPUT_COUNT) {
        throw new Error(`The maximum number of outputs is ${exports.MAX_OUTPUT_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("outputs.numOutputs", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeOutput(writeStream, objects[i]);
    }
}
exports.serializeOutputs = serializeOutputs;
/**
 * Deserialize the output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeOutput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_OUTPUT_LENGTH)) {
        throw new Error(`Output data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("output.type", false);
    let input;
    if (type === ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        input = deserializeSigLockedSingleOutput(readStream);
    }
    else if (type === ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        input = deserializeSigLockedDustAllowanceOutput(readStream);
    }
    else if (type === ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
        input = deserializeTreasuryOutput(readStream);
    }
    else {
        throw new Error(`Unrecognized output type ${type}`);
    }
    return input;
}
exports.deserializeOutput = deserializeOutput;
/**
 * Serialize the output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeOutput(writeStream, object) {
    if (object.type === ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        serializeSigLockedSingleOutput(writeStream, object);
    }
    else if (object.type === ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        serializeSigLockedDustAllowanceOutput(writeStream, object);
    }
    else if (object.type === ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
        serializeTreasuryOutput(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized output type ${object.type}`);
    }
}
exports.serializeOutput = serializeOutput;
/**
 * Deserialize the signature locked single output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeSigLockedSingleOutput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Single Output data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("sigLockedSingleOutput.type");
    if (type !== ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in sigLockedSingleOutput ${type}`);
    }
    const address = address_1.deserializeAddress(readStream);
    const amount = readStream.readUInt64("sigLockedSingleOutput.amount");
    return {
        type: ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
exports.deserializeSigLockedSingleOutput = deserializeSigLockedSingleOutput;
/**
 * Serialize the signature locked single output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeSigLockedSingleOutput(writeStream, object) {
    writeStream.writeByte("sigLockedSingleOutput.type", object.type);
    address_1.serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
}
exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;
/**
 * Deserialize the signature locked dust allowance output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeSigLockedDustAllowanceOutput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Dust Allowance Output data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("sigLockedDustAllowanceOutput.type");
    if (type !== ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in sigLockedDustAllowanceOutput ${type}`);
    }
    const address = address_1.deserializeAddress(readStream);
    const amount = readStream.readUInt64("sigLockedDustAllowanceOutput.amount");
    return {
        type: ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
exports.deserializeSigLockedDustAllowanceOutput = deserializeSigLockedDustAllowanceOutput;
/**
 * Serialize the signature locked dust allowance output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeSigLockedDustAllowanceOutput(writeStream, object) {
    writeStream.writeByte("sigLockedDustAllowanceOutput.type", object.type);
    address_1.serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("sigLockedDustAllowanceOutput.amount", BigInt(object.amount));
}
exports.serializeSigLockedDustAllowanceOutput = serializeSigLockedDustAllowanceOutput;
/**
 * Deserialize the treasury output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeTreasuryOutput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_TREASURY_OUTPUT_LENGTH)) {
        throw new Error(`Treasury Output data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_TREASURY_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("treasuryOutput.type");
    if (type !== ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in treasuryOutput ${type}`);
    }
    const amount = readStream.readUInt64("treasuryOutput.amount");
    return {
        type: ITreasuryOutput_1.TREASURY_OUTPUT_TYPE,
        amount: Number(amount)
    };
}
exports.deserializeTreasuryOutput = deserializeTreasuryOutput;
/**
 * Serialize the treasury output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeTreasuryOutput(writeStream, object) {
    writeStream.writeByte("treasuryOutput.type", object.type);
    writeStream.writeUInt64("treasuryOutput.amount", BigInt(object.amount));
}
exports.serializeTreasuryOutput = serializeTreasuryOutput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywyRkFBK0g7QUFDL0gsNkVBQXlHO0FBQ3pHLCtEQUFrRjtBQUlsRix1Q0FBaUg7QUFDakgscUNBQTBEO0FBRTFEOztHQUVHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBVywwQkFBaUIsQ0FBQztBQUUzRDs7R0FFRztBQUNVLFFBQUEsbUNBQW1DLEdBQzVDLHlCQUFpQixHQUFHLDRCQUFrQixHQUFHLG9DQUEwQixDQUFDO0FBRXhFOztHQUVHO0FBQ1UsUUFBQSwyQ0FBMkMsR0FDcEQseUJBQWlCLEdBQUcsNEJBQWtCLEdBQUcsb0NBQTBCLENBQUM7QUFFeEU7O0dBRUc7QUFDVSxRQUFBLDBCQUEwQixHQUNuQyx5QkFBaUIsR0FBRyxvQkFBVyxDQUFDO0FBRXBDOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBVyxDQUFDLENBQUM7QUFFMUM7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXLEdBQUcsQ0FBQztBQUU1Qzs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBc0I7SUFFckQsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRS9ELE1BQU0sTUFBTSxHQUFpRixFQUFFLENBQUM7SUFDaEcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBVkQsZ0RBVUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsV0FBd0IsRUFDckQsT0FB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