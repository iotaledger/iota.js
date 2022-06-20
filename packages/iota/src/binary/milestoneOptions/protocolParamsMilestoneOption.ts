// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import { IProtocolParamsMilestoneOption, PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE } from "../../models/milestoneOptions/IProtocolParamsMilestoneOption";
import { SMALL_TYPE_LENGTH, UINT16_SIZE, UINT32_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a protocol params milestone option binary representation.
 */
export const MIN_PROTOCOL_PARAMS_MILESTONE_OPTION_LENGTH: number =
    SMALL_TYPE_LENGTH + // type
    UINT32_SIZE + // targetMilestoneIndex
    SMALL_TYPE_LENGTH + // protocolVersion
    UINT16_SIZE; // params

/**
 * Deserialize the protocol params milestone option from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeProtocolParamsMilestoneOption(readStream: ReadStream): IProtocolParamsMilestoneOption {
    if (!readStream.hasRemaining(MIN_PROTOCOL_PARAMS_MILESTONE_OPTION_LENGTH)) {
        throw new Error(
            `Protocol params Milestone Option data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_PROTOCOL_PARAMS_MILESTONE_OPTION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("protocolParamsMilestoneOption.type");
    if (type !== PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE) {
        throw new Error(`Type mismatch in protocolParamsMilestoneOption ${type}`);
    }

    const targetMilestoneIndex = readStream.readUInt32("protocolParamsMilestoneOption.targetMilestoneIndex");
    const protocolVersion = readStream.readUInt8("protocolParamsMilestoneOption.protocolVersion");
    const paramsLength = readStream.readUInt16("payloadMilestone.paramsLength");
    const params = readStream.readFixedHex("payloadMilestone.metadata", paramsLength);

    return {
        type: PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE,
        targetMilestoneIndex,
        protocolVersion,
        params
    };
}

/**
 * Serialize the protocol params milestone option to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeProtocolParamsMilestoneOption(
    writeStream: WriteStream, object: IProtocolParamsMilestoneOption): void {
    writeStream.writeUInt8("protocolParamsMilestoneOption.type", object.type);
    writeStream.writeUInt32("protocolParamsMilestoneOption.targetMilestoneIndex", object.targetMilestoneIndex);
    writeStream.writeUInt8("protocolParamsMilestoneOption.protocolVersion", object.protocolVersion);

    const params = HexHelper.stripPrefix(object.params);
    writeStream.writeUInt16("protocolParamsMilestoneOption.paramsLength", params.length / 2);
    writeStream.writeFixedHex("protocolParamsMilestoneOption.params", params.length / 2, params);
}
