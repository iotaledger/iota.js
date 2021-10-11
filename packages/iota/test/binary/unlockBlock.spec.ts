// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeReferenceUnlockBlock,
    deserializeUnlockBlock,
    deserializeUnlockBlocks,
    serializeSignatureUnlockBlock,
    deserializeSignatureUnlockBlock,
    serializeReferenceUnlockBlock,
    serializeUnlockBlock,
    serializeUnlockBlocks
} from "../../src/binary/unlockBlock";
import { ED25519_SIGNATURE_TYPE } from "../../src/models/IEd25519Signature";
import { IReferenceUnlockBlock, REFERENCE_UNLOCK_BLOCK_TYPE } from "../../src/models/IReferenceUnlockBlock";
import { ISignatureUnlockBlock, SIGNATURE_UNLOCK_BLOCK_TYPE } from "../../src/models/ISignatureUnlockBlock";

describe("Binary Unlock Block", () => {
    test("Can serialize and deserialize unlock blocks", () => {
        const unlockBlocks: (IReferenceUnlockBlock | ISignatureUnlockBlock)[] = [
            {
                type: SIGNATURE_UNLOCK_BLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
                    signature:
                        "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
                }
            },
            {
                type: REFERENCE_UNLOCK_BLOCK_TYPE,
                reference: 23456
            }
        ];

        const serialized = new WriteStream();
        serializeUnlockBlocks(serialized, unlockBlocks);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "020000006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d01a05b"
        );
        const deserialized = deserializeUnlockBlocks(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        const obj1 = deserialized[0] as ISignatureUnlockBlock;
        expect(obj1.type).toEqual(0);
        expect(obj1.signature.type).toEqual(0);
        expect(obj1.signature.publicKey).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(obj1.signature.signature).toEqual(
            "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        );
        const obj2 = deserialized[1] as IReferenceUnlockBlock;
        expect(obj2.type).toEqual(1);
        expect(obj2.reference).toEqual(23456);
    });

    test("Can serialize and deserialize unlock block", () => {
        const object: IReferenceUnlockBlock = {
            type: REFERENCE_UNLOCK_BLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeUnlockBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("01a05b");
        const deserialized = deserializeUnlockBlock(new ReadStream(Converter.hexToBytes(hex)));
        const obj1 = deserialized as IReferenceUnlockBlock;
        expect(obj1.type).toEqual(1);
        expect(obj1.reference).toEqual(23456);
    });

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

    test("Can serialize and deserialize reference unlock block", () => {
        const object: IReferenceUnlockBlock = {
            type: REFERENCE_UNLOCK_BLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeReferenceUnlockBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("01a05b");
        const deserialized = deserializeReferenceUnlockBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.reference).toEqual(23456);
    });
});
