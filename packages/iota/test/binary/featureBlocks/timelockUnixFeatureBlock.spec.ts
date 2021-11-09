// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeTimelockUnixFeatureBlock,
    serializeTimelockUnixFeatureBlock
} from "../../../src/binary/featureBlocks/timelockUnixFeatureBlock";
import {
    ITimelockUnixFeatureBlock,
    TIMELOCK_UNIX_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/ITimelockUnixFeatureBlock";

describe("Binary Timelock Unix Feature Blocks", () => {
    test("Can serialize and deserialize timelock unix feature block", () => {
        const object: ITimelockUnixFeatureBlock = {
            type: TIMELOCK_UNIX_FEATURE_BLOCK_TYPE,
            unixTime: 123456
        };

        const serialized = new WriteStream();
        serializeTimelockUnixFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0440e20100");
        const deserialized = deserializeTimelockUnixFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(4);
        expect(deserialized.unixTime).toEqual(123456);
    });
});
