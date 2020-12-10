// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ISigLockedSingleOutput, SIG_LOCKED_SINGLE_OUTPUT_TYPE } from "../models/ISigLockedSingleOutput";
import { ITypeBase } from "../models/ITypeBase";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
import { deserializeAddress, MIN_ADDRESS_LENGTH, MIN_ED25519_ADDRESS_LENGTH, serializeAddress } from "./address";
import { SMALL_TYPE_LENGTH } from "./common";

export const MIN_OUTPUT_LENGTH: number = SMALL_TYPE_LENGTH;
export const MIN_SIG_LOCKED_OUTPUT_LENGTH: number = MIN_OUTPUT_LENGTH + MIN_ADDRESS_LENGTH + MIN_ED25519_ADDRESS_LENGTH;

/**
 * Deserialize the outputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeOutputs(readStream: ReadStream): ISigLockedSingleOutput[] {
    const numOutputs = readStream.readUInt16("outputs.numOutputs");

    const inputs: ISigLockedSingleOutput[] = [];
    for (let i = 0; i < numOutputs; i++) {
        inputs.push(deserializeOutput(readStream));
    }

    return inputs;
}

/**
 * Serialize the outputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeOutputs(writeStream: WriteStream,
    objects: ISigLockedSingleOutput[]): void {
    writeStream.writeUInt16("outputs.numOutputs", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeOutput(writeStream, objects[i]);
    }
}

/**
 * Deserialize the output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeOutput(readStream: ReadStream): ISigLockedSingleOutput {
    if (!readStream.hasRemaining(MIN_OUTPUT_LENGTH)) {
        throw new Error(`Output data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_OUTPUT_LENGTH}`);
    }

    const type = readStream.readByte("output.type", false);
    let input;

    if (type === SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        input = deserializeSigLockedSingleOutput(readStream);
    } else {
        throw new Error(`Unrecognized output type ${type}`);
    }

    return input;
}

/**
 * Serialize the output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeOutput(writeStream: WriteStream,
    object: ISigLockedSingleOutput): void {
    if (object.type === SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        serializeSigLockedSingleOutput(writeStream, object);
    } else {
        throw new Error(`Unrecognized output type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the signature locked single output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSigLockedSingleOutput(readStream: ReadStream): ISigLockedSingleOutput {
    if (!readStream.hasRemaining(MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Single Output data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_SIG_LOCKED_OUTPUT_LENGTH}`);
    }

    const type = readStream.readByte("sigLockedSingleOutput.type");
    if (type !== SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in sigLockedSingleOutput ${type}`);
    }

    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("sigLockedSingleOutput.amount");

    return {
        type: 0,
        address,
        amount: Number(amount)
    };
}


/**
 * Serialize the signature locked single output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSigLockedSingleOutput(writeStream: WriteStream,
    object: ISigLockedSingleOutput): void {
    writeStream.writeByte("sigLockedSingleOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
}
