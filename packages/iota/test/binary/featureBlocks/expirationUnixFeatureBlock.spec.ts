// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeExpirationUnixFeatureBlock,
    serializeExpirationUnixFeatureBlock
} from "../../../src/binary/featureBlocks/expirationUnixFeatureBlock";
import {
    IExpirationUnixFeatureBlock,
    EXPIRATION_UNIX_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/IExpirationUnixFeatureBlock";

describe("Binary Expiration Unix Feature Blocks", () => {
    test("Can serialize and deserialize expiration unix feature block", () => {
        const object: IExpirationUnixFeatureBlock = {
            type: EXPIRATION_UNIX_FEATURE_BLOCK_TYPE,
            unixTime: 123456
        };

        const serialized = new WriteStream();
        serializeExpirationUnixFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0640e20100");
        const deserialized = deserializeExpirationUnixFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(6);
        expect(deserialized.unixTime).toEqual(123456);
    });
});
