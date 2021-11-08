import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISimpleOutput } from "../../models/outputs/ISimpleOutput";
/**
 * The minimum length of a simple output binary representation.
 */
export declare const MIN_SIMPLE_OUTPUT_LENGTH: number;
/**
 * Deserialize the simple output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSimpleOutput(readStream: ReadStream): ISimpleOutput;
/**
 * Serialize the simple output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSimpleOutput(writeStream: WriteStream, object: ISimpleOutput): void;
