// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeDustDepositReturnFeatureBlock,
    serializeDustDepositReturnFeatureBlock
} from "../../../src/binary/featureBlocks/dustDepositReturnFeatureBlock";
import {
    IDustDepositReturnFeatureBlock,
    DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/IDustDepositReturnFeatureBlock";

describe("Binary Return Feature Block", () => {
    test("Can serialize and deserialize return feature block", () => {
        const object: IDustDepositReturnFeatureBlock = {
            type: DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE,
            amount: 123456
        };

        const serialized = new WriteStream();
        serializeDustDepositReturnFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0240e2010000000000");
        const deserialized = deserializeDustDepositReturnFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.amount).toEqual(123456);
    });
});
