import { BLS_ADDRESS_TYPE } from "../../models/addresses/IBlsAddress";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The length of a BLS address.
 */
export const BLS_ADDRESS_LENGTH = 32;
/**
 * The minimum length of an bls address binary representation.
 */
export const MIN_BLS_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + BLS_ADDRESS_LENGTH;
/**
 * Deserialize the bls address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeBlsAddress(readStream) {
    if (!readStream.hasRemaining(MIN_BLS_ADDRESS_LENGTH)) {
        throw new Error(`BLS address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_BLS_ADDRESS_LENGTH}`);
    }
    const type = readStream.readUInt8("blsAddress.type");
    if (type !== BLS_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in blsAddress ${type}`);
    }
    const address = readStream.readFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH);
    return {
        type: BLS_ADDRESS_TYPE,
        address
    };
}
/**
 * Serialize the bls address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeBlsAddress(writeStream, object) {
    writeStream.writeUInt8("blsAddress.type", object.type);
    writeStream.writeFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxzQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvYWRkcmVzc2VzL2Jsc0FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLGdCQUFnQixFQUFlLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBVyxFQUFFLENBQUM7QUFFN0M7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBVyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztBQUVyRjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFVBQXNCO0lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FDWCx1QkFBdUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usc0JBQXNCLEVBQUUsQ0FDckksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELElBQUksSUFBSSxLQUFLLGdCQUFnQixFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDMUQ7SUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFbEYsT0FBTztRQUNILElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxXQUF3QixFQUFFLE1BQW1CO0lBQzdFLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELFdBQVcsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hGLENBQUMifQ==