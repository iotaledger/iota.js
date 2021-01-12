"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MAX_INPUT_COUNT = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;
var IUTXOInput_1 = require("../models/IUTXOInput");
var common_1 = require("./common");
/**
 * The minimum length of an input binary representation.
 */
exports.MIN_INPUT_LENGTH = common_1.SMALL_TYPE_LENGTH;
/**
 * The minimum length of a utxo input binary representation.
 */
exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH + common_1.TRANSACTION_ID_LENGTH + common_1.UINT16_SIZE;
/**
 * The maximum number of inputs.
 */
exports.MAX_INPUT_COUNT = 127;
/**
 * Deserialize the inputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeInputs(readStream) {
    var numInputs = readStream.readUInt16("inputs.numInputs");
    var inputs = [];
    for (var i = 0; i < numInputs; i++) {
        inputs.push(deserializeInput(readStream));
    }
    return inputs;
}
exports.deserializeInputs = deserializeInputs;
/**
 * Serialize the inputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
function serializeInputs(writeStream, objects) {
    if (objects.length > exports.MAX_INPUT_COUNT) {
        throw new Error("The maximum number of inputs is " + exports.MAX_INPUT_COUNT + ", you have provided " + objects.length);
    }
    writeStream.writeUInt16("inputs.numInputs", objects.length);
    for (var i = 0; i < objects.length; i++) {
        serializeInput(writeStream, objects[i]);
    }
}
exports.serializeInputs = serializeInputs;
/**
 * Deserialize the input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeInput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_INPUT_LENGTH)) {
        throw new Error("Input data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_INPUT_LENGTH);
    }
    var type = readStream.readByte("input.type", false);
    var input;
    if (type === IUTXOInput_1.UTXO_INPUT_TYPE) {
        input = deserializeUTXOInput(readStream);
    }
    else {
        throw new Error("Unrecognized input type " + type);
    }
    return input;
}
exports.deserializeInput = deserializeInput;
/**
 * Serialize the input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeInput(writeStream, object) {
    if (object.type === IUTXOInput_1.UTXO_INPUT_TYPE) {
        serializeUTXOInput(writeStream, object);
    }
    else {
        throw new Error("Unrecognized input type " + object.type);
    }
}
exports.serializeInput = serializeInput;
/**
 * Deserialize the utxo input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeUTXOInput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_UTXO_INPUT_LENGTH)) {
        throw new Error("UTXO Input data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_UTXO_INPUT_LENGTH);
    }
    var type = readStream.readByte("utxoInput.type");
    if (type !== IUTXOInput_1.UTXO_INPUT_TYPE) {
        throw new Error("Type mismatch in utxoInput " + type);
    }
    var transactionId = readStream.readFixedHex("utxoInput.transactionId", common_1.TRANSACTION_ID_LENGTH);
    var transactionOutputIndex = readStream.readUInt16("utxoInput.transactionOutputIndex");
    return {
        type: IUTXOInput_1.UTXO_INPUT_TYPE,
        transactionId: transactionId,
        transactionOutputIndex: transactionOutputIndex
    };
}
exports.deserializeUTXOInput = deserializeUTXOInput;
/**
 * Serialize the utxo input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeUTXOInput(writeStream, object) {
    writeStream.writeByte("utxoInput.type", object.type);
    writeStream.writeFixedHex("utxoInput.transactionId", common_1.TRANSACTION_ID_LENGTH, object.transactionId);
    writeStream.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
}
exports.serializeUTXOInput = serializeUTXOInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLG1EQUFtRTtBQUduRSxtQ0FBaUY7QUFFakY7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXLDBCQUFpQixDQUFDO0FBRTFEOztHQUVHO0FBQ1UsUUFBQSxxQkFBcUIsR0FBVyx3QkFBZ0IsR0FBRyw4QkFBcUIsR0FBRyxvQkFBVyxDQUFDO0FBRXBHOztHQUVHO0FBQ1UsUUFBQSxlQUFlLEdBQVcsR0FBRyxDQUFDO0FBRTNDOzs7O0dBSUc7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxVQUFzQjtJQUNwRCxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFNUQsSUFBTSxNQUFNLEdBQWlCLEVBQUUsQ0FBQztJQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUM3QztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFURCw4Q0FTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFlLENBQUMsV0FBd0IsRUFDcEQsT0FBcUI7SUFDckIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLHVCQUFlLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBbUMsdUJBQWUsNEJBQXVCLE9BQU8sQ0FBQyxNQUFRLENBQUMsQ0FBQztLQUM5RztJQUNELFdBQVcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxF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