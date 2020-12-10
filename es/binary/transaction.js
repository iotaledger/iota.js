"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var common_1 = require("./common");
var input_1 = require("./input");
var output_1 = require("./output");
var payload_1 = require("./payload");
exports.MIN_TRANSACTION_ESSENCE_LENGTH = common_1.SMALL_TYPE_LENGTH + (2 * common_1.ARRAY_LENGTH) + common_1.UINT32_SIZE;
/**
 * Deserialize the transaction essence from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeTransactionEssence(readStream) {
    if (!readStream.hasRemaining(exports.MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error("Transaction essence data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TRANSACTION_ESSENCE_LENGTH);
    }
    var type = readStream.readByte("transactionEssence.type");
    if (type !== ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE) {
        throw new Error("Type mismatch in transactionEssence " + type);
    }
    var inputs = input_1.deserializeInputs(readStream);
    var outputs = output_1.deserializeOutputs(readStream);
    var payload = payload_1.deserializePayload(readStream);
    if (payload && payload.type !== IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }
    return {
        type: 0,
        inputs: inputs,
        outputs: outputs,
        payload: payload
    };
}
exports.deserializeTransactionEssence = deserializeTransactionEssence;
/**
 * Serialize the transaction essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeTransactionEssence(writeStream, object) {
    writeStream.writeByte("transactionEssence.type", object.type);
    input_1.serializeInputs(writeStream, object.inputs);
    output_1.serializeOutputs(writeStream, object.outputs);
    payload_1.serializePayload(writeStream, object.payload);
}
exports.serializeTransactionEssence = serializeTransactionEssence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1FQUEyRjtBQUMzRixxRUFBOEY7QUFHOUYsbUNBQXdFO0FBQ3hFLGlDQUE2RDtBQUM3RCxtQ0FBZ0U7QUFDaEUscUNBQWlFO0FBRXBELFFBQUEsOEJBQThCLEdBQVcsMEJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcscUJBQVksQ0FBQyxHQUFHLG9CQUFXLENBQUM7QUFFM0c7Ozs7R0FJRztBQUNILFNBQWdCLDZCQUE2QixDQUFDLFVBQXNCO0lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHNDQUE4QixDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBK0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDRSxzQ0FBZ0MsQ0FBQyxDQUFDO0tBQ3pHO0lBRUQsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxLQUFLLDhDQUF3QixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXVDLElBQU0sQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsSUFBTSxNQUFNLEdBQUcseUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsSUFBTSxPQUFPLEdBQUcsMkJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFL0MsSUFBTSxPQUFPLEdBQUcsNEJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyw0Q0FBdUIsRUFBRTtRQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7S0FDdkY7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLENBQUM7UUFDUCxNQUFNLFFBQUE7UUFDTixPQUFPLFNBQUE7UUFDUCxPQUFPLEVBQUUsT0FBNkI7S0FDekMsQ0FBQztBQUNOLENBQUM7QUF6QkQsc0VBeUJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLDJCQUEyQixDQUFDLFdBQXdCLEVBQ2hFLE1BQTJCO0lBQzNCLFdBQVcsQ0FBQyxTQUFTLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELHVCQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1Qyx5QkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQU5ELGtFQU1DIn0=