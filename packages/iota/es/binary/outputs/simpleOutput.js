import bigInt from "big-integer";
import { SIMPLE_OUTPUT_TYPE } from "../../models/outputs/ISimpleOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a simple output binary representation.
 */
export const MIN_SIMPLE_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH + UINT64_SIZE;
/**
 * Deserialize the simple output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleOutput(readStream) {
    if (!readStream.hasRemaining(MIN_SIMPLE_OUTPUT_LENGTH)) {
        throw new Error(`Simple Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("simpleOutput.type");
    if (type !== SIMPLE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in simpleOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("simpleOutput.amount");
    return {
        type: SIMPLE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
/**
 * Serialize the simple output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSimpleOutput(writeStream, object) {
    writeStream.writeByte("simpleOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("simpleOutput.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlT3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXRzL3NpbXBsZU91dHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUNqQyxpQkFBaUIsR0FBRyxrQkFBa0IsR0FBRyxXQUFXLENBQUM7QUFFekQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1FBQ3BELE1BQU0sSUFBSSxLQUFLLENBQ1gseUJBQXlCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLHdCQUF3QixFQUFFLENBQ3pJLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN0RCxJQUFJLElBQUksS0FBSyxrQkFBa0IsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzVEO0lBRUQsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRTVELE9BQU87UUFDSCxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLE9BQU87UUFDUCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsV0FBd0IsRUFBRSxNQUFxQjtJQUNqRixXQUFXLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLFdBQVcsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUMifQ==