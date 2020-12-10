/* eslint-disable max-len */
import { Blake2b } from "../../src/crypto/blake2b";
import { Ed25519 } from "../../src/crypto/ed25519";
import { HmacSha512 } from "../../src/crypto/hmacSha512";
import { Sha512 } from "../../src/crypto/sha512";
import { Zip215 } from "../../src/crypto/zip215";
import { Converter } from "../../src/utils/converter";
import testData from "./testData.json";

describe("Test Data", () => {
    test("Can validate data set", () => {
        for (const d of testData) {
            const seed = Converter.hexToBytes(d.seed);

            const keyPair = Ed25519.keyPairFromSeed(seed);

            expect(Converter.bytesToHex(keyPair.privateKey)).toEqual(d.privateKey);
            expect(Converter.bytesToHex(keyPair.publicKey)).toEqual(d.publicKey);

            const data = Converter.hexToBytes(d.data);

            const sig = Ed25519.sign(keyPair.privateKey, data);
            expect(Converter.bytesToHex(sig)).toEqual(d.signature);

            const verified = Ed25519.verify(keyPair.publicKey, data, sig);
            expect(verified).toEqual(d.verified);

            const verifiedZip = Zip215.verify(keyPair.publicKey, data, sig);
            expect(verifiedZip).toEqual(d.verifiedZip);

            const blake256 = Blake2b.sum256(data);
            expect(Converter.bytesToHex(blake256)).toEqual(d.blake256);

            const blake512 = Blake2b.sum512(data);
            expect(Converter.bytesToHex(blake512)).toEqual(d.blake512);

            const sha512 = Sha512.sum512(data);
            expect(Converter.bytesToHex(sha512)).toEqual(d.sha512);

            const hmacsha512 = HmacSha512.sum512(seed, data);
            expect(Converter.bytesToHex(hmacsha512)).toEqual(d.hmacSha512);
        }
    });
});

