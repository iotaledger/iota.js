import type { ReadStream, WriteStream } from "@iota/util.js";
import type { AddressTypes } from "../../models/addresses/addressTypes";
/**
 * The minimum length of an address binary representation.
 */
export declare const MIN_ADDRESS_LENGTH: number;
/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeAddress(readStream: ReadStream): AddressTypes;
/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeAddress(writeStream: WriteStream, object: AddressTypes): void;
