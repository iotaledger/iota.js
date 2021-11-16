import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The length of an alias address.
 */
export const ALIAS_ADDRESS_LENGTH = 20;
/**
 * The minimum length of an alias address binary representation.
 */
export const MIN_ALIAS_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + ALIAS_ADDRESS_LENGTH;
/**
 * Deserialize the alias address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAliasAddress(readStream) {
    if (!readStream.hasRemaining(MIN_ALIAS_ADDRESS_LENGTH)) {
        throw new Error(`Alias address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_ADDRESS_LENGTH}`);
    }
    const type = readStream.readUInt8("aliasAddress.type");
    if (type !== ALIAS_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in aliasAddress ${type}`);
    }
    const address = readStream.readFixedHex("aliasAddress.address", ALIAS_ADDRESS_LENGTH);
    return {
        type: ALIAS_ADDRESS_TYPE,
        address
    };
}
/**
 * Serialize the alias address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAliasAddress(writeStream, object) {
    writeStream.writeUInt8("aliasAddress.type", object.type);
    writeStream.writeFixedHex("aliasAddress.address", ALIAS_ADDRESS_LENGTH, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNBZGRyZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9hZGRyZXNzZXMvYWxpYXNBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxrQkFBa0IsRUFBaUIsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFXLEVBQUUsQ0FBQztBQUUvQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFXLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDO0FBRXpGOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsVUFBc0I7SUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsRUFBRTtRQUNwRCxNQUFNLElBQUksS0FBSyxDQUNYLHlCQUF5QixVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSx3QkFBd0IsRUFBRSxDQUN6SSxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdkQsSUFBSSxJQUFJLEtBQUssa0JBQWtCLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM1RDtJQUVELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUV0RixPQUFPO1FBQ0gsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFdBQXdCLEVBQUUsTUFBcUI7SUFDakYsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsV0FBVyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUYsQ0FBQyJ9