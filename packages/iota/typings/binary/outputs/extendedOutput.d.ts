import type { ReadStream, WriteStream } from "@iota/util.js";
import { IExtendedOutput } from "../../models/outputs/IExtendedOutput";
/**
 * The minimum length of a extended output binary representation.
 */
export declare const MIN_EXTENDED_OUTPUT_LENGTH: number;
/**
 * Deserialize the extended output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeExtendedOutput(readStream: ReadStream): IExtendedOutput;
/**
 * Serialize the extended output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeExtendedOutput(writeStream: WriteStream, object: IExtendedOutput): void;
