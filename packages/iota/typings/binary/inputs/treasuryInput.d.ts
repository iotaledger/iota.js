import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITreasuryInput } from "../../models/inputs/ITreasuryInput";
/**
 * The minimum length of a treasury input binary representation.
 */
export declare const MIN_TREASURY_INPUT_LENGTH: number;
/**
 * Deserialize the treasury input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTreasuryInput(readStream: ReadStream): ITreasuryInput;
/**
 * Serialize the treasury input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTreasuryInput(writeStream: WriteStream, object: ITreasuryInput): void;
