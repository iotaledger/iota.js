"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var address_1 = require("./address");
var common_1 = require("./common");
exports.MIN_OUTPUT_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH + address_1.MIN_ADDRESS_LENGTH + address_1.MIN_ED25519_ADDRESS_LENGTH;
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
    if (!readStream.hasRemaining(exports.MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
        throw new Error("Signature Locked Single Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIG_LOCKED_OUTPUT_LENGTH);
    }
    var type = readStream.readByte("sigLockedSingleOutput.type");
    if (type !== ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        throw new Error("Type mismatch in sigLockedSingleOutput " + type);
    }
    var address = address_1.deserializeAddress(readStream);
    var amount = readStream.readUInt64("sigLockedSingleOutput.amount");
    return {
        type: 0,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywyRUFBeUc7QUFJekcscUNBQWlIO0FBQ2pILG1DQUE2QztBQUVoQyxRQUFBLGlCQUFpQixHQUFXLDBCQUFpQixDQUFDO0FBQzlDLFFBQUEsNEJBQTRCLEdBQVcseUJBQWlCLEdBQUcsNEJBQWtCLEdBQUcsb0NBQTBCLENBQUM7QUFFeEg7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUUvRCxJQUFNLE1BQU0sR0FBNkIsRUFBRSxDQUFDO0lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVRELGdEQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQ3JELE9BQWlDO0lBQ2pDLFdBQVcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7QUFDTCxDQUFDO0FBUEQsNENBT0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsVUFBc0I7SUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMseUJBQWlCLENBQUMsRUFBRTtRQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFrQixVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNlLHlCQUFtQixDQUFDLENBQUM7S0FDNUY7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxJQUFJLEtBQUssQ0FBQztJQUVWLElBQUksSUFBSSxLQUFLLHNEQUE2QixFQUFFO1FBQ3hDLEtBQUssR0FBRyxnQ0FBZ0MsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN4RDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBNEIsSUFBTSxDQUFDLENBQUM7S0FDdkQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBaEJELDhDQWdCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFlLENBQUMsV0FBd0IsRUFDcEQsTUFBOEI7SUFDOUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLHNEQUE2QixFQUFFO1FBQy9DLDhCQUE4QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN2RDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBNkIsTUFBNkIsQ0FBQyxJQUFNLENBQUMsQ0FBQztLQUN0RjtBQUNMLENBQUM7QUFQRCwwQ0FPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQ0FBZ0MsQ0FBQyxVQUFzQjtJQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxvQ0FBNEIsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTBDLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ1Qsb0NBQThCLENBQUMsQ0FBQztLQUN2RztJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMvRCxJQUFJLElBQUksS0FBSyxzREFBNkIsRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUEwQyxJQUFNLENBQUMsQ0FBQztLQUNyRTtJQUVELElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUVyRSxPQUFPO1FBQ0gsSUFBSSxFQUFFLENBQUM7UUFDUCxPQUFPLFNBQUE7UUFDUCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQW5CRCw0RUFtQkM7QUFHRDs7OztHQUlHO0FBQ0gsU0FBZ0IsOEJBQThCLENBQUMsV0FBd0IsRUFDbkUsTUFBOEI7SUFDOUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNuRixDQUFDO0FBTEQsd0VBS0MifQ==