"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const IIndexationPayload_1 = require("../models/IIndexationPayload");
const ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
const ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
const ITransactionEssence_1 = require("../models/ITransactionEssence");
const IUTXOInput_1 = require("../models/IUTXOInput");
const common_1 = require("./common");
const input_1 = require("./input");
const output_1 = require("./output");
const payload_1 = require("./payload");
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
        throw new Error(`Transaction essence data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_ESSENCE_LENGTH}`);
    }
    const type = readStream.readByte("transactionEssence.type");
    if (type !== ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE) {
        throw new Error(`Type mismatch in transactionEssence ${type}`);
    }
    const inputs = input_1.deserializeInputs(readStream);
    const outputs = output_1.deserializeOutputs(readStream);
    const payload = payload_1.deserializePayload(readStream);
    if (payload && payload.type !== IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }
    for (const input of inputs) {
        if (input.type !== IUTXOInput_1.UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    for (const output of outputs) {
        if (output.type !== ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE &&
            output.type !== ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain sig locked single input or sig locked dust allowance outputs");
        }
    }
    return {
        type: ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE,
        inputs: inputs,
        outputs: outputs,
        payload
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
    for (const input of object.inputs) {
        if (input.type !== IUTXOInput_1.UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    input_1.serializeInputs(writeStream, object.inputs);
    for (const output of object.outputs) {
        if (output.type !== ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE &&
            output.type !== ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain sig locked single input or sig locked dust allowance outputs");
        }
    }
    output_1.serializeOutputs(writeStream, object.outputs);
    payload_1.serializePayload(writeStream, object.payload);
}
exports.serializeTransactionEssence = serializeTransactionEssence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMscUVBQXVFO0FBQ3ZFLDJGQUErSDtBQUMvSCw2RUFBeUc7QUFDekcsdUVBQThGO0FBQzlGLHFEQUFtRTtBQUduRSxxQ0FBd0U7QUFDeEUsbUNBQTZEO0FBQzdELHFDQUFnRTtBQUNoRSx1Q0FBaUU7QUFFakU7O0dBRUc7QUFDVSxRQUFBLDhCQUE4QixHQUFXLDBCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLHFCQUFZLENBQUMsR0FBRyxvQkFBVyxDQUFDO0FBRTNHOzs7O0dBSUc7QUFDSCxTQUFnQiw2QkFBNkIsQ0FBQyxVQUFzQjtJQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxzQ0FBOEIsQ0FBQyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQzVELGdFQUFnRSxzQ0FBOEIsRUFBRSxDQUFDLENBQUM7S0FDekc7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDNUQsSUFBSSxJQUFJLEtBQUssOENBQXdCLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNsRTtJQUVELE1BQU0sTUFBTSxHQUFHLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sT0FBTyxHQUFHLDJCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLE1BQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssNENBQXVCLEVBQUU7UUFDckQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO0tBQ3ZGO0lBRUQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDeEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLDRCQUFlLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3ZFO0tBQ0o7SUFFRCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUMxQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssc0RBQTZCO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLEtBQUsscUVBQXFDLEVBQUU7WUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FDWCxtR0FBbUcsQ0FDdEcsQ0FBQztTQUNMO0tBQ0o7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLDhDQUF3QjtRQUM5QixNQUFNLEVBQUUsTUFBc0I7UUFDOUIsT0FBTyxFQUFFLE9BQXFFO1FBQzlFLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQXhDRCxzRUF3Q0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsMkJBQTJCLENBQUMsV0FBd0IsRUFDaEUsTUFBMkI7SUFDM0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQy9CLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyw0QkFBZSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUN2RTtLQUNKO0lBRUQsdUJBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLEtBQUssTUFBTSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNqQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssc0RBQTZCO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLEtBQUsscUVBQXFDLEVBQUU7WUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FDWCxtR0FBbUcsQ0FDdEcsQ0FBQztTQUNMO0tBQ0o7SUFFRCx5QkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQXZCRCxrRUF1QkMifQ==