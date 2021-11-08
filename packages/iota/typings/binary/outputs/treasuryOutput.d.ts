import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITreasuryOutput } from "../../models/outputs/ITreasuryOutput";
/**
 * The minimum length of a treasury output binary representation.
 */
export declare const MIN_TREASURY_OUTPUT_LENGTH: number;
/**
 * Deserialize the treasury output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTreasuryOutput(readStream: ReadStream): ITreasuryOutput;
/**
 * Serialize the treasury output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTreasuryOutput(writeStream: WriteStream, object: ITreasuryOutput): void;
