import { Ed25519Address } from "../../addressTypes/ed25519Address";
import { ED25519_ADDRESS_TYPE } from "../../models/addresses/IEd25519Address";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an ed25519 address binary representation.
 */
export const MIN_ED25519_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + Ed25519Address.ADDRESS_LENGTH;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOUFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L2FkZHJlc3Nlcy9lZDI1NTE5QWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFtQixNQUFNLHdDQUF3QyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXZEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVcsaUJBQWlCLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztBQUVwRzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUFDLFVBQXNCO0lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwyQkFBMkIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsMEJBQTBCLEVBQUUsQ0FDN0ksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hELElBQUksSUFBSSxLQUFLLG9CQUFvQixFQUFFO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVqRyxPQUFPO1FBQ0gsSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFdBQXdCLEVBQUUsTUFBdUI7SUFDckYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsV0FBVyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RyxDQUFDIn0=