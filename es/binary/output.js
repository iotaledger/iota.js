"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSigLockedDustAllowanceOutput = exports.deserializeSigLockedDustAllowanceOutput = exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MAX_OUTPUT_COUNT = exports.MIN_OUTPUT_COUNT = exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var address_1 = require("./address");
var common_1 = require("./common");
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
    var numOutputs = readStream.readUInt16("outputs.numOutputs");
    var inputs = [];
    for (var i = 0; i < numOutputs; i++) {
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
        throw new Error("The minimum number of outputs is " + exports.MIN_OUTPUT_COUNT + ", you have provided " + objects.length);
    }
    if (objects.length > exports.MAX_OUTPUT_COUNT) {
        throw new Error("The maximum number of outputs is " + exports.MAX_OUTPUT_COUNT + ", you have provided " + objects.length);
    }
    writeStream.writeUInt16("outputs.numOutputs", objects.length);
    for (var i = 0; i < objects.length; i++) {
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
        throw new Error("Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_OUTPUT_LENGTH);
    }
    var type = readStream.readByte("output.type", false);
    var input;
    if (type === ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        input = deserializeSigLockedSingleOutput(readStream);
    }
    else if (type === ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        input = deserializeSigLockedDustAllowanceOutput(readStream);
    }
    else {
        throw new Error("Unrecognized output type " + type);
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
    else {
        throw new Error("Unrecognized output type " + object.type);
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
        throw new Error("Signature Locked Single Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH);
    }
    var type = readStream.readByte("sigLockedSingleOutput.type");
    if (type !== ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        throw new Error("Type mismatch in sigLockedSingleOutput " + type);
    }
    var address = address_1.deserializeAddress(readStream);
    var amount = readStream.readUInt64("sigLockedSingleOutput.amount");
    return {
        type: ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE,
        address: address,
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
        throw new Error("Signature Locked Dust Allowance Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH);
    }
    var type = readStream.readByte("sigLockedDustAllowanceOutput.type");
    if (type !== ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        throw new Error("Type mismatch in sigLockedDustAllowanceOutput " + type);
    }
    var address = address_1.deserializeAddress(readStream);
    var amount = readStream.readUInt64("sigLockedDustAllowanceOutput.amount");
    return {
        type: ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE,
        address: address,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyx5RkFBK0g7QUFDL0gsMkVBQXlHO0FBSXpHLHFDQUFpSDtBQUNqSCxtQ0FBNkM7QUFFN0M7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFXLDBCQUFpQixDQUFDO0FBRTNEOztHQUVHO0FBQ1UsUUFBQSxtQ0FBbUMsR0FDNUMseUJBQWlCLEdBQUcsNEJBQWtCLEdBQUcsb0NBQTBCLENBQUM7QUFFeEU7O0dBRUc7QUFDVSxRQUFBLDJDQUEyQyxHQUNwRCx5QkFBaUIsR0FBRyw0QkFBa0IsR0FBRyxvQ0FBMEIsQ0FBQztBQUd4RTs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQVcsQ0FBQyxDQUFDO0FBRTFDOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBVyxHQUFHLENBQUM7QUFFNUM7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUUvRCxJQUFNLE1BQU0sR0FBK0QsRUFBRSxDQUFDO0lBQzlFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVRELGdEQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQ3JELE9BQW1FO0lBQ25FLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyx3QkFBZ0IsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFD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