"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var common_1 = require("./common");
var input_1 = require("./input");
var output_1 = require("./output");
var payload_1 = require("./payload");
/**
 * The minimum length of a transaction essence binary representation.
 */
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
        type: ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsbUVBQTJGO0FBQzNGLHFFQUE4RjtBQUc5RixtQ0FBd0U7QUFDeEUsaUNBQTZEO0FBQzdELG1DQUFnRTtBQUNoRSxxQ0FBaUU7QUFFakU7O0dBRUc7QUFDVSxRQUFBLDhCQUE4QixHQUFXLDBCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLHFCQUFZLENBQUMsR0FBRyxvQkFBVyxDQUFDO0FBRTNHOzs7O0dBSUc7QUFDSCxTQUFnQiw2QkFBNkIsQ0FBQyxVQUFzQjtJQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxzQ0FBOEIsQ0FBQyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ0Usc0NBQWdDLENBQUMsQ0FBQztLQUN6RztJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksS0FBSyw4Q0FBd0IsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF1QyxJQUFNLENBQUMsQ0FBQztLQUNsRTtJQUVELElBQU0sTUFBTSxHQUFHLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLElBQU0sT0FBTyxHQUFHLDJCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssNENBQXVCLEVBQUU7UUFDckQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO0tBQ3ZGO0lBRUQsT0FBTztRQUNILElBQUksRUFBRSw4Q0FBd0I7UUFDOUIsTUFBTSxRQUFBO1FBQ04sT0FBTyxTQUFBO1FBQ1AsT0FBTyxFQUFFLE9BQTZCO0tBQ3pDLENBQUM7QUFDTixDQUFDO0FBekJELHNFQXlCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQiwyQkFBMkIsQ0FBQyxXQUF3QixFQUNoRSxNQUEyQjtJQUMzQixXQUFXLENBQUMsU0FBUyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCx1QkFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMseUJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QywwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFORCxrRUFNQyJ9