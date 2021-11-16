import bigInt from "big-integer";
import { SIMPLE_OUTPUT_TYPE } from "../../models/outputs/ISimpleOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a simple output binary representation.
 */
export const MIN_SIMPLE_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    MIN_ADDRESS_LENGTH + // Address
    UINT64_SIZE; // Amount
/**
 * Deserialize the simple output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleOutput(readStream) {
    if (!readStream.hasRemaining(MIN_SIMPLE_OUTPUT_LENGTH)) {
        throw new Error(`Simple Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("simpleOutput.type");
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
    writeStream.writeUInt8("simpleOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("simpleOutput.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlT3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXRzL3NpbXBsZU91dHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUNqQyxpQkFBaUIsR0FBRyxPQUFPO0lBQzNCLGtCQUFrQixHQUFHLFVBQVU7SUFDL0IsV0FBVyxDQUFDLENBQUMsU0FBUztBQUUxQjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFVBQXNCO0lBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FDWCx5QkFBeUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usd0JBQXdCLEVBQUUsQ0FDekksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZELElBQUksSUFBSSxLQUFLLGtCQUFrQixFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDNUQ7SUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFNUQsT0FBTztRQUNILElBQUksRUFBRSxrQkFBa0I7UUFDeEIsT0FBTztRQUNQLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ3pCLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxXQUF3QixFQUFFLE1BQXFCO0lBQ2pGLFdBQVcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQyJ9