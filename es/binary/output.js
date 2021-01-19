"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSigLockedDustAllowanceOutput = exports.deserializeSigLockedDustAllowanceOutput = exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MAX_OUTPUT_COUNT = exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyx5RkFBK0g7QUFDL0gsMkVBQXlHO0FBSXpHLHFDQUFpSDtBQUNqSCxtQ0FBNkM7QUFFN0M7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFXLDBCQUFpQixDQUFDO0FBRTNEOztHQUVHO0FBQ1UsUUFBQSxtQ0FBbUMsR0FDNUMseUJBQWlCLEdBQUcsNEJBQWtCLEdBQUcsb0NBQTBCLENBQUM7QUFFeEU7O0dBRUc7QUFDVSxRQUFBLDJDQUEyQyxHQUN4RCx5QkFBaUIsR0FBRyw0QkFBa0IsR0FBRyxvQ0FBMEIsQ0FBQztBQUVwRTs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQVcsR0FBRyxDQUFDO0FBRTVDOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFL0QsSUFBTSxNQUFNLEdBQStELEVBQUUsQ0FBQztJQUM5RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFURCxnREFTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxXQUF3QixFQUNyRCxPQUFtRTtJQUNuRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsd0JBQWdCLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBb0Msd0JBQWdCLDRCQUF1QixPQUFPLENBQUMsTUFBUSxDQUFDLENB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