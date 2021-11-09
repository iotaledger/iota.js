import type { ReadStream, WriteStream } from "@iota/util.js";
import { IFoundryOutput } from "../../models/outputs/IFoundryOutput";
/**
 * The minimum length of a foundry output binary representation.
 */
export declare const MIN_FOUNDRY_OUTPUT_LENGTH: number;
/**
 * Deserialize the foundry output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeFoundryOutput(readStream: ReadStream): IFoundryOutput;
/**
 * Serialize the foundry output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeFoundryOutput(writeStream: WriteStream, object: IFoundryOutput): void;
