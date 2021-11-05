import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
import { INDEXATION_PAYLOAD_TYPE } from "../models/payloads/IIndexationPayload";
import { ARRAY_LENGTH, SMALL_TYPE_LENGTH, UINT32_SIZE } from "./common";
import { deserializeInputs, serializeInputs } from "./input";
import { deserializeOutputs, serializeOutputs } from "./output";
import { deserializePayload, serializePayload } from "./payload";
/**
 * The minimum length of a transaction essence binary representation.
 */
export const MIN_TRANSACTION_ESSENCE_LENGTH = SMALL_TYPE_LENGTH + 2 * ARRAY_LENGTH + UINT32_SIZE;
/**
 * Deserialize the transaction essence from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionEssence(readStream) {
    if (!readStream.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error(`Transaction essence data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_ESSENCE_LENGTH}`);
    }
    const type = readStream.readByte("transactionEssence.type");
    if (type !== TRANSACTION_ESSENCE_TYPE) {
        throw new Error(`Type mismatch in transactionEssence ${type}`);
    }
    const inputs = deserializeInputs(readStream);
    const outputs = deserializeOutputs(readStream);
    const payload = deserializePayload(readStream);
    if (payload && payload.type !== INDEXATION_PAYLOAD_TYPE) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }
    for (const input of inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    for (const output of outputs) {
        if (output.type !== SIMPLE_OUTPUT_TYPE && output.type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain sig locked single input or sig locked dust allowance outputs");
        }
    }
    return {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: inputs,
        outputs: outputs,
        payload
    };
}
/**
 * Serialize the transaction essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionEssence(writeStream, object) {
    writeStream.writeByte("transactionEssence.type", object.type);
    for (const input of object.inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    serializeInputs(writeStream, object.inputs);
    for (const output of object.outputs) {
        if (output.type !== SIMPLE_OUTPUT_TYPE && output.type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain sig locked single input or sig locked dust allowance outputs");
        }
    }
    serializeOutputs(writeStream, object.outputs);
    serializePayload(writeStream, object.payload);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQXVCLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUYsT0FBTyxFQUVILHFDQUFxQyxFQUN4QyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pELE9BQU8sRUFBaUIsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFakU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBVyxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsWUFBWSxHQUFHLFdBQVcsQ0FBQztBQUV6Rzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFVBQXNCO0lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQkFBK0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsOEJBQThCLEVBQUUsQ0FDckosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxLQUFLLHdCQUF3QixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEU7SUFFRCxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLHVCQUF1QixFQUFFO1FBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztLQUN2RjtJQUVELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1FBQ3hCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3ZFO0tBQ0o7SUFFRCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUMxQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssa0JBQWtCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxxQ0FBcUMsRUFBRTtZQUM3RixNQUFNLElBQUksS0FBSyxDQUNYLG1HQUFtRyxDQUN0RyxDQUFDO1NBQ0w7S0FDSjtJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE1BQU0sRUFBRSxNQUFzQjtRQUM5QixPQUFPLEVBQUUsT0FBNEQ7UUFDckUsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxXQUF3QixFQUFFLE1BQTJCO0lBQzdGLFdBQVcsQ0FBQyxTQUFTLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUMvQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZUFBZSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUN2RTtLQUNKO0lBRUQsZUFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUMsS0FBSyxNQUFNLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2pDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLHFDQUFxQyxFQUFFO1lBQzdGLE1BQU0sSUFBSSxLQUFLLENBQ1gsbUdBQW1HLENBQ3RHLENBQUM7U0FDTDtLQUNKO0lBRUQsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELENBQUMifQ==