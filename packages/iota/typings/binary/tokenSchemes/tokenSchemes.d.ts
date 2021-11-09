import type { ReadStream, WriteStream } from "@iota/util.js";
import type { TokenSchemeTypes } from "../../models/tokenSchemes/tokenSchemeTypes";
/**
 * The minimum length of a simple token scheme binary representation.
 */
export declare const MIN_TOKEN_SCHEME_LENGTH: number;
/**
 * Deserialize the token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTokenScheme(readStream: ReadStream): TokenSchemeTypes;
/**
 * Serialize the token scheme to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTokenScheme(writeStream: WriteStream, object: TokenSchemeTypes): void;
