import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
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
    const type = readStream.readByte("nftAddress.type");
    if (type !== NFT_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in nftAddress ${type}`);
    }
    const address = readStream.readFixedHex("nftAddress.address", NFT_ADDRESS_LENGTH);
    return {
        type: NFT_ADDRESS_TYPE,
        address
    };
}
/**
 * Serialize the nft address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftAddress(writeStream, object) {
    writeStream.writeByte("nftAddress.type", object.type);
    writeStream.writeFixedHex("nftAddress.address", NFT_ADDRESS_LENGTH, object.address);
}
