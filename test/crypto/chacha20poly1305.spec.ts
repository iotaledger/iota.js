// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ChaCha20Poly1305 } from "../../src/crypto/chaCha20Poly1305";
import { Converter } from "../../src/utils/converter";
import testVectors from "./testData/chacha20poly1305.json";

test("ChaCha20Poly1305 encrypt/decrypt test vectors", () => {
    // Test vector from RFC 7539 Section 2.8.1.
    for (const testVector of testVectors) {
        const key = Converter.hexToBytes(testVector.key);
        const nonce = Converter.hexToBytes(testVector.nonce);
        const plainText = Converter.hexToBytes(testVector.plainText);
        const aad = Converter.hexToBytes(testVector.aad);

        const cipher = ChaCha20Poly1305.encryptor(key, nonce);
        if (aad) {
            cipher.setAAD(aad);
        }
        const cipherData = cipher.update(plainText);
        expect(Converter.bytesToHex(cipherData)).toEqual(testVector.cipherText);

        cipher.final();
        const authTag = cipher.getAuthTag();
        expect(Converter.bytesToHex(authTag)).toEqual(testVector.authTag);

        const decipher = ChaCha20Poly1305.decryptor(key, nonce);
        decipher.setAuthTag(authTag);
        if (aad) {
            decipher.setAAD(aad);
        }
        const decipherData = decipher.update(cipherData);
        expect(Converter.bytesToHex(decipherData)).toEqual(Converter.bytesToHex(plainText));
    }
});
