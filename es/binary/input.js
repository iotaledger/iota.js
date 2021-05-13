"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTreasuryInput = exports.deserializeTreasuryInput = exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MAX_INPUT_COUNT = exports.MIN_INPUT_COUNT = exports.MIN_TREASURY_INPUT_LENGTH = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const ITreasuryInput_1 = require("../models/ITreasuryInput");
const IUTXOInput_1 = require("../models/IUTXOInput");
const common_1 = require("./common");
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
    const numInputs = readStream.readUInt16("inputs.numInputs");
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
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
        throw new Error(`The minimum number of inputs is ${exports.MIN_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    if (objects.length > exports.MAX_INPUT_COUNT) {
        throw new Error(`The maximum number of inputs is ${exports.MAX_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("inputs.numInputs", objects.length);
    for (let i = 0; i < objects.length; i++) {
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
        throw new Error(`Input data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_INPUT_LENGTH}`);
    }
    const type = readStream.readByte("input.type", false);
    let input;
    if (type === IUTXOInput_1.UTXO_INPUT_TYPE) {
        input = deserializeUTXOInput(readStream);
    }
    else if (type === ITreasuryInput_1.TREASURY_INPUT_TYPE) {
        input = deserializeTreasuryInput(readStream);
    }
    else {
        throw new Error(`Unrecognized input type ${type}`);
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
        throw new Error(`Unrecognized input type ${object.type}`);
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
        throw new Error(`UTXO Input data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_UTXO_INPUT_LENGTH}`);
    }
    const type = readStream.readByte("utxoInput.type");
    if (type !== IUTXOInput_1.UTXO_INPUT_TYPE) {
        throw new Error(`Type mismatch in utxoInput ${type}`);
    }
    const transactionId = readStream.readFixedHex("utxoInput.transactionId", common_1.TRANSACTION_ID_LENGTH);
    const transactionOutputIndex = readStream.readUInt16("utxoInput.transactionOutputIndex");
    return {
        type: IUTXOInput_1.UTXO_INPUT_TYPE,
        transactionId,
        transactionOutputIndex
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
        throw new Error(`Treasury Input data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_TREASURY_INPUT_LENGTH}`);
    }
    const type = readStream.readByte("treasuryInput.type");
    if (type !== ITreasuryInput_1.TREASURY_INPUT_TYPE) {
        throw new Error(`Type mismatch in treasuryInput ${type}`);
    }
    const milestoneId = readStream.readFixedHex("treasuryInput.milestoneId", common_1.TRANSACTION_ID_LENGTH);
    return {
        type: ITreasuryInput_1.TREASURY_INPUT_TYPE,
        milestoneId
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
    writeStream.writeFixedHex("treasuryInput.milestoneId", common_1.TRANSACTION_ID_LENGTH, object.milestoneId);
}
exports.serializeTreasuryInput = serializeTreasuryInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsNkRBQStFO0FBRS9FLHFEQUFtRTtBQUduRSxxQ0FBaUY7QUFFakY7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXLDBCQUFpQixDQUFDO0FBRTFEOztHQUVHO0FBQ1UsUUFBQSxxQkFBcUIsR0FBVyx3QkFBZ0IsR0FBRyw4QkFBcUIsR0FBRyxvQkFBVyxDQUFDO0FBRXBHOztHQUVHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBVyx3QkFBZ0IsR0FBRyw4QkFBcUIsQ0FBQztBQUUxRjs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFXLENBQUMsQ0FBQztBQUV6Qzs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFXLEdBQUcsQ0FBQztBQUUzQzs7OztHQUlHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsVUFBc0I7SUFDcEQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTVELE1BQU0sTUFBTSxHQUFvQyxFQUFFLENBQUM7SUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDN0M7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBVEQsOENBU0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZUFBZSxDQUFDLFdBQXdCLEVBQUUsT0FBd0M7SUFDOUYsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLHVCQUFlLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsdUJBQWUsdUJBQXVCLE9BQU8sQ0FBQyxNQUFNLEVB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