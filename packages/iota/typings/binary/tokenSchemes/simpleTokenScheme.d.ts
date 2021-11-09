import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISimpleTokenScheme } from "../../models/tokenSchemes/ISimpleTokenScheme";
/**
 * The minimum length of an simple token scheme binary representation.
 */
export declare const MIN_SIMPLE_TOKEN_SCHEME_LENGTH: number;
/**
 * Deserialize the simple token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSimpleTokenScheme(readStream: ReadStream): ISimpleTokenScheme;
/**
 * Serialize the simple token scheme to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSimpleTokenScheme(writeStream: WriteStream, object: ISimpleTokenScheme): void;
