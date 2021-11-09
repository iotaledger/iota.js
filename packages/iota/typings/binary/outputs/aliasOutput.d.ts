import type { ReadStream, WriteStream } from "@iota/util.js";
import { IAliasOutput } from "../../models/outputs/IAliasOutput";
/**
 * The length of an alias id.
 */
export declare const ALIAS_ID_LENGTH: number;
/**
 * The minimum length of a alias output binary representation.
 */
export declare const MIN_ALIAS_OUTPUT_LENGTH: number;
/**
 * Deserialize the alias output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeAliasOutput(readStream: ReadStream): IAliasOutput;
/**
 * Serialize the alias output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeAliasOutput(writeStream: WriteStream, object: IAliasOutput): void;
