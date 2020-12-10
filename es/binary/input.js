"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;
var IUTXOInput_1 = require("../models/IUTXOInput");
var common_1 = require("./common");
exports.MIN_INPUT_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH + common_1.TRANSACTION_ID_LENGTH + common_1.UINT16_SIZE;
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
        type: 0,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLG1EQUFtRTtBQUduRSxtQ0FBaUY7QUFFcEUsUUFBQSxnQkFBZ0IsR0FBVywwQkFBaUIsQ0FBQztBQUM3QyxRQUFBLHFCQUFxQixHQUFXLHdCQUFnQixHQUFHLDhCQUFxQixHQUFHLG9CQUFXLENBQUM7QUFFcEc7Ozs7R0FJRztBQUNILFNBQWdCLGlCQUFpQixDQUFDLFVBQXNCO0lBQ3BELElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU1RCxJQUFNLE1BQU0sR0FBaUIsRUFBRSxDQUFDO0lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQzdDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVRELDhDQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxXQUF3QixFQUNwRCxPQUFxQjtJQUNyQixXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxjQUFjLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQVBELDBDQU9DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFVBQXNCO0lBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHdCQUFnQixDQUFDLEVBQUU7UUFDNUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBaUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDZ0Isd0JBQWtCLENBQUMsQ0FBQztLQUMzRjtJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxJQUFJLEtBQUssNEJBQWUsRUFBRTtRQUMxQixLQUFLLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUM7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTJCLElBQU0sQ0FBQyxDQUFDO0tBQ3REO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWhCRCw0Q0FnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLFdBQXdCLEVBQ25ELE1BQWtCO0lBQ2xCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyw0QkFBZSxFQUFFO1FBQ2pDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMzQztTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNEIsTUFBNkIsQ0FBQyxJQUFNLENBQUMsQ0FBQztLQUNyRjtBQUNMLENBQUM7QUFQRCx3Q0FPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFzQjtJQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw2QkFBcUIsQ0FBQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXNCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ1csNkJBQXVCLENBQUMsQ0FBQztLQUNoRztJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRCxJQUFJLElBQUksS0FBSyw0QkFBZSxFQUFFO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQThCLElBQU0sQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsRUFBRSw4QkFBcUIsQ0FBQyxDQUFDO0lBQ2hHLElBQU0sc0JBQXNCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBRXpGLE9BQU87UUFDSCxJQUFJLEVBQUUsQ0FBQztRQUNQLGFBQWEsZUFBQTtRQUNiLHNCQUFzQix3QkFBQTtLQUN6QixDQUFDO0FBQ04sQ0FBQztBQW5CRCxvREFtQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsV0FBd0IsRUFDdkQsTUFBa0I7SUFDbEIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBcUIsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxrQ0FBa0MsRUFBRSxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBTEQsZ0RBS0MifQ==