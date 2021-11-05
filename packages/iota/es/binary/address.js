import { Ed25519Address } from "../addressTypes/ed25519Address";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { SMALL_TYPE_LENGTH } from "./common";
/**
 * The minimum length of an address binary representation.
 */
export const MIN_ADDRESS_LENGTH = SMALL_TYPE_LENGTH;
/**
 * The minimum length of an ed25519 address binary representation.
 */
export const MIN_ED25519_ADDRESS_LENGTH = MIN_ADDRESS_LENGTH + Ed25519Address.ADDRESS_LENGTH;
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
/**
 * Deserialize the Ed25519 address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeEd25519Address(readStream) {
    if (!readStream.hasRemaining(MIN_ED25519_ADDRESS_LENGTH)) {
        throw new Error(`Ed25519 address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ED25519_ADDRESS_LENGTH}`);
    }
    const type = readStream.readByte("ed25519Address.type");
    if (type !== ED25519_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in ed25519Address ${type}`);
    }
    const address = readStream.readFixedHex("ed25519Address.address", Ed25519Address.ADDRESS_LENGTH);
    return {
        type: ED25519_ADDRESS_TYPE,
        address
    };
}
/**
 * Serialize the ed25519 address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeEd25519Address(writeStream, object) {
    writeStream.writeByte("ed25519Address.type", object.type);
    writeStream.writeFixedHex("ed25519Address.address", Ed25519Address.ADDRESS_LENGTH, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFtQixNQUFNLHFDQUFxQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUU3Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFXLGlCQUFpQixDQUFDO0FBRTVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVcsa0JBQWtCLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztBQUVyRzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FDWCxtQkFBbUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usa0JBQWtCLEVBQUUsQ0FDN0gsQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsSUFBSSxPQUFPLENBQUM7SUFFWixJQUFJLElBQUksS0FBSyxvQkFBb0IsRUFBRTtRQUMvQixPQUFPLEdBQUcseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxXQUF3QixFQUFFLE1BQW9CO0lBQzNFLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxvQkFBb0IsRUFBRTtRQUN0Qyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDaEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0FBQ0wsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsVUFBc0I7SUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsRUFBRTtRQUN0RCxNQUFNLElBQUksS0FBSyxDQUNYLDJCQUEyQixVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSwwQkFBMEIsRUFBRSxDQUM3SSxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsSUFBSSxJQUFJLEtBQUssb0JBQW9CLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5RDtJQUVELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWpHLE9BQU87UUFDSCxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsV0FBd0IsRUFBRSxNQUF1QjtJQUNyRixXQUFXLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxXQUFXLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLGNBQWMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZHLENBQUMifQ==