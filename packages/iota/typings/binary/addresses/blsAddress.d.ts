import type { ReadStream, WriteStream } from "@iota/util.js";
import { IBlsAddress } from "../../models/addresses/IBlsAddress";
/**
 * The length of a BLS address.
 */
export declare const BLS_ADDRESS_LENGTH: number;
/**
 * The minimum length of an bls address binary representation.
 */
export declare const MIN_BLS_ADDRESS_LENGTH: number;
/**
 * Deserialize the bls address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeBlsAddress(readStream: ReadStream): IBlsAddress;
/**
 * Serialize the bls address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeBlsAddress(writeStream: WriteStream, object: IBlsAddress): void;
