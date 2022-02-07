import bigInt from "big-integer";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { INPUTS_COMMITMENT_SIZE, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { ARRAY_LENGTH, SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "./commonDataTypes";
import { deserializeInputs, serializeInputs } from "./inputs/inputs";
import { deserializeOutputs, serializeOutputs } from "./outputs/outputs";
import { deserializePayload, serializePayload } from "./payloads/payloads";
/**
 * The minimum length of a transaction essence binary representation.
 */
export const MIN_TRANSACTION_ESSENCE_LENGTH = SMALL_TYPE_LENGTH + // type
    UINT64_SIZE + // network id
    ARRAY_LENGTH + // input count
    INPUTS_COMMITMENT_SIZE + // input commitments
    ARRAY_LENGTH + // output count
    UINT32_SIZE; // payload type
/**
 * Deserialize the transaction essence from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionEssence(readStream) {
    if (!readStream.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error(`Transaction essence data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_ESSENCE_LENGTH}`);
    }
    const type = readStream.readUInt8("transactionEssence.type");
    if (type !== TRANSACTION_ESSENCE_TYPE) {
        throw new Error(`Type mismatch in transactionEssence ${type}`);
    }
    const networkId = readStream.readUInt64("message.networkId");
    const inputs = deserializeInputs(readStream);
    const inputsCommitment = readStream.readFixedHex("transactionEssence.inputsCommitment", INPUTS_COMMITMENT_SIZE);
    const outputs = deserializeOutputs(readStream);
    const payload = deserializePayload(readStream);
    if (payload && payload.type !== TAGGED_DATA_PAYLOAD_TYPE) {
        throw new Error("Transaction essence can only contain embedded Tagged Data Payload");
    }
    for (const input of inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    return {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: networkId.toString(10),
        inputs: inputs,
        inputsCommitment,
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
    var _a;
    writeStream.writeUInt8("transactionEssence.type", object.type);
    writeStream.writeUInt64("message.networkId", bigInt((_a = object.networkId) !== null && _a !== void 0 ? _a : "0"));
    for (const input of object.inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }
    serializeInputs(writeStream, object.inputs);
    writeStream.writeFixedHex("transactionEssence.inputsCommitment", INPUTS_COMMITMENT_SIZE, object.inputsCommitment);
    serializeOutputs(writeStream, object.outputs);
    serializePayload(writeStream, object.payload);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25Fc3NlbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS90cmFuc2FjdGlvbkVzc2VuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQXVCLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEgsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTNFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQ3ZDLGlCQUFpQixHQUFHLE9BQU87SUFDM0IsV0FBVyxHQUFHLGFBQWE7SUFDM0IsWUFBWSxHQUFHLGNBQWM7SUFDN0Isc0JBQXNCLEdBQUcsb0JBQW9CO0lBQzdDLFlBQVksR0FBRyxlQUFlO0lBQzlCLFdBQVcsQ0FBQyxDQUFDLGVBQWU7QUFFaEM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxVQUFzQjtJQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQ1gsK0JBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLDhCQUE4QixFQUFFLENBQ3JKLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3RCxJQUFJLElBQUksS0FBSyx3QkFBd0IsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRTdELE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxxQ0FBcUMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2hILE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssd0JBQXdCLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO0tBQ3hGO0lBRUQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDeEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGVBQWUsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdkU7S0FDSjtJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxNQUFNLEVBQUUsTUFBc0I7UUFDOUIsZ0JBQWdCO1FBQ2hCLE9BQU87UUFDUCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFdBQXdCLEVBQUUsTUFBMkI7O0lBQzdGLFdBQVcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9ELFdBQVcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLE1BQUEsTUFBTSxDQUFDLFNBQVMsbUNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUU5RSxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGVBQWUsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdkU7S0FDSjtJQUVELGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLFdBQVcsQ0FBQyxhQUFhLENBQUMscUNBQXFDLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFbEgsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELENBQUMifQ==