// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeTokenScheme, serializeTokenScheme } from "../../../src/binary/tokenSchemes/tokenSchemes";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../../src/models/tokenSchemes/ISimpleTokenScheme";
import type { TokenSchemeTypes } from "../../../src/models/tokenSchemes/tokenSchemeTypes";

describe("Binary Token Scheme", () => {
    test("Can serialize and deserialize token scheme", () => {
        const object: TokenSchemeTypes = {
            type: SIMPLE_TOKEN_SCHEME_TYPE
        };

        const serialized = new WriteStream();
        serializeTokenScheme(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("00");
        const deserialized = deserializeTokenScheme(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
    });
});
