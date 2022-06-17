// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import { IProtocolParamsMilestoneOption, PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE } from "../../models/milestoneOptions/IProtocolParamsMilestoneOption";
import { IReceiptMilestoneOption, RECEIPT_MILESTONE_OPTION_TYPE } from "../../models/milestoneOptions/IReceiptMilestoneOption";
import type { MilestoneOptionTypes } from "../../models/milestoneOptions/milestoneOptionTypes";
import {
    deserializeProtocolParamsMilestoneOption,
    MIN_PROTOCOL_PARAMS_MILESTONE_OPTION_LENGTH,
    serializeProtocolParamsMilestoneOption
} from "../milestoneOptions/protocolParamsMilestoneOption";
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
    MIN_PROTOCOL_PARAMS_MILESTONE_OPTION_LENGTH
);


/**
 * Deserialize the milestone options from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
 export function deserializeMilestoneOptions(readStream: ReadStream): MilestoneOptionTypes[] {
    const optionsCount = readStream.readUInt8("milestoneOptions.optionsCount");

    const milestoneOptions: MilestoneOptionTypes[] = [];
    for (let i = 0; i < optionsCount; i++) {
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
    } else if (type === PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE) {
        option = deserializeProtocolParamsMilestoneOption(readStream);
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
    } else if (object.type === PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE) {
        serializeProtocolParamsMilestoneOption(writeStream, object as IProtocolParamsMilestoneOption);
    } else {
        throw new Error(`Unrecognized milestone option type ${object.type}`);
    }
}

