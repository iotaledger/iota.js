import { TREASURY_INPUT_TYPE } from "../../models/inputs/ITreasuryInput";
import { UTXO_INPUT_TYPE } from "../../models/inputs/IUTXOInput";
import { deserializeTreasuryInput, MIN_TREASURY_INPUT_LENGTH, serializeTreasuryInput } from "./treasuryInput";
import { deserializeUTXOInput, MIN_UTXO_INPUT_LENGTH, serializeUTXOInput } from "./utxoInput";
/**
 * The minimum length of an input binary representation.
 */
export const MIN_INPUT_LENGTH = Math.min(MIN_UTXO_INPUT_LENGTH, MIN_TREASURY_INPUT_LENGTH);
/**
 * The minimum number of inputs.
 */
export const MIN_INPUT_COUNT = 1;
/**
 * The maximum number of inputs.
 */
export const MAX_INPUT_COUNT = 127;
/**
 * Deserialize the inputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInputs(readStream) {
    const numInputs = readStream.readUInt16("inputs.numInputs");
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
        inputs.push(deserializeInput(readStream));
    }
    return inputs;
}
/**
 * Serialize the inputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeInputs(writeStream, objects) {
    if (objects.length < MIN_INPUT_COUNT) {
        throw new Error(`The minimum number of inputs is ${MIN_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    if (objects.length > MAX_INPUT_COUNT) {
        throw new Error(`The maximum number of inputs is ${MAX_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("inputs.numInputs", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeInput(writeStream, objects[i]);
    }
}
/**
 * Deserialize the input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInput(readStream) {
    if (!readStream.hasRemaining(MIN_INPUT_LENGTH)) {
        throw new Error(`Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("input.type", false);
    let input;
    if (type === UTXO_INPUT_TYPE) {
        input = deserializeUTXOInput(readStream);
    }
    else if (type === TREASURY_INPUT_TYPE) {
        input = deserializeTreasuryInput(readStream);
    }
    else {
        throw new Error(`Unrecognized input type ${type}`);
    }
    return input;
}
/**
 * Serialize the input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeInput(writeStream, object) {
    if (object.type === UTXO_INPUT_TYPE) {
        serializeUTXOInput(writeStream, object);
    }
    else if (object.type === TREASURY_INPUT_TYPE) {
        serializeTreasuryInput(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized input type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9pbnB1dHMvaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVqRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFOUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFFbkc7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQVcsQ0FBQyxDQUFDO0FBRXpDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFXLEdBQUcsQ0FBQztBQUUzQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFVBQXNCO0lBQ3BELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU1RCxNQUFNLE1BQU0sR0FBaUIsRUFBRSxDQUFDO0lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQzdDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLFdBQXdCLEVBQUUsT0FBcUI7SUFDM0UsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLGVBQWUsRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxlQUFlLHVCQUF1QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUM5RztJQUNELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsZUFBZSx1QkFBdUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDOUc7SUFDRCxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxjQUFjLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsVUFBc0I7SUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM1QyxNQUFNLElBQUksS0FBSyxDQUNYLGlCQUFpQixVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxnQkFBZ0IsRUFBRSxDQUN6SCxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxJQUFJLEtBQUssQ0FBQztJQUVWLElBQUksSUFBSSxLQUFLLGVBQWUsRUFBRTtRQUMxQixLQUFLLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLElBQUksS0FBSyxtQkFBbUIsRUFBRTtRQUNyQyxLQUFLLEdBQUcsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDaEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdEQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsV0FBd0IsRUFBRSxNQUFrQjtJQUN2RSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssZUFBZSxFQUFFO1FBQ2pDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMzQztTQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxtQkFBbUIsRUFBRTtRQUM1QyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDL0M7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTRCLE1BQTRCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwRjtBQUNMLENBQUMifQ==