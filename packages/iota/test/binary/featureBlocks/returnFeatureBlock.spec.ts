// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeReturnFeatureBlock,
    serializeReturnFeatureBlock
} from "../../../src/binary/featureBlocks/returnFeatureBlock";
import { IReturnFeatureBlock, RETURN_FEATURE_BLOCK_TYPE } from "../../../src/models/featureBlocks/IReturnFeatureBlock";

describe("Binary Return Feature Block", () => {
    test("Can serialize and deserialize return feature block", () => {
        const object: IReturnFeatureBlock = {
            type: RETURN_FEATURE_BLOCK_TYPE,
            amount: 123456
        };

        const serialized = new WriteStream();
        serializeReturnFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0240e2010000000000");
        const deserialized = deserializeReturnFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.amount).toEqual(123456);
    });
});
