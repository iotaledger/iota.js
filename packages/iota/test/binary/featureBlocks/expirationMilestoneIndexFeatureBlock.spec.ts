// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeExpirationMilestoneIndexFeatureBlock,
    serializeExpirationMilestoneIndexFeatureBlock
} from "../../../src/binary/featureBlocks/expirationMilestoneIndexFeatureBlock";
import {
    IExpirationMilestoneIndexFeatureBlock,
    EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/IExpirationMilestoneIndexFeatureBlock";

describe("Binary Expiration Milestone Index Feature Block", () => {
    test("Can serialize and deserialize expiration milestone index feature block", () => {
        const object: IExpirationMilestoneIndexFeatureBlock = {
            type: EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
            milestoneIndex: 123456
        };

        const serialized = new WriteStream();
        serializeExpirationMilestoneIndexFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0540e20100");
        const deserialized = deserializeExpirationMilestoneIndexFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(5);
        expect(deserialized.milestoneIndex).toEqual(123456);
    });
});
