import { ED25519_ADDRESS_TYPE } from "../../models/addresses/IEd25519Address";
import { deserializeEd25519Address, MIN_ED25519_ADDRESS_LENGTH, serializeEd25519Address } from "./ed25519Address";
/**
 * The minimum length of an address binary representation.
 */
export const MIN_ADDRESS_LENGTH = MIN_ED25519_ADDRESS_LENGTH;
/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddress(readStream) {
    if (!readStream.hasRemaining(MIN_ADDRESS_LENGTH)) {
        throw new Error(`Address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ADDRESS_LENGTH}`);
    }
    const type = readStream.readByte("address.type", false);
    let address;
    if (type === ED25519_ADDRESS_TYPE) {
        address = deserializeEd25519Address(readStream);
    }
    else {
        throw new Error(`Unrecognized address type ${type}`);
    }
    return address;
}
/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAddress(writeStream, object) {
    if (object.type === ED25519_ADDRESS_TYPE) {
        serializeEd25519Address(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9hZGRyZXNzZXMvYWRkcmVzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWxIOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsMEJBQTBCLENBQUM7QUFFckU7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQ1gsbUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLGtCQUFrQixFQUFFLENBQzdILENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELElBQUksT0FBTyxDQUFDO0lBRVosSUFBSSxJQUFJLEtBQUssb0JBQW9CLEVBQUU7UUFDL0IsT0FBTyxHQUFHLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsV0FBd0IsRUFBRSxNQUFvQjtJQUMzRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssb0JBQW9CLEVBQUU7UUFDdEMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMvRDtBQUNMLENBQUMifQ==