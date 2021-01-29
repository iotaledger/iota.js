"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTreasuryOutput = exports.deserializeTreasuryOutput = exports.serializeSigLockedDustAllowanceOutput = exports.deserializeSigLockedDustAllowanceOutput = exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MAX_OUTPUT_COUNT = exports.MIN_OUTPUT_COUNT = exports.MIN_TREASURY_OUTPUT_LENGTH = exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = exports.MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var ITreasuryOutput_1 = require("../models/ITreasuryOutput");
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
    else if (type === ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
        input = deserializeTreasuryOutput(readStream);
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
    else if (object.type === ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
        serializeTreasuryOutput(writeStream, object);
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
/**
 * Deserialize the treasury output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeTreasuryOutput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_TREASURY_OUTPUT_LENGTH)) {
        throw new Error("Treasury Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TREASURY_OUTPUT_LENGTH);
    }
    var type = readStream.readByte("treasuryOutput.type");
    if (type !== ITreasuryOutput_1.TREASURY_OUTPUT_TYPE) {
        throw new Error("Type mismatch in treasuryOutput " + type);
    }
    var amount = readStream.readUInt64("treasuryOutput.amount");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyx5RkFBK0g7QUFDL0gsMkVBQXlHO0FBQ3pHLDZEQUFrRjtBQUlsRixxQ0FBaUg7QUFDakgsbUNBQTBEO0FBRTFEOztHQUVHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBVywwQkFBaUIsQ0FBQztBQUUzRDs7R0FFRztBQUNVLFFBQUEsbUNBQW1DLEdBQzVDLHlCQUFpQixHQUFHLDRCQUFrQixHQUFHLG9DQUEwQixDQUFDO0FBRXhFOztHQUVHO0FBQ1UsUUFBQSwyQ0FBMkMsR0FDcEQseUJBQWlCLEdBQUcsNEJBQWtCLEdBQUcsb0NBQTBCLENBQUM7QUFFeEU7O0dBRUc7QUFDVSxRQUFBLDBCQUEwQixHQUNuQyx5QkFBaUIsR0FBRyxvQkFBVyxDQUFDO0FBRXBDOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBVyxDQUFDLENBQUM7QUFFMUM7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXLEdBQUcsQ0FBQztBQUU1Qzs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBc0I7SUFFckQsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRS9ELElBQU0sTUFBTSxHQUFpRixFQUFFLENBQUM7SUFDaEcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBVkQsZ0RBVUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsV0FBd0IsRUFDckQsT0FBcUY7SUFDckYsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLHdCQUFnQixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQW9DLHdCQUFnQiw0QkFBdUIsT0FBTyxDQUFDLE1BQVEsQ0FBQyxDQUFDO0tBQ2hIO0lBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLHdCQUFnQixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQW9DLHdCQUFnQiw0QkFBdUIsT0FBTyxDQUFDLE1BQVEsQ0FBQyxDQUFDO0tBQ2hIO0lBRUQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsZUFBZSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QztBQUNMLENBQUM7QUFkRCw0Q0FjQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxVQUFzQjtJQUVwRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx5QkFBaUIsQ0FBQyxFQUFFO1FBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQWtCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ2UseUJBQW1CLENBQUMsQ0FBQztLQUM1RjtJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxJQUFJLEtBQUssc0RBQTZCLEVBQUU7UUFDeEMsS0FBSyxHQUFHLGdDQUFnQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hEO1NBQU0sSUFBSSxJQUFJLEtBQUsscUVBQXFDLEVBQUU7UUFDdkQsS0FBSyxHQUFHLHVDQUF1QyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9EO1NBQU0sSUFBSSxJQUFJLEtBQUssc0NBQW9CLEVBQUU7UUFDdEMsS0FBSyxHQUFHLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2pEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE0QixJQUFNLENBQUMsQ0FBQztLQUN2RDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFyQkQsOENBcUJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxXQUF3QixFQUNwRCxNQUF5QjtJQUN6QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssc0RBQTZCLEVBQUU7UUFDL0MsOEJBQThCLENBQUMsV0FBVyxFQUFFLE1BQWdDLENBQUMsQ0FBQztLQUNqRjtTQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxxRUFBcUMsRUFBRTtRQUM5RCxxQ0FBcUMsQ0FBQyxXQUFXLEVBQUUsTUFBdUMsQ0FBQyxDQUFDO0tBQy9GO1NBQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLHNDQUFvQixFQUFFO1FBQzdDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxNQUF5QixDQUFDLENBQUM7S0FDbkU7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLE1BQU0sQ0FBQyxJQUFNLENBQUMsQ0FBQztLQUM5RDtBQUNMLENBQUM7QUFYRCwwQ0FXQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQ0FBZ0MsQ0FBQyxVQUFzQjtJQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywyQ0FBbUMsQ0FBQyxFQUFFO1FBQy9ELE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTBDLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ1QsMkNBQXFDLENBQUMsQ0FBQztLQUM5RztJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMvRCxJQUFJLElBQUksS0FBSyxzREFBNkIsRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUEwQyxJQUFNLENBQUMsQ0FBQztLQUNyRTtJQUVELElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUVyRSxPQUFPO1FBQ0gsSUFBSSxFQUFFLHNEQUE2QjtRQUNuQyxPQUFPLFNBQUE7UUFDUCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQW5CRCw0RUFtQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsOEJBQThCLENBQUMsV0FBd0IsRUFDbkUsTUFBOEI7SUFDOUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNuRixDQUFDO0FBTEQsd0VBS0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsdUNBQXVDLENBQUMsVUFBc0I7SUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsbURBQTJDLENBQUMsRUFBRTtRQUN2RSxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFrRCxVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNqQixtREFDOUQsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDdEUsSUFBSSxJQUFJLEtBQUsscUVBQXFDLEVBQUU7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBaUQsSUFBTSxDQUFDLENBQUM7S0FDNUU7SUFFRCxJQUFNLE9BQU8sR0FBRyw0QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFFNUUsT0FBTztRQUNILElBQUksRUFBRSxxRUFBcUM7UUFDM0MsT0FBTyxTQUFBO1FBQ1AsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDekIsQ0FBQztBQUNOLENBQUM7QUFwQkQsMEZBb0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHFDQUFxQyxDQUFDLFdBQXdCLEVBQzFFLE1BQXFDO0lBQ3JDLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUNBQW1DLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxxQ0FBcUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDMUYsQ0FBQztBQUxELHNGQUtDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHlCQUF5QixDQUFDLFVBQXNCO0lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtDQUEwQixDQUFDLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBMkIsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDTSxrQ0FDOUQsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsSUFBSSxJQUFJLEtBQUssc0NBQW9CLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBbUMsSUFBTSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFFOUQsT0FBTztRQUNILElBQUksRUFBRSxzQ0FBb0I7UUFDMUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDekIsQ0FBQztBQUNOLENBQUM7QUFsQkQsOERBa0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHVCQUF1QixDQUFDLFdBQXdCLEVBQzVELE1BQXVCO0lBQ3ZCLFdBQVcsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELFdBQVcsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFKRCwwREFJQyJ9