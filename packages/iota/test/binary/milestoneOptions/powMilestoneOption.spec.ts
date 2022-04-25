// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializePoWMilestoneOption, serializePoWMilestoneOption } from "../../../src/binary/milestoneOptions/powMilestoneOption";
import { IPoWMilestoneOption, POW_MILESTONE_OPTION_TYPE } from "../../../src/models/milestoneOptions/IPoWMilestoneOption";

describe("Binary PoW Milestone Option", () => {
    test("Can serialize and deserialize PoW milestone option", () => {
        const payload: IPoWMilestoneOption = {
            type: POW_MILESTONE_OPTION_TYPE,
            nextPoWScore: 0,
            nextPoWScoreMilestoneIndex: 1
        };

        const serialized = new WriteStream();
        serializePoWMilestoneOption(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "010000000001000000"
        );
        const deserialized = deserializePoWMilestoneOption(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.nextPoWScore).toEqual(0);
        expect(deserialized.nextPoWScoreMilestoneIndex).toEqual(1);
    });
});
