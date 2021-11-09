import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import { BLS_ADDRESS_TYPE } from "../../models/addresses/IBlsAddress";
import { ED25519_ADDRESS_TYPE } from "../../models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import { deserializeAliasAddress, MIN_ALIAS_ADDRESS_LENGTH, serializeAliasAddress } from "./aliasAddress";
import { deserializeBlsAddress, MIN_BLS_ADDRESS_LENGTH, serializeBlsAddress } from "./blsAddress";
import { deserializeEd25519Address, MIN_ED25519_ADDRESS_LENGTH, serializeEd25519Address } from "./ed25519Address";
import { deserializeNftAddress, MIN_NFT_ADDRESS_LENGTH, serializeNftAddress } from "./nftAddress";
/**
 * The minimum length of an address binary representation.
 */
export const MIN_ADDRESS_LENGTH = Math.min(MIN_ED25519_ADDRESS_LENGTH, MIN_ALIAS_ADDRESS_LENGTH, MIN_BLS_ADDRESS_LENGTH, MIN_NFT_ADDRESS_LENGTH);
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
    else if (type === ALIAS_ADDRESS_TYPE) {
        address = deserializeAliasAddress(readStream);
    }
    else if (type === BLS_ADDRESS_TYPE) {
        address = deserializeBlsAddress(readStream);
    }
    else if (type === NFT_ADDRESS_TYPE) {
        address = deserializeNftAddress(readStream);
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
    else if (object.type === ALIAS_ADDRESS_TYPE) {
        serializeAliasAddress(writeStream, object);
    }
    else if (object.type === BLS_ADDRESS_TYPE) {
        serializeBlsAddress(writeStream, object);
    }
    else if (object.type === NFT_ADDRESS_TYPE) {
        serializeNftAddress(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9hZGRyZXNzZXMvYWRkcmVzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxrQkFBa0IsRUFBaUIsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsZ0JBQWdCLEVBQWUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsb0JBQW9CLEVBQW1CLE1BQU0sd0NBQXdDLENBQUM7QUFDL0YsT0FBTyxFQUFFLGdCQUFnQixFQUFlLE1BQU0sb0NBQW9DLENBQUM7QUFFbkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFXLElBQUksQ0FBQyxHQUFHLENBQzlDLDBCQUEwQixFQUMxQix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLHNCQUFzQixDQUN6QixDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQ1gsbUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLGtCQUFrQixFQUFFLENBQzdILENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELElBQUksT0FBTyxDQUFDO0lBRVosSUFBSSxJQUFJLEtBQUssb0JBQW9CLEVBQUU7UUFDL0IsT0FBTyxHQUFHLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO1NBQU0sSUFBSSxJQUFJLEtBQUssa0JBQWtCLEVBQUU7UUFDcEMsT0FBTyxHQUFHLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2pEO1NBQU0sSUFBSSxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7UUFDbEMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9DO1NBQU0sSUFBSSxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7UUFDbEMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9DO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsV0FBd0IsRUFBRSxNQUF5QjtJQUNoRixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssb0JBQW9CLEVBQUU7UUFDdEMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLE1BQXlCLENBQUMsQ0FBQztLQUNuRTtTQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsRUFBRTtRQUMzQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsTUFBdUIsQ0FBQyxDQUFDO0tBQy9EO1NBQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUFFO1FBQ3pDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxNQUFxQixDQUFDLENBQUM7S0FDM0Q7U0FBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7UUFDekMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLE1BQXFCLENBQUMsQ0FBQztLQUMzRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDL0Q7QUFDTCxDQUFDIn0=