import type { ReadStream, WriteStream } from "@iota/util.js";
import { IIssuerFeatureBlock } from "../../models/featureBlocks/IIssuerFeatureBlock";
/**
 * The minimum length of a issuer feature block binary representation.
 */
export declare const MIN_ISSUER_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the issuer feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeIssuerFeatureBlock(readStream: ReadStream): IIssuerFeatureBlock;
/**
 * Serialize the issuer feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeIssuerFeatureBlock(writeStream: WriteStream, object: IIssuerFeatureBlock): void;
