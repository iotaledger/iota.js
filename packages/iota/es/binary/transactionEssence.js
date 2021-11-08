import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
import { INDEXATION_PAYLOAD_TYPE } from "../models/payloads/IIndexationPayload";
import { ARRAY_LENGTH, SMALL_TYPE_LENGTH, UINT32_SIZE } from "./commonDataTypes";
import { deserializeInputs, serializeInputs } from "./inputs/inputs";
import { deserializeOutputs, serializeOutputs } from "./outputs/outputs";
import { deserializePayload, serializePayload } from "./payloads/payloads";
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
        if (output.type !== SIMPLE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain simple outputs");
        }
    }
    return {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: inputs,
        outputs,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25Fc3NlbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS90cmFuc2FjdGlvbkVzc2VuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBdUIsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RixPQUFPLEVBQ0gscUNBQXFDLEVBQ3hDLE1BQU0saURBQWlELENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFM0U7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBVyxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsWUFBWSxHQUFHLFdBQVcsQ0FBQztBQUV6Rzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFVBQXNCO0lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQkFBK0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsOEJBQThCLEVBQUUsQ0FDckosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxLQUFLLHdCQUF3QixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEU7SUFFRCxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLHVCQUF1QixFQUFFO1FBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztLQUN2RjtJQUVELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1FBQ3hCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3ZFO0tBQ0o7SUFFRCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUMxQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FDWCxxREFBcUQsQ0FDeEQsQ0FBQztTQUNMO0tBQ0o7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixNQUFNLEVBQUUsTUFBc0I7UUFDOUIsT0FBTztRQUNQLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsV0FBd0IsRUFBRSxNQUEyQjtJQUM3RixXQUFXLENBQUMsU0FBUyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5RCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGVBQWUsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdkU7S0FDSjtJQUVELGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLEtBQUssTUFBTSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNqQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssa0JBQWtCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxxQ0FBcUMsRUFBRTtZQUM3RixNQUFNLElBQUksS0FBSyxDQUNYLG1HQUFtRyxDQUN0RyxDQUFDO1NBQ0w7S0FDSjtJQUVELGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDIn0=