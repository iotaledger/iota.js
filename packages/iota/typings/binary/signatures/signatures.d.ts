import type { ReadStream, WriteStream } from "@iota/util.js";
import type { SignatureTypes } from "../..";
/**
 * The minimum length of a signature binary representation.
 */
export declare const MIN_SIGNATURE_LENGTH: number;
/**
 * Deserialize the signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSignature(readStream: ReadStream): SignatureTypes;
/**
 * Serialize the signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSignature(writeStream: WriteStream, object: SignatureTypes): void;
