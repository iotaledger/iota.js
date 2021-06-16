import type { IMigratedFunds } from "../models/IMigratedFunds";
import type { ReadStream } from "../utils/readStream";
import type { WriteStream } from "../utils/writeStream";
/**
 * The length of the tail hash length in bytes.
 */
export declare const TAIL_HASH_LENGTH: number;
/**
 * The minimum length of a migrated fund binary representation.
 */
export declare const MIN_MIGRATED_FUNDS_LENGTH: number;
/**
 * The maximum number of funds.
 */
export declare const MAX_FUNDS_COUNT: number;
/**
 * Deserialize the receipt payload funds from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeFunds(readStream: ReadStream): IMigratedFunds[];
/**
 * Serialize the receipt payload funds to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeFunds(writeStream: WriteStream, objects: IMigratedFunds[]): void;
/**
 * Deserialize the migrated fund from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeMigratedFunds(readStream: ReadStream): IMigratedFunds;
/**
 * Serialize the migrated funds to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeMigratedFunds(writeStream: WriteStream, object: IMigratedFunds): void;
