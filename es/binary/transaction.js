"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var IUTXOInput_1 = require("../models/IUTXOInput");
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
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        if (input.type !== IUTXOInput_1.UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    for (var _a = 0, outputs_1 = outputs; _a < outputs_1.length; _a++) {
        var output = outputs_1[_a];
        if (output.type !== ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE &&
            output.type !== ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain sig locked single input or sig locked dust allowance outputs");
        }
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
    for (var _i = 0, _a = object.inputs; _i < _a.length; _i++) {
        var input = _a[_i];
        if (input.type !== IUTXOInput_1.UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    input_1.serializeInputs(writeStream, object.inputs);
    for (var _b = 0, _c = object.outputs; _b < _c.length; _b++) {
        var output = _c[_b];
        if (output.type !== ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE &&
            output.type !== ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain sig locked single input or sig locked dust allowance outputs");
        }
    }
    output_1.serializeOutputs(writeStream, object.outputs);
    payload_1.serializePayload(writeStream, object.payload);
}
exports.serializeTransactionEssence = serializeTransactionEssence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsbUVBQXVFO0FBQ3ZFLHlGQUErSDtBQUMvSCwyRUFBeUc7QUFDekcscUVBQThGO0FBQzlGLG1EQUFtRTtBQUduRSxtQ0FBd0U7QUFDeEUsaUNBQTZEO0FBQzdELG1DQUFnRTtBQUNoRSxxQ0FBaUU7QUFFakU7O0dBRUc7QUFDVSxRQUFBLDhCQUE4QixHQUFXLDBCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLHFCQUFZLENBQUMsR0FBRyxvQkFBVyxDQUFDO0FBRTNHOzs7O0dBSUc7QUFDSCxTQUFnQiw2QkFBNkIsQ0FBQyxVQUFzQjtJQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxzQ0FBOEIsQ0FBQyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ0Usc0NBQWdDLENBQUMsQ0FBQztLQUN6RztJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksS0FBSyw4Q0FBd0IsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF1QyxJQUFNLENBQUMsQ0FBQztLQUNsRTtJQUVELElBQU0sTUFBTSxHQUFHLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLElBQU0sT0FBTyxHQUFHLDJCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssNENBQXVCLEVBQUU7UUFDckQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO0tBQ3ZGO0lBRUQsS0FBb0IsVUFBTSxFQUFOLGlCQUFNLEVBQU4sb0JBQU0sRUFBTixJQUFNLEVBQUU7UUFBdkIsSUFBTSxLQUFLLGVBQUE7UUFDWixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssNEJBQWUsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdkU7S0FDSjtJQUVELEtBQXFCLFVBQU8sRUFBUCxtQkFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTyxFQUFFO1FBQXpCLElBQU0sTUFBTSxnQkFBQTtRQUNiLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxzREFBNkI7WUFDN0MsTUFBTSxDQUFDLElBQUksS0FBSyxxRUFBcUMsRUFBRTtZQUN2RCxNQUFNLElBQUksS0FBSyxDQUNYLG1HQUFtRyxDQUN0RyxDQUFDO1NBQ0w7S0FDSjtJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUsOENBQXdCO1FBQzlCLE1BQU0sRUFBRSxNQUFzQjtRQUM5QixPQUFPLEVBQUUsT0FBcUU7UUFDOUUsT0FBTyxTQUFBO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUF4Q0Qsc0VBd0NDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLDJCQUEyQixDQUFDLFdBQXdCLEVBQ2hFLE1BQTJCO0lBQzNCLFdBQVcsQ0FBQyxTQUFTLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlELEtBQW9CLFVBQWEsRUFBYixLQUFBLE1BQU0sQ0FBQyxNQUFNLEVBQWIsY0FBYSxFQUFiLElBQWEsRUFBRTtRQUE5QixJQUFNLEtBQUssU0FBQTtRQUNaLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyw0QkFBZSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUN2RTtLQUNKO0lBRUQsdUJBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLEtBQXFCLFVBQWMsRUFBZCxLQUFBLE1BQU0sQ0FBQyxPQUFPLEVBQWQsY0FBYyxFQUFkLElBQWMsRUFBRTtRQUFoQyxJQUFNLE1BQU0sU0FBQTtRQUNiLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxzREFBNkI7WUFDN0MsTUFBTSxDQUFDLElBQUksS0FBSyxxRUFBcUMsRUFBRTtZQUN2RCxNQUFNLElBQUksS0FBSyxDQUNYLG1HQUFtRyxDQUN0RyxDQUFDO1NBQ0w7S0FDSjtJQUVELHlCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBdkJELGtFQXVCQyJ9