// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeTimelockMilestoneIndexFeatureBlock,
    serializeTimelockMilestoneIndexFeatureBlock
} from "../../../src/binary/featureBlocks/timelockMilestoneIndexFeatureBlock";
import {
    ITimelockMilestoneIndexFeatureBlock,
    TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/ITimelockMilestoneIndexFeatureBlock";

describe("Binary Timelock Milestone Index Feature Block", () => {
    test("Can serialize and deserialize timelock milestone index feature block", () => {
        const object: ITimelockMilestoneIndexFeatureBlock = {
            type: TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
            milestoneIndex: 123456
        };

        const serialized = new WriteStream();
        serializeTimelockMilestoneIndexFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0340e20100");
        const deserialized = deserializeTimelockMilestoneIndexFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        expect(deserialized.milestoneIndex).toEqual(123456);
    });
});
