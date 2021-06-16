import { ISigLockedDustAllowanceOutput } from "../models/ISigLockedDustAllowanceOutput";
import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ITreasuryOutput } from "../models/ITreasuryOutput";
import type { ITypeBase } from "../models/ITypeBase";
import type { ReadStream } from "../utils/readStream";
import type { WriteStream } from "../utils/writeStream";
/**
 * The minimum length of an output binary representation.
 */
export declare const MIN_OUTPUT_LENGTH: number;
/**
 * The minimum length of a sig locked single output binary representation.
 */
export declare const MIN_SIG_LOCKED_SINGLE_OUTPUT_LENGTH: number;
/**
 * The minimum length of a sig locked dust allowance output binary representation.
 */
export declare const MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH: number;
/**
 * The minimum length of a treasury output binary representation.
 */
export declare const MIN_TREASURY_OUTPUT_LENGTH: number;
/**
 * The minimum number of outputs.
 */
export declare const MIN_OUTPUT_COUNT: number;
/**
 * The maximum number of outputs.
 */
export declare const MAX_OUTPUT_COUNT: number;
/**
 * Deserialize the outputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutputs(readStream: ReadStream): (ISigLockedSingleOutput | ISigLockedDustAllowanceOutput | ITreasuryOutput)[];
/**
 * Serialize the outputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeOutputs(writeStream: WriteStream, objects: (ISigLockedSingleOutput | ISigLockedDustAllowanceOutput | ITreasuryOutput)[]): void;
/**
 * Deserialize the output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutput(readStream: ReadStream): ISigLockedSingleOutput | ISigLockedDustAllowanceOutput | ITreasuryOutput;
/**
 * Serialize the output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeOutput(writeStream: WriteStream, object: ITypeBase<number>): void;
/**
 * Deserialize the signature locked single output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSigLockedSingleOutput(readStream: ReadStream): ISigLockedSingleOutput;
/**
 * Serialize the signature locked single output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSigLockedSingleOutput(writeStream: WriteStream, object: ISigLockedSingleOutput): void;
/**
 * Deserialize the signature locked dust allowance output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSigLockedDustAllowanceOutput(readStream: ReadStream): ISigLockedDustAllowanceOutput;
/**
 * Serialize the signature locked dust allowance output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSigLockedDustAllowanceOutput(writeStream: WriteStream, object: ISigLockedDustAllowanceOutput): void;
/**
 * Deserialize the treasury output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTreasuryOutput(readStream: ReadStream): ITreasuryOutput;
/**
 * Serialize the treasury output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTreasuryOutput(writeStream: WriteStream, object: ITreasuryOutput): void;
