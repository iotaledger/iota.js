import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISigLockedDustAllowanceOutput } from "../../models/outputs/ISigLockedDustAllowanceOutput";
/**
 * The minimum length of a sig locked dust allowance output binary representation.
 */
export declare const MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH: number;
/**
 * Deserialize the signature locked dust allowance output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSigLockedDustAllowanceOutput(readStream: ReadStream): ISigLockedDustAllowanceOutput;
/**
 * Serialize the signature locked dust allowance output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSigLockedDustAllowanceOutput(writeStream: WriteStream, object: ISigLockedDustAllowanceOutput): void;
