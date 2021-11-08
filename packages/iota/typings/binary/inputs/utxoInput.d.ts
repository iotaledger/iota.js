import type { ReadStream, WriteStream } from "@iota/util.js";
import { IUTXOInput } from "../../models/inputs/IUTXOInput";
/**
 * The minimum length of a utxo input binary representation.
 */
export declare const MIN_UTXO_INPUT_LENGTH: number;
/**
 * Deserialize the utxo input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUTXOInput(readStream: ReadStream): IUTXOInput;
/**
 * Serialize the utxo input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeUTXOInput(writeStream: WriteStream, object: IUTXOInput): void;
