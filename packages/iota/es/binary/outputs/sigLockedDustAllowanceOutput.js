import bigInt from "big-integer";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../../models/outputs/ISigLockedDustAllowanceOutput";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a sig locked dust allowance output binary representation.
 */
export const MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH + UINT64_SIZE;
/**
 * Deserialize the signature locked dust allowance output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSigLockedDustAllowanceOutput(readStream) {
    if (!readStream.hasRemaining(MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Dust Allowance Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("sigLockedDustAllowanceOutput.type");
    if (type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in sigLockedDustAllowanceOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("sigLockedDustAllowanceOutput.amount");
    return {
        type: SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
/**
 * Serialize the signature locked dust allowance output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSigLockedDustAllowanceOutput(writeStream, object) {
    writeStream.writeByte("sigLockedDustAllowanceOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("sigLockedDustAllowanceOutput.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnTG9ja2VkRHVzdEFsbG93YW5jZU91dHB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvb3V0cHV0cy9zaWdMb2NrZWREdXN0QWxsb3dhbmNlT3V0cHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBRUgscUNBQXFDLEVBQ3hDLE1BQU0sb0RBQW9ELENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMkNBQTJDLEdBQ3BELGlCQUFpQixHQUFHLGtCQUFrQixHQUFHLFdBQVcsQ0FBQztBQUV6RDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVDQUF1QyxDQUFDLFVBQXNCO0lBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDJDQUEyQyxDQUFDLEVBQUU7UUFDdkUsTUFBTSxJQUFJLEtBQUssQ0FDWCxrREFBa0QsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsMkNBQTJDLEVBQUUsQ0FDckwsQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ3RFLElBQUksSUFBSSxLQUFLLHFDQUFxQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELElBQUksRUFBRSxDQUFDLENBQUM7S0FDNUU7SUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFFNUUsT0FBTztRQUNILElBQUksRUFBRSxxQ0FBcUM7UUFDM0MsT0FBTztRQUNQLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ3pCLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQ0FBcUMsQ0FDakQsV0FBd0IsRUFDeEIsTUFBcUM7SUFFckMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxtQ0FBbUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsV0FBVyxDQUFDLHFDQUFxQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMxRixDQUFDIn0=