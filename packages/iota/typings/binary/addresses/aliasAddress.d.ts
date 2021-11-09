import type { ReadStream, WriteStream } from "@iota/util.js";
import { IAliasAddress } from "../../models/addresses/IAliasAddress";
/**
 * The length of an alias address.
 */
export declare const ALIAS_ADDRESS_LENGTH: number;
/**
 * The minimum length of an alias address binary representation.
 */
export declare const MIN_ALIAS_ADDRESS_LENGTH: number;
/**
 * Deserialize the alias address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeAliasAddress(readStream: ReadStream): IAliasAddress;
/**
 * Serialize the alias address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeAliasAddress(writeStream: WriteStream, object: IAliasAddress): void;
