// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import { IPoWMilestoneOption, POW_MILESTONE_OPTION_TYPE } from "../../models/milestoneOptions/IPoWMilestoneOption";
import { IReceiptMilestoneOption, RECEIPT_MILESTONE_OPTION_TYPE } from "../../models/milestoneOptions/IReceiptMilestoneOption";
import type { MilestoneOptionTypes } from "../../models/milestoneOptions/milestoneOptionTypes";
import {
    deserializePoWMilestoneOption,
    MIN_POW_MILESTONE_OPTION_LENGTH,
    serializePoWMilestoneOption
} from "../milestoneOptions/powMilestoneOption";
import {
    deserializeReceiptMilestoneOption,
    MIN_RECEIPT_MILESTONE_OPTION_LENGTH,
    serializeReceiptMilestoneOption
} from "../milestoneOptions/receiptMilestoneOption";

/**
 * The minimum length of a milestone option binary representation.
 */
 export const MIN_MILESTONE_OPTION_LENGTH: number = Math.min(
    MIN_RECEIPT_MILESTONE_OPTION_LENGTH,
    MIN_POW_MILESTONE_OPTION_LENGTH
);


/**
 * Deserialize the milestone options from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
 export function deserializeMilestoneOptions(readStream: ReadStream): MilestoneOptionTypes[] {
    const numMilestoneOptions = readStream.readUInt8("milestoneOptions.numMilestoneOptions");

    const milestoneOptions: MilestoneOptionTypes[] = [];
    for (let i = 0; i < numMilestoneOptions; i++) {
        milestoneOptions.push(deserializeMilestoneOption(readStream));
    }

    return milestoneOptions;
}

/**
 * Serialize the milestone options to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeMilestoneOptions(writeStream: WriteStream, objects: MilestoneOptionTypes[]): void {
    writeStream.writeUInt8("milestoneOptions.optionsCount", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeMilestoneOption(writeStream, objects[i]);
    }
}

/**
 * Deserialize the milestone options from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMilestoneOption(readStream: ReadStream): MilestoneOptionTypes {
    if (!readStream.hasRemaining(MIN_MILESTONE_OPTION_LENGTH)) {
        throw new Error(
            `Milestone option data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MILESTONE_OPTION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("milestoneOption.type", false);
    let option;

    if (type === RECEIPT_MILESTONE_OPTION_TYPE) {
        option = deserializeReceiptMilestoneOption(readStream);
    } else if (type === POW_MILESTONE_OPTION_TYPE) {
        option = deserializePoWMilestoneOption(readStream);
    } else {
        throw new Error(`Unrecognized milestone option type ${type}`);
    }

    return option;
}

/**
 * Serialize the milestone option to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
 export function serializeMilestoneOption(writeStream: WriteStream, object: ITypeBase<number>): void {
    if (object.type === RECEIPT_MILESTONE_OPTION_TYPE) {
        serializeReceiptMilestoneOption(writeStream, object as IReceiptMilestoneOption);
    } else if (object.type === POW_MILESTONE_OPTION_TYPE) {
        serializePoWMilestoneOption(writeStream, object as IPoWMilestoneOption);
    } else {
        throw new Error(`Unrecognized milestone option type ${object.type}`);
    }
}

