import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE } from "../../models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import { deserializeAliasAddress, MIN_ALIAS_ADDRESS_LENGTH, serializeAliasAddress } from "./aliasAddress";
import { deserializeEd25519Address, MIN_ED25519_ADDRESS_LENGTH, serializeEd25519Address } from "./ed25519Address";
import { deserializeNftAddress, MIN_NFT_ADDRESS_LENGTH, serializeNftAddress } from "./nftAddress";
/**
 * The minimum length of an address binary representation.
 */
export const MIN_ADDRESS_LENGTH = Math.min(MIN_ED25519_ADDRESS_LENGTH, MIN_ALIAS_ADDRESS_LENGTH, MIN_NFT_ADDRESS_LENGTH);
/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddress(readStream) {
    if (!readStream.hasRemaining(MIN_ADDRESS_LENGTH)) {
        throw new Error(`Address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ADDRESS_LENGTH}`);
    }
    const type = readStream.readUInt8("address.type", false);
    let address;
    if (type === ED25519_ADDRESS_TYPE) {
        address = deserializeEd25519Address(readStream);
    }
    else if (type === ALIAS_ADDRESS_TYPE) {
        address = deserializeAliasAddress(readStream);
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
    else if (object.type === NFT_ADDRESS_TYPE) {
        serializeNftAddress(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9hZGRyZXNzZXMvYWRkcmVzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxrQkFBa0IsRUFBaUIsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQW1CLE1BQU0sd0NBQXdDLENBQUM7QUFDL0YsT0FBTyxFQUFFLGdCQUFnQixFQUFlLE1BQU0sb0NBQW9DLENBQUM7QUFFbkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLDBCQUEwQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEgsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWxHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FDOUMsMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixzQkFBc0IsQ0FDekIsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsVUFBc0I7SUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUNYLG1CQUFtQixVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxrQkFBa0IsRUFBRSxDQUM3SCxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6RCxJQUFJLE9BQU8sQ0FBQztJQUVaLElBQUksSUFBSSxLQUFLLG9CQUFvQixFQUFFO1FBQy9CLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksSUFBSSxLQUFLLGtCQUFrQixFQUFFO1FBQ3BDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNqRDtTQUFNLElBQUksSUFBSSxLQUFLLGdCQUFnQixFQUFFO1FBQ2xDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMvQztTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN4RDtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFdBQXdCLEVBQUUsTUFBeUI7SUFDaEYsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLG9CQUFvQixFQUFFO1FBQ3RDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxNQUF5QixDQUFDLENBQUM7S0FDbkU7U0FBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7UUFDM0MscUJBQXFCLENBQUMsV0FBVyxFQUFFLE1BQXVCLENBQUMsQ0FBQztLQUMvRDtTQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtRQUN6QyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsTUFBcUIsQ0FBQyxDQUFDO0tBQzNEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMvRDtBQUNMLENBQUMifQ==