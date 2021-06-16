import { IEd25519Address } from "../models/IEd25519Address";
import type { ReadStream } from "../utils/readStream";
import type { WriteStream } from "../utils/writeStream";
/**
 * The minimum length of an address binary representation.
 */
export declare const MIN_ADDRESS_LENGTH: number;
/**
 * The minimum length of an ed25519 address binary representation.
 */
export declare const MIN_ED25519_ADDRESS_LENGTH: number;
/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeAddress(readStream: ReadStream): IEd25519Address;
/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeAddress(writeStream: WriteStream, object: IEd25519Address): void;
/**
 * Deserialize the Ed25519 address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeEd25519Address(readStream: ReadStream): IEd25519Address;
/**
 * Serialize the ed25519 address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeEd25519Address(writeStream: WriteStream, object: IEd25519Address): void;
