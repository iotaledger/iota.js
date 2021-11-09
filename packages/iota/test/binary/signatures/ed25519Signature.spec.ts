// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeEd25519Signature,
    serializeEd25519Signature
} from "../../../src/binary/signatures/ed25519Signature";
import { ED25519_SIGNATURE_TYPE, IEd25519Signature } from "../../../src/models/signatures/IEd25519Signature";

describe("Binary Ed25519 Signature", () => {
    test("Can serialize and deserialize ed25519 signature", () => {
        const object: IEd25519Signature = {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            signature:
                "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        };

        const serialized = new WriteStream();
        serializeEd25519Signature(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        );
        const deserialized = deserializeEd25519Signature(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.publicKey).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.signature).toEqual(
            "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        );
    });
});
