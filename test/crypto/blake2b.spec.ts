// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "../../src/crypto/blake2b";
import { Converter } from "../../src/utils/converter";
import testData from "./testData/blake2b.json";

describe("Blake2b", () => {
    test("Can perform a sum512 on short ascii", () => {
        const sum = Blake2b.sum512(Converter.asciiToBytes("abc"));
        expect(Converter.bytesToHex(sum))
            // eslint-disable-next-line max-len
            .toEqual("ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923");
    });

    test("Can perform a sum512 on empty ascii", () => {
        const sum = Blake2b.sum512(Converter.asciiToBytes(""));
        expect(Converter.bytesToHex(sum))
            // eslint-disable-next-line max-len
            .toEqual("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce");
    });

    test("Can perform a sum512 on sentence", () => {
        const sum = Blake2b.sum512(Converter.asciiToBytes("The quick brown fox jumps over the lazy dog"));
        expect(Converter.bytesToHex(sum))
            // eslint-disable-next-line max-len
            .toEqual("a8add4bdddfd93e4877d2746e62817b116364a1fa7bc148d95090bc7333b3673f82401cf7aa2e4cb1ecd90296e3f14cb5413f8ed77be73045b13914cdcd6a918");
    });

    test("Can validate test vectors", () => {
        for (const test of testData) {
            if (test.hash === "blake2b") {
                if (test.key === "") {
                    const sum = Blake2b.sum512(Converter.hexToBytes(test.in));
                    expect(Converter.bytesToHex(sum)).toEqual(test.out);
                } else {
                    const sum = Blake2b.sum512(Converter.hexToBytes(test.in), Converter.hexToBytes(test.key));
                    expect(Converter.bytesToHex(sum)).toEqual(test.out);
                }
            }
        }
    });
});
