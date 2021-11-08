import type { ReadStream, WriteStream } from "@iota/util.js";
import { IEd25519Signature } from "../../models/signatures/IEd25519Signature";
/**
 * The minimum length of an ed25519 signature binary representation.
 */
export declare const MIN_ED25519_SIGNATURE_LENGTH: number;
/**
 * Deserialize the Ed25519 signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeEd25519Signature(readStream: ReadStream): IEd25519Signature;
/**
 * Serialize the Ed25519 signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeEd25519Signature(writeStream: WriteStream, object: IEd25519Signature): void;
