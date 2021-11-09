import type { ReadStream, WriteStream } from "@iota/util.js";
import { INftAddress } from "../../models/addresses/INftAddress";
/**
 * The length of an NFT address.
 */
export declare const NFT_ADDRESS_LENGTH: number;
/**
 * The minimum length of an nft address binary representation.
 */
export declare const MIN_NFT_ADDRESS_LENGTH: number;
/**
 * Deserialize the nft address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeNftAddress(readStream: ReadStream): INftAddress;
/**
 * Serialize the nft address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeNftAddress(writeStream: WriteStream, object: INftAddress): void;
