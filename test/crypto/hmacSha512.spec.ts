// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HmacSha512 } from "../../src/crypto/hmacSha512";
import { Converter } from "../../src/utils/converter";

describe("HmacSha512", () => {
    test("Can perform a hmac on short ascii", () => {
        const hmacSha512 = new HmacSha512(Converter.asciiToBytes("mykey"));
        hmacSha512.update(Converter.asciiToBytes("abc"));
        const digest2 = hmacSha512.digest();
        expect(Converter.bytesToHex(digest2))
            // eslint-disable-next-line max-len
            .toEqual("1facfdf577f1ab50db6c9b274a62024884d8c5e8484b4f5852e00e7acb2d96a83c70ed8c6acced4b2251472dbcea195bce4016af968320c1f7bdf3cdb3549ecf");
    });

    test("Can perform a hmac on empty ascii", () => {
        const hmacSha512 = new HmacSha512(Converter.asciiToBytes("mykey"));
        hmacSha512.update(Converter.asciiToBytes(""));
        const digest2 = hmacSha512.digest();
        expect(Converter.bytesToHex(digest2))
            // eslint-disable-next-line max-len
            .toEqual("0fce9150064e05f8743eb24f05c4e93c8265bfe1edb511dc3a614355de049989b347c7173c6f8abfe872519c79c2b4faee6787d7023d5e160b5fe4fdf79b1225");
    });

    test("Can perform a hmac on sentence", () => {
        const hmacSha512 = new HmacSha512(Converter.asciiToBytes("mykey"));
        hmacSha512.update(Converter.asciiToBytes("The quick brown fox jumps over the lazy dog"));
        const digest2 = hmacSha512.digest();
        expect(Converter.bytesToHex(digest2))
            // eslint-disable-next-line max-len
            .toEqual("36428b004e849827c41015a3d8a51363d58b916697d6755043be182b7ed610c44e6fec3cc8eb3ef53e2a46affc3f42b33764497271f13a4928df631dd083376e");
    });
});
