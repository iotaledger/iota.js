// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeSignature, serializeSignature } from "../../../src/binary/signatures/signatures";
import { ED25519_SIGNATURE_TYPE } from "../../../src/models/signatures/IEd25519Signature";
import type { SignatureTypes } from "../../../src/models/signatures/signatureTypes";

describe("Binary Signature", () => {
    test("Can serialize and deserialize signature", () => {
        const object: SignatureTypes = {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            signature:
                "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        };

        const serialized = new WriteStream();
        serializeSignature(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        );
        const deserialized = deserializeSignature(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.publicKey).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.signature).toEqual(
            "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        );
    });
});
