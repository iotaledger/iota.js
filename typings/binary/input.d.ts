import { ITreasuryInput } from "../models/ITreasuryInput";
import { IUTXOInput } from "../models/IUTXOInput";
import type { ReadStream } from "../utils/readStream";
import type { WriteStream } from "../utils/writeStream";
/**
 * The minimum length of an input binary representation.
 */
export declare const MIN_INPUT_LENGTH: number;
/**
 * The minimum length of a utxo input binary representation.
 */
export declare const MIN_UTXO_INPUT_LENGTH: number;
/**
 * The minimum length of a treasury input binary representation.
 */
export declare const MIN_TREASURY_INPUT_LENGTH: number;
/**
 * The minimum number of inputs.
 */
export declare const MIN_INPUT_COUNT: number;
/**
 * The maximum number of inputs.
 */
export declare const MAX_INPUT_COUNT: number;
/**
 * Deserialize the inputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeInputs(readStream: ReadStream): (IUTXOInput | ITreasuryInput)[];
/**
 * Serialize the inputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeInputs(writeStream: WriteStream, objects: (IUTXOInput | ITreasuryInput)[]): void;
/**
 * Deserialize the input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeInput(readStream: ReadStream): IUTXOInput | ITreasuryInput;
/**
 * Serialize the input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeInput(writeStream: WriteStream, object: (IUTXOInput | ITreasuryInput)): void;
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
/**
 * Deserialize the treasury input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTreasuryInput(readStream: ReadStream): ITreasuryInput;
/**
 * Serialize the treasury input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTreasuryInput(writeStream: WriteStream, object: ITreasuryInput): void;
