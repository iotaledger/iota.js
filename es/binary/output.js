"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkVBQXlHO0FBSXpHLHFDQUFpSDtBQUNqSCxtQ0FBNkM7QUFFaEMsUUFBQSxpQkFBaUIsR0FBVywwQkFBaUIsQ0FBQztBQUM5QyxRQUFBLDRCQUE0QixHQUFXLHlCQUFpQixHQUFHLDRCQUFrQixHQUFHLG9DQUEwQixDQUFDO0FBRXhIOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFL0QsSUFBTSxNQUFNLEdBQTZCLEVBQUUsQ0FBQztJQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFURCxnREFTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxXQUF3QixFQUNyRCxPQUFpQztJQUNqQyxXQUFXLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxlQUFlLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVDO0FBQ0wsQ0FBQztBQVBELDRDQU9DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGlCQUFpQixDQUFDLFVBQXNCO0lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHlCQUFpQixDQUFDLEVBQUU7UUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBa0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDZSx5QkFBbUIsQ0FBQyxDQUFDO0tBQzVGO0lBRUQsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsSUFBSSxLQUFLLENBQUM7SUFFVixJQUFJLElBQUksS0FBSyxzREFBNkIsRUFBRTtRQUN4QyxLQUFLLEdBQUcsZ0NBQWdDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLElBQU0sQ0FBQyxDQUFDO0tBQ3ZEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWhCRCw4Q0FnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZUFBZSxDQUFDLFdBQXdCLEVBQ3BELE1BQThCO0lBQzlCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxzREFBNkIsRUFBRTtRQUMvQyw4QkFBOEIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDdkQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTZCLE1BQTZCLENBQUMsSUFBTSxDQUFDLENBQUM7S0FDdEY7QUFDTCxDQUFDO0FBUEQsMENBT0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0NBQWdDLENBQUMsVUFBc0I7SUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsb0NBQTRCLENBQUMsRUFBRTtRQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUEwQyxVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNULG9DQUE4QixDQUFDLENBQUM7S0FDdkc7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDL0QsSUFBSSxJQUFJLEtBQUssc0RBQTZCLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBMEMsSUFBTSxDQUFDLENBQUM7S0FDckU7SUFFRCxJQUFNLE9BQU8sR0FBRyw0QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFFckUsT0FBTztRQUNILElBQUksRUFBRSxDQUFDO1FBQ1AsT0FBTyxTQUFBO1FBQ1AsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDekIsQ0FBQztBQUNOLENBQUM7QUFuQkQsNEVBbUJDO0FBR0Q7Ozs7R0FJRztBQUNILFNBQWdCLDhCQUE4QixDQUFDLFdBQXdCLEVBQ25FLE1BQThCO0lBQzlCLFdBQVcsQ0FBQyxTQUFTLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUxELHdFQUtDIn0=