import type { ReadStream, WriteStream } from "@iota/util.js";
import { INftOutput } from "../../models/outputs/INftOutput";
/**
 * The length of an NFT Id.
 */
export declare const NFT_ID_LENGTH: number;
/**
 * The minimum length of a nft output binary representation.
 */
export declare const MIN_NFT_OUTPUT_LENGTH: number;
/**
 * Deserialize the nft output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeNftOutput(readStream: ReadStream): INftOutput;
/**
 * Serialize the nft output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeNftOutput(writeStream: WriteStream, object: INftOutput): void;
