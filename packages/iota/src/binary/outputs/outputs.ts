// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { EXTENDED_OUTPUT_TYPE, IExtendedOutput } from "../../models/outputs/IExtendedOutput";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../models/outputs/IFoundryOutput";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { ITreasuryOutput, TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { deserializeAliasOutput, MIN_ALIAS_OUTPUT_LENGTH, serializeAliasOutput } from "./aliasOutput";
import { deserializeExtendedOutput, MIN_EXTENDED_OUTPUT_LENGTH, serializeExtendedOutput } from "./extendedOutput";
import { deserializeFoundryOutput, MIN_FOUNDRY_OUTPUT_LENGTH, serializeFoundryOutput } from "./foundryOutput";
import { deserializeNftOutput, MIN_NFT_OUTPUT_LENGTH, serializeNftOutput } from "./nftOutput";
import { deserializeTreasuryOutput, MIN_TREASURY_OUTPUT_LENGTH, serializeTreasuryOutput } from "./treasuryOutput";

/**
 * The minimum length of an output binary representation.
 */
export const MIN_OUTPUT_LENGTH: number = Math.min(
    MIN_TREASURY_OUTPUT_LENGTH,
    MIN_FOUNDRY_OUTPUT_LENGTH,
    MIN_EXTENDED_OUTPUT_LENGTH,
    MIN_NFT_OUTPUT_LENGTH,
    MIN_ALIAS_OUTPUT_LENGTH
);

/**
 * The minimum number of outputs.
 */
export const MIN_OUTPUT_COUNT: number = 1;

/**
 * The maximum number of outputs.
 */
export const MAX_OUTPUT_COUNT: number = 127;

/**
 * Deserialize the outputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeOutputs(readStream: ReadStream): OutputTypes[] {
    const numOutputs = readStream.readUInt16("outputs.numOutputs");

    const outputs: OutputTypes[] = [];
    for (let i = 0; i < numOutputs; i++) {
        outputs.push(deserializeOutput(readStream));
    }

    return outputs;
}

/**
 * Serialize the outputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeOutputs(writeStream: WriteStream, objects: OutputTypes[]): void {
    if (objects.length < MIN_OUTPUT_COUNT) {
        throw new Error(`The minimum number of outputs is ${MIN_OUTPUT_COUNT}, you have provided ${objects.length}`);
    }
    if (objects.length > MAX_OUTPUT_COUNT) {
        throw new Error(`The maximum number of outputs is ${MAX_OUTPUT_COUNT}, you have provided ${objects.length}`);
    }

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
export function deserializeOutput(readStream: ReadStream): OutputTypes {
    if (!readStream.hasRemaining(MIN_OUTPUT_LENGTH)) {
        throw new Error(
            `Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_OUTPUT_LENGTH}`
        );
    }

    const type = readStream.readUInt8("output.type", false);
    let output;

    if (type === TREASURY_OUTPUT_TYPE) {
        output = deserializeTreasuryOutput(readStream);
    } else if (type === EXTENDED_OUTPUT_TYPE) {
        output = deserializeExtendedOutput(readStream);
    } else if (type === FOUNDRY_OUTPUT_TYPE) {
        output = deserializeFoundryOutput(readStream);
    } else if (type === NFT_OUTPUT_TYPE) {
        output = deserializeNftOutput(readStream);
    } else if (type === ALIAS_OUTPUT_TYPE) {
        output = deserializeAliasOutput(readStream);
    } else {
        throw new Error(`Unrecognized output type ${type}`);
    }

    return output;
}

/**
 * Serialize the output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeOutput(writeStream: WriteStream, object: ITypeBase<number>): void {
    if (object.type === TREASURY_OUTPUT_TYPE) {
        serializeTreasuryOutput(writeStream, object as ITreasuryOutput);
    } else if (object.type === EXTENDED_OUTPUT_TYPE) {
        serializeExtendedOutput(writeStream, object as IExtendedOutput);
    } else if (object.type === FOUNDRY_OUTPUT_TYPE) {
        serializeFoundryOutput(writeStream, object as IFoundryOutput);
    } else if (object.type === NFT_OUTPUT_TYPE) {
        serializeNftOutput(writeStream, object as INftOutput);
    } else if (object.type === ALIAS_OUTPUT_TYPE) {
        serializeAliasOutput(writeStream, object as IAliasOutput);
    } else {
        throw new Error(`Unrecognized output type ${object.type}`);
    }
}
