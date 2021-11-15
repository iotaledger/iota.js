// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { InputTypes } from "../../models/inputs/inputTypes";
import { TREASURY_INPUT_TYPE } from "../../models/inputs/ITreasuryInput";
import { UTXO_INPUT_TYPE } from "../../models/inputs/IUTXOInput";
import type { ITypeBase } from "../../models/ITypeBase";
import { deserializeTreasuryInput, MIN_TREASURY_INPUT_LENGTH, serializeTreasuryInput } from "./treasuryInput";
import { deserializeUTXOInput, MIN_UTXO_INPUT_LENGTH, serializeUTXOInput } from "./utxoInput";

/**
 * The minimum length of an input binary representation.
 */
export const MIN_INPUT_LENGTH: number = Math.min(MIN_UTXO_INPUT_LENGTH, MIN_TREASURY_INPUT_LENGTH);

/**
 * The minimum number of inputs.
 */
export const MIN_INPUT_COUNT: number = 1;

/**
 * The maximum number of inputs.
 */
export const MAX_INPUT_COUNT: number = 127;

/**
 * Deserialize the inputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInputs(readStream: ReadStream): InputTypes[] {
    const numInputs = readStream.readUInt16("inputs.numInputs");

    const inputs: InputTypes[] = [];
    for (let i = 0; i < numInputs; i++) {
        inputs.push(deserializeInput(readStream));
    }

    return inputs;
}

/**
 * Serialize the inputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeInputs(writeStream: WriteStream, objects: InputTypes[]): void {
    if (objects.length < MIN_INPUT_COUNT) {
        throw new Error(`The minimum number of inputs is ${MIN_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    if (objects.length > MAX_INPUT_COUNT) {
        throw new Error(`The maximum number of inputs is ${MAX_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("inputs.numInputs", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeInput(writeStream, objects[i]);
    }
}

/**
 * Deserialize the input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInput(readStream: ReadStream): InputTypes {
    if (!readStream.hasRemaining(MIN_INPUT_LENGTH)) {
        throw new Error(
            `Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INPUT_LENGTH}`
        );
    }

    const type = readStream.readUInt8("input.type", false);
    let input;

    if (type === UTXO_INPUT_TYPE) {
        input = deserializeUTXOInput(readStream);
    } else if (type === TREASURY_INPUT_TYPE) {
        input = deserializeTreasuryInput(readStream);
    } else {
        throw new Error(`Unrecognized input type ${type}`);
    }

    return input;
}

/**
 * Serialize the input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeInput(writeStream: WriteStream, object: InputTypes): void {
    if (object.type === UTXO_INPUT_TYPE) {
        serializeUTXOInput(writeStream, object);
    } else if (object.type === TREASURY_INPUT_TYPE) {
        serializeTreasuryInput(writeStream, object);
    } else {
        throw new Error(`Unrecognized input type ${(object as ITypeBase<number>).type}`);
    }
}
