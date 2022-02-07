import type { ReadStream, WriteStream } from "@iota/util.js";
import { IBasicOutput } from "../../models/outputs/IBasicOutput";
/**
 * The minimum length of a basic output binary representation.
 */
export declare const MIN_BASIC_OUTPUT_LENGTH: number;
/**
 * Deserialize the basic output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeBasicOutput(readStream: ReadStream): IBasicOutput;
/**
 * Serialize the basic output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeBasicOutput(writeStream: WriteStream, object: IBasicOutput): void;
