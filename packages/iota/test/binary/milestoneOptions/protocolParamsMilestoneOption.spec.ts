// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeProtocolParamsMilestoneOption, serializeProtocolParamsMilestoneOption } from "../../../src/binary/milestoneOptions/protocolParamsMilestoneOption";
import { IProtocolParamsMilestoneOption, PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE } from "../../../src/models/milestoneOptions/IProtocolParamsMilestoneOption";

describe("Binary Protocol Params Milestone Option", () => {
    test("Can serialize and deserialize Protocol params milestone option", () => {
        const payload: IProtocolParamsMilestoneOption = {
            type: PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE,
            targetMilestoneIndex: 13455,
            protocolVersion: 3,
            params: "0x27d0ca22753f76ef32d1e9e8fcc417aa9fc1c15eae854661e0253287be6ea68f649493fc8fd6ac43e9ca750c6f6d884cc72386ddcb7d"
        };

        const serialized = new WriteStream();
        serializeProtocolParamsMilestoneOption(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "018f34000003360027d0ca22753f76ef32d1e9e8fcc417aa9fc1c15eae854661e0253287be6ea68f649493fc8fd6ac43e9ca750c6f6d884cc72386ddcb7d"
        );
        const deserialized = deserializeProtocolParamsMilestoneOption(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.targetMilestoneIndex).toEqual(13455);
        expect(deserialized.protocolVersion).toEqual(3);
        expect(deserialized.params).toEqual("0x27d0ca22753f76ef32d1e9e8fcc417aa9fc1c15eae854661e0253287be6ea68f649493fc8fd6ac43e9ca750c6f6d884cc72386ddcb7d");
    });
});
