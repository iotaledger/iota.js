import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The length of an NFT address.
 */
export const NFT_ADDRESS_LENGTH = 20;
/**
 * The minimum length of an nft address binary representation.
 */
export const MIN_NFT_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + NFT_ADDRESS_LENGTH;
/**
 * Deserialize the nft address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNftAddress(readStream) {
    if (!readStream.hasRemaining(MIN_NFT_ADDRESS_LENGTH)) {
        throw new Error(`NFT address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_ADDRESS_LENGTH}`);
    }
    const type = readStream.readUInt8("nftAddress.type");
    if (type !== NFT_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in nftAddress ${type}`);
    }
    const address = readStream.readFixedHex("nftAddress.nftId", NFT_ADDRESS_LENGTH);
    return {
        type: NFT_ADDRESS_TYPE,
        nftId: address
    };
}
/**
 * Serialize the nft address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftAddress(writeStream, object) {
    writeStream.writeUInt8("nftAddress.type", object.type);
    writeStream.writeFixedHex("nftAddress.nftId", NFT_ADDRESS_LENGTH, object.nftId);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0QWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvYWRkcmVzc2VzL25mdEFkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLGdCQUFnQixFQUFlLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBVyxFQUFFLENBQUM7QUFFN0M7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBVyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztBQUVyRjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFVBQXNCO0lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FDWCx1QkFBdUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usc0JBQXNCLEVBQUUsQ0FDckksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELElBQUksSUFBSSxLQUFLLGdCQUFnQixFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDMUQ7SUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFaEYsT0FBTztRQUNILElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsS0FBSyxFQUFFLE9BQU87S0FDakIsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFdBQXdCLEVBQUUsTUFBbUI7SUFDN0UsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsV0FBVyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEYsQ0FBQyJ9