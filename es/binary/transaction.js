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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsbUVBQTJGO0FBQzNGLHFFQUE4RjtBQUc5RixtQ0FBd0U7QUFDeEUsaUNBQTZEO0FBQzdELG1DQUFnRTtBQUNoRSxxQ0FBaUU7QUFFcEQsUUFBQSw4QkFBOEIsR0FBVywwQkFBaUIsR0FBRyxDQUFDLENBQUMsR0FBRyxxQkFBWSxDQUFDLEdBQUcsb0JBQVcsQ0FBQztBQUUzRzs7OztHQUlHO0FBQ0gsU0FBZ0IsNkJBQTZCLENBQUMsVUFBc0I7SUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsc0NBQThCLENBQUMsRUFBRTtRQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUErQixVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNFLHNDQUFnQyxDQUFDLENBQUM7S0FDekc7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDNUQsSUFBSSxJQUFJLEtBQUssOENBQXdCLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBdUMsSUFBTSxDQUFDLENBQUM7S0FDbEU7SUFFRCxJQUFNLE1BQU0sR0FBRyx5QkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QyxJQUFNLE9BQU8sR0FBRywyQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxJQUFNLE9BQU8sR0FBRyw0QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLDRDQUF1QixFQUFFO1FBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztLQUN2RjtJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUsQ0FBQztRQUNQLE1BQU0sUUFBQTtRQUNOLE9BQU8sU0FBQTtRQUNQLE9BQU8sRUFBRSxPQUE2QjtLQUN6QyxDQUFDO0FBQ04sQ0FBQztBQXpCRCxzRUF5QkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsMkJBQTJCLENBQUMsV0FBd0IsRUFDaEUsTUFBMkI7SUFDM0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsdUJBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLHlCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBTkQsa0VBTUMifQ==