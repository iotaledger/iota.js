import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import type { OutputTypes } from "../../models/outputs/outputTypes";
/**
 * The minimum length of an output binary representation.
 */
export declare const MIN_OUTPUT_LENGTH: number;
/**
 * The minimum number of outputs.
 */
export declare const MIN_OUTPUT_COUNT: number;
/**
 * The maximum number of outputs.
 */
export declare const MAX_OUTPUT_COUNT: number;
/**
 * Deserialize the outputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutputs(readStream: ReadStream): OutputTypes[];
/**
 * Serialize the outputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeOutputs(writeStream: WriteStream, objects: OutputTypes[]): void;
/**
 * Deserialize the output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutput(readStream: ReadStream): OutputTypes;
/**
 * Serialize the output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeOutput(writeStream: WriteStream, object: ITypeBase<number>): void;
