// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeSimpleTokenScheme,
    serializeSimpleTokenScheme
} from "../../../src/binary/tokenSchemes/simpleTokenScheme";
import { SIMPLE_TOKEN_SCHEME_TYPE, ISimpleTokenScheme } from "../../../src/models/tokenSchemes/ISimpleTokenScheme";

describe("Binary Simple Token SCheme", () => {
    test("Can serialize and deserialize simple token scheme", () => {
        const object: ISimpleTokenScheme = {
            type: SIMPLE_TOKEN_SCHEME_TYPE,
            mintedTokens: "0x100000",
            meltedTokens: "0x1000",
            maximumSupply: "0x200000"
        };

        const serialized = new WriteStream();
        serializeSimpleTokenScheme(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("00000010000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000");
        const deserialized = deserializeSimpleTokenScheme(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
    });
});
