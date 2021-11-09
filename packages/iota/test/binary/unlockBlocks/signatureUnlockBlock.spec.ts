// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeSignatureUnlockBlock,
    serializeSignatureUnlockBlock
} from "../../../src/binary/unlockBlocks/signatureUnlockBlock";
import { ED25519_SIGNATURE_TYPE } from "../../../src/models/signatures/IEd25519Signature";
import {
    ISignatureUnlockBlock,
    SIGNATURE_UNLOCK_BLOCK_TYPE
} from "../../../src/models/unlockBlocks/ISignatureUnlockBlock";

describe("Binary Signature Unlock Block", () => {
    test("Can serialize and deserialize signature unlock block", () => {
        const object: ISignatureUnlockBlock = {
            type: SIGNATURE_UNLOCK_BLOCK_TYPE,
            signature: {
                type: ED25519_SIGNATURE_TYPE,
                publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
                signature:
                    "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
            }
        };

        const serialized = new WriteStream();
        serializeSignatureUnlockBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "00006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        );
        const deserialized = deserializeSignatureUnlockBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.signature.type).toEqual(0);
        expect(deserialized.signature.publicKey).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
        expect(deserialized.signature.signature).toEqual(
            "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        );
    });
});
