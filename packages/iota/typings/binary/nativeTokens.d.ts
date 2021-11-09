import type { ReadStream, WriteStream } from "@iota/util.js";
import type { INativeToken } from "../models/INativeToken";
/**
 * The minimum length of a native tokens list.
 */
export declare const MIN_NATIVE_TOKENS_LENGTH: number;
/**
 * The length of a native token tag.
 */
export declare const NATIVE_TOKEN_TAG_LENGTH: number;
/**
 * The length of a foundry id.
 */
export declare const FOUNDRY_ID_LENGTH: number;
/**
 * The length of a native token id.
 */
export declare const NATIVE_TOKEN_ID_LENGTH: number;
/**
 * Deserialize the natovetokens from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeNativeTokens(readStream: ReadStream): INativeToken[];
/**
 * Serialize the natove tokens to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeNativeTokens(writeStream: WriteStream, object: INativeToken[]): void;
/**
 * Deserialize the native token from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeNativeToken(readStream: ReadStream): INativeToken;
/**
 * Serialize the native token to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeNativeToken(writeStream: WriteStream, object: INativeToken): void;
