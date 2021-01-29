"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTreasuryInput = exports.deserializeTreasuryInput = exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MAX_INPUT_COUNT = exports.MIN_INPUT_COUNT = exports.MIN_TREASURY_INPUT_LENGTH = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ITreasuryInput_1 = require("../models/ITreasuryInput");
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
 * The minimum length of a treasury input binary representation.
 */
exports.MIN_TREASURY_INPUT_LENGTH = exports.MIN_INPUT_LENGTH + common_1.TRANSACTION_ID_LENGTH;
/**
 * The minimum number of inputs.
 */
exports.MIN_INPUT_COUNT = 1;
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
    if (objects.length < exports.MIN_INPUT_COUNT) {
        throw new Error("The minimum number of inputs is " + exports.MIN_INPUT_COUNT + ", you have provided " + objects.length);
    }
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
    else if (type === ITreasuryInput_1.TREASURY_INPUT_TYPE) {
        input = deserializeTreasuryInput(readStream);
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
    else if (object.type === ITreasuryInput_1.TREASURY_INPUT_TYPE) {
        serializeTreasuryInput(writeStream, object);
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
/**
 * Deserialize the treasury input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeTreasuryInput(readStream) {
    if (!readStream.hasRemaining(exports.MIN_TREASURY_INPUT_LENGTH)) {
        throw new Error("Treasury Input data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TREASURY_INPUT_LENGTH);
    }
    var type = readStream.readByte("treasuryInput.type");
    if (type !== ITreasuryInput_1.TREASURY_INPUT_TYPE) {
        throw new Error("Type mismatch in treasuryInput " + type);
    }
    var milestoneHash = readStream.readFixedHex("treasuryInput.milestoneHash", common_1.TRANSACTION_ID_LENGTH);
    return {
        type: ITreasuryInput_1.TREASURY_INPUT_TYPE,
        milestoneHash: milestoneHash
    };
}
exports.deserializeTreasuryInput = deserializeTreasuryInput;
/**
 * Serialize the treasury input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeTreasuryInput(writeStream, object) {
    writeStream.writeByte("treasuryInput.type", object.type);
    writeStream.writeFixedHex("treasuryInput.milestoneHash", common_1.TRANSACTION_ID_LENGTH, object.milestoneHash);
}
exports.serializeTreasuryInput = serializeTreasuryInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsMkRBQStFO0FBRS9FLG1EQUFtRTtBQUduRSxtQ0FBaUY7QUFFakY7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXLDBCQUFpQixDQUFDO0FBRTFEOztHQUVHO0FBQ1UsUUFBQSxxQkFBcUIsR0FBVyx3QkFBZ0IsR0FBRyw4QkFBcUIsR0FBRyxvQkFBVyxDQUFDO0FBRXBHOztHQUVHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBVyx3QkFBZ0IsR0FBRyw4QkFBcUIsQ0FBQztBQUUxRjs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFXLENBQUMsQ0FBQztBQUV6Qzs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFXLEdBQUcsQ0FBQztBQUUzQzs7OztHQUlHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsVUFBc0I7SUFDcEQsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTVELElBQU0sTUFBTSxHQUFvQyxFQUFFLENBQUM7SUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDN0M7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBVEQsOENBU0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZUFBZSxDQUFDLFdBQXdCLEVBQUUsT0FBNEI7SUFDbEYsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLHVCQUFlLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBbUMsdUJBQWUsNEJBQXVCLE9BQU8sQ0FBQyxNQUFRLENB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